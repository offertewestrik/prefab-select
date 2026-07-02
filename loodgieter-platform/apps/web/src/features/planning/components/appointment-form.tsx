"use client";

import { useActionState } from "react";
import { Button } from "@repo/ui";
import { createAppointmentAction, type PlanningState } from "../server/actions";

export function AppointmentForm({ customers }: { customers: { id: string; name: string }[] }) {
  const [state, formAction, pending] = useActionState<PlanningState, FormData>(createAppointmentAction, {});
  return (
    <form action={formAction} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
      <div className="text-sm font-semibold text-neutral-900">Nieuwe afspraak inplannen</div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="af-l">Datum en tijd *</span>
          <input name="scheduledAt" type="datetime-local" className="af-i" required />
        </label>
        <label className="block">
          <span className="af-l">Duur</span>
          <select name="durationMin" className="af-i" defaultValue="60">
            <option value="30">30 min</option>
            <option value="60">1 uur</option>
            <option value="90">1,5 uur</option>
            <option value="120">2 uur</option>
            <option value="240">halve dag</option>
            <option value="480">hele dag</option>
          </select>
        </label>
        <label className="block">
          <span className="af-l">Omschrijving</span>
          <input name="title" className="af-i" placeholder="Bijv. CV-ketel vervangen" />
        </label>
        <label className="block">
          <span className="af-l">Klant</span>
          <select name="customerId" className="af-i" defaultValue="">
            <option value="">— geen / los —</option>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="af-l">Adres</span>
          <input name="address" className="af-i" placeholder="Straat 1, 1234 AB Plaats" />
        </label>
        <label className="block sm:col-span-2">
          <span className="af-l">Notities</span>
          <textarea name="notes" className="af-i min-h-16" placeholder="Bijv. materiaal meenemen, parkeren achter" />
        </label>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Button type="submit" variant="accent" disabled={pending}>Inplannen</Button>
        {state.message && <span className={`text-sm ${state.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{state.message}</span>}
      </div>
      <style>{`.af-l{display:block;margin-bottom:.25rem;font-size:.8rem;font-weight:500;color:#0E1B33}.af-i{width:100%;border:1px solid var(--color-neutral-200);border-radius:var(--radius-md);padding:.5rem .75rem;font-size:.875rem;height:2.6rem}textarea.af-i{height:auto}`}</style>
    </form>
  );
}
