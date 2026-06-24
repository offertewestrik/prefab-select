"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";
import { INVOICE_STATUS_META } from "@/lib/constants";
import { euro, datum } from "@/lib/format";
import { invoiceTotaal, openstaand, effectieveStatus } from "@/lib/invoice-utils";
import { Euro, AlertCircle, CheckCircle2 } from "lucide-react";
import type { InvoiceStatus } from "@/lib/types";

export default function FacturenPage() {
  const mounted = useMounted();
  const invoices = useCrm((s) => s.invoices);
  const payments = useCrm((s) => s.payments);
  const leads = useCrm((s) => s.leads);
  const [filter, setFilter] = useState<InvoiceStatus | "alle">("alle");

  const verrijkt = useMemo(
    () =>
      invoices
        .map((i) => ({ inv: i, status: effectieveStatus(i, payments), totaal: invoiceTotaal(i), open: openstaand(i, payments) }))
        .sort((a, b) => +new Date(b.inv.aangemaaktOp) - +new Date(a.inv.aangemaaktOp)),
    [invoices, payments],
  );

  const stats = useMemo(() => {
    let openTot = 0, betaaldTot = 0, teLaatTot = 0;
    verrijkt.forEach((v) => {
      betaaldTot += v.totaal - v.open;
      openTot += v.open;
      if (v.status === "te_laat") teLaatTot += v.open;
    });
    return { openTot, betaaldTot, teLaatTot };
  }, [verrijkt]);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  const zichtbaar = verrijkt.filter((v) => (filter === "alle" ? true : v.status === filter));

  return (
    <div>
      <PageHeader
        titel="Facturen"
        subtitel="Maak, verstuur en volg facturen en betalingen"
        actie={
          <Link href="/facturen/nieuw" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            <Plus className="h-4 w-4" /> Nieuwe factuur
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Openstaand" waarde={euro(stats.openTot)} icon={Euro} accent="amber" />
        <StatCard label="Betaald" waarde={euro(stats.betaaldTot)} icon={CheckCircle2} accent="emerald" />
        <StatCard label="Te laat" waarde={euro(stats.teLaatTot)} icon={AlertCircle} accent="rose" />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={() => setFilter("alle")} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${filter === "alle" ? "bg-brand-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>Alle</button>
        {(Object.keys(INVOICE_STATUS_META) as InvoiceStatus[]).map((sKey) => (
          <button key={sKey} onClick={() => setFilter(sKey)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${filter === sKey ? "bg-brand-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
            {INVOICE_STATUS_META[sKey].label}
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
              <th className="hidden px-4 py-3 font-semibold sm:table-cell">Vervaldatum</th>
              <th className="px-4 py-3 text-right font-semibold">Bedrag</th>
              <th className="px-4 py-3 text-right font-semibold">Openstaand</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {zichtbaar.map(({ inv, status, totaal, open }) => {
              const lead = leads.find((l) => l.id === inv.leadId);
              return (
                <tr key={inv.id} className="transition hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <Link href={`/facturen/${inv.id}`} className="font-semibold text-brand-600 hover:text-brand-700">{inv.nummer}</Link>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{lead?.naam ?? "—"}</td>
                  <td className="px-4 py-3"><Badge className={INVOICE_STATUS_META[status].kleur}>{INVOICE_STATUS_META[status].label}</Badge></td>
                  <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">{datum(inv.vervaldatum)}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">{euro(totaal)}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{open > 0 ? euro(open) : "—"}</td>
                </tr>
              );
            })}
            {zichtbaar.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">Geen facturen.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
