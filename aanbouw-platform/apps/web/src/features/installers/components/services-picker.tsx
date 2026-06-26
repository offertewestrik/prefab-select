"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui";
import { saveServicesAction, type SaveState } from "@/features/installers/server/actions";

type Cat = { id: string; name: string; services: { id: string; name: string }[] };

export function ServicesPicker({
  categories,
  selected,
  next,
  submitLabel = "Opslaan",
}: {
  categories: Cat[];
  selected: string[];
  next?: string;
  submitLabel?: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<SaveState, FormData>(saveServicesAction, {});

  useEffect(() => {
    if (state.ok && next) router.push(next);
  }, [state.ok, next, router]);

  return (
    <form action={formAction} className="space-y-6">
      {categories.map((cat) => (
        <fieldset key={cat.id}>
          <legend className="mb-2 text-sm font-semibold text-neutral-900">{cat.name}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {cat.services.map((s) => (
              <label key={s.id} className="flex items-center gap-2 rounded-[var(--radius-md)] border border-neutral-200 p-2 text-sm">
                <input type="checkbox" name="serviceIds" value={s.id} defaultChecked={selected.includes(s.id)} />
                {s.name}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Bezig…" : submitLabel}</Button>
        {state.message && (
          <span className={`text-sm ${state.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{state.message}</span>
        )}
      </div>
    </form>
  );
}
