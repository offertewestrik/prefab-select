"use client";

import { useActionState } from "react";
import { saveReplyAction, type ReviewState } from "@/features/reviews/server/actions";

/**
 * Reactieformulier voor de installateur. Alleen bruikbaar zolang er nog geen
 * beoordeelde reactie is (PENDING of geen reactie). De server bewaakt dit nogmaals.
 */
export function ReplyForm({ reviewId, initialBody, editable }: { reviewId: string; initialBody: string; editable: boolean }) {
  const [state, action, pending] = useActionState<ReviewState, FormData>(saveReplyAction, {});

  if (!editable) {
    return (
      <p className="text-sm text-neutral-500">
        Deze reactie is al beoordeeld en kan niet meer worden bewerkt. Verwijder de reactie om opnieuw te beginnen.
      </p>
    );
  }

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="reviewId" value={reviewId} />
      <textarea
        name="body"
        defaultValue={initialBody}
        required
        minLength={5}
        maxLength={1500}
        rows={4}
        placeholder="Bedank de klant of geef professioneel context. Je reactie is na goedkeuring publiek zichtbaar."
        className="w-full rounded-[var(--radius-md)] border border-neutral-200 p-3 text-sm"
      />
      <div className="flex items-center gap-3">
        <button
          disabled={pending}
          className="rounded-[var(--radius-md)] bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-60"
        >
          {pending ? "Bezig…" : "Reactie opslaan"}
        </button>
        {state.message && (
          <span className={`text-sm ${state.ok ? "text-success-600" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}
