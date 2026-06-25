import "server-only";
import { siteUrl } from "@repo/seo";
import { brand } from "@repo/core";
import { prisma } from "@/lib/prisma";
import { saveQuoteSchema, sendQuoteSchema } from "../schema";
import { computeTotals, makeAccessToken } from "./service";
import { parseLineItems } from "./queries";
import { sendQuoteSentEmail, sendQuoteAcceptedEmail, sendQuoteRejectedEmail } from "@/lib/email";

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

  const { subtotalCents, vatCents, totalCents } = computeTotals(parsed.data.lineItems, parsed.data.vatRate);
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
      subtotalCents,
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
  if (!quote.lead?.contactEmail) return { ok: false, reason: "no_email" };

  const token = quote.accessToken ?? makeAccessToken(quote.id);
  await prisma.quote.update({
    where: { id: quoteId },
    data: { status: "SENT", sentAt: new Date(), accessToken: token },
  });

  await sendQuoteSentEmail({
    to: quote.lead.contactEmail,
    customerName: quote.lead.contactName,
    companyName: quote.company.name,
    quoteNumber: quote.number,
    totalCents: quote.totalCents,
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
  if (kind === "accept") await sendQuoteAcceptedEmail({ to: installerEmail, quoteNumber: quote.number, customerName });
  else await sendQuoteRejectedEmail({ to: installerEmail, quoteNumber: quote.number, customerName });

  return { ok: true };
}
