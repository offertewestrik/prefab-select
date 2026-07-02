"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { Prisma } from "@repo/db";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { createWorkOrder } from "./service";

export type WorkOrderState = { ok?: boolean; message?: string };

async function companyGuard() {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) throw new Error("Geen bedrijf gekoppeld.");
  return company;
}

const woItem = z.object({ description: z.string(), qty: z.number(), unitPriceCents: z.number().int(), kind: z.enum(["LABOUR", "MATERIAL", "OTHER"]).optional() });
const saveSchema = z.object({
  description: z.string().max(5000).optional().default(""),
  hoursWorked: z.coerce.number().min(0).max(1000).default(0),
  customerName: z.string().max(200).optional().default(""),
  address: z.string().max(300).optional().default(""),
  notes: z.string().max(5000).optional().default(""),
  lineItems: z.array(woItem).default([]),
});

export async function createWorkOrderAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  const quoteId = String(formData.get("quoteId") ?? "") || undefined;
  const customerId = String(formData.get("customerId") ?? "") || undefined;
  const res = await createWorkOrder(company.id, { quoteId, customerId });
  revalidatePath("/dashboard/werkbonnen");
  if (res.ok) redirect(`/dashboard/werkbonnen/${res.workOrderId}`);
  redirect("/dashboard/werkbonnen");
}

export async function saveWorkOrderAction(workOrderId: string, _prev: WorkOrderState, formData: FormData): Promise<WorkOrderState> {
  const company = await companyGuard();
  const wo = await prisma.workOrder.findUnique({ where: { id: workOrderId } });
  if (!wo || wo.companyId !== company.id) return { ok: false, message: "Werkbon niet gevonden." };
  if (wo.status === "SIGNED") return { ok: false, message: "Een ondertekende werkbon kan niet meer worden gewijzigd." };
  let payload: unknown;
  try { payload = JSON.parse(String(formData.get("payload") ?? "{}")); } catch { return { ok: false, message: "Ongeldige gegevens." }; }
  const parsed = saveSchema.safeParse(payload);
  if (!parsed.success) return { ok: false, message: "Controleer de velden." };
  const d = parsed.data;
  await prisma.workOrder.update({
    where: { id: workOrderId },
    data: {
      description: d.description || null,
      hoursWorked: d.hoursWorked,
      customerName: d.customerName || null,
      address: d.address || null,
      notes: d.notes || null,
      lineItems: d.lineItems as unknown as Prisma.InputJsonValue,
      status: "COMPLETED",
    },
  });
  revalidatePath(`/dashboard/werkbonnen/${workOrderId}`);
  return { ok: true, message: "Werkbon opgeslagen." };
}

/** Klant tekent af → werkbon wordt vastgezet (SIGNED). */
export async function signWorkOrderAction(workOrderId: string, _prev: WorkOrderState, formData: FormData): Promise<WorkOrderState> {
  const company = await companyGuard();
  const wo = await prisma.workOrder.findUnique({ where: { id: workOrderId } });
  if (!wo || wo.companyId !== company.id) return { ok: false, message: "Werkbon niet gevonden." };
  const name = String(formData.get("signedByName") ?? "").trim();
  if (name.length < 2) return { ok: false, message: "Vul de naam van de klant in." };
  await prisma.workOrder.update({
    where: { id: workOrderId },
    data: { signedByName: name, signedAt: new Date(), status: "SIGNED", performedAt: wo.performedAt ?? new Date() },
  });
  revalidatePath(`/dashboard/werkbonnen/${workOrderId}`);
  return { ok: true, message: "Werkbon ondertekend en vastgezet." };
}
