"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { Badge } from "@/components/ui/Badge";
import { euro } from "@/lib/format";
import {
  getMetaCampaigns, getMetaTotalen, getGa, getLeadbronnen, getConfigurator,
  KANAAL_LABEL, CHART_KLEUREN, type MetaCampaign,
} from "@/lib/analytics";
import { Euro, Users, MousePointerClick, Eye } from "lucide-react";

const TABS = ["Meta Ads", "Google Analytics", "Leadbronnen", "Configurator"] as const;
type Tab = (typeof TABS)[number];

export default function MarketingPage() {
  const mounted = useMounted();
  const [tab, setTab] = useState<Tab>("Meta Ads");

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader titel="Marketing dashboard" subtitel="Advertenties, websiteverkeer, leadbronnen en configurator" />

      <div className="mb-6 flex flex-wrap gap-1 rounded-xl border border-slate-100 bg-white p-1 shadow-soft">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${tab === t ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Meta Ads" && <MetaTab />}
      {tab === "Google Analytics" && <GaTab />}
      {tab === "Leadbronnen" && <LeadbronTab />}
      {tab === "Configurator" && <ConfiguratorTab />}

      <p className="mt-6 text-center text-xs text-slate-400">
        Alle cijfers zijn dummy data. Koppel Meta Marketing API, Google Analytics 4 &amp; Search Console via &apos;Integraties&apos; voor live data.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
function MetaTab() {
  const camps = useMemo(() => getMetaCampaigns(), []);
  const tot = useMemo(() => getMetaTotalen(camps), [camps]);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Advertentiekosten" waarde={euro(tot.kosten)} icon={Euro} accent="amber" />
        <StatCard label="Leads" waarde={String(tot.leads)} icon={Users} accent="brand" />
        <StatCard label="Gem. CPL" waarde={euro(tot.cpl)} icon={Euro} accent="rose" />
        <StatCard label="Bereik" waarde={tot.bereik.toLocaleString("nl-NL")} icon={Eye} accent="brand" />
        <StatCard label="Gem. CTR" waarde={`${tot.ctr}%`} icon={MousePointerClick} accent="emerald" />
      </div>

      <div className="mt-6">
        <ChartCard titel="Leads per campagne">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={camps.map((c) => ({ naam: c.projecttype, leads: c.leads, cpl: c.cpl }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="naam" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Bar dataKey="leads" name="Leads" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="font-bold text-slate-900">Campagnes · advertentiegroepen · advertenties</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/60 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-6 py-3 font-semibold">Campagne</th>
              <th className="px-4 py-3 text-right font-semibold">Kosten</th>
              <th className="px-4 py-3 text-right font-semibold">Bereik</th>
              <th className="px-4 py-3 text-right font-semibold">Klikken</th>
              <th className="px-4 py-3 text-right font-semibold">Leads</th>
              <th className="px-4 py-3 text-right font-semibold">CPL</th>
              <th className="px-4 py-3 text-right font-semibold">CTR</th>
              <th className="px-6 py-3 text-right font-semibold">Conv.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {camps.map((c) => (
              <CampagneRijen key={c.id} c={c} open={open === c.id} onToggle={() => setOpen(open === c.id ? null : c.id)} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CampagneRijen({ c, open, onToggle }: { c: MetaCampaign; open: boolean; onToggle: () => void }) {
  return (
    <>
      <tr className="cursor-pointer transition hover:bg-slate-50/60" onClick={onToggle}>
        <td className="px-6 py-3 font-semibold text-slate-800">
          <span className="inline-flex items-center gap-1.5">
            {open ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />}
            {c.naam}
          </span>
        </td>
        <td className="px-4 py-3 text-right text-slate-600">{euro(c.kosten)}</td>
        <td className="px-4 py-3 text-right text-slate-600">{c.bereik.toLocaleString("nl-NL")}</td>
        <td className="px-4 py-3 text-right text-slate-600">{c.klikken.toLocaleString("nl-NL")}</td>
        <td className="px-4 py-3 text-right font-semibold text-slate-800">{c.leads}</td>
        <td className="px-4 py-3 text-right text-slate-600">{euro(c.cpl)}</td>
        <td className="px-4 py-3 text-right text-slate-600">{c.ctr}%</td>
        <td className="px-6 py-3 text-right text-slate-600">{c.conversie}%</td>
      </tr>
      {open &&
        c.adsets.map((g) => (
          <tr key={g.naam} className="bg-slate-50/40">
            <td colSpan={8} className="px-6 py-2">
              <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">Advertentiegroep: {g.naam}</p>
              <div className="space-y-1">
                {g.ads.map((ad) => (
                  <div key={ad.naam} className="flex items-center justify-between rounded-lg bg-white px-3 py-1.5 text-xs text-slate-600">
                    <span className="font-medium text-slate-700">{ad.naam}</span>
                    <span className="flex gap-4">
                      <span>{euro(ad.kosten)}</span>
                      <span>{ad.bereik.toLocaleString("nl-NL")} bereik</span>
                      <span>{ad.klikken} klikken</span>
                      <span className="font-semibold text-slate-800">{ad.leads} leads</span>
                    </span>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        ))}
    </>
  );
}

// ---------------------------------------------------------------------------
function GaTab() {
  const [dagen, setDagen] = useState(30);
  const ga = useMemo(() => getGa(dagen), [dagen]);

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-medium text-slate-500">Periode:</span>
        {[7, 30, 90].map((d) => (
          <button key={d} onClick={() => setDagen(d)} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${dagen === d ? "bg-brand-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
            {d} dagen
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard label="Bezoekers" waarde={ga.kpis.bezoekers.toLocaleString("nl-NL")} icon={Users} accent="brand" />
        <StatCard label="Sessies" waarde={ga.kpis.sessies.toLocaleString("nl-NL")} icon={MousePointerClick} accent="brand" />
        <StatCard label="Paginaweergaven" waarde={ga.kpis.paginaweergaven.toLocaleString("nl-NL")} icon={Eye} accent="brand" />
        <StatCard label="Conversies" waarde={ga.kpis.conversies.toLocaleString("nl-NL")} icon={Euro} accent="emerald" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard titel="Bezoekers & sessies" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ga.reeks}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="datum" stroke="#94a3b8" fontSize={10} interval={Math.floor(ga.reeks.length / 8)} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bezoekers" name="Bezoekers" stroke="#2563eb" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="sessies" name="Sessies" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titel="Verkeersbronnen">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={ga.bronnen} dataKey="sessies" nameKey="bron" cx="50%" cy="50%" outerRadius={90} label={(e: any) => `${e.aandeel}%`}>
                {ga.bronnen.map((_, i) => (
                  <Cell key={i} fill={CHART_KLEUREN[i % CHART_KLEUREN.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6">
        <ChartCard titel="Meest bezochte pagina's">
          <div className="space-y-2">
            {ga.topPaginas.map((p) => {
              const max = ga.topPaginas[0].weergaven;
              return (
                <div key={p.pad} className="flex items-center gap-3">
                  <span className="w-48 shrink-0 truncate text-sm font-medium text-slate-700">{p.pad}</span>
                  <div className="h-5 flex-1 overflow-hidden rounded bg-slate-50">
                    <div className="h-full rounded bg-brand-500/80" style={{ width: `${(p.weergaven / max) * 100}%` }} />
                  </div>
                  <span className="w-16 shrink-0 text-right text-sm font-semibold text-slate-700">{p.weergaven.toLocaleString("nl-NL")}</span>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
function LeadbronTab() {
  const bronnen = useMemo(() => getLeadbronnen(), []);
  const data = bronnen.map((b) => ({ ...b, naam: KANAAL_LABEL[b.kanaal] }));

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard titel="Omzet per kanaal">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
              <YAxis type="category" dataKey="naam" width={90} stroke="#94a3b8" fontSize={11} />
              <Tooltip formatter={(v: number) => euro(v)} />
              <Bar dataKey="omzet" fill="#10b981" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard titel="Conversie per kanaal">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="naam" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Bar dataKey="conversie" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/60 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-6 py-3 font-semibold">Kanaal</th>
              <th className="px-4 py-3 text-right font-semibold">Leads</th>
              <th className="px-4 py-3 text-right font-semibold">Omzet</th>
              <th className="px-4 py-3 text-right font-semibold">Conversie</th>
              <th className="px-6 py-3 text-right font-semibold">Gem. projectwaarde</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((b) => (
              <tr key={b.kanaal} className="hover:bg-slate-50/60">
                <td className="px-6 py-3 font-medium text-slate-700">{b.naam}</td>
                <td className="px-4 py-3 text-right text-slate-600">{b.leads}</td>
                <td className="px-4 py-3 text-right font-semibold text-slate-800">{euro(b.omzet)}</td>
                <td className="px-4 py-3 text-right text-slate-600">{b.conversie}%</td>
                <td className="px-6 py-3 text-right text-slate-600">{euro(b.gemWaarde)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
function ConfiguratorTab() {
  const c = useMemo(() => getConfigurator(), []);
  const opties: { titel: string; data: { optie: string; aantal: number }[] }[] = [
    { titel: "Gevelbekleding", data: c.populair.gevelbekleding },
    { titel: "Kozijnen", data: c.populair.kozijnen },
    { titel: "Dakafwerking", data: c.populair.dakafwerking },
    { titel: "Afmetingen", data: c.populair.afmetingen },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Gestarte configuraties" waarde={c.gestart.toLocaleString("nl-NL")} icon={MousePointerClick} accent="brand" />
        <StatCard label="Voltooide configuraties" waarde={c.voltooid.toLocaleString("nl-NL")} icon={Users} accent="emerald" />
        <StatCard label="Conversieratio" waarde={`${c.conversie}%`} icon={Euro} accent="amber" />
      </div>

      <div className="mt-6">
        <ChartCard titel="Configurator-trechter">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={c.trechter} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" stroke="#94a3b8" fontSize={11} />
              <YAxis type="category" dataKey="stap" width={110} stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Bar dataKey="aantal" fill="#2563eb" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {opties.map((o) => {
          const max = Math.max(...o.data.map((x) => x.aantal));
          return (
            <ChartCard key={o.titel} titel={`Populairste: ${o.titel}`}>
              <div className="space-y-2">
                {o.data.map((x) => (
                  <div key={x.optie} className="flex items-center gap-3">
                    <span className="w-40 shrink-0 truncate text-sm text-slate-600">{x.optie}</span>
                    <div className="h-5 flex-1 overflow-hidden rounded bg-slate-50">
                      <div className="h-full rounded bg-brand-500/80" style={{ width: `${(x.aantal / max) * 100}%` }} />
                    </div>
                    <span className="w-10 shrink-0 text-right text-sm font-semibold text-slate-700">{x.aantal}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          );
        })}
      </div>
    </div>
  );
}
