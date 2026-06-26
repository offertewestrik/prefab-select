import Link from "next/link";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getAllQuotes } from "@/features/quotes/server/queries";
import { QuoteStatusBadge } from "@/features/quotes/components/quote-status-badge";
import { euro } from "@/lib/format";

type Status = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED";
const STATUSES: Status[] = ["DRAFT", "SENT", "ACCEPTED", "REJECTED", "EXPIRED"];

export default async function AdminQuotes({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const sp = await searchParams;
  const status = (STATUSES.includes(sp.status as Status) ? sp.status : undefined) as Status | undefined;
  const quotes = await getAllQuotes({ status });

  return (
    <div>
      <PageHeading title="Offertes" subtitle="Alle offertes op het platform. Filter op status (o.a. verlopen)." />

      <form className="mb-6 flex flex-wrap items-end gap-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4 text-sm">
        <label>
          <span className="mb-1 block font-medium text-neutral-900">Status</span>
          <select name="status" defaultValue={sp.status ?? ""} className="h-10 rounded-[var(--radius-md)] border border-neutral-200 px-2">
            <option value="">Alle</option>
            <option value="DRAFT">Concept</option>
            <option value="SENT">Verstuurd</option>
            <option value="ACCEPTED">Geaccepteerd</option>
            <option value="REJECTED">Afgewezen</option>
            <option value="EXPIRED">Verlopen</option>
          </select>
        </label>
        <button className="h-10 rounded-[var(--radius-md)] bg-primary-500 px-4 font-medium text-white">Filter</button>
      </form>

      {quotes.length === 0 ? (
        <EmptyState>Geen offertes gevonden.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Nummer</th>
                <th className="p-3">Vakman</th>
                <th className="p-3">Klant</th>
                <th className="p-3">Totaal</th>
                <th className="p-3">Geldig tot</th>
                <th className="p-3">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-t border-neutral-100">
                  <td className="p-3 font-medium text-neutral-900">{q.number}</td>
                  <td className="p-3">{q.company.name}</td>
                  <td className="p-3">{q.lead?.contactName ?? "—"}</td>
                  <td className="p-3">{euro(q.totalCents / 100)}</td>
                  <td className="p-3">{q.validUntil ? q.validUntil.toLocaleDateString("nl-NL") : "—"}</td>
                  <td className="p-3"><QuoteStatusBadge status={q.status} /></td>
                  <td className="p-3 text-right">
                    <Link href={`/offertes/${q.id}`} className="font-medium text-primary-600 hover:underline">
                      Bekijken
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
