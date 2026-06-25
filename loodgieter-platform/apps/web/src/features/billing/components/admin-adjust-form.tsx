"use client";

import { useActionState } from "react";
import { Button } from "@repo/ui";
import { adminAdjustAction, type AdjustState } from "@/features/billing/server/actions";

export function AdminAdjustForm({ companies }: { companies: { id: string; name: string }[] }) {
  const [state, formAction, pending] = useActionState<AdjustState, FormData>(adminAdjustAction, {});

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
      <label className="text-sm">
        <span className="mb-1 block font-medium text-neutral-900">Bedrijf</span>
        <select name="companyId" className="h-10 rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" required>
          <option value="">Kies…</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>
      <label className="text-sm">
        <span className="mb-1 block font-medium text-neutral-900">Aantal (+/-)</span>
        <input name="amount" type="number" className="h-10 w-28 rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" required />
      </label>
      <label className="text-sm flex-1">
        <span className="mb-1 block font-medium text-neutral-900">Reden</span>
        <input name="reason" className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" placeholder="bijv. coulance / correctie" />
      </label>
      <Button type="submit" disabled={pending}>Toepassen</Button>
      {state.message && (
        <p className={`w-full text-sm ${state.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{state.message}</p>
      )}
    </form>
  );
}
