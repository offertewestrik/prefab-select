import "server-only";
import { prisma } from "@/lib/prisma";

/** Alle klanten van een bedrijf (adresboek), met aantal offertes. */
export async function listCustomers(companyId: string) {
  return prisma.customer.findMany({
    where: { companyId },
    orderBy: { name: "asc" },
    include: { _count: { select: { quotes: true } } },
  });
}

/** Eén klant (alleen van het eigen bedrijf), met recente offertes. */
export async function getCustomer(id: string, companyId: string) {
  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      quotes: { orderBy: { updatedAt: "desc" }, take: 20, select: { id: true, number: true, status: true, totalCents: true, updatedAt: true } },
    },
  });
  if (!customer || customer.companyId !== companyId) return null;
  return customer;
}
