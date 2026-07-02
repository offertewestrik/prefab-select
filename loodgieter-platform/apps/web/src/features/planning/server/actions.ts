"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";

export type PlanningState = { ok?: boolean; message?: string };

async function companyGuard() {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) throw new Error("Geen bedrijf gekoppeld.");
  return company;
}

const APPT_STATUSES = ["PLANNED", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"] as const;

const appointmentSchema = z.object({
  scheduledAt: z.string().min(1, "Kies datum en tijd"),
  durationMin: z.coerce.number().int().min(15).max(1440).default(60),
  title: z.string().max(200).optional().default(""),
  customerId: z.string().optional().default(""),
  address: z.string().max(300).optional().default(""),
  notes: z.string().max(2000).optional().default(""),
});

/** Nieuwe afspraak inplannen (optioneel gekoppeld aan een klant). */
export async function createAppointmentAction(_prev: PlanningState, formData: FormData): Promise<PlanningState> {
  const company = await companyGuard();
  const parsed = appointmentSchema.safeParse({
    scheduledAt: String(formData.get("scheduledAt") ?? ""),
    durationMin: String(formData.get("durationMin") ?? "60"),
    title: String(formData.get("title") ?? ""),
    customerId: String(formData.get("customerId") ?? ""),
    address: String(formData.get("address") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Controleer de velden." };
  const d = parsed.data;
  const when = new Date(d.scheduledAt);
  if (Number.isNaN(when.getTime())) return { ok: false, message: "Ongeldige datum/tijd." };

  // Klant (indien gekozen) moet van het eigen bedrijf zijn.
  let customerId: string | null = null;
  if (d.customerId) {
    const c = await prisma.customer.findUnique({ where: { id: d.customerId } });
    if (c && c.companyId === company.id) customerId = c.id;
  }

  await prisma.appointment.create({
    data: {
      companyId: company.id,
      customerId,
      scheduledAt: when,
      durationMin: d.durationMin,
      title: d.title || null,
      address: d.address || null,
      notes: d.notes || null,
      status: "PLANNED",
    },
  });
  revalidatePath("/dashboard/planning");
  return { ok: true, message: "Afspraak ingepland." };
}

/** Status van een afspraak wijzigen (bevestigen/afronden/annuleren/no-show). */
export async function setAppointmentStatusAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!(APPT_STATUSES as readonly string[]).includes(status)) return;
  await prisma.appointment.updateMany({
    where: { id, companyId: company.id },
    data: { status: status as (typeof APPT_STATUSES)[number] },
  });
  revalidatePath("/dashboard/planning");
  revalidatePath("/dashboard/monteur");
  revalidatePath(`/dashboard/monteur/${id}`);
}

/** Afspraak verwijderen. */
export async function deleteAppointmentAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  const id = String(formData.get("id") ?? "");
  await prisma.appointment.deleteMany({ where: { id, companyId: company.id } });
  revalidatePath("/dashboard/planning");
}
