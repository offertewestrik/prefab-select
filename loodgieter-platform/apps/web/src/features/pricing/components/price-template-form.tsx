"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@repo/ui";
import { euro } from "@/lib/format";
import { saveTemplateAction } from "../server/actions";
import type { QuoteItemKind } from "@/features/quotes/schema";

interface EditorItem {
  kind: QuoteItemKind;
  description: string;
  qty: number;
  unitPriceEuro: string;
  optional: boolean;
}

const KIND_LABEL: Record<QuoteItemKind, string> = { LABOUR: "Werk", MATERIAL: "Materiaal", OTHER: "Overig" };

export interface TemplateInitial {
  title: string;
  description: string;
  defaultVatRate: number;
  priceFromEuro: string;
  priceToEuro: string;
  warrantyText: string;
  termsText: string;
  active: boolean;
  items: { kind: QuoteItemKind; description: string; qty: number; unitPriceCents: number; optional: boolean }[];
}

export function PriceTemplateForm({ templateId, initial }: { templateId: string; initial: TemplateInitial }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [vatRate, setVatRate] = useState(initial.defaultVatRate);
  const [priceFrom, setPriceFrom] = useState(initial.priceFromEuro);
  const [priceTo, setPriceTo] = useState(initial.priceToEuro);
  const [warranty, setWarranty] = useState(initial.warrantyText);
  const [terms, setTerms] = useState(initial.termsText);
  const [active, setActive] = useState(initial.active);
  const [items, setItems] = useState<EditorItem[]>(
    initial.items.length
      ? initial.items.map((it) => ({ kind: it.kind, description: it.description, qty: it.qty, unitPriceEuro: (it.unitPriceCents / 100).toFixed(2), optional: it.optional }))
      : [{ kind: "LABOUR", description: "", qty: 1, unitPriceEuro: "0.00", optional: false }],
  );
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  const setItem = (i: number, patch: Partial<EditorItem>) => setItems((xs) => xs.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));

  // Voorbeeldtotaal van de niet-optionele regels (richtprijs).
  const baseCents = useMemo(
    () => items.filter((x) => x.description.trim() && !x.optional).reduce((s, x) => s + (Number(x.qty) || 0) * Math.round((parseFloat(x.unitPriceEuro) || 0) * 100), 0),
    [items],
  );

  function onSave() {
    const payload = {
      title,
      description,
      defaultVatRate: vatRate,
      priceFromCents: priceFrom ? Math.round(parseFloat(priceFrom) * 100) : null,
      priceToCents: priceTo ? Math.round(parseFloat(priceTo) * 100) : null,
      warrantyText: warranty,
      termsText: terms,
      active,
      items: items
        .filter((x) => x.description.trim())
        .map((x) => ({ kind: x.kind, description: x.description.trim(), qty: Number(x.qty) || 1, unitPriceCents: Math.round((parseFloat(x.unitPriceEuro) || 0) * 100), optional: x.optional })),
    };
    const f = new FormData();
    f.set("payload", JSON.stringify(payload));
    start(async () => {
      const r = await saveTemplateAction(templateId, {}, f);
      setMsg({ ok: !!r.ok, text: r.message ?? "" });
      if (r.ok) router.refresh();
    });
  }

  return (
    <div className="mt-4 max-w-2xl space-y-4">
      <Field label="Titel">
        <input className="inp" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bijv. CV-ketel vervangen (eigen tarief)" />
      </Field>
      <Field label="Omschrijving">
        <textarea className="inp min-h-20" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Korte professionele omschrijving die op de offerte komt." />
      </Field>

      <div>
        <div className="mb-1 text-sm font-medium text-neutral-900">Werkzaamheden & materialen (jouw prijzen)</div>
        <div className="space-y-2">
          {items.map((it, i) => (
            <div key={i} className="rounded-[var(--radius-md)] border border-neutral-150 bg-neutral-50/60 p-2">
              <div className="grid grid-cols-[1fr_60px_90px_auto] gap-2">
                <input className="inp" placeholder="Omschrijving" value={it.description} onChange={(e) => setItem(i, { description: e.target.value })} />
                <input className="inp" type="number" min={0} step="0.5" value={it.qty} onChange={(e) => setItem(i, { qty: Number(e.target.value) })} />
                <input className="inp" type="number" min={0} step="0.01" value={it.unitPriceEuro} onChange={(e) => setItem(i, { unitPriceEuro: e.target.value })} />
                <button type="button" onClick={() => setItems((xs) => xs.filter((_, idx) => idx !== i))} className="grid place-items-center px-2 text-neutral-400 hover:text-[color:var(--color-status-danger,#DC2626)]">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-1.5 flex items-center gap-3 pl-0.5">
                <select className="rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs" value={it.kind} onChange={(e) => setItem(i, { kind: e.target.value as QuoteItemKind })}>
                  {(["LABOUR", "MATERIAL", "OTHER"] as const).map((k) => <option key={k} value={k}>{KIND_LABEL[k]}</option>)}
                </select>
                <label className="flex items-center gap-1.5 text-xs text-neutral-600">
                  <input type="checkbox" checked={it.optional} onChange={(e) => setItem(i, { optional: e.target.checked })} />
                  Optioneel (meerwerk)
                </label>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={() => setItems((xs) => [...xs, { kind: "LABOUR", description: "", qty: 1, unitPriceEuro: "0.00", optional: false }])} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
          <Plus className="h-4 w-4" /> Regel toevoegen
        </button>
        <p className="mt-2 text-xs text-neutral-500">Basistotaal (excl. btw, zonder optionele regels): <strong>{euro(baseCents / 100)}</strong></p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Btw %"><input className="inp" type="number" min={0} max={100} value={vatRate} onChange={(e) => setVatRate(Number(e.target.value))} /></Field>
        <Field label="Richtprijs vanaf (€)"><input className="inp" type="number" min={0} step="1" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} /></Field>
        <Field label="Richtprijs tot (€)"><input className="inp" type="number" min={0} step="1" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} /></Field>
      </div>

      <Field label="Garantietekst"><textarea className="inp min-h-16" value={warranty} onChange={(e) => setWarranty(e.target.value)} /></Field>
      <Field label="Voorwaarden"><textarea className="inp min-h-16" value={terms} onChange={(e) => setTerms(e.target.value)} /></Field>

      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        Actief (verschijnt bij het maken van een nieuwe offerte)
      </label>

      <div className="flex items-center gap-3">
        <Button variant="accent" onClick={onSave} disabled={pending}>Template opslaan</Button>
        {msg && <span className={`text-sm ${msg.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{msg.text}</span>}
      </div>

      <style>{`.inp{height:2.75rem;width:100%;border:1px solid var(--color-neutral-200);border-radius:var(--radius-md);padding:0 .75rem;font-size:.875rem}textarea.inp{height:auto;padding:.5rem .75rem}`}</style>
    </div>
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
