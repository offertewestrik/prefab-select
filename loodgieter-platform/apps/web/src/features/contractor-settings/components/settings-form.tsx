"use client";

import { useActionState } from "react";
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
}

export function ContractorSettingsForm({ initial }: { initial: SettingsInitial }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(saveContractorSettingsAction, {});

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
