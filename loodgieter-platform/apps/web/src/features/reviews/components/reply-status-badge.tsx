const labels: Record<string, string> = {
  PENDING: "In behandeling",
  APPROVED: "Goedgekeurd",
  REJECTED: "Afgewezen",
  HIDDEN: "Verborgen",
};
const styles: Record<string, string> = {
  PENDING: "bg-accent-500/10 text-accent-600",
  APPROVED: "bg-success-500/10 text-success-600",
  REJECTED: "bg-neutral-100 text-neutral-500",
  HIDDEN: "bg-neutral-100 text-neutral-500",
};

export function ReplyStatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] ?? "bg-neutral-100 text-neutral-600"}`}>
      Reactie: {labels[status] ?? status}
    </span>
  );
}
