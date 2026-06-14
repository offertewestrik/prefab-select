"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart, Bar,
  ComposedChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { euro } from "@/lib/format";
import { getOmzet, CHART_KLEUREN } from "@/lib/analytics";
import { Euro, TrendingUp, Calendar } from "lucide-react";

export default function OmzetPage() {
  const mounted = useMounted();
  const o = useMemo(() => getOmzet(), []);

  const totaalJaar = useMemo(() => o.perMaand.reduce((s, m) => s + m.omzet, 0), [o]);
  const gemMaand = Math.round(totaalJaar / 12);
  const besteMaand = useMemo(() => o.perMaand.reduce((a, b) => (b.omzet > a.omzet ? b : a)), [o]);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader titel="Omzet dashboard" subtitel="Omzet per maand, projecttype, regio en medewerker" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard label="Omzet (12 mnd)" waarde={euro(totaalJaar)} icon={Euro} accent="emerald" trend={{ waarde: "+14% j-o-j", positief: true }} />
        <StatCard label="Gemiddeld per maand" waarde={euro(gemMaand)} icon={TrendingUp} accent="brand" />
        <StatCard label="Beste maand" waarde={euro(besteMaand.omzet)} icon={Calendar} accent="amber" sub={besteMaand.maand} />
      </div>

      <div className="mt-6">
        <ChartCard titel="Omzet per maand" subtitel="Werkelijk vs. doel">
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={o.perMaand}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="maand" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v: number) => euro(v)} />
              <Legend />
              <Bar dataKey="omzet" name="Omzet" fill="#2563eb" radius={[6, 6, 0, 0]} />
              <Line dataKey="doel" name="Doel" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard titel="Omzet per projecttype">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={o.perType} dataKey="omzet" nameKey="type" cx="50%" cy="50%" outerRadius={100} label={(e: any) => e.type}>
                {o.perType.map((_, i) => (
                  <Cell key={i} fill={CHART_KLEUREN[i % CHART_KLEUREN.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => euro(v)} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titel="Omzet per regio">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={o.perRegio} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
              <YAxis type="category" dataKey="regio" width={100} stroke="#94a3b8" fontSize={11} />
              <Tooltip formatter={(v: number) => euro(v)} />
              <Bar dataKey="omzet" fill="#0891b2" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6">
        <ChartCard titel="Omzet per medewerker">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={o.perMedewerker}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="naam" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v: number) => euro(v)} />
              <Bar dataKey="omzet" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
