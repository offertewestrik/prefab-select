import "server-only";
import { prisma } from "@/lib/prisma";
import { acquireLock, releaseLock } from "@/lib/redis";

export type BuyResult =
  | { ok: true; balanceAfter: number }
  | { ok: false; reason: "not_available" | "already_owned" | "sold_out" | "insufficient_credits" | "error" };

/**
 * Koopt een lead met credits. Volledig server-side gevalideerd:
 *  - lead moet aan dit bedrijf zijn aangeboden (LeadMatch bestaat)
 *  - niet al gekocht (status + unieke LeadPurchase)
 *  - nog niet uitverkocht (soldCount < maxBuyers)
 *  - voldoende creditsaldo
 * Redis-lock per lead voorkomt over-verkoop bij gelijktijdige aankopen;
 * de DB-transactie + unique-constraint vormen de harde garantie.
 */
export async function buyLead(companyId: string, leadId: string): Promise<BuyResult> {
  const lockKey = `buy:${leadId}`;
  const locked = await acquireLock(lockKey, 10);
  if (!locked) return { ok: false, reason: "error" };

  try {
    return await prisma.$transaction(async (tx) => {
      const match = await tx.leadMatch.findUnique({
        where: { leadId_companyId: { leadId, companyId } },
        include: { lead: true },
      });
      if (!match) return { ok: false, reason: "not_available" } as const;
      if (match.status === "PURCHASED") return { ok: false, reason: "already_owned" } as const;

      const lead = match.lead;
      if (lead.soldCount >= lead.maxBuyers) return { ok: false, reason: "sold_out" } as const;

      const company = await tx.installerCompany.findUnique({ where: { id: companyId } });
      if (!company || company.creditBalance < match.priceCredits) {
        return { ok: false, reason: "insufficient_credits" } as const;
      }

      const balanceAfter = company.creditBalance - match.priceCredits;

      await tx.installerCompany.update({
        where: { id: companyId },
        data: { creditBalance: balanceAfter },
      });
      const txn = await tx.creditTransaction.create({
        data: {
          companyId,
          type: "SPEND",
          amount: -match.priceCredits,
          balanceAfter,
          reference: leadId,
        },
      });
      await tx.leadMatch.update({
        where: { id: match.id },
        data: { status: "PURCHASED", purchasedAt: new Date() },
      });
      await tx.leadPurchase.create({
        data: { leadMatchId: match.id, companyId, creditsSpent: match.priceCredits, creditTxnId: txn.id },
      });
      const soldCount = lead.soldCount + 1;
      await tx.leadRequest.update({
        where: { id: leadId },
        data: { soldCount, status: soldCount >= lead.maxBuyers ? "SOLD_OUT" : "PARTIALLY_SOLD" },
      });

      return { ok: true, balanceAfter } as const;
    });
  } catch {
    return { ok: false, reason: "error" };
  } finally {
    await releaseLock(lockKey);
  }
}

/** Maakt een offerteconcept (DRAFT) voor een gekochte lead. */
export async function createQuoteDraft(companyId: string, leadId: string): Promise<{ ok: boolean; quoteId?: string }> {
  // Alleen toegestaan als de lead daadwerkelijk gekocht is door dit bedrijf.
  const purchase = await prisma.leadPurchase.findFirst({
    where: { companyId, match: { leadId } },
  });
  if (!purchase) return { ok: false };

  const count = await prisma.quote.count({ where: { companyId } });
  const number = `OFF-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

  const quote = await prisma.quote.create({
    data: {
      companyId,
      leadId,
      number,
      lineItems: [],
      subtotalCents: 0,
      vatCents: 0,
      totalCents: 0,
      status: "DRAFT",
    },
  });
  return { ok: true, quoteId: quote.id };
}
