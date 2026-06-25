"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { buyLead, createQuoteDraft } from "./purchase";

const REASONS: Record<string, string> = {
  not_available: "Deze lead is niet (meer) aan jou aangeboden.",
  already_owned: "Je hebt deze lead al gekocht.",
  sold_out: "Deze lead is niet meer beschikbaar.",
  insufficient_credits: "Onvoldoende credits. Waardeer je saldo op.",
  error: "Er ging iets mis. Probeer het opnieuw.",
};

export type BuyState = { ok?: boolean; message?: string };

/** Koop-actie (alleen INSTALLER met gekoppeld bedrijf). */
export async function buyLeadAction(_prev: BuyState, formData: FormData): Promise<BuyState> {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) return { ok: false, message: "Je account is niet aan een bedrijf gekoppeld." };

  const leadId = String(formData.get("leadId") ?? "");
  if (!leadId) return { ok: false, message: "Ongeldige lead." };

  const result = await buyLead(company.id, leadId);
  if (!result.ok) return { ok: false, message: REASONS[result.reason] ?? REASONS.error };

  revalidatePath(`/dashboard/leads/${leadId}`);
  revalidatePath("/dashboard/leads");
  revalidatePath("/dashboard/mijn-leads");
  revalidatePath("/dashboard");
  return { ok: true, message: "Lead gekocht! De klantgegevens zijn vrijgegeven." };
}

/** Maakt een offerteconcept voor een gekochte lead en gaat naar offertes. */
export async function createQuoteAction(formData: FormData): Promise<void> {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) return;
  const leadId = String(formData.get("leadId") ?? "");
  if (!leadId) return;

  const result = await createQuoteDraft(company.id, leadId);
  revalidatePath("/dashboard/quotes");
  if (result.ok) redirect("/dashboard/quotes");
}
