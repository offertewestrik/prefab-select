"use client";

import { useActionState, useState } from "react";
import { Button } from "@repo/ui";
import { saveContractorSettingsAction, type SettingsState } from "../server/actions";

export interface SettingsInitial {
  defaultVatRate: number;
  defaultValidityDays: number;
  quotePrefix: string;
  iban: string;
  defaultWarranty: string;
  defaultTerms: string;
  footerNote: string;
  accentColor: string;
  secondaryColor: string;
}

const ACCENT_PRESETS = ["#2563EB", "#F26A1B", "#16A34A", "#DC2626", "#7C3AED", "#0891B2", "#DB2777", "#CA8A04"];
const BAND_PRESETS = ["#0E1B33", "#1F2937", "#111827", "#0F766E", "#334155", "#3B0764", "#7C2D12", "#0C4A6E"];

export function ContractorSettingsForm({ initial }: { initial: SettingsInitial }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(saveContractorSettingsAction, {});
  const [accent, setAccent] = useState(initial.accentColor || "#2563EB");
  const [secondary, setSecondary] = useState(initial.secondaryColor || "#0E1B33");

  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Field label="Btw % (standaard)"><input className="inp" type="number" name="defaultVatRate" min={0} max={100} defaultValue={initial.defaultVatRate} /></Field>
        <Field label="Geldigheid (dagen)"><input className="inp" type="number" name="defaultValidityDays" min={1} max={365} defaultValue={initial.defaultValidityDays} /></Field>
        <Field label="Offertenummer-prefix"><input className="inp" name="quotePrefix" maxLength={10} defaultValue={initial.quotePrefix} placeholder="OFF" /></Field>
      </div>
      <Field label="IBAN (voor op facturen)"><input className="inp" name="iban" maxLength={34} defaultValue={initial.iban} placeholder="NL00 BANK 0000 0000 00" /></Field>
      <Field label="Standaard garantietekst"><textarea className="inp min-h-16" name="defaultWarranty" defaultValue={initial.defaultWarranty} placeholder="Bijv. 2 jaar garantie op materiaal en arbeid." /></Field>
      <Field label="Standaard voorwaarden"><textarea className="inp min-h-20" name="defaultTerms" defaultValue={initial.defaultTerms} placeholder="Betaling binnen 14 dagen na oplevering…" /></Field>
      <Field label="Voettekst op offerte/factuur"><input className="inp" name="footerNote" maxLength={1000} defaultValue={initial.footerNote} placeholder="Bedankt voor je vertrouwen!" /></Field>

      <div className="rounded-[var(--radius-md)] border border-neutral-200 p-4">
        <p className="mb-1 text-sm font-semibold text-neutral-900">Huisstijlkleuren</p>
        <p className="mb-3 text-xs text-neutral-500">Kies je eigen kleuren voor de offerte- en factuur-PDF. Kies vrij een kleur of gebruik een van de voorbeelden.</p>
        <div className="space-y-4">
          <ColorField
            name="accentColor"
            label="Accentkleur"
            hint="Accenten, koppen, totaalvak en de hoekvormen."
            value={accent}
            onChange={setAccent}
            presets={ACCENT_PRESETS}
          />
          <ColorField
            name="secondaryColor"
            label="Balkkleur (kop & voet)"
            hint="De donkere balk bovenaan en onderaan met je bedrijfsgegevens."
            value={secondary}
            onChange={setSecondary}
            presets={BAND_PRESETS}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" variant="accent" disabled={pending}>Instellingen opslaan</Button>
        {state.message && <span className={`text-sm ${state.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{state.message}</span>}
      </div>

      <style>{`.inp{height:2.75rem;width:100%;border:1px solid var(--color-neutral-200);border-radius:var(--radius-md);padding:0 .75rem;font-size:.875rem}textarea.inp{height:auto;padding:.5rem .75rem}`}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-900">{label}</span>
      {children}
    </label>
  );
}

function ColorField({
  name,
  label,
  hint,
  value,
  onChange,
  presets,
}: {
  name: string;
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  presets: string[];
}) {
  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-neutral-900">{label}</span>
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="color"
          aria-label={`${label} kiezen`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-14 cursor-pointer rounded-[var(--radius-md)] border border-neutral-200 bg-white p-1"
        />
        <span className="font-mono text-sm uppercase text-neutral-900">{value}</span>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Kies ${c}`}
              onClick={() => onChange(c)}
              className={`h-7 w-7 rounded-full border-2 ${value.toLowerCase() === c.toLowerCase() ? "border-neutral-900" : "border-white shadow-[0_0_0_1px_var(--color-neutral-200)]"}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
      <p className="mt-1 text-xs text-neutral-500">{hint}</p>
    </div>
  );
}
