"use server";

import { revalidatePath } from "next/cache";
import { requireRole, getCurrentCompany, getSessionUser } from "@/lib/guards";
import { getQuoteForViewer } from "./queries";
import { saveDraft, sendQuote, applyDecision, type MutResult } from "./mutations";

export type ActionState = { ok?: boolean; message?: string };

const MESSAGES: Record<string, string> = {
  not_found: "Offerte niet gevonden.",
  not_draft: "Alleen concepten kunnen worden bewerkt.",
  already_sent: "Deze offerte is al verstuurd.",
  invalid: "Controleer de ingevulde velden.",
  no_email: "Geen e-mailadres van de klant bekend.",
  not_sent: "Deze offerte kan niet meer worden gewijzigd.",
};
const msg = (r: MutResult, okText: string): ActionState =>
  r.ok ? { ok: true, message: okText } : { ok: false, message: MESSAGES[r.reason] ?? r.reason };

async function companyGuard() {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) throw new Error("Geen bedrijf gekoppeld.");
  return company;
}

export async function saveQuoteAction(quoteId: string, _prev: ActionState, formData: FormData): Promise<ActionState> {
  const company = await companyGuard();
  let payload: unknown;
  try {
    payload = JSON.parse(String(formData.get("payload") ?? "{}"));
  } catch {
    return { ok: false, message: "Ongeldige gegevens." };
  }
  const result = await saveDraft(company.id, quoteId, payload);
  revalidatePath(`/dashboard/offertes/${quoteId}`);
  return msg(result, "Concept opgeslagen.");
}

export async function sendQuoteAction(quoteId: string, _prev: ActionState, _formData: FormData): Promise<ActionState> {
  const company = await companyGuard();
  const result = await sendQuote(company.id, quoteId);
  revalidatePath(`/dashboard/offertes/${quoteId}`);
  revalidatePath("/dashboard/quotes");
  return msg(result, "Offerte verstuurd naar de klant.");
}

export async function acceptQuoteAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return decide(formData, "accept");
}
export async function rejectQuoteAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  return decide(formData, "reject");
}

async function decide(formData: FormData, kind: "accept" | "reject"): Promise<ActionState> {
  const quoteId = String(formData.get("quoteId") ?? "");
  const token = String(formData.get("token") ?? "") || null;
  const user = await getSessionUser();
  const isAdmin = (user as { role?: string } | null)?.role === "ADMIN";

  // Toegangscontrole: token, eigenaar of admin.
  const access = await getQuoteForViewer({ quoteId, token, userId: (user as { id?: string } | null)?.id ?? null, isAdmin });
  if (!access.allowed) return { ok: false, message: "Geen toegang tot deze offerte." };

  const result = await applyDecision(quoteId, kind);
  revalidatePath(`/offertes/${quoteId}`);
  return msg(result, kind === "accept" ? "Offerte geaccepteerd." : "Offerte afgewezen.");
}
