import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getAllReviews } from "@/features/reviews/server/service";
import {
  approveReviewAction,
  rejectReviewAction,
  hideReviewAction,
  republishReviewAction,
} from "@/features/reviews/server/actions";

export default async function AdminReviews() {
  const reviews = await getAllReviews();

  return (
    <div>
      <PageHeading title="Reviews" subtitle="Modereer reviews. Alleen goedgekeurde reviews zijn publiek zichtbaar." />
      {reviews.length === 0 ? (
        <EmptyState>Er zijn nog geen reviews.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-trust">{"★".repeat(r.rating)}</span>
                    <span className="text-sm font-medium text-neutral-900">{r.company.name}</span>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">{r.status}</span>
                  </div>
                  {r.title && <div className="mt-1 font-medium text-neutral-900">{r.title}</div>}
                  <p className="mt-1 text-sm text-neutral-500">{r.body}</p>
                  <div className="mt-1 text-xs text-neutral-400">
                    {r.customerName}{r.cityName ? ` · ${r.cityName}` : ""}{r.serviceSlug ? ` · ${r.serviceSlug}` : ""} · {r.createdAt.toLocaleDateString("nl-NL")}
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-1.5">
                  {r.status !== "APPROVED" && <ModBtn action={approveReviewAction} id={r.id} label="Goedkeuren" />}
                  {r.status !== "REJECTED" && <ModBtn action={rejectReviewAction} id={r.id} label="Afwijzen" />}
                  {r.status === "APPROVED" && <ModBtn action={hideReviewAction} id={r.id} label="Verbergen" />}
                  {r.status === "HIDDEN" && <ModBtn action={republishReviewAction} id={r.id} label="Opnieuw publiceren" />}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ModBtn({ action, id, label }: { action: (fd: FormData) => void; id: string; label: string }) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button className="rounded-[var(--radius-md)] border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50">{label}</button>
    </form>
  );
}
