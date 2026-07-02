"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { createInvoiceFromQuote } from "./service";

async function companyGuard() {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) throw new Error("Geen bedrijf gekoppeld.");
  return company;
}

/** Factuur maken vanuit een offerte → open de factuur. */
export async function createInvoiceFromQuoteAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  const quoteId = String(formData.get("quoteId") ?? "");
  const res = await createInvoiceFromQuote(company.id, quoteId);
  revalidatePath("/dashboard/facturen");
  if (res.ok) redirect(`/dashboard/facturen/${res.invoiceId}`);
  redirect("/dashboard/facturen");
}

/** Factuurstatus zetten (betaald/open/geannuleerd). */
export async function setInvoiceStatusAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!["OPEN", "PAID", "OVERDUE", "CANCELLED"].includes(status)) return;
  await prisma.invoice.updateMany({
    where: { id, companyId: company.id },
    data: { status, paidAt: status === "PAID" ? new Date() : null },
  });
  revalidatePath("/dashboard/facturen");
  revalidatePath(`/dashboard/facturen/${id}`);
}
