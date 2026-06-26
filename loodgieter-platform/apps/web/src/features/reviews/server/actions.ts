"use server";

import { revalidatePath } from "next/cache";
import { requireRole, getSessionUser } from "@/lib/guards";
import { submitReviewByToken, submitReviewByAccount, moderateReview, type ReviewFormInput } from "./service";

export type ReviewState = { ok?: boolean; message?: string };

const REASONS: Record<string, string> = {
  invalid_rating: "Kies een score van 1 tot 5 sterren.",
  invalid_body: "Schrijf een korte toelichting.",
  already_reviewed: "Je hebt al een review geplaatst voor deze offerte.",
  invalid_token: "Deze reviewlink is ongeldig of verlopen.",
  not_found: "Niet gevonden.",
  forbidden: "Je hebt geen toegang tot deze review.",
  not_accepted: "Je kunt pas een review plaatsen na een geaccepteerde offerte.",
};

function parseForm(formData: FormData): ReviewFormInput & { consent: boolean } {
  return {
    rating: Number(formData.get("rating")),
    title: String(formData.get("title") ?? "") || undefined,
    body: String(formData.get("body") ?? ""),
    showName: formData.get("showName") === "on",
    customerName: String(formData.get("customerName") ?? "") || undefined,
    consent: formData.get("consent") === "on",
  };
}

export async function submitReviewByTokenAction(_prev: ReviewState, formData: FormData): Promise<ReviewState> {
  const input = parseForm(formData);
  if (!input.consent) return { ok: false, message: "Geef toestemming om je review te publiceren." };
  const token = String(formData.get("token") ?? "");
  const result = await submitReviewByToken(token, input);
  if (!result.ok) return { ok: false, message: REASONS[result.reason ?? ""] ?? "Er ging iets mis." };
  return { ok: true, message: "Bedankt! Je review wordt na controle geplaatst." };
}

export async function submitReviewByAccountAction(_prev: ReviewState, formData: FormData): Promise<ReviewState> {
  const user = await getSessionUser();
  if (!user) return { ok: false, message: "Log in om een review te plaatsen." };
  const input = parseForm(formData);
  if (!input.consent) return { ok: false, message: "Geef toestemming om je review te publiceren." };
  const quoteId = String(formData.get("quoteId") ?? "");
  const result = await submitReviewByAccount((user as { id: string }).id, quoteId, input);
  if (!result.ok) return { ok: false, message: REASONS[result.reason ?? ""] ?? "Er ging iets mis." };
  return { ok: true, message: "Bedankt! Je review wordt na controle geplaatst." };
}

// ── Admin-moderatie ──
async function moderate(formData: FormData, status: "APPROVED" | "REJECTED" | "HIDDEN" | "PENDING") {
  await requireRole("ADMIN");
  const id = String(formData.get("id") ?? "");
  if (id) {
    await moderateReview(id, status);
    revalidatePath("/admin/reviews");
  }
}
export async function approveReviewAction(formData: FormData) { await moderate(formData, "APPROVED"); }
export async function rejectReviewAction(formData: FormData) { await moderate(formData, "REJECTED"); }
export async function hideReviewAction(formData: FormData) { await moderate(formData, "HIDDEN"); }
export async function republishReviewAction(formData: FormData) { await moderate(formData, "APPROVED"); }
