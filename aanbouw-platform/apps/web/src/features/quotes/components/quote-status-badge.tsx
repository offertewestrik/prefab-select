import { quoteStatusLabels, type QuoteStatus } from "@repo/core";

const styles: Record<QuoteStatus, string> = {
  DRAFT: "bg-neutral-100 text-neutral-600",
  SENT: "bg-primary-50 text-primary-700",
  ACCEPTED: "bg-success-500/10 text-success-600",
  REJECTED: "bg-neutral-100 text-neutral-500",
  EXPIRED: "bg-accent-500/10 text-accent-600",
};

/** Uniforme statusbadge voor offertes (Concept/Verstuurd/.../Verlopen). */
export function QuoteStatusBadge({ status }: { status: string }) {
  const s = status as QuoteStatus;
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[s] ?? "bg-neutral-100 text-neutral-600"}`}>
      {quoteStatusLabels[s] ?? status}
    </span>
  );
}
