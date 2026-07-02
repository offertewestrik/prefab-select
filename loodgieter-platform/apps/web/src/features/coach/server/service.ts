import "server-only";
import { prisma } from "@/lib/prisma";

export interface CompanyStats {
  companyName: string;
  periodDays: number;
  newLeads: number;
  quotesSent: number;
  quotesAccepted: number;
  quotesOpen: number;
  acceptedRevenueCents: number;
  openInvoicesCount: number;
  openInvoicesCents: number;
  creditBalance: number;
  reviewsCount: number;
  ratingAvg: number;
}

/** Verzamelt bedrijfscijfers over de laatste `periodDays` dagen (voor de coach + dashboard). */
export async function computeCompanyStats(companyId: string, periodDays = 30): Promise<CompanyStats> {
  const cutoff = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000);
  const company = await prisma.installerCompany.findUnique({
    where: { id: companyId },
    select: { name: true, creditBalance: true, ratingAvg: true, ratingCount: true },
  });

  const [newLeads, quotesSent, quotesAccepted, quotesOpen, acceptedAgg, openInvoices] = await Promise.all([
    prisma.leadMatch.count({ where: { companyId, offeredAt: { gte: cutoff } } }),
    prisma.quote.count({ where: { companyId, sentAt: { gte: cutoff } } }),
    prisma.quote.count({ where: { companyId, status: "ACCEPTED", acceptedAt: { gte: cutoff } } }),
    prisma.quote.count({ where: { companyId, status: "SENT" } }),
    prisma.quote.aggregate({ where: { companyId, status: "ACCEPTED", acceptedAt: { gte: cutoff } }, _sum: { totalCents: true } }),
    prisma.invoice.aggregate({ where: { companyId, status: { in: ["OPEN", "OVERDUE"] } }, _sum: { amountCents: true }, _count: true }),
  ]);

  return {
    companyName: company?.name ?? "je bedrijf",
    periodDays,
    newLeads,
    quotesSent,
    quotesAccepted,
    quotesOpen,
    acceptedRevenueCents: acceptedAgg._sum.totalCents ?? 0,
    openInvoicesCount: openInvoices._count,
    openInvoicesCents: openInvoices._sum.amountCents ?? 0,
    creditBalance: company?.creditBalance ?? 0,
    reviewsCount: company?.ratingCount ?? 0,
    ratingAvg: company?.ratingAvg ?? 0,
  };
}
