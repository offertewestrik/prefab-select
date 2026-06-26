import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { getReviewForAdmin } from "@/features/reviews/server/service";
import { ReplyStatusBadge } from "@/features/reviews/components/reply-status-badge";
import {
  approveReplyAction,
  rejectReplyAction,
  hideReplyAction,
  adminDeleteReplyAction,
  adminEditReplyAction,
} from "@/features/reviews/server/actions";
import { AdminReplyEditor } from "@/features/reviews/components/admin-reply-editor";

export default async function AdminReviewDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = await getReviewForAdmin(id);
  if (!review) notFound();
  const reply = review.replyEntry;

  return (
    <div>
      <Link href="/admin/reviews" className="text-sm text-neutral-500 hover:text-neutral-900">← Reviews</Link>
      <PageHeading title="Review & reactie" subtitle={review.company.name} />

      <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="font-medium text-neutral-900">{review.showName ? review.customerName : "Anonieme klant"}</span>
          <span className="text-trust">{"★".repeat(review.rating)} <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">{review.status}</span></span>
        </div>
        {review.title && <div className="mt-1 font-medium text-neutral-900">{review.title}</div>}
        <p className="mt-1 text-sm text-neutral-600">{review.body}</p>
      </div>

      <div className="mt-6 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-neutral-900">Reactie van de installateur</h2>
          {reply && <ReplyStatusBadge status={reply.status} />}
        </div>

        {!reply ? (
          <p className="text-sm text-neutral-500">Deze installateur heeft (nog) niet gereageerd.</p>
        ) : (
          <>
            <AdminReplyEditor replyId={reply.id} initialBody={reply.body} action={adminEditReplyAction} />

            <div className="mt-4 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
              {reply.status !== "APPROVED" && <ModBtn action={approveReplyAction} id={reply.id} label="Goedkeuren" />}
              {reply.status !== "REJECTED" && <ModBtn action={rejectReplyAction} id={reply.id} label="Afwijzen" />}
              {reply.status !== "HIDDEN" && <ModBtn action={hideReplyAction} id={reply.id} label="Verbergen" />}
              <form action={adminDeleteReplyAction}>
                <input type="hidden" name="replyId" value={reply.id} />
                <button className="rounded-[var(--radius-md)] border border-neutral-200 px-2.5 py-1 text-xs font-medium text-[color:var(--color-status-danger,#DC2626)] hover:bg-neutral-50">
                  Verwijderen
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ModBtn({ action, id, label }: { action: (fd: FormData) => void; id: string; label: string }) {
  return (
    <form action={action}>
      <input type="hidden" name="replyId" value={id} />
      <button className="rounded-[var(--radius-md)] border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50">{label}</button>
    </form>
  );
}
