"use client";

import { useActionState } from "react";
import type { ReviewState } from "@/features/reviews/server/actions";

/** Admin kan de tekst van een reactie aanpassen vóór goedkeuring. */
export function AdminReplyEditor({
  replyId,
  initialBody,
  action,
}: {
  replyId: string;
  initialBody: string;
  action: (prev: ReviewState, formData: FormData) => Promise<ReviewState>;
}) {
  const [state, formAction, pending] = useActionState<ReviewState, FormData>(action, {});

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="replyId" value={replyId} />
      <textarea
        name="body"
        defaultValue={initialBody}
        rows={4}
        className="w-full rounded-[var(--radius-md)] border border-neutral-200 p-3 text-sm"
      />
      <div className="flex items-center gap-3">
        <button disabled={pending} className="rounded-[var(--radius-md)] border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50">
          {pending ? "Bezig…" : "Tekst opslaan"}
        </button>
        {state.message && (
          <span className={`text-xs ${state.ok ? "text-success-600" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{state.message}</span>
        )}
      </div>
    </form>
  );
}
