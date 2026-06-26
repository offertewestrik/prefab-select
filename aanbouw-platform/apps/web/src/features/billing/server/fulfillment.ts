import "server-only";
import { prisma } from "@/lib/prisma";

export type FulfillResult = { ok: boolean; credited?: boolean; reason?: string };

/**
 * Schrijft credits bij voor een betaalde checkout-sessie. IDEMPOTENT:
 *  - Stripe event-id wordt vastgelegd (StripeEvent) → dubbele webhook = geen dubbele bijschrijving.
 *  - Een al-PAID betaling wordt nooit opnieuw gecrediteerd.
 * Alles in één transactie; de unieke StripeEvent-PK is de harde garantie.
 */
export async function fulfillPaymentBySession(
  sessionId: string,
  opts?: { eventId?: string; paymentIntentId?: string | null },
): Promise<FulfillResult> {
  return prisma.$transaction(async (tx) => {
    if (opts?.eventId) {
      const seen = await tx.stripeEvent.findUnique({ where: { id: opts.eventId } });
      if (seen) return { ok: true, credited: false, reason: "event_already_processed" };
    }

    const payment = await tx.payment.findUnique({ where: { stripeSessionId: sessionId } });
    if (!payment) return { ok: false, reason: "payment_not_found" };

    if (payment.status === "PAID") {
      if (opts?.eventId) await tx.stripeEvent.create({ data: { id: opts.eventId, type: "checkout.session.completed" } });
      return { ok: true, credited: false, reason: "already_paid" };
    }

    const company = await tx.installerCompany.findUniqueOrThrow({ where: { id: payment.companyId } });
    const balanceAfter = company.creditBalance + payment.credits;

    await tx.installerCompany.update({ where: { id: company.id }, data: { creditBalance: balanceAfter } });
    const txn = await tx.creditTransaction.create({
      data: { companyId: company.id, type: "TOPUP", amount: payment.credits, balanceAfter, reference: payment.id },
    });
    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: "PAID",
        paidAt: new Date(),
        creditTxnId: txn.id,
        stripePaymentIntentId: opts?.paymentIntentId ?? payment.stripePaymentIntentId,
      },
    });
    if (opts?.eventId) await tx.stripeEvent.create({ data: { id: opts.eventId, type: "checkout.session.completed" } });

    return { ok: true, credited: true };
  });
}

/** Markeer een (nog niet betaalde) betaling als mislukt/geannuleerd. */
export async function markPaymentStatus(sessionId: string, status: "FAILED" | "CANCELED" | "REFUNDED") {
  await prisma.payment.updateMany({
    where: { stripeSessionId: sessionId, status: { not: "PAID" } },
    data: { status },
  });
}
