import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";

export default async function DashboardReviews() {
  const company = await getCurrentCompany();
  const reviews = company
    ? await prisma.review.findMany({ where: { companyId: company.id }, orderBy: { createdAt: "desc" } })
    : [];

  return (
    <div>
      <PageHeading title="Reviews" subtitle="Beoordelingen van je klanten." />
      {reviews.length === 0 ? (
        <EmptyState>Je hebt nog geen reviews ontvangen.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-900">{r.authorName}</span>
                <span className="text-sm text-trust">{"★".repeat(r.rating)}</span>
              </div>
              {r.title && <div className="mt-1 text-sm font-medium">{r.title}</div>}
              <p className="mt-1 text-sm text-neutral-500">{r.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
