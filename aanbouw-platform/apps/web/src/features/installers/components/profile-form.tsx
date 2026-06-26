"use client";

import { useActionState } from "react";
import { Button } from "@repo/ui";
import { updateProfileAction, type ProfileState } from "@/features/installers/server/profile-actions";

export interface ProfileInitial {
  name: string;
  shortDescription: string;
  description: string;
  specialties: string;
  yearsExperience: string;
  employees: string;
  kvk: string;
  vatNumber: string;
  phone: string;
  email: string;
  website: string;
  street: string;
  postcode: string;
  city: string;
  province: string;
  openingHours: string;
  emergencyService: boolean;
  warrantyText: string;
}

export function ProfileForm({ initial }: { initial: ProfileInitial }) {
  const [state, formAction, pending] = useActionState<ProfileState, FormData>(updateProfileAction, {});

  return (
    <form action={formAction} className="space-y-5">
      <Card title="Algemeen">
        <T label="Bedrijfsnaam" name="name" def={initial.name} required />
        <T label="Korte omschrijving (voor kaarten)" name="shortDescription" def={initial.shortDescription} />
        <Area label="Uitgebreide omschrijving" name="description" def={initial.description} />
        <T label="Specialisaties (komma-gescheiden)" name="specialties" def={initial.specialties} />
        <div className="grid grid-cols-2 gap-3">
          <T label="Jaren ervaring" name="yearsExperience" type="number" def={initial.yearsExperience} />
          <T label="Aantal vakmannen" name="employees" type="number" def={initial.employees} />
        </div>
      </Card>

      <Card title="Contact & vestiging">
        <div className="grid grid-cols-2 gap-3">
          <T label="Telefoon" name="phone" def={initial.phone} required />
          <T label="E-mail" name="email" type="email" def={initial.email} required />
        </div>
        <T label="Website" name="website" def={initial.website} />
        <T label="Adres" name="street" def={initial.street} />
        <div className="grid grid-cols-3 gap-3">
          <T label="Postcode" name="postcode" def={initial.postcode} />
          <T label="Plaats" name="city" def={initial.city} />
          <T label="Provincie" name="province" def={initial.province} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <T label="KVK" name="kvk" def={initial.kvk} />
          <T label="Btw-nummer" name="vatNumber" def={initial.vatNumber} />
        </div>
      </Card>

      <Card title="Service">
        <Area label="Openingstijden" name="openingHours" def={initial.openingHours} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="emergencyService" defaultChecked={initial.emergencyService} /> Biedt spoedservice (24/7)
        </label>
        <Area label="Garantieomschrijving" name="warrantyText" def={initial.warrantyText} />
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>{pending ? "Bezig…" : "Profiel opslaan"}</Button>
        {state.message && <span className={`text-sm ${state.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{state.message}</span>}
      </div>
    </form>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
      <h2 className="mb-3 font-semibold text-neutral-900">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function T({ label, name, def, type = "text", required }: { label: string; name: string; def?: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-neutral-900">{label}{required && " *"}</span>
      <input name={name} type={type} defaultValue={def} required={required} className="h-10 w-full rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" />
    </label>
  );
}
function Area({ label, name, def }: { label: string; name: string; def?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-neutral-900">{label}</span>
      <textarea name={name} defaultValue={def} className="min-h-20 w-full rounded-[var(--radius-md)] border border-neutral-200 p-2 text-sm" />
    </label>
  );
}
