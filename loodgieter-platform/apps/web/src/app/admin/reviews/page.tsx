import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getAllReviews, getReviewFilterOptions } from "@/features/reviews/server/service";
import {
  approveReviewAction,
  rejectReviewAction,
  hideReviewAction,
  republishReviewAction,
} from "@/features/reviews/server/actions";

type Status = "PENDING" | "APPROVED" | "REJECTED" | "HIDDEN";

export default async function AdminReviews({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; service?: string; city?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const status = (["PENDING", "APPROVED", "REJECTED", "HIDDEN"].includes(sp.status ?? "") ? sp.status : undefined) as Status | undefined;

  const [reviews, options] = await Promise.all([
    getAllReviews({ status, serviceSlug: sp.service, cityName: sp.city, q: sp.q }),
    getReviewFilterOptions(),
  ]);

  return (
    <div>
      <PageHeading title="Reviews" subtitle="Modereer reviews. Alleen goedgekeurde reviews zijn publiek zichtbaar." />

      {/* Filters (GET) */}
      <form className="mb-6 flex flex-wrap items-end gap-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4 text-sm">
        <label>
          <span className="mb-1 block font-medium text-neutral-900">Status</span>
          <select name="status" defaultValue={sp.status ?? ""} className="h-10 rounded-[var(--radius-md)] border border-neutral-200 px-2">
            <option value="">Alle</option>
            <option value="PENDING">In behandeling</option>
            <option value="APPROVED">Goedgekeurd</option>
            <option value="REJECTED">Afgewezen</option>
            <option value="HIDDEN">Verborgen</option>
          </select>
        </label>
        <label>
          <span className="mb-1 block font-medium text-neutral-900">Dienst</span>
          <select name="service" defaultValue={sp.service ?? ""} className="h-10 rounded-[var(--radius-md)] border border-neutral-200 px-2">
            <option value="">Alle</option>
            {options.services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1 block font-medium text-neutral-900">Plaats</span>
          <select name="city" defaultValue={sp.city ?? ""} className="h-10 rounded-[var(--radius-md)] border border-neutral-200 px-2">
            <option value="">Alle</option>
            {options.cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="flex-1">
          <span className="mb-1 block font-medium text-neutral-900">Zoek (klant/bedrijf)</span>
          <input name="q" defaultValue={sp.q ?? ""} className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3" />
        </label>
        <button className="h-10 rounded-[var(--radius-md)] bg-primary-500 px-4 font-medium text-white">Filter</button>
      </form>

      {reviews.length === 0 ? (
        <EmptyState>Geen reviews gevonden.</EmptyState>
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
                    {r.showName ? r.customerName : "Anoniem"}{r.cityName ? ` · ${r.cityName}` : ""}{r.serviceSlug ? ` · ${r.serviceSlug}` : ""} · {r.createdAt.toLocaleDateString("nl-NL")}
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
