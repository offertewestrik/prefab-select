"use client";

import { useActionState } from "react";
import { Button } from "@repo/ui";
import { registerInstallerAction, type RegisterState } from "@/features/installers/server/actions";

export function RegisterInstallerForm() {
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(registerInstallerAction, {});
  const err = (f: string) => state.fieldErrors?.[f];

  return (
    <form action={formAction} className="space-y-4">
      <Group title="Bedrijfsgegevens">
        <F label="Bedrijfsnaam" name="companyName" error={err("companyName")} required />
        <div className="grid grid-cols-2 gap-3">
          <F label="KVK-nummer" name="kvk" />
          <F label="Btw-nummer" name="vatNumber" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <F label="Telefoon" name="phone" error={err("phone")} required />
          <F label="Website" name="website" />
        </div>
        <F label="Adres" name="street" />
        <div className="grid grid-cols-3 gap-3">
          <F label="Postcode" name="postcode" />
          <F label="Plaats" name="city" />
          <F label="Provincie" name="province" />
        </div>
      </Group>

      <Group title="Account">
        <F label="Contactpersoon" name="contactName" error={err("contactName")} required />
        <F label="E-mailadres" name="email" type="email" error={err("email")} required />
        <F label="Wachtwoord" name="password" type="password" error={err("password")} required />
      </Group>

      {state.error && <p className="text-sm text-[color:var(--color-status-danger,#DC2626)]">{state.error}</p>}
      <Button type="submit" disabled={pending}>{pending ? "Bezig…" : "Account aanmaken & verder"}</Button>
    </form>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
      <h2 className="mb-3 font-semibold text-neutral-900">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function F({ label, name, type = "text", error, required }: { label: string; name: string; type?: string; error?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-neutral-900">{label}{required && " *"}</span>
      <input name={name} type={type} required={required} className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" />
      {error && <span className="mt-1 block text-xs text-[color:var(--color-status-danger,#DC2626)]">{error}</span>}
    </label>
  );
}
