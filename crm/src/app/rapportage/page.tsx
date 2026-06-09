"use client";

import { useMemo, useState } from "react";
import { FileDown, FileSpreadsheet, FileText, Calendar, Clock } from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChartCard } from "@/components/ui/ChartCard";
import { Badge } from "@/components/ui/Badge";
import { euro } from "@/lib/format";
import { quoteTotaal } from "@/lib/quote-utils";
import { getLeadbronnen, getOmzet, getMetaCampaigns, getMetaTotalen, KANAAL_LABEL } from "@/lib/analytics";
import type { RapportData } from "@/lib/pdf/RapportDocument";

type RapportType = "Dagelijks" | "Wekelijks" | "Maandelijks";

export default function RapportagePage() {
  const mounted = useMounted();
  const leads = useCrm((s) => s.leads);
  const quotes = useCrm((s) => s.quotes);

  const [type, setType] = useState<RapportType>("Wekelijks");
  const [bezig, setBezig] = useState(false);
  const [auto, setAuto] = useState<Record<RapportType, boolean>>({ Dagelijks: false, Wekelijks: true, Maandelijks: true });

  const rapport: RapportData = useMemo(() => {
    const nu = new Date();
    const dagen = type === "Dagelijks" ? 1 : type === "Wekelijks" ? 7 : 30;
    const start = new Date(nu.getTime() - dagen * 86400000);
    const periodeLeads = leads.filter((l) => new Date(l.aangemaaktOp) >= start);

    const openOffertes = quotes.filter((q) => ["concept", "verstuurd", "bekeken"].includes(q.status));
    const geaccepteerd = quotes.filter((q) => q.status === "geaccepteerd");
    const omzetInOfferte = openOffertes.reduce((s, q) => s + quoteTotaal(q), 0);
    const openLeads = leads.filter((l) => !["opdracht_afgerond", "offerte_afgewezen"].includes(l.stage));
    const verwacht = openLeads.reduce((s, l) => s + (l.waarde * l.kans) / 100, 0);
    const afgerond = leads.filter((l) => ["opdracht_afgerond", "offerte_afgewezen"].includes(l.stage));
    const gewonnen = leads.filter((l) => l.stage === "opdracht_afgerond");
    const conversie = afgerond.length ? Math.round((gewonnen.length / afgerond.length) * 100) : 0;

    const bronnen = getLeadbronnen();
    const omzet = getOmzet();
    const meta = getMetaTotalen(getMetaCampaigns());

    const periode =
      type === "Dagelijks"
        ? nu.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })
        : `${start.toLocaleDateString("nl-NL", { day: "numeric", month: "short" })} – ${nu.toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" })}`;

    return {
      type,
      periode,
      gegenereerdOp: nu.toISOString(),
      kpis: [
        { label: "Nieuwe leads", waarde: String(periodeLeads.length) },
        { label: "Open offertes", waarde: String(openOffertes.length) },
        { label: "Geaccepteerd", waarde: String(geaccepteerd.length) },
        { label: "Omzet in offerte", waarde: euro(omzetInOfferte) },
        { label: "Verwachte omzet", waarde: euro(verwacht) },
        { label: "Conversie", waarde: `${conversie}%` },
      ],
      leadbronnen: bronnen.map((b) => ({ kanaal: KANAAL_LABEL[b.kanaal], leads: b.leads, omzet: euro(b.omzet), conversie: `${b.conversie}%` })),
      omzetPerType: omzet.perType.map((o) => ({ type: o.type, omzet: euro(o.omzet) })),
      marketing: [
        { label: "Advertentiekosten", waarde: euro(meta.kosten) },
        { label: "Leads uit ads", waarde: String(meta.leads) },
        { label: "Gem. CPL", waarde: euro(meta.cpl) },
      ],
    };
  }, [type, leads, quotes]);

  async function exportPdf() {
    setBezig(true);
    try {
      const res = await fetch("/api/rapportage/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rapport),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      window.open(URL.createObjectURL(blob), "_blank");
    } catch {
      alert("PDF-export mislukt.");
    } finally {
      setBezig(false);
    }
  }

  function exportExcel() {
    const lijnen: string[] = [];
    lijnen.push(`${rapport.type} managementrapport;${rapport.periode}`);
    lijnen.push("");
    lijnen.push("Kerncijfers");
    rapport.kpis.forEach((k) => lijnen.push(`${k.label};${k.waarde}`));
    lijnen.push("");
    lijnen.push("Leadbronnen;Leads;Omzet;Conversie");
    rapport.leadbronnen.forEach((b) => lijnen.push(`${b.kanaal};${b.leads};${b.omzet};${b.conversie}`));
    lijnen.push("");
    lijnen.push("Omzet per projecttype;Omzet");
    rapport.omzetPerType.forEach((o) => lijnen.push(`${o.type};${o.omzet}`));
    lijnen.push("");
    lijnen.push("Marketing");
    rapport.marketing.forEach((m) => lijnen.push(`${m.label};${m.waarde}`));

    const csv = "﻿" + lijnen.join("\n"); // BOM voor Excel + ; scheidingsteken
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `rapport-${rapport.type.toLowerCase()}.csv`;
    a.click();
  }

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader titel="Rapportages" subtitel="Genereer en exporteer management­rapporten" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Generator */}
        <div className="lg:col-span-2 space-y-6">
          <ChartCard titel="Rapport genereren" subtitel="Kies een periode en exporteer">
            <div className="mb-4 flex flex-wrap gap-2">
              {(["Dagelijks", "Wekelijks", "Maandelijks"] as RapportType[]).map((t) => (
                <button key={t} onClick={() => setType(t)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${type === t ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {t}
                </button>
              ))}
              <div className="ml-auto flex gap-2">
                <button onClick={exportExcel} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <FileSpreadsheet className="h-4 w-4" /> Excel
                </button>
                <button onClick={exportPdf} disabled={bezig} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">
                  <FileDown className="h-4 w-4" /> {bezig ? "Bezig…" : "PDF"}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="rounded-xl border border-slate-100 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-bold text-slate-900">{rapport.type} rapport</h4>
                <span className="text-xs text-slate-400">{rapport.periode}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {rapport.kpis.map((k) => (
                  <div key={k.label} className="rounded-lg bg-slate-50 p-3">
                    <p className="text-[11px] uppercase text-slate-400">{k.label}</p>
                    <p className="mt-1 text-lg font-black text-slate-900">{k.waarde}</p>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          <ChartCard titel="Leadbronnen in dit rapport">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-400">
                <tr><th className="pb-2 font-semibold">Kanaal</th><th className="pb-2 text-right font-semibold">Leads</th><th className="pb-2 text-right font-semibold">Omzet</th><th className="pb-2 text-right font-semibold">Conversie</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rapport.leadbronnen.map((b) => (
                  <tr key={b.kanaal}><td className="py-2 text-slate-700">{b.kanaal}</td><td className="py-2 text-right text-slate-600">{b.leads}</td><td className="py-2 text-right font-semibold text-slate-800">{b.omzet}</td><td className="py-2 text-right text-slate-600">{b.conversie}</td></tr>
                ))}
              </tbody>
            </table>
          </ChartCard>
        </div>

        {/* Automatische rapporten */}
        <div className="space-y-6">
          <ChartCard titel="Automatische rapporten" subtitel="Per e-mail naar de directie">
            <ul className="space-y-3">
              {(["Dagelijks", "Wekelijks", "Maandelijks"] as RapportType[]).map((t) => (
                <li key={t} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                  <div className="flex items-center gap-2">
                    {t === "Dagelijks" ? <Clock className="h-4 w-4 text-slate-400" /> : <Calendar className="h-4 w-4 text-slate-400" />}
                    <span className="text-sm font-medium text-slate-700">{t}</span>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" checked={auto[t]} onChange={() => setAuto((s) => ({ ...s, [t]: !s[t] }))} className="peer sr-only" />
                    <div className="h-5 w-9 rounded-full bg-slate-200 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:bg-brand-600 peer-checked:after:translate-x-4" />
                  </label>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-slate-400">In het prototype worden deze niet echt verstuurd. Via Resend (fase 2) is dit eenvoudig te activeren.</p>
          </ChartCard>

          <ChartCard titel="Recente rapporten">
            <ul className="space-y-2 text-sm">
              {[
                { naam: "Weekrapport wk 23", type: "Wekelijks" },
                { naam: "Maandrapport mei", type: "Maandelijks" },
                { naam: "Weekrapport wk 22", type: "Wekelijks" },
              ].map((r) => (
                <li key={r.naam} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                  <FileText className="h-4 w-4 text-brand-600" />
                  <span className="flex-1 font-medium text-slate-700">{r.naam}</span>
                  <Badge>{r.type}</Badge>
                </li>
              ))}
            </ul>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
