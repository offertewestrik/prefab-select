"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart, Bar,
  FunnelChart, Funnel, LabelList,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { euro } from "@/lib/format";
import { getKpis, CHART_KLEUREN } from "@/lib/analytics";
import { Euro, CalendarCheck, FileText, Trophy, Wallet, Percent } from "lucide-react";

export default function KpiPage() {
  const mounted = useMounted();
  const k = useMemo(() => getKpis(), []);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  // Kosten per fase (oplopend = duurder per stap verderop in de funnel)
  const kostenPerFase = [
    { fase: "Per lead", bedrag: k.kostenPerLead },
    { fase: "Per afspraak", bedrag: k.kostenPerAfspraak },
    { fase: "Per offerte", bedrag: k.kostenPerOfferte },
    { fase: "Per gewonnen", bedrag: k.kostenPerGewonnen },
  ];

  const funnel = [
    { name: "Leads", value: k.leads, fill: CHART_KLEUREN[0] },
    { name: "Afspraken", value: k.afspraken, fill: CHART_KLEUREN[2] },
    { name: "Offertes", value: k.offertes, fill: CHART_KLEUREN[3] },
    { name: "Gewonnen", value: k.gewonnen, fill: CHART_KLEUREN[4] },
  ];

  return (
    <div>
      <PageHeader titel="KPI dashboard" subtitel={`Op basis van een marketingbudget van ${euro(k.marketingbudget)}`} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Kosten per lead" waarde={euro(k.kostenPerLead)} icon={Euro} accent="brand" />
        <StatCard label="Kosten per afspraak" waarde={euro(k.kostenPerAfspraak)} icon={CalendarCheck} accent="brand" />
        <StatCard label="Kosten per offerte" waarde={euro(k.kostenPerOfferte)} icon={FileText} accent="amber" />
        <StatCard label="Kosten per gewonnen" waarde={euro(k.kostenPerGewonnen)} icon={Trophy} accent="rose" />
        <StatCard label="Gem. projectwaarde" waarde={euro(k.gemProjectwaarde)} icon={Wallet} accent="emerald" />
        <StatCard label="Sluitingspercentage" waarde={`${k.sluitingspercentage}%`} icon={Percent} accent="emerald" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard titel="Kosten per fase" subtitel="Acquisitiekosten per stap in de funnel">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kostenPerFase}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="fase" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `€${v}`} />
              <Tooltip formatter={(v: number) => euro(v)} />
              <Bar dataKey="bedrag" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titel="Conversie-funnel" subtitel="Lead → afspraak → offerte → gewonnen">
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={funnel} isAnimationActive>
                <LabelList position="right" fill="#334155" stroke="none" dataKey="name" />
                <LabelList position="left" fill="#94a3b8" stroke="none" dataKey="value" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
