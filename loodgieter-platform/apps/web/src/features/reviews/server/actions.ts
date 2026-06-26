"use server";

import { revalidatePath } from "next/cache";
import { requireRole, getSessionUser, getCurrentCompany } from "@/lib/guards";
import { submitReviewByToken, submitReviewByAccount, moderateReview, type ReviewFormInput } from "./service";
import {
  upsertReply,
  deleteOwnReply,
  moderateReply,
  adminEditReplyBody,
  adminDeleteReply,
} from "./replies";

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

// ── Installateur: reageren op eigen reviews ──
const REPLY_REASONS: Record<string, string> = {
  invalid_body: "Schrijf een reactie van minimaal 5 tekens.",
  too_long: "Reactie is te lang (max. 1500 tekens).",
  forbidden: "Je kunt alleen reageren op reviews over je eigen bedrijf.",
  not_found: "Review niet gevonden.",
  locked: "Deze reactie is al beoordeeld en kan niet meer worden bewerkt.",
};

export async function saveReplyAction(_prev: ReviewState, formData: FormData): Promise<ReviewState> {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) return { ok: false, message: "Geen bedrijf gekoppeld." };
  const user = await getSessionUser();

  const reviewId = String(formData.get("reviewId") ?? "");
  const body = String(formData.get("body") ?? "");
  const result = await upsertReply(company.id, reviewId, (user as { id?: string } | null)?.id ?? null, body);
  if (!result.ok) return { ok: false, message: REPLY_REASONS[result.reason] ?? "Er ging iets mis." };
  revalidatePath(`/dashboard/reviews/${reviewId}`);
  revalidatePath("/dashboard/reviews");
  return { ok: true, message: "Reactie opgeslagen. Na goedkeuring is deze publiek zichtbaar." };
}

export async function deleteReplyAction(formData: FormData) {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) return;
  const reviewId = String(formData.get("reviewId") ?? "");
  await deleteOwnReply(company.id, reviewId);
  revalidatePath(`/dashboard/reviews/${reviewId}`);
  revalidatePath("/dashboard/reviews");
}

// ── Admin: reacties modereren ──
async function moderateReplyForm(formData: FormData, status: "APPROVED" | "REJECTED" | "HIDDEN") {
  await requireRole("ADMIN");
  const id = String(formData.get("replyId") ?? "");
  if (id) {
    await moderateReply(id, status);
    revalidatePath("/admin/reviews");
  }
}
export async function approveReplyAction(formData: FormData) { await moderateReplyForm(formData, "APPROVED"); }
export async function rejectReplyAction(formData: FormData) { await moderateReplyForm(formData, "REJECTED"); }
export async function hideReplyAction(formData: FormData) { await moderateReplyForm(formData, "HIDDEN"); }

export async function adminEditReplyAction(_prev: ReviewState, formData: FormData): Promise<ReviewState> {
  await requireRole("ADMIN");
  const id = String(formData.get("replyId") ?? "");
  const body = String(formData.get("body") ?? "");
  const result = await adminEditReplyBody(id, body);
  if (!result.ok) return { ok: false, message: REPLY_REASONS[result.reason] ?? "Er ging iets mis." };
  revalidatePath("/admin/reviews");
  return { ok: true, message: "Reactie bijgewerkt." };
}

export async function adminDeleteReplyAction(formData: FormData) {
  await requireRole("ADMIN");
  const id = String(formData.get("replyId") ?? "");
  if (id) {
    await adminDeleteReply(id);
    revalidatePath("/admin/reviews");
  }
}
