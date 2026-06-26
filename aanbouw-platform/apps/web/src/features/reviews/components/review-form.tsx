"use client";

import { useActionState, useState } from "react";
import { Button } from "@repo/ui";
import { submitReviewByTokenAction, submitReviewByAccountAction, type ReviewState } from "@/features/reviews/server/actions";

export function ReviewForm({
  mode,
  token,
  quoteId,
  defaultName,
}: {
  mode: "token" | "account";
  token?: string;
  quoteId?: string;
  defaultName?: string;
}) {
  const action = mode === "token" ? submitReviewByTokenAction : submitReviewByAccountAction;
  const [state, formAction, pending] = useActionState<ReviewState, FormData>(action, {});
  const [rating, setRating] = useState(5);

  if (state.ok) {
    return <div className="rounded-[var(--radius-xl)] border border-success-500/30 bg-success-500/5 p-6 text-center text-neutral-700">{state.message}</div>;
  }

  return (
    <form action={formAction} className="space-y-4">
      {token && <input type="hidden" name="token" value={token} />}
      {quoteId && <input type="hidden" name="quoteId" value={quoteId} />}
      <input type="hidden" name="rating" value={rating} />

      <div>
        <span className="mb-1 block text-sm font-medium text-neutral-900">Je beoordeling</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setRating(n)} className={`text-3xl leading-none ${n <= rating ? "text-trust" : "text-neutral-300"}`} aria-label={`${n} sterren`}>★</button>
          ))}
        </div>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-neutral-900">Titel (optioneel)</span>
        <input name="title" className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-neutral-900">Je ervaring</span>
        <textarea name="body" required className="min-h-28 w-full rounded-[var(--radius-md)] border border-neutral-200 p-2 text-sm" placeholder="Hoe verliep de klus?" />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-neutral-900">Je naam</span>
        <input name="customerName" defaultValue={defaultName} className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" />
      </label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="showName" defaultChecked /> Toon mijn naam bij de review</label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="consent" required /> Ik geef toestemming om deze review te publiceren</label>

      {state.message && <p className="text-sm text-[color:var(--color-status-danger,#DC2626)]">{state.message}</p>}
      <Button type="submit" variant="accent" disabled={pending}>{pending ? "Versturen…" : "Review plaatsen"}</Button>
    </form>
  );
}
