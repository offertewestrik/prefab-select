"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { saveCoverageAction, type SaveState } from "@/features/installers/server/actions";

type Prov = { id: string; name: string; municipalities: { id: string; name: string }[] };

export function CoveragePicker({
  provinces,
  selected,
  radiusKm,
  next,
  submitLabel = "Opslaan",
}: {
  provinces: Prov[];
  selected: string[];
  radiusKm?: number;
  next?: string;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<SaveState, FormData>(saveCoverageAction, {});

  useEffect(() => {
    if (state.ok && next) router.push(next);
  }, [state.ok, next, router]);

  return (
    <form action={formAction} className="space-y-6">
      <label className="block max-w-xs text-sm">
        <span className="mb-1 block font-medium text-neutral-900">Straal rond je werkgebied (km, optioneel)</span>
        <input name="radiusKm" type="number" min={0} max={200} defaultValue={radiusKm ?? ""} className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" placeholder="bijv. 25" />
      </label>

      {provinces.map((p) => (
        <fieldset key={p.id}>
          <legend className="mb-2 text-sm font-semibold text-neutral-900">{p.name}</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {p.municipalities.map((m) => (
              <label key={m.id} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="municipalityIds" value={m.id} defaultChecked={selected.includes(m.id)} />
                {m.name}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <p className="text-xs text-neutral-400">Kaartweergave volgt later; nu selecteer je gemeenten.</p>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Bezig…" : submitLabel}</Button>
        {state.message && (
          <span className={`text-sm ${state.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{state.message}</span>
        )}
      </div>
    </form>
  );
}
