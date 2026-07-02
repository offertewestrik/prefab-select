import "server-only";
import { prisma } from "@/lib/prisma";

/** Aankomende + recente afspraken van een bedrijf (vanaf begin van vandaag). */
export async function listAppointments(companyId: string) {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return prisma.appointment.findMany({
    where: { companyId, scheduledAt: { gte: start } },
    orderBy: { scheduledAt: "asc" },
    take: 200,
    include: {
      customer: { select: { id: true, name: true } },
      quote: { select: { id: true, number: true } },
      lead: { select: { contactName: true, city: true } },
    },
  });
}
