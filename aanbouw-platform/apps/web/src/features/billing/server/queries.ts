import "server-only";
import { prisma } from "@/lib/prisma";

/** Overzicht voor de credits-pagina van een aannemer. */
export async function getCreditOverview(companyId: string) {
  const [company, transactions, payments, purchases] = await Promise.all([
    prisma.installerCompany.findUnique({ where: { id: companyId } }),
    prisma.creditTransaction.findMany({ where: { companyId }, orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.payment.findMany({ where: { companyId }, orderBy: { createdAt: "desc" }, take: 20, include: { package: true } }),
    prisma.leadPurchase.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { match: { include: { lead: { include: { service: true, municipality: true } } } } },
    }),
  ]);
  return { company, transactions, payments, purchases };
}

/** Alle betalingen (admin). */
export function getAllPayments() {
  return prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { company: true, package: true },
  });
}
