"use client";

import { useActionState } from "react";
import { reanalyzeLeadAction, type ReanalyzeState } from "@/features/photo-ai/actions";

/**
 * Heranalyse-knop. `allowForce` (admin) toont een provider-keuze
 * (default/mock/openai). De server-actie controleert de autorisatie nogmaals.
 */
export function ReanalyzeButton({ leadId, allowForce = false, compact = false }: { leadId: string; allowForce?: boolean; compact?: boolean }) {
  const [state, action, pending] = useActionState<ReanalyzeState, FormData>(reanalyzeLeadAction, {});

  return (
    <form action={action} className={compact ? "inline-flex items-center gap-1" : "flex flex-wrap items-center gap-2"}>
      <input type="hidden" name="leadId" value={leadId} />
      {allowForce && (
        <select name="force" defaultValue="default" className="h-8 rounded-[var(--radius-md)] border border-neutral-200 px-2 text-xs">
          <option value="default">Default</option>
          <option value="mock">Mock</option>
          <option value="openai">OpenAI</option>
        </select>
      )}
      <button
        disabled={pending}
        className="rounded-[var(--radius-md)] border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
      >
        {pending ? "Bezig…" : "Heranalyse"}
      </button>
      {!compact && state.message && (
        <span className={`text-xs ${state.ok ? "text-success-600" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{state.message}</span>
      )}
    </form>
  );
}
