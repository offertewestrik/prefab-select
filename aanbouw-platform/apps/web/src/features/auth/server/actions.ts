"use server";

import { z } from "zod";
import { getSessionUser } from "@/lib/guards";
import { rateLimit } from "@/lib/ratelimit";
import { requestPasswordReset, resetPassword, createEmailVerification } from "./tokens";

export type ForgotState = { done?: boolean; error?: string };
export type ResetState = { ok?: boolean; error?: string };
export type ResendState = { sent?: boolean; error?: string };

// De generieke melding (identiek voor bestaande én onbekende adressen — geen
// user-enumeration) wordt door het formulier getoond zodra `done` true is.
const emailSchema = z.string().email();

/** Wachtwoord-vergeten aanvragen. Toont altijd dezelfde melding. */
export async function requestPasswordResetAction(_prev: ForgotState, formData: FormData): Promise<ForgotState> {
  const parsed = emailSchema.safeParse(String(formData.get("email") ?? "").trim());
  if (!parsed.success) return { error: "Vul een geldig e-mailadres in." };

  const email = parsed.data.toLowerCase();
  // Defense-in-depth: Redis-rate limit per adres (DB-throttle zit in de service).
  const rl = await rateLimit(`pwreset:${email}`, 5, 3600);
  if (!rl.ok) return { done: true }; // zelfde generieke uitkomst, geen extra info

  await requestPasswordReset(email);
  return { done: true };
}

const resetSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(8, "Wachtwoord moet minimaal 8 tekens zijn."),
});

/** Nieuw wachtwoord instellen op basis van een reset-token. */
export async function resetPasswordAction(_prev: ResetState, formData: FormData): Promise<ResetState> {
  const parsed = resetSchema.safeParse({
    token: String(formData.get("token") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Controleer de invoer." };

  const result = await resetPassword(parsed.data.token, parsed.data.password);
  switch (result) {
    case "ok":
      return { ok: true };
    case "weak_password":
      return { error: "Wachtwoord moet minimaal 8 tekens zijn." };
    case "expired":
      return { error: "Deze link is verlopen. Vraag een nieuwe aan." };
    case "used":
      return { error: "Deze link is al gebruikt. Vraag een nieuwe aan." };
    default:
      return { error: "Ongeldige of verlopen link. Vraag een nieuwe aan." };
  }
}

/** Verificatiemail opnieuw versturen (ingelogde gebruiker). */
export async function resendVerificationAction(_prev: ResendState, _formData: FormData): Promise<ResendState> {
  const user = await getSessionUser();
  const id = (user as { id?: string } | null)?.id;
  const email = (user as { email?: string } | null)?.email;
  if (!id || !email) return { error: "Log eerst in." };

  const rl = await rateLimit(`verify:${id}`, 5, 3600);
  if (!rl.ok) return { sent: true };

  await createEmailVerification(id, email);
  return { sent: true };
}
