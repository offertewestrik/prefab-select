// Job-typen en bijbehorende payloads. Eén bron van waarheid voor de queue.

export type JobType =
  | "lead.enrich_ai"
  | "lead.notify_matches"
  | "review.fraud_check"
  | "quote.send_email"
  | "ai.daily_report"
  | "email.send"
  | "quote.expire"
  | "photo.analyze"
  | "photo.cleanup_orphans";

export interface JobPayloads {
  "lead.enrich_ai": { leadId: string };
  "lead.notify_matches": { leadId: string };
  "review.fraud_check": { reviewId: string };
  "quote.send_email": { quoteId: string };
  "ai.daily_report": Record<string, never>;
  "email.send": { to: string; subject: string; html: string };
  "quote.expire": Record<string, never>;
  /** analysisId is de idempotente sleutel; detector/leadId puur informatief. */
  "photo.analyze": { analysisId: string; detector?: string; leadId?: string; createdBy?: string; forceProvider?: "mock" | "openai" | "default" };
  "photo.cleanup_orphans": Record<string, never>;
}

export const JOB_TYPES: JobType[] = [
  "lead.enrich_ai",
  "lead.notify_matches",
  "review.fraud_check",
  "quote.send_email",
  "ai.daily_report",
  "email.send",
  "quote.expire",
  "photo.analyze",
  "photo.cleanup_orphans",
];
