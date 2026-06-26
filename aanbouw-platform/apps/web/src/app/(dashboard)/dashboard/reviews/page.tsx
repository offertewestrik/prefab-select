import Link from "next/link";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { ReplyStatusBadge } from "@/features/reviews/components/reply-status-badge";

export default async function DashboardReviews() {
  const company = await getCurrentCompany();
  const reviews = company
    ? await prisma.review.findMany({
        where: { companyId: company.id },
        orderBy: { createdAt: "desc" },
        include: { replyEntry: { select: { status: true } } },
      })
    : [];

  return (
    <div>
      <PageHeading title="Reviews" subtitle="Beoordelingen van je klanten. Reageer publiek na goedkeuring door de redactie." />
      {reviews.length === 0 ? (
        <EmptyState>Je hebt nog geen reviews ontvangen.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-neutral-900">{r.showName ? r.customerName : "Anonieme klant"}</span>
                <span className="text-sm text-trust">{"★".repeat(r.rating)}</span>
              </div>
              {r.title && <div className="mt-1 text-sm font-medium">{r.title}</div>}
              <p className="mt-1 text-sm text-neutral-500">{r.body}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                {r.replyEntry ? (
                  <ReplyStatusBadge status={r.replyEntry.status} />
                ) : (
                  <span className="text-xs text-neutral-400">Nog geen reactie</span>
                )}
                <Link href={`/dashboard/reviews/${r.id}`} className="text-sm font-medium text-primary-600 hover:underline">
                  {r.replyEntry ? "Reactie beheren" : "Reageren"} →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
