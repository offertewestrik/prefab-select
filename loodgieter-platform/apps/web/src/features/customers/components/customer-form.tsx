"use client";

import { useActionState } from "react";
import { Button } from "@repo/ui";
import type { CustomerState } from "../server/actions";

export interface CustomerFormValues {
  name?: string; email?: string | null; phone?: string | null;
  street?: string | null; postcode?: string | null; city?: string | null; notes?: string | null;
}

export function CustomerForm({
  action,
  initial,
  submitLabel = "Opslaan",
}: {
  action: (prev: CustomerState, formData: FormData) => Promise<CustomerState>;
  initial?: CustomerFormValues;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="mt-4 max-w-xl space-y-4">
      <Field label="Naam *" name="name" defaultValue={initial?.name ?? ""} placeholder="Bijv. Jan Jansen" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="E-mail" name="email" type="email" defaultValue={initial?.email ?? ""} placeholder="klant@voorbeeld.nl" />
        <Field label="Telefoon" name="phone" defaultValue={initial?.phone ?? ""} placeholder="06 12345678" />
      </div>
      <Field label="Straat en huisnummer" name="street" defaultValue={initial?.street ?? ""} placeholder="Voorbeeldstraat 1" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Postcode" name="postcode" defaultValue={initial?.postcode ?? ""} placeholder="1234 AB" />
        <Field label="Plaats" name="city" defaultValue={initial?.city ?? ""} placeholder="Amsterdam" />
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-neutral-900">Notities</span>
        <textarea name="notes" defaultValue={initial?.notes ?? ""} className="cf-inp min-h-20" placeholder="Interne notities over deze klant" />
      </label>

      <div className="flex items-center gap-3">
        <Button type="submit" variant="accent" disabled={pending}>{submitLabel}</Button>
        {state.message && <span className={`text-sm ${state.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{state.message}</span>}
      </div>
      <style>{`.cf-inp{width:100%;border:1px solid var(--color-neutral-200);border-radius:var(--radius-md);padding:.5rem .75rem;font-size:.875rem}`}</style>
    </form>
  );
}

function Field({ label, name, type = "text", defaultValue, placeholder }: { label: string; name: string; type?: string; defaultValue?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-900">{label}</span>
      <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} className="cf-inp" style={{ height: "2.75rem" }} />
    </label>
  );
}
