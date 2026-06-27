"use client";

import { useActionState } from "react";
import { liveTestAction, type LiveTestState } from "@/features/photo-ai/actions";

const DETECTORS = ["cv-ketel", "warmtepomp", "badkamer", "radiator", "vloerverwarming", "lekkage", "general"];

export function LiveTestForm() {
  const [state, action, pending] = useActionState<LiveTestState, FormData>(liveTestAction, {});
  const r = state.result;

  return (
    <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
      <form action={action} className="space-y-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-neutral-900">Image-URL (https)</span>
          <input name="imageUrl" required placeholder="https://…/ketel.jpg" className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" />
        </label>
        <div className="flex flex-wrap gap-3">
          <label className="text-sm">
            <span className="mb-1 block font-medium text-neutral-900">Detector</span>
            <select name="detector" className="h-10 rounded-[var(--radius-md)] border border-neutral-200 px-2 text-sm">
              {DETECTORS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium text-neutral-900">Provider</span>
            <select name="force" defaultValue="default" className="h-10 rounded-[var(--radius-md)] border border-neutral-200 px-2 text-sm">
              <option value="default">Default (env)</option>
              <option value="openai">OpenAI</option>
              <option value="mock">Mock</option>
            </select>
          </label>
          <div className="flex items-end">
            <button disabled={pending} className="h-10 rounded-[var(--radius-md)] bg-primary-500 px-4 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-60">
              {pending ? "Analyseren…" : "Run analyse"}
            </button>
          </div>
        </div>
      </form>

      {state.error && <p className="mt-3 text-sm text-[color:var(--color-status-danger,#DC2626)]">{state.error}</p>}

      {r && (
        <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4 text-sm">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">provider: <strong>{r.providerUsed}</strong></span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">confidence: {Math.round((r.confidence ?? 0) * 100)}%</span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">risico: {r.riskLevel}</span>
            {r.fallbackReason && (
              <span className="rounded-full bg-accent-500/10 px-2 py-0.5 text-xs text-accent-600">fallback: {r.fallbackReason}</span>
            )}
          </div>
          {r.summary && <p className="text-neutral-700">{r.summary}</p>}
          {r.objects && r.objects.length > 0 && (
            <p className="text-neutral-600"><span className="font-medium">Objecten:</span> {r.objects.map((o) => `${o.label} (${Math.round(o.confidence * 100)}%)`).join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}
