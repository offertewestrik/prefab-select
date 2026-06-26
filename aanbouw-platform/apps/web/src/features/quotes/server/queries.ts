import "server-only";
import { prisma } from "@/lib/prisma";
import type { LineItem } from "../schema";

export async function getQuoteForCompany(quoteId: string, companyId: string, isAdmin: boolean) {
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: { company: true, lead: { include: { service: true, municipality: true } } },
  });
  if (!quote) return null;
  if (!isAdmin && quote.companyId !== companyId) return null;
  return quote;
}

/**
 * Klant-/admin-toegang tot een offerte. Toegestaan via:
 *  - geldig accessToken (link in de e-mail), of
 *  - ingelogde homeowner die eigenaar is van de bijbehorende lead, of
 *  - admin.
 */
export async function getQuoteForViewer(input: {
  quoteId: string;
  token?: string | null;
  userId?: string | null;
  isAdmin?: boolean;
}) {
  const quote = await prisma.quote.findUnique({
    where: { id: input.quoteId },
    include: { company: true, lead: { include: { service: true, municipality: true } } },
  });
  if (!quote) return { allowed: false as const };

  const byToken = !!quote.accessToken && input.token === quote.accessToken;
  const byOwner = !!input.userId && quote.lead?.homeownerId === input.userId;
  const allowed = input.isAdmin || byToken || byOwner;
  if (!allowed) return { allowed: false as const };

  return { allowed: true as const, quote, viaToken: byToken && !input.isAdmin };
}

export function parseLineItems(json: unknown): LineItem[] {
  if (!Array.isArray(json)) return [];
  return json.filter(
    (li): li is LineItem =>
      !!li &&
      typeof li === "object" &&
      typeof (li as LineItem).description === "string" &&
      typeof (li as LineItem).qty === "number" &&
      typeof (li as LineItem).unitPriceCents === "number",
  );
}

/** Offertes die naar een (ingelogde) klant zijn verstuurd, per lead. */
export async function getQuotesForLead(leadId: string) {
  return prisma.quote.findMany({
    where: { leadId, status: { in: ["SENT", "ACCEPTED", "REJECTED", "EXPIRED"] } },
    orderBy: { sentAt: "desc" },
    include: { company: true },
  });
}

/** Admin: alle offertes, optioneel gefilterd op status (incl. EXPIRED). */
export async function getAllQuotes(filter?: {
  status?: "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED";
}) {
  return prisma.quote.findMany({
    where: { status: filter?.status },
    orderBy: { updatedAt: "desc" },
    take: 200,
    include: { company: true, lead: true },
  });
}
