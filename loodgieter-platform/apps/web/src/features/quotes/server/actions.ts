"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole, getCurrentCompany, getSessionUser } from "@/lib/guards";
import { quoteAssistant } from "@repo/ai";
import { prisma } from "@/lib/prisma";
import { runAgent } from "@/features/ai/run";
import { getQuoteForViewer } from "./queries";
import { saveDraft, sendQuote, applyDecision, duplicateQuote, type MutResult } from "./mutations";
import { createQuoteFromTemplate } from "./templates";

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

/** Maakt een nieuw concept vanuit een template (of leeg) + klantgegevens en opent de editor. */
export async function createQuoteFromTemplateAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  const templateId = String(formData.get("templateId") ?? "") || undefined;
  const customer = {
    name: String(formData.get("customerName") ?? "") || undefined,
    email: String(formData.get("customerEmail") ?? "") || undefined,
    phone: String(formData.get("customerPhone") ?? "") || undefined,
    address: String(formData.get("customerAddress") ?? "") || undefined,
  };
  const result = await createQuoteFromTemplate(company.id, { templateId, customer });
  revalidatePath("/dashboard/offertes");
  if (result.ok) redirect(`/dashboard/offertes/${result.quoteId}`);
}

/** Dupliceert een (bijv. verlopen) offerte naar een nieuw concept en opent de editor. */
export async function duplicateQuoteAction(formData: FormData): Promise<void> {
  const company = await companyGuard();
  const quoteId = String(formData.get("quoteId") ?? "");
  const result = await duplicateQuote(company.id, quoteId);
  revalidatePath("/dashboard/quotes");
  if (result.ok) redirect(`/dashboard/offertes/${result.quoteId}`);
}

/**
 * AI-offertevoorstel: vult het DRAFT met titel/intro/regels/voorwaarden. De
 * installateur moet altijd zelf controleren en handmatig versturen.
 */
export async function aiQuoteDraftAction(quoteId: string, _prev: ActionState, _formData: FormData): Promise<ActionState> {
  const company = await companyGuard();
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: { lead: { include: { service: true, municipality: true, priceEstimate: true } } },
  });
  if (!quote || quote.companyId !== company.id) return { ok: false, message: MESSAGES.not_found };
  if (quote.status !== "DRAFT") return { ok: false, message: MESSAGES.not_draft };

  const lead = quote.lead;
  const res = await runAgent(
    quoteAssistant,
    {
      service: lead?.service.name ?? "Installatiewerk",
      city: lead?.municipality.name ?? "",
      description: lead?.description ?? "",
      marketPriceCents: lead?.priceEstimate?.marketPriceCents ?? null,
    },
    { summary: `AI-offerte ${lead?.service.name ?? "concept"}`, companyId: company.id, leadId: quote.leadId },
  );
  if (!res.ok || !res.data) return { ok: false, message: "AI kon geen voorstel maken. Probeer het later opnieuw." };

  // Opslaan als concept (DRAFT). Verzenden blijft een handmatige stap.
  const result = await saveDraft(company.id, quoteId, {
    title: res.data.title,
    introText: res.data.introText,
    lineItems: res.data.lineItems,
    vatRate: 21,
    terms: res.data.terms,
    notes: `Planning: ${res.data.planning}`,
    validUntil: null,
  });
  revalidatePath(`/dashboard/offertes/${quoteId}`);
  return msg(result, "AI-voorstel ingevuld als concept. Controleer en verstuur zelf.");
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
