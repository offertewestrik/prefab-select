"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { customerSchema } from "../schema";

export type CustomerState = { ok?: boolean; message?: string };

async function companyGuard() {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) throw new Error("Geen bedrijf gekoppeld.");
  return company;
}

function parse(formData: FormData) {
  return customerSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    street: String(formData.get("street") ?? ""),
    postcode: String(formData.get("postcode") ?? ""),
    city: String(formData.get("city") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  });
}

/** Nieuwe klant aanmaken → terug naar het klantoverzicht. */
export async function createCustomerAction(_prev: CustomerState, formData: FormData): Promise<CustomerState> {
  const company = await companyGuard();
  const parsed = parse(formData);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Controleer de velden." };
  const d = parsed.data;
  await prisma.customer.create({
    data: {
      companyId: company.id,
      name: d.name,
      email: d.email || null,
      phone: d.phone || null,
      street: d.street || null,
      postcode: d.postcode || null,
      city: d.city || null,
      notes: d.notes || null,
    },
  });
  revalidatePath("/dashboard/klanten");
  redirect("/dashboard/klanten");
}

/** Bestaande klant bijwerken (eigendom-gecontroleerd). */
export async function updateCustomerAction(customerId: string, _prev: CustomerState, formData: FormData): Promise<CustomerState> {
  const company = await companyGuard();
  const existing = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!existing || existing.companyId !== company.id) return { ok: false, message: "Klant niet gevonden." };
  const parsed = parse(formData);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Controleer de velden." };
  const d = parsed.data;
  await prisma.customer.update({
    where: { id: customerId },
    data: {
      name: d.name,
      email: d.email || null,
      phone: d.phone || null,
      street: d.street || null,
      postcode: d.postcode || null,
      city: d.city || null,
      notes: d.notes || null,
    },
  });
  revalidatePath("/dashboard/klanten");
  revalidatePath(`/dashboard/klanten/${customerId}`);
  return { ok: true, message: "Klant opgeslagen." };
}

/** Klant verwijderen (offertes blijven bestaan; koppeling wordt losgemaakt). */
export async function deleteCustomerAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  const customerId = String(formData.get("customerId") ?? "");
  const existing = await prisma.customer.findUnique({ where: { id: customerId } });
  if (existing && existing.companyId === company.id) {
    await prisma.customer.delete({ where: { id: customerId } });
  }
  revalidatePath("/dashboard/klanten");
  redirect("/dashboard/klanten");
}
