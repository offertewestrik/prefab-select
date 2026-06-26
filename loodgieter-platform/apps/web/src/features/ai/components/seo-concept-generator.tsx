"use client";

import { useActionState } from "react";
import { seoConceptAction, type SeoConceptState } from "@/features/ai/actions";

export function SeoConceptGenerator() {
  const [state, action, pending] = useActionState<SeoConceptState, FormData>(seoConceptAction, {});

  return (
    <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
      <h2 className="font-semibold text-neutral-900">AI-conceptgenerator</h2>
      <p className="mt-1 text-sm text-neutral-500">Genereert een concept (H1, intro, FAQ, meta). Wordt nooit automatisch gepubliceerd.</p>
      <form action={action} className="mt-3 grid gap-3 sm:grid-cols-[160px_1fr_1fr_auto] sm:items-end">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-neutral-700">Type</span>
          <select name="kind" className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-2 text-sm">
            <option value="service">Dienst</option>
            <option value="city">Stad</option>
            <option value="service-city">Dienst + stad</option>
            <option value="article">Kennisbank</option>
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-neutral-700">Onderwerp</span>
          <input name="topic" required placeholder="bijv. warmtepomp installeren" className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block font-medium text-neutral-700">Context (optioneel)</span>
          <input name="context" placeholder="bijv. Eindhoven" className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" />
        </label>
        <button disabled={pending} className="h-10 rounded-[var(--radius-md)] bg-primary-500 px-4 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-60">
          {pending ? "Bezig…" : "AI concept genereren"}
        </button>
      </form>
      {state.error && <p className="mt-2 text-sm text-[color:var(--color-status-danger,#DC2626)]">{state.error}</p>}
      {state.ok && state.output && (
        <pre className="mt-3 overflow-x-auto rounded-[var(--radius-md)] bg-neutral-50 p-3 text-xs text-neutral-700">{state.output}</pre>
      )}
    </div>
  );
}
