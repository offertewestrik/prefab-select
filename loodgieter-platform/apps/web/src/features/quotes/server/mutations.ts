import "server-only";
import type { Prisma } from "@repo/db";
import { siteUrl } from "@repo/seo";
import { brand } from "@repo/core";
import { prisma } from "@/lib/prisma";
import { saveQuoteSchema, sendQuoteSchema } from "../schema";
import { euro } from "@/lib/format";
import { computeTotals, makeAccessToken } from "./service";
import { parseLineItems } from "./queries";
import { sendQuoteSent, sendQuoteAccepted, sendQuoteRejected, sendQuoteExpired, sendAdminNotification } from "@/features/notifications/email/send";
import { notifyCompany, notifyAdmins } from "@/features/notifications/server/service";
import { createReviewInviteForQuote } from "@/features/reviews/server/service";

// Pure, request-context-onafhankelijke mutaties (testbaar). De server-acties
// (actions.ts) doen auth/rol-checks en roepen deze functies aan.

export type MutResult = { ok: true } | { ok: false; reason: string };

/** Concept opslaan — vereist eigendom + DRAFT-status. */
export async function saveDraft(companyId: string, quoteId: string, payload: unknown): Promise<MutResult> {
  const quote = await prisma.quote.findUnique({ where: { id: quoteId } });
  if (!quote || quote.companyId !== companyId) return { ok: false, reason: "not_found" };
  if (quote.status !== "DRAFT") return { ok: false, reason: "not_draft" };

  const parsed = saveQuoteSchema.safeParse(payload);
  if (!parsed.success) return { ok: false, reason: "invalid" };

  const { subtotalCents, discountCents, vatCents, totalCents } = computeTotals(
    parsed.data.lineItems,
    parsed.data.vatRate,
    parsed.data.discountCents,
  );
  await prisma.quote.update({
    where: { id: quoteId },
    data: {
      title: parsed.data.title,
      introText: parsed.data.introText,
      lineItems: parsed.data.lineItems,
      vatRate: parsed.data.vatRate,
      terms: parsed.data.terms,
      notes: parsed.data.notes,
      validUntil: parsed.data.validUntil ? new Date(parsed.data.validUntil) : null,
      customerName: parsed.data.customerName || null,
      customerEmail: parsed.data.customerEmail || null,
      customerPhone: parsed.data.customerPhone || null,
      customerAddress: parsed.data.customerAddress || null,
      subtotalCents,
      discountCents,
      vatCents,
      totalCents,
    },
  });
  return { ok: true };
}

/** Versturen — eigendom + DRAFT + verplichte velden; zet token + status SENT + e-mail. */
export async function sendQuote(companyId: string, quoteId: string): Promise<MutResult> {
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: { company: true, lead: true },
  });
  if (!quote || quote.companyId !== companyId) return { ok: false, reason: "not_found" };
  if (quote.status !== "DRAFT") return { ok: false, reason: "already_sent" };

  const validation = sendQuoteSchema.safeParse({
    title: quote.title ?? "",
    lineItems: parseLineItems(quote.lineItems),
    vatRate: quote.vatRate,
    validUntil: quote.validUntil ? quote.validUntil.toISOString() : "",
  });
  if (!validation.success) return { ok: false, reason: validation.error.issues[0]?.message ?? "invalid" };
  // Klant-e-mail: losse offerte (customerEmail) of, bij lead-offerte, de lead-contact.
  const customerEmail = quote.customerEmail || quote.lead?.contactEmail;
  if (!customerEmail) return { ok: false, reason: "no_email" };

  const token = quote.accessToken ?? makeAccessToken(quote.id);
  await prisma.quote.update({
    where: { id: quoteId },
    data: { status: "SENT", sentAt: new Date(), accessToken: token },
  });

  await sendQuoteSent({
    to: customerEmail,
    companyName: quote.company.name,
    quoteNumber: quote.number,
    totalText: euro(quote.totalCents / 100),
    validUntil: quote.validUntil ? quote.validUntil.toLocaleDateString("nl-NL") : undefined,
    url: siteUrl(`/offertes/${quoteId}?token=${token}`),
  });
  return { ok: true };
}

/** Beslissing toepassen — alleen SENT; voorkomt dubbele acceptatie/afwijzing. */
export async function applyDecision(quoteId: string, kind: "accept" | "reject"): Promise<MutResult> {
  const quote = await prisma.quote.findUnique({ where: { id: quoteId }, include: { company: true, lead: true } });
  if (!quote) return { ok: false, reason: "not_found" };
  if (quote.status !== "SENT") return { ok: false, reason: "not_sent" };

  await prisma.quote.update({
    where: { id: quoteId },
    data: kind === "accept" ? { status: "ACCEPTED", acceptedAt: new Date() } : { status: "REJECTED", rejectedAt: new Date() },
  });

  const installerEmail = quote.company.email || process.env.CONTACT_RECEIVER_EMAIL || brand.email;
  const customerName = quote.lead?.contactName ?? "De klant";
  const dashboardUrl = siteUrl("/dashboard/mijn-leads");

  if (kind === "accept") {
    await sendQuoteAccepted({
      to: installerEmail,
      quoteNumber: quote.number,
      customerName,
      customerContact: [quote.lead?.contactPhone, quote.lead?.contactEmail].filter(Boolean).join(" · "),
      totalText: euro(quote.totalCents / 100),
      dashboardUrl,
    });
    await notifyCompany(quote.companyId, { type: "quote.accepted", title: `Offerte ${quote.number} geaccepteerd`, body: customerName, href: "/dashboard/quotes" });
    await notifyAdmins({ type: "quote.accepted", title: `Offerte ${quote.number} geaccepteerd`, body: quote.company.name, href: "/admin" });
    void sendAdminNotification({ title: `Offerte ${quote.number} geaccepteerd`, lines: [`Vakman: ${quote.company.name}`, `Bedrag: ${euro(quote.totalCents / 100)}`], url: siteUrl("/admin") });
    void createReviewInviteForQuote(quoteId); // review-uitnodiging naar de klant
  } else {
    await sendQuoteRejected({ to: installerEmail, quoteNumber: quote.number, customerName });
    await notifyCompany(quote.companyId, { type: "quote.rejected", title: `Offerte ${quote.number} afgewezen`, body: customerName, href: "/dashboard/quotes" });
  }

  return { ok: true };
}

/**
 * Laat verlopen SENT-offertes verlopen (validUntil < now → EXPIRED).
 *
 * Alleen SENT gaat naar EXPIRED; DRAFT/ACCEPTED/REJECTED blijven onaangeraakt.
 * De statusovergang gebeurt per offerte via een atomaire `updateMany` met guard
 * `status: "SENT"`: alleen de run die de overgang daadwerkelijk uitvoert
 * (count === 1) verstuurt meldingen/e-mails. Zo levert een dubbele of
 * gelijktijdige cron-run nooit dubbele notificaties op (idempotent).
 */
export async function expireQuotes(now: Date = new Date()): Promise<{ scanned: number; expired: number }> {
  const candidates = await prisma.quote.findMany({
    where: { status: "SENT", validUntil: { not: null, lt: now } },
    include: { company: true, lead: true },
  });

  let expired = 0;
  for (const quote of candidates) {
    const res = await prisma.quote.updateMany({
      where: { id: quote.id, status: "SENT" },
      data: { status: "EXPIRED", expiredAt: now },
    });
    if (res.count !== 1) continue; // andere run was eerder → niet nogmaals melden
    expired++;

    const customerName = quote.lead?.contactName ?? "de klant";
    // In-app melding voor de installateur (deterministisch).
    await notifyCompany(quote.companyId, {
      type: "quote.expired",
      title: `Offerte ${quote.number} verlopen`,
      body: customerName,
      href: "/dashboard/quotes",
    });
    // E-mails (fire-and-forget; gegate door de atomaire overgang hierboven).
    const installerEmail = quote.company.email || process.env.CONTACT_RECEIVER_EMAIL || brand.email;
    void sendQuoteExpired({ to: installerEmail, quoteNumber: quote.number, companyName: quote.company.name, audience: "installer" });
    if (quote.lead?.contactEmail) {
      void sendQuoteExpired({ to: quote.lead.contactEmail, quoteNumber: quote.number, companyName: quote.company.name, audience: "customer" });
    }
  }

  return { scanned: candidates.length, expired };
}

/** Uniek offertenummer voor een bedrijf (OFF-JAAR-0001), botsingsvrij. */
export async function nextQuoteNumber(companyId: string): Promise<string> {
  const year = new Date().getFullYear();
  const base = await prisma.quote.count({ where: { companyId } });
  for (let i = base + 1; ; i++) {
    const number = `OFF-${year}-${String(i).padStart(4, "0")}`;
    if (!(await prisma.quote.findUnique({ where: { number } }))) return number;
  }
}

/**
 * Dupliceert een offerte naar een nieuw DRAFT (incl. regels/teksten), met een
 * vers nummer en zonder verzend-/beslis-/token-gegevens. Vereist eigendom.
 */
export async function duplicateQuote(
  companyId: string,
  quoteId: string,
): Promise<{ ok: true; quoteId: string } | { ok: false; reason: string }> {
  const source = await prisma.quote.findUnique({ where: { id: quoteId } });
  if (!source || source.companyId !== companyId) return { ok: false, reason: "not_found" };

  const number = await nextQuoteNumber(companyId);
  const created = await prisma.quote.create({
    data: {
      companyId,
      leadId: source.leadId,
      number,
      title: source.title,
      introText: source.introText,
      lineItems: (source.lineItems ?? []) as Prisma.InputJsonValue,
      subtotalCents: source.subtotalCents,
      vatRate: source.vatRate,
      vatCents: source.vatCents,
      totalCents: source.totalCents,
      terms: source.terms,
      notes: source.notes,
      status: "DRAFT",
      // validUntil/accessToken/sentAt/acceptedAt/rejectedAt/expiredAt bewust leeg.
    },
  });
  return { ok: true, quoteId: created.id };
}
