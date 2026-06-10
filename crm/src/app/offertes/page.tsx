"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { QUOTE_STATUS_META } from "@/lib/constants";
import { euro, datum } from "@/lib/format";
import { quoteTotaal } from "@/lib/quote-utils";
import { Plus } from "lucide-react";
import type { QuoteStatus } from "@/lib/types";

export default function OffertesPage() {
  const mounted = useMounted();
  const quotes = useCrm((s) => s.quotes);
  const leads = useCrm((s) => s.leads);
  const [filter, setFilter] = useState<QuoteStatus | "alle">("alle");

  const gefilterd = useMemo(
    () =>
      quotes
        .filter((q) => (filter === "alle" ? true : q.status === filter))
        .sort((a, b) => +new Date(b.aangemaaktOp) - +new Date(a.aangemaaktOp)),
    [quotes, filter],
  );

  const totaalOpenstaand = useMemo(
    () =>
      quotes
        .filter((q) => ["verstuurd", "bekeken"].includes(q.status))
        .reduce((s, q) => s + quoteTotaal(q), 0),
    [quotes],
  );

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader
        titel="Offertes"
        subtitel={`${euro(totaalOpenstaand)} aan openstaande offertes`}
        actie={
          <Link href="/offertes/nieuw" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            <Plus className="h-4 w-4" /> Nieuwe offerte
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={() => setFilter("alle")} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${filter === "alle" ? "bg-brand-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
          Alle
        </button>
        {(Object.keys(QUOTE_STATUS_META) as QuoteStatus[]).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${filter === s ? "bg-brand-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
            {QUOTE_STATUS_META[s].label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/60 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3 font-semibold">Nummer</th>
              <th className="px-4 py-3 font-semibold">Klant</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">Geldig tot</th>
              <th className="px-4 py-3 text-right font-semibold">Totaal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {gefilterd.map((q) => {
              const lead = leads.find((l) => l.id === q.leadId);
              return (
                <tr key={q.id} className="transition hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <Link href={`/offertes/${q.id}`} className="font-semibold text-brand-600 hover:text-brand-700">
                      {q.nummer}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{lead?.naam ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Badge className={QUOTE_STATUS_META[q.status].kleur}>{QUOTE_STATUS_META[q.status].label}</Badge>
                  </td>
                  <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">{datum(q.geldigTot)}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">{euro(quoteTotaal(q))}</td>
                </tr>
              );
            })}
            {gefilterd.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-slate-400">Geen offertes.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
