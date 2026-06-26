import "server-only";
import { prisma } from "@/lib/prisma";
import { euro } from "@/lib/format";
import { siteUrl } from "@repo/seo";
import type { JobType, JobPayloads } from "./types";
import { enrichNewLead, detectReviewFraud, runDailyReport } from "@/features/ai/services";
import { matchLead } from "@/features/leads/server/matching";
import { expireQuotes } from "@/features/quotes/server/mutations";
import { sendEmail, sendQuoteSent } from "@/features/notifications/email/send";
import { runPhotoAnalysis } from "@/features/photo-ai/service";

type Handler<T extends JobType> = (payload: JobPayloads[T]) => Promise<unknown>;

/** Registry: jobtype → uitvoering. Elke handler is idempotent genoeg om te kunnen retryen. */
export const HANDLERS: { [T in JobType]: Handler<T> } = {
  "lead.enrich_ai": async ({ leadId }) => {
    await enrichNewLead(leadId);
    return { leadId };
  },
  "lead.notify_matches": async ({ leadId }) => {
    const matched = await matchLead(leadId);
    return { leadId, matched };
  },
  "review.fraud_check": async ({ reviewId }) => {
    await detectReviewFraud(reviewId);
    return { reviewId };
  },
  "quote.send_email": async ({ quoteId }) => {
    const quote = await prisma.quote.findUnique({ where: { id: quoteId }, include: { company: true, lead: true } });
    if (!quote || !quote.lead?.contactEmail || !quote.accessToken) return { skipped: true };
    await sendQuoteSent({
      to: quote.lead.contactEmail,
      companyName: quote.company.name,
      quoteNumber: quote.number,
      totalText: euro(quote.totalCents / 100),
      validUntil: quote.validUntil ? quote.validUntil.toLocaleDateString("nl-NL") : undefined,
      url: siteUrl(`/offertes/${quoteId}?token=${quote.accessToken}`),
    });
    return { quoteId };
  },
  "ai.daily_report": async () => {
    return runDailyReport();
  },
  "email.send": async ({ to, subject, html }) => {
    const status = await sendEmail(to, { subject, html });
    return { status };
  },
  "quote.expire": async () => {
    return expireQuotes();
  },
  "photo.analyze": async ({ analysisId }) => {
    return runPhotoAnalysis(analysisId);
  },
};
