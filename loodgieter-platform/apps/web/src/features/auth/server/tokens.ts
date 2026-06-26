import "server-only";
import { randomBytes, createHash } from "node:crypto";
import bcrypt from "bcryptjs";
import { siteUrl } from "@repo/seo";
import { prisma } from "@/lib/prisma";
import { sendVerifyEmail, sendPasswordReset } from "@/features/notifications/email/send";

// ── Token-helpers ──────────────────────────────────────────────────────────
// We versturen een ruwe, hoog-entropische token in de e-maillink en bewaren
// uitsluitend de SHA-256-hash in de database. Opzoeken gebeurt op de hash.

const VERIFY_TTL_MS = 24 * 60 * 60 * 1000; // 24 uur
const RESET_TTL_MS = 60 * 60 * 1000; // 1 uur

// Throttle: max. zoveel aanvragen per e-mailadres binnen het venster.
const REQUEST_WINDOW_MS = 60 * 60 * 1000; // 1 uur
const MAX_REQUESTS_PER_WINDOW = 5;

export function generateRawToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex");
}

// ── E-mailverificatie ────────────────────────────────────────────────────

/** Maakt een verificatie-token + verstuurt de mail. Geeft de ruwe token terug (voor tests). */
export async function createEmailVerification(
  userId: string,
  email: string,
  now: Date = new Date(),
): Promise<{ ok: boolean; throttled?: boolean; rawToken?: string }> {
  const recent = await prisma.emailVerificationToken.count({
    where: { email, createdAt: { gt: new Date(now.getTime() - REQUEST_WINDOW_MS) } },
  });
  if (recent >= MAX_REQUESTS_PER_WINDOW) return { ok: true, throttled: true };

  const raw = generateRawToken();
  await prisma.emailVerificationToken.create({
    data: { userId, email, tokenHash: hashToken(raw), expiresAt: new Date(now.getTime() + VERIFY_TTL_MS) },
  });
  await sendVerifyEmail({ to: email, url: siteUrl(`/auth/verify-email?token=${raw}`) });
  return { ok: true, rawToken: raw };
}

export type VerifyResult = "ok" | "invalid" | "expired" | "used";

/** Verifieert een e-mailtoken: zet emailVerified en maakt de token eenmalig op. */
export async function verifyEmailToken(rawToken: string, now: Date = new Date()): Promise<VerifyResult> {
  if (!rawToken) return "invalid";
  const token = await prisma.emailVerificationToken.findUnique({ where: { tokenHash: hashToken(rawToken) } });
  if (!token) return "invalid";
  if (token.usedAt) return "used";
  if (token.expiresAt < now) return "expired";

  // Atomair eenmalig markeren — voorkomt hergebruik bij gelijktijdige requests.
  const claim = await prisma.emailVerificationToken.updateMany({
    where: { id: token.id, usedAt: null },
    data: { usedAt: now },
  });
  if (claim.count !== 1) return "used";

  await prisma.user.update({ where: { id: token.userId }, data: { emailVerified: now } });
  return "ok";
}

// ── Wachtwoordreset ────────────────────────────────────────────────────────

/**
 * Vraagt een wachtwoordreset aan. Geeft ALTIJD generiek `ok` terug (geen
 * user-enumeration): bij een onbekend e-mailadres wordt simpelweg niets aangemaakt.
 */
export async function requestPasswordReset(
  emailRaw: string,
  now: Date = new Date(),
): Promise<{ ok: true; created: boolean }> {
  const email = emailRaw.trim().toLowerCase();

  const recent = await prisma.passwordResetToken.count({
    where: { email, createdAt: { gt: new Date(now.getTime() - REQUEST_WINDOW_MS) } },
  });
  if (recent >= MAX_REQUESTS_PER_WINDOW) return { ok: true, created: false };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { ok: true, created: false }; // zelfde uitkomst als bij bestaand adres

  const raw = generateRawToken();
  await prisma.passwordResetToken.create({
    data: { userId: user.id, email, tokenHash: hashToken(raw), expiresAt: new Date(now.getTime() + RESET_TTL_MS) },
  });
  await sendPasswordReset({ to: email, url: siteUrl(`/wachtwoord-resetten?token=${raw}`) });
  return { ok: true, created: true };
}

export type ResetResult = "ok" | "invalid" | "expired" | "used" | "weak_password";

/** Zet een nieuw wachtwoord op basis van een reset-token (eenmalig bruikbaar). */
export async function resetPassword(
  rawToken: string,
  newPassword: string,
  now: Date = new Date(),
): Promise<ResetResult> {
  if (!rawToken) return "invalid";
  if (!newPassword || newPassword.length < 8) return "weak_password";

  const token = await prisma.passwordResetToken.findUnique({ where: { tokenHash: hashToken(rawToken) } });
  if (!token) return "invalid";
  if (token.usedAt) return "used";
  if (token.expiresAt < now) return "expired";

  const claim = await prisma.passwordResetToken.updateMany({
    where: { id: token.id, usedAt: null },
    data: { usedAt: now },
  });
  if (claim.count !== 1) return "used";

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: token.userId }, data: { passwordHash } });
  // Overige openstaande reset-tokens van deze gebruiker ongeldig maken.
  await prisma.passwordResetToken.updateMany({
    where: { userId: token.userId, usedAt: null },
    data: { usedAt: now },
  });
  return "ok";
}
