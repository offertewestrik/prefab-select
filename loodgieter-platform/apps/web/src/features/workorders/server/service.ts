import "server-only";
import type { Prisma } from "@repo/db";
import { prisma } from "@/lib/prisma";
import { parseLineItems } from "@/features/quotes/server/queries";

export async function nextWorkOrderNumber(companyId: string): Promise<string> {
  const year = new Date().getFullYear();
  const base = await prisma.workOrder.count({ where: { companyId } });
  for (let i = base + 1; ; i++) {
    const number = `WB-${year}-${String(i).padStart(4, "0")}`;
    if (!(await prisma.workOrder.findUnique({ where: { number } }))) return number;
  }
}

export async function listWorkOrders(companyId: string) {
  return prisma.workOrder.findMany({
    where: { companyId },
    orderBy: { updatedAt: "desc" },
    take: 200,
    include: { customer: { select: { name: true } } },
  });
}

export async function getWorkOrder(id: string, companyId: string) {
  const wo = await prisma.workOrder.findUnique({ where: { id }, include: { customer: true, quote: { select: { id: true, number: true } } } });
  if (!wo || wo.companyId !== companyId) return null;
  return wo;
}

/** Nieuwe werkbon (optioneel vanuit een offerte of voor een klant). */
export async function createWorkOrder(
  companyId: string,
  input: { quoteId?: string; customerId?: string },
): Promise<{ ok: true; workOrderId: string } | { ok: false; reason: string }> {
  let customerId: string | null = input.customerId ?? null;
  let customerName: string | null = null;
  let address: string | null = null;
  let lineItems: unknown[] = [];

  if (input.quoteId) {
    const quote = await prisma.quote.findUnique({ where: { id: input.quoteId }, include: { lead: true } });
    if (!quote || quote.companyId !== companyId) return { ok: false, reason: "not_found" };
    customerId = quote.customerId ?? customerId;
    customerName = quote.customerName ?? quote.lead?.contactName ?? null;
    address = quote.customerAddress ?? ([quote.lead?.street, quote.lead?.postcode, quote.lead?.city].filter(Boolean).join(" ") || null);
    lineItems = parseLineItems(quote.lineItems).filter((li) => !li.optional);
  }
  if (customerId) {
    const c = await prisma.customer.findUnique({ where: { id: customerId } });
    if (c && c.companyId === companyId) {
      customerName = customerName ?? c.name;
      address = address ?? ([c.street, [c.postcode, c.city].filter(Boolean).join(" ")].filter(Boolean).join(", ") || null);
    } else {
      customerId = null;
    }
  }

  const number = await nextWorkOrderNumber(companyId);
  const wo = await prisma.workOrder.create({
    data: {
      companyId,
      quoteId: input.quoteId ?? null,
      customerId,
      number,
      status: "DRAFT",
      lineItems: lineItems as unknown as Prisma.InputJsonValue,
      customerName,
      address,
    },
  });
  return { ok: true, workOrderId: wo.id };
}
