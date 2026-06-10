"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { SOURCE_LABEL, STAGE_META, STAGE_ORDER } from "@/lib/constants";
import { euro } from "@/lib/format";
import {
  haalGaVerkeer,
  haalMetaCampagnes,
  type GaDagpunt,
  type GaKanaal,
  type MetaCampagne,
} from "@/lib/integrations";
import { Euro, Users, MousePointerClick, TrendingUp } from "lucide-react";

const KLEUREN = ["#2563eb", "#7c3aed", "#0891b2", "#f59e0b", "#10b981", "#f43f5e"];

export default function RapportagePage() {
  const mounted = useMounted();
  const leads = useCrm((s) => s.leads);

  const [meta, setMeta] = useState<MetaCampagne[]>([]);
  const [ga, setGa] = useState<{ reeks: GaDagpunt[]; kanalen: GaKanaal[]; totaalBezoekers: number; totaalConversies: number } | null>(null);

  useEffect(() => {
    haalMetaCampagnes().then(setMeta);
    haalGaVerkeer().then(setGa);
  }, []);

  const funnel = useMemo(
    () =>
      STAGE_ORDER.filter((s) => s !== "verloren").map((stage) => ({
        naam: STAGE_META[stage].label,
        aantal: leads.filter((l) => l.stage === stage).length,
      })),
    [leads],
  );

  const perBron = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => map.set(l.source, (map.get(l.source) ?? 0) + 1));
    return Array.from(map.entries()).map(([source, aantal]) => ({
      naam: SOURCE_LABEL[source as keyof typeof SOURCE_LABEL],
      aantal,
    }));
  }, [leads]);

  const omzet = useMemo(() => {
    const gewonnen = leads.filter((l) => l.stage === "gewonnen");
    const pipeline = leads.filter((l) => !["gewonnen", "verloren"].includes(l.stage));
    return {
      gewonnen: gewonnen.reduce((s, l) => s + l.waarde, 0),
      pipeline: pipeline.reduce((s, l) => s + l.waarde, 0),
      metaLeads: meta.reduce((s, c) => s + c.leads, 0),
      metaBesteed: meta.reduce((s, c) => s + c.besteed, 0),
    };
  }, [leads, meta]);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader titel="Rapportage" subtitel="Prestaties van leads, marketing en website" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Gewonnen omzet" waarde={euro(omzet.gewonnen)} icon={Euro} accent="emerald" trend={{ waarde: "+12%", positief: true }} />
        <StatCard label="Pijplijnwaarde" waarde={euro(omzet.pipeline)} icon={TrendingUp} accent="brand" />
        <StatCard label="Meta Ads leads" waarde={String(omzet.metaLeads)} icon={Users} sub={`${euro(omzet.metaBesteed)} besteed`} accent="amber" />
        <StatCard label="Website bezoekers" waarde={ga ? ga.totaalBezoekers.toLocaleString("nl-NL") : "—"} icon={MousePointerClick} sub={ga ? `${ga.totaalConversies} conversies` : ""} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Funnel */}
        <ChartCard titel="Pijplijn-funnel (aantal leads)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={funnel} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" allowDecimals={false} stroke="#94a3b8" fontSize={11} />
              <YAxis type="category" dataKey="naam" width={120} stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Bar dataKey="aantal" fill="#2563eb" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bron */}
        <ChartCard titel="Leads per bron">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={perBron} dataKey="aantal" nameKey="naam" cx="50%" cy="50%" outerRadius={95} label={(e: any) => e.naam}>
                {perBron.map((_, i) => (
                  <Cell key={i} fill={KLEUREN[i % KLEUREN.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* GA verkeer */}
        <ChartCard titel="Websiteverkeer (Google Analytics — 14 dagen)">
          {ga && (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={ga.reeks}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="datum" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="bezoekers" name="Bezoekers" stroke="#2563eb" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="conversies" name="Conversies" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Meta campagnes */}
        <ChartCard titel="Meta Ads — leads per campagne">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={meta.map((c) => ({ naam: c.naam.split(" — ")[0], leads: c.leads, cpl: c.cpl }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="naam" stroke="#94a3b8" fontSize={10} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Bar dataKey="leads" name="Leads" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Meta tabel */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="font-bold text-slate-900">Meta Ads campagnedetails</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/60 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-6 py-3 font-semibold">Campagne</th>
              <th className="px-4 py-3 text-right font-semibold">Impressies</th>
              <th className="px-4 py-3 text-right font-semibold">Klikken</th>
              <th className="px-4 py-3 text-right font-semibold">Besteed</th>
              <th className="px-4 py-3 text-right font-semibold">Leads</th>
              <th className="px-6 py-3 text-right font-semibold">CPL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {meta.map((c) => (
              <tr key={c.naam} className="hover:bg-slate-50/60">
                <td className="px-6 py-3 font-medium text-slate-700">{c.naam}</td>
                <td className="px-4 py-3 text-right text-slate-600">{c.impressies.toLocaleString("nl-NL")}</td>
                <td className="px-4 py-3 text-right text-slate-600">{c.klikken.toLocaleString("nl-NL")}</td>
                <td className="px-4 py-3 text-right text-slate-600">{euro(c.besteed)}</td>
                <td className="px-4 py-3 text-right font-semibold text-slate-800">{c.leads}</td>
                <td className="px-6 py-3 text-right font-semibold text-slate-800">{euro(c.cpl)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-center text-xs text-slate-400">
        Marketing- en analytics-cijfers zijn dummy data. Koppel Meta &amp; Google Analytics via &apos;Integraties&apos; voor live data.
      </p>
    </div>
  );
}

function ChartCard({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
      <h3 className="mb-4 font-bold text-slate-900">{titel}</h3>
      {children}
    </div>
  );
}
