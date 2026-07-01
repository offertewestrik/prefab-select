"use client";

import { useMemo, useState } from "react";
import { FileText, Check } from "lucide-react";
import { Button } from "@repo/ui";
import { createQuoteFromTemplateAction } from "../server/actions";

export interface TemplateOption {
  id: string;
  title: string;
  categoryName: string;
  priceFromCents: number | null;
  priceToCents: number | null;
  itemCount: number;
}

const euro0 = (c: number) => `€ ${Math.round(c / 100).toLocaleString("nl-NL")}`;

export function QuoteCreateForm({ templates }: { templates: TemplateOption[] }) {
  const [templateId, setTemplateId] = useState<string>("");

  const groups = useMemo(() => {
    const m = new Map<string, TemplateOption[]>();
    for (const t of templates) {
      const k = t.categoryName || "Overig";
      (m.get(k) ?? m.set(k, []).get(k)!).push(t);
    }
    return [...m.entries()];
  }, [templates]);

  return (
    <form action={createQuoteFromTemplateAction} className="mt-4 space-y-8">
      {/* Stap 1: template kiezen */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-900">1. Kies een template</h2>
        <p className="mb-3 text-sm text-neutral-500">
          De template vult werkzaamheden, materialen en richtprijzen alvast in. Je past daarna alles zelf aan.
        </p>
        <input type="hidden" name="templateId" value={templateId} />

        {/* Leeg starten */}
        <button
          type="button"
          onClick={() => setTemplateId("")}
          className={`mb-4 flex w-full items-center gap-3 rounded-[var(--radius-lg)] border p-3 text-left ${templateId === "" ? "border-primary-500 bg-primary-50/50" : "border-neutral-200 bg-white"}`}
        >
          <span className={`grid h-8 w-8 place-items-center rounded-md ${templateId === "" ? "bg-primary-500 text-white" : "bg-neutral-100 text-neutral-500"}`}>
            {templateId === "" ? <Check className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
          </span>
          <span className="text-sm">
            <span className="font-medium text-neutral-900">Lege offerte</span>
            <span className="block text-neutral-500">Zelf regels toevoegen, zonder voorinvulling</span>
          </span>
        </button>

        <div className="space-y-5">
          {groups.map(([cat, items]) => (
            <div key={cat}>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">{cat}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                {items.map((t) => {
                  const sel = templateId === t.id;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setTemplateId(t.id)}
                      className={`flex items-start justify-between gap-2 rounded-[var(--radius-lg)] border p-3 text-left transition ${sel ? "border-primary-500 bg-primary-50/50" : "border-neutral-200 bg-white hover:border-neutral-300"}`}
                    >
                      <span className="text-sm">
                        <span className="font-medium text-neutral-900">{t.title}</span>
                        {(t.priceFromCents != null || t.priceToCents != null) && (
                          <span className="block text-neutral-500">
                            richtprijs {t.priceFromCents != null ? euro0(t.priceFromCents) : "?"}
                            {t.priceToCents != null ? ` – ${euro0(t.priceToCents)}` : ""}
                          </span>
                        )}
                      </span>
                      {sel && <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stap 2: klantgegevens */}
      <section>
        <h2 className="text-sm font-semibold text-neutral-900">2. Klantgegevens</h2>
        <p className="mb-3 text-sm text-neutral-500">Optioneel — je kunt dit ook later in de offerte invullen.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Input name="customerName" label="Naam klant" placeholder="Bijv. Jan Jansen" />
          <Input name="customerEmail" label="E-mailadres" type="email" placeholder="klant@voorbeeld.nl" />
          <Input name="customerPhone" label="Telefoon" placeholder="06 12345678" />
          <Input name="customerAddress" label="Adres" placeholder="Straat 1, 1234 AB Plaats" />
        </div>
      </section>

      <div className="flex items-center gap-3">
        <Button type="submit" variant="accent">Offerte aanmaken</Button>
        <span className="text-sm text-neutral-500">Je opent hierna de editor om te controleren en versturen.</span>
      </div>

      <style>{`.qcf-inp{height:2.75rem;width:100%;border:1px solid var(--color-neutral-200);border-radius:var(--radius-md);padding:0 .75rem;font-size:.875rem}`}</style>
    </form>
  );
}

function Input({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-neutral-900">{label}</span>
      <input name={name} type={type} placeholder={placeholder} className="qcf-inp" />
    </label>
  );
}
