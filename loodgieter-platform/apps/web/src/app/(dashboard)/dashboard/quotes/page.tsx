import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";

export default async function DashboardQuotes() {
  const company = await getCurrentCompany();
  const quotes = company
    ? await prisma.quote.findMany({ where: { companyId: company.id }, orderBy: { createdAt: "desc" } })
    : [];

  return (
    <div>
      <PageHeading title="Offertes" subtitle="Beheer en verstuur je offertes." />
      {quotes.length === 0 ? (
        <EmptyState>Je hebt nog geen offertes aangemaakt.</EmptyState>
      ) : (
        <ul className="space-y-2">
          {quotes.map((q) => (
            <li key={q.id} className="rounded-[var(--radius-md)] border border-neutral-200 bg-white p-4 text-sm">
              <span className="font-medium text-neutral-900">{q.number}</span> — {q.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
