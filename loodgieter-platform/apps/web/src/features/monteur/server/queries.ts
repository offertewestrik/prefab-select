import "server-only";
import { prisma } from "@/lib/prisma";

/** Afspraken van vandaag (voor de mobiele monteurmodus), op tijd gesorteerd. */
export async function listTodayAppointments(companyId: string) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return prisma.appointment.findMany({
    where: { companyId, scheduledAt: { gte: start, lt: end } },
    orderBy: { scheduledAt: "asc" },
    include: {
      customer: { select: { name: true, city: true } },
      lead: { select: { contactName: true, city: true } },
    },
  });
}

/** Eén klus met alle gegevens die een monteur onderweg nodig heeft. */
export async function getMonteurJob(id: string, companyId: string) {
  const appt = await prisma.appointment.findUnique({
    where: { id },
    include: {
      customer: { select: { name: true, phone: true, street: true, postcode: true, city: true } },
      quote: { select: { id: true, number: true } },
      lead: { select: { contactName: true, contactPhone: true, street: true, postcode: true, city: true } },
    },
  });
  if (!appt || appt.companyId !== companyId) return null;

  // Zoek een bestaande werkbon voor deze klus (via de gekoppelde offerte of klant).
  const workOrder = await prisma.workOrder.findFirst({
    where: {
      companyId,
      OR: [
        appt.quoteId ? { quoteId: appt.quoteId } : {},
        appt.customerId ? { customerId: appt.customerId } : {},
      ].filter((x) => Object.keys(x).length > 0),
    },
    orderBy: { createdAt: "desc" },
    select: { id: true, number: true, status: true },
  });

  const name = appt.customer?.name ?? appt.lead?.contactName ?? null;
  const phone = appt.customer?.phone ?? appt.lead?.contactPhone ?? null;
  const customerAddr = [appt.customer?.street, [appt.customer?.postcode, appt.customer?.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const leadAddr = [appt.lead?.street, [appt.lead?.postcode, appt.lead?.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const address = appt.address ?? (customerAddr || leadAddr || null);

  return { appt, workOrder, name, phone, address };
}
