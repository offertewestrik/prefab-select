"use client";

import { useActionState } from "react";
import { Button } from "@repo/ui";
import { runBusinessCoachAction, type CoachState } from "../server/actions";

export function CoachPanel() {
  const [state, formAction, pending] = useActionState<CoachState, FormData>(runBusinessCoachAction, {});
  const a = state.advice;
  return (
    <div className="mt-6">
      <form action={formAction}>
        <Button type="submit" variant="accent" disabled={pending}>{pending ? "Bezig…" : "✨ Genereer advies"}</Button>
      </form>
      {state.message && <p className="mt-2 text-sm text-[color:var(--color-status-danger,#DC2626)]">{state.message}</p>}
      {a && (
        <div className="mt-4 space-y-4">
          <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
            <p className="text-sm text-neutral-800">{a.summary}</p>
          </div>
          <Block title="Wat gaat goed" items={a.highlights} tone="good" />
          <Block title="Aandachtspunten" items={a.attention} tone="warn" />
          <Block title="Aanbevolen acties" items={a.actions} tone="action" />
        </div>
      )}
    </div>
  );
}

function Block({ title, items, tone }: { title: string; items: string[]; tone: "good" | "warn" | "action" }) {
  if (!items?.length) return null;
  const dot = tone === "good" ? "bg-green-500" : tone === "warn" ? "bg-amber-500" : "bg-primary-500";
  return (
    <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
      <div className="mb-2 text-sm font-semibold text-neutral-900">{title}</div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm text-neutral-700">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
