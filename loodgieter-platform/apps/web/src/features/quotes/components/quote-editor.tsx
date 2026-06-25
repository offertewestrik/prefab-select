"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@repo/ui";
import { computeTotals } from "../server/service";
import { saveQuoteAction, sendQuoteAction } from "../server/actions";
import { QuotePreview } from "./quote-preview";
import type { LineItem } from "../schema";

interface EditorLine {
  description: string;
  qty: number;
  unitPriceEuro: string;
}

export function QuoteEditor({
  quoteId,
  number,
  status,
  company,
  customer,
  initial,
}: {
  quoteId: string;
  number: string;
  status: string;
  company: { name: string; email?: string | null; phone?: string | null };
  customer: { name: string; city?: string | null; street?: string | null; postcode?: string | null };
  initial: {
    title: string;
    introText: string;
    lineItems: LineItem[];
    vatRate: number;
    validUntil: string;
    terms: string;
    notes: string;
  };
}) {
  const router = useRouter();
  const readOnly = status !== "DRAFT";
  const [title, setTitle] = useState(initial.title);
  const [introText, setIntro] = useState(initial.introText);
  const [vatRate, setVatRate] = useState(initial.vatRate);
  const [validUntil, setValidUntil] = useState(initial.validUntil);
  const [terms, setTerms] = useState(initial.terms);
  const [notes, setNotes] = useState(initial.notes);
  const [lines, setLines] = useState<EditorLine[]>(
    initial.lineItems.length
      ? initial.lineItems.map((li) => ({ description: li.description, qty: li.qty, unitPriceEuro: (li.unitPriceCents / 100).toFixed(2) }))
      : [{ description: "", qty: 1, unitPriceEuro: "0.00" }],
  );
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  const lineItems: LineItem[] = useMemo(
    () =>
      lines
        .filter((l) => l.description.trim())
        .map((l) => ({ description: l.description.trim(), qty: Number(l.qty) || 0, unitPriceCents: Math.round((parseFloat(l.unitPriceEuro) || 0) * 100) })),
    [lines],
  );
  const totals = useMemo(() => computeTotals(lineItems, vatRate), [lineItems, vatRate]);

  function payload() {
    return { title, introText, lineItems, vatRate, validUntil: validUntil || null, terms, notes };
  }
  function fd() {
    const f = new FormData();
    f.set("payload", JSON.stringify(payload()));
    return f;
  }
  function onSave() {
    start(async () => {
      const r = await saveQuoteAction(quoteId, {}, fd());
      setMsg({ ok: !!r.ok, text: r.message ?? "" });
    });
  }
  function onSend() {
    start(async () => {
      await saveQuoteAction(quoteId, {}, fd());
      const r = await sendQuoteAction(quoteId, {}, new FormData());
      setMsg({ ok: !!r.ok, text: r.message ?? "" });
      if (r.ok) router.refresh();
    });
  }

  const setLine = (i: number, patch: Partial<EditorLine>) =>
    setLines((ls) => ls.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Formulier */}
      <div className="space-y-4">
        {readOnly && (
          <div className="rounded-[var(--radius-md)] bg-neutral-100 p-3 text-sm text-neutral-600">
            Status: <strong>{status}</strong> — een verstuurde offerte kan niet meer worden bewerkt.
          </div>
        )}
        <Field label="Titel">
          <input className="inp" value={title} disabled={readOnly} onChange={(e) => setTitle(e.target.value)} placeholder="Bijv. Vervangen CV-ketel" />
        </Field>
        <Field label="Introtekst">
          <textarea className="inp min-h-20" value={introText} disabled={readOnly} onChange={(e) => setIntro(e.target.value)} />
        </Field>

        <div>
          <div className="mb-1 text-sm font-medium text-neutral-900">Werkzaamheden / regels</div>
          <div className="space-y-2">
            {lines.map((l, i) => (
              <div key={i} className="grid grid-cols-[1fr_70px_100px_auto] gap-2">
                <input className="inp" placeholder="Omschrijving" value={l.description} disabled={readOnly} onChange={(e) => setLine(i, { description: e.target.value })} />
                <input className="inp" type="number" min={0} step="0.5" value={l.qty} disabled={readOnly} onChange={(e) => setLine(i, { qty: Number(e.target.value) })} />
                <input className="inp" type="number" min={0} step="0.01" value={l.unitPriceEuro} disabled={readOnly} onChange={(e) => setLine(i, { unitPriceEuro: e.target.value })} />
                {!readOnly && (
                  <button type="button" onClick={() => setLines((ls) => ls.filter((_, idx) => idx !== i))} className="grid place-items-center px-2 text-neutral-400 hover:text-[color:var(--color-status-danger,#DC2626)]">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {!readOnly && (
            <button type="button" onClick={() => setLines((ls) => [...ls, { description: "", qty: 1, unitPriceEuro: "0.00" }])} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
              <Plus className="h-4 w-4" /> Regel toevoegen
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Btw %">
            <input className="inp" type="number" min={0} max={100} value={vatRate} disabled={readOnly} onChange={(e) => setVatRate(Number(e.target.value))} />
          </Field>
          <Field label="Geldig tot">
            <input className="inp" type="date" value={validUntil} disabled={readOnly} onChange={(e) => setValidUntil(e.target.value)} />
          </Field>
        </div>
        <Field label="Voorwaarden">
          <textarea className="inp min-h-16" value={terms} disabled={readOnly} onChange={(e) => setTerms(e.target.value)} />
        </Field>
        <Field label="Interne notities (niet zichtbaar voor klant)">
          <textarea className="inp min-h-16" value={notes} disabled={readOnly} onChange={(e) => setNotes(e.target.value)} />
        </Field>

        {!readOnly && (
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onSave} disabled={pending}>Concept opslaan</Button>
            <Button variant="accent" onClick={onSend} disabled={pending}>Versturen naar klant</Button>
          </div>
        )}
        {msg && <p className={`text-sm ${msg.ok ? "text-success-500" : "text-[color:var(--color-status-danger,#DC2626)]"}`}>{msg.text}</p>}
      </div>

      {/* Live preview */}
      <div>
        <div className="mb-2 text-sm font-medium text-neutral-500">Voorbeeld</div>
        <QuotePreview
          data={{
            number, title, introText, status,
            company, customer, lineItems,
            subtotalCents: totals.subtotalCents, vatRate, vatCents: totals.vatCents, totalCents: totals.totalCents,
            validUntil: validUntil || null, terms,
          }}
        />
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
