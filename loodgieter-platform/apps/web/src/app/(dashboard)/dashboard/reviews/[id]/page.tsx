import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { ReplyForm } from "@/features/reviews/components/reply-form";
import { ReplyStatusBadge } from "@/features/reviews/components/reply-status-badge";
import { deleteReplyAction } from "@/features/reviews/server/actions";

export default async function DashboardReviewDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = await getCurrentCompany();
  if (!company) notFound();

  // Beveiliging: alleen reviews van het eigen bedrijf.
  const review = await prisma.review.findFirst({
    where: { id, companyId: company.id },
    include: { replyEntry: true },
  });
  if (!review) notFound();

  const reply = review.replyEntry;
  const editable = !reply || reply.status === "PENDING";

  return (
    <div>
      <Link href="/dashboard/reviews" className="text-sm text-neutral-500 hover:text-neutral-900">← Reviews</Link>
      <PageHeading title="Review" subtitle="Reageer professioneel; je reactie wordt vóór publicatie gecontroleerd." />

      <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="font-medium text-neutral-900">{review.showName ? review.customerName : "Anonieme klant"}</span>
          <span className="text-trust">{"★".repeat(review.rating)}</span>
        </div>
        {review.title && <div className="mt-1 font-medium text-neutral-900">{review.title}</div>}
        <p className="mt-1 text-sm text-neutral-600">{review.body}</p>
        <div className="mt-1 text-xs text-neutral-400">{review.cityName ?? ""} · {review.createdAt.toLocaleDateString("nl-NL")}</div>
      </div>

      <div className="mt-6 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-neutral-900">Jouw reactie</h2>
          {reply && <ReplyStatusBadge status={reply.status} />}
        </div>

        <ReplyForm reviewId={review.id} initialBody={reply?.body ?? ""} editable={editable} />

        {reply && (
          <form action={deleteReplyAction} className="mt-4 border-t border-neutral-100 pt-4">
            <input type="hidden" name="reviewId" value={review.id} />
            <button className="text-sm font-medium text-[color:var(--color-status-danger,#DC2626)] hover:underline">
              Reactie verwijderen
            </button>
            <p className="mt-1 text-xs text-neutral-400">Verwijderen haalt je reactie offline; je kunt daarna een nieuwe schrijven.</p>
          </form>
        )}
      </div>
    </div>
  );
}
