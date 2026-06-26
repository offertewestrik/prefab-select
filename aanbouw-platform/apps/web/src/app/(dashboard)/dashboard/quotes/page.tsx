import Link from "next/link";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { euro } from "@/lib/format";
import { QuoteStatusBadge } from "@/features/quotes/components/quote-status-badge";
import { duplicateQuoteAction } from "@/features/quotes/server/actions";

export default async function DashboardQuotes() {
  const company = await getCurrentCompany();
  const quotes = company
    ? await prisma.quote.findMany({
        where: { companyId: company.id },
        orderBy: { updatedAt: "desc" },
        include: { lead: true },
      })
    : [];

  return (
    <div>
      <PageHeading title="Offertes" subtitle="Beheer en verstuur je offertes." />
      {quotes.length === 0 ? (
        <EmptyState>Je hebt nog geen offertes. Maak er een vanuit een gekochte lead.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Nummer</th>
                <th className="p-3">Klant</th>
                <th className="p-3">Totaal</th>
                <th className="p-3">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-t border-neutral-100">
                  <td className="p-3 font-medium text-neutral-900">{q.number}</td>
                  <td className="p-3">{q.lead?.contactName ?? "—"}</td>
                  <td className="p-3">{euro(q.totalCents / 100)}</td>
                  <td className="p-3"><QuoteStatusBadge status={q.status} /></td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {(q.status === "EXPIRED" || q.status === "REJECTED") && (
                        <form action={duplicateQuoteAction}>
                          <input type="hidden" name="quoteId" value={q.id} />
                          <button className="font-medium text-neutral-600 hover:underline">Dupliceren</button>
                        </form>
                      )}
                      <Link href={`/dashboard/offertes/${q.id}`} className="font-medium text-primary-600 hover:underline">
                        {q.status === "DRAFT" ? "Bewerken" : "Bekijken"}
                      </Link>
                    </div>
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
