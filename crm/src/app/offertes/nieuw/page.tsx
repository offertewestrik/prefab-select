"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { DEFAULT_BTW } from "@/lib/constants";
import { euroCent } from "@/lib/format";
import { berekenTotalen } from "@/lib/quote-utils";
import type { QuoteLine } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";

function leegRegel(): QuoteLine {
  return {
    id: Math.random().toString(36).slice(2, 9),
    omschrijving: "",
    aantal: 1,
    prijsPerStuk: 0,
    btwPercentage: DEFAULT_BTW,
  };
}

export default function NieuweOffertePage() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-slate-100" />}>
      <NieuweOfferteForm />
    </Suspense>
  );
}

function NieuweOfferteForm() {
  const mounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const leads = useCrm((s) => s.leads);
  const createQuote = useCrm((s) => s.createQuote);

  const [leadId, setLeadId] = useState(searchParams.get("lead") ?? "");
  const [regels, setRegels] = useState<QuoteLine[]>([leegRegel()]);
  const [korting, setKorting] = useState(0);
  const [notitie, setNotitie] = useState("");
  const [geldigTot, setGeldigTot] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().slice(0, 10);
  });

  function updateRegel(id: string, patch: Partial<QuoteLine>) {
    setRegels((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  const totalen = berekenTotalen(regels, korting);

  function opslaan() {
    if (!leadId || regels.every((r) => !r.omschrijving.trim())) return;
    const schoneRegels = regels.filter((r) => r.omschrijving.trim());
    const id = createQuote(
      leadId,
      schoneRegels,
      korting,
      notitie,
      new Date(geldigTot).toISOString(),
    );
    router.push(`/offertes/${id}`);
  }

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500";

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader titel="Nieuwe offerte" subtitel="Stel een offerte samen voor een klant" />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">Klant *</label>
              <select value={leadId} onChange={(e) => setLeadId(e.target.value)} className={inputCls}>
                <option value="">— Kies een lead —</option>
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>{l.naam} ({l.plaats ?? "—"})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">Geldig tot</label>
              <input type="date" value={geldigTot} onChange={(e) => setGeldigTot(e.target.value)} className={inputCls} />
            </div>
          </div>
        </div>

        {/* Regels */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Offerteregels</h3>
            <button onClick={() => setRegels((rs) => [...rs, leegRegel()])} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-200">
              <Plus className="h-4 w-4" /> Regel
            </button>
          </div>

          <div className="space-y-2">
            <div className="hidden grid-cols-12 gap-2 px-1 text-xs font-semibold uppercase text-slate-400 sm:grid">
              <div className="col-span-6">Omschrijving</div>
              <div className="col-span-1 text-right">Aantal</div>
              <div className="col-span-2 text-right">Prijs/stuk</div>
              <div className="col-span-1 text-right">Btw</div>
              <div className="col-span-2 text-right">Totaal</div>
            </div>
            {regels.map((r) => (
              <div key={r.id} className="grid grid-cols-12 items-center gap-2">
                <input
                  className="col-span-12 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 sm:col-span-6"
                  placeholder="Omschrijving"
                  value={r.omschrijving}
                  onChange={(e) => updateRegel(r.id, { omschrijving: e.target.value })}
                />
                <input
                  type="number"
                  className="col-span-3 rounded-lg border border-slate-200 px-2 py-2 text-right text-sm outline-none focus:border-brand-500 sm:col-span-1"
                  value={r.aantal}
                  onChange={(e) => updateRegel(r.id, { aantal: Number(e.target.value) || 0 })}
                />
                <input
                  type="number"
                  className="col-span-4 rounded-lg border border-slate-200 px-2 py-2 text-right text-sm outline-none focus:border-brand-500 sm:col-span-2"
                  value={r.prijsPerStuk}
                  onChange={(e) => updateRegel(r.id, { prijsPerStuk: Number(e.target.value) || 0 })}
                />
                <input
                  type="number"
                  className="col-span-3 rounded-lg border border-slate-200 px-2 py-2 text-right text-sm outline-none focus:border-brand-500 sm:col-span-1"
                  value={r.btwPercentage}
                  onChange={(e) => updateRegel(r.id, { btwPercentage: Number(e.target.value) || 0 })}
                />
                <div className="col-span-1 flex items-center justify-end gap-1 text-right text-sm font-semibold text-slate-700 sm:col-span-2">
                  <span className="hidden sm:inline">{euroCent(r.aantal * r.prijsPerStuk)}</span>
                  <button onClick={() => setRegels((rs) => rs.filter((x) => x.id !== r.id))} className="text-slate-300 hover:text-rose-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Totalen */}
          <div className="mt-5 flex flex-col items-end gap-1 border-t border-slate-100 pt-4 text-sm">
            <div className="flex w-64 justify-between text-slate-500">
              <span>Subtotaal</span><span>{euroCent(totalen.subtotaal)}</span>
            </div>
            <div className="flex w-64 items-center justify-between text-slate-500">
              <span>Korting</span>
              <input
                type="number"
                value={korting}
                onChange={(e) => setKorting(Number(e.target.value) || 0)}
                className="w-28 rounded-lg border border-slate-200 px-2 py-1 text-right text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div className="flex w-64 justify-between text-slate-500">
              <span>Btw</span><span>{euroCent(totalen.btw)}</span>
            </div>
            <div className="mt-1 flex w-64 justify-between border-t border-slate-100 pt-1 text-base font-black text-slate-900">
              <span>Totaal</span><span>{euroCent(totalen.totaal)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <label className="mb-1 block text-xs font-semibold text-slate-500">Notitie / voorwaarden</label>
          <textarea value={notitie} onChange={(e) => setNotitie(e.target.value)} rows={3} className={inputCls} placeholder="Bijv. levertijd, betalingsvoorwaarden…" />
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => router.back()} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Annuleren</button>
          <button
            onClick={opslaan}
            disabled={!leadId || regels.every((r) => !r.omschrijving.trim())}
            className="rounded-xl bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
          >
            Offerte opslaan
          </button>
        </div>
      </div>
    </div>
  );
}
