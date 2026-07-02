import "server-only";
import type { Prisma } from "@repo/db";
import { prisma } from "@/lib/prisma";
import { parseLineItems } from "@/features/quotes/server/queries";

/** Uniek factuurnummer per bedrijf (F-JAAR-0001), botsingsvrij. */
export async function nextInvoiceNumber(companyId: string): Promise<string> {
  const year = new Date().getFullYear();
  const base = await prisma.invoice.count({ where: { companyId } });
  for (let i = base + 1; ; i++) {
    const number = `F-${year}-${String(i).padStart(4, "0")}`;
    if (!(await prisma.invoice.findUnique({ where: { number } }))) return number;
  }
}

export async function listInvoices(companyId: string) {
  return prisma.invoice.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { customer: { select: { name: true } } },
  });
}

export async function getInvoiceForCompany(id: string, companyId: string) {
  const inv = await prisma.invoice.findUnique({ where: { id }, include: { company: true, customer: true, quote: true } });
  if (!inv || inv.companyId !== companyId) return null;
  return inv;
}

/** Maakt een factuur op basis van een (bij voorkeur geaccepteerde) offerte. */
export async function createInvoiceFromQuote(
  companyId: string,
  quoteId: string,
): Promise<{ ok: true; invoiceId: string } | { ok: false; reason: string }> {
  const quote = await prisma.quote.findUnique({ where: { id: quoteId }, include: { lead: true } });
  if (!quote || quote.companyId !== companyId) return { ok: false, reason: "not_found" };

  const number = await nextInvoiceNumber(companyId);
  const due = new Date();
  due.setDate(due.getDate() + 14);

  const inv = await prisma.invoice.create({
    data: {
      companyId,
      quoteId: quote.id,
      customerId: quote.customerId,
      number,
      lineItems: parseLineItems(quote.lineItems) as unknown as Prisma.InputJsonValue,
      subtotalCents: quote.subtotalCents,
      discountCents: quote.discountCents,
      vatRate: quote.vatRate,
      vatCents: quote.vatCents,
      amountCents: quote.totalCents,
      introText: quote.introText,
      terms: quote.terms,
      customerName: quote.customerName ?? quote.lead?.contactName ?? null,
      customerEmail: quote.customerEmail ?? quote.lead?.contactEmail ?? null,
      customerAddress: quote.customerAddress ?? [quote.lead?.street, quote.lead?.postcode, quote.lead?.city].filter(Boolean).join(" ") ?? null,
      status: "OPEN",
      dueDate: due,
    },
  });
  return { ok: true, invoiceId: inv.id };
}
