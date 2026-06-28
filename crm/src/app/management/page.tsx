"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  Users,
  UserPlus,
  CalendarRange,
  FileText,
  CheckCircle2,
  Euro,
  TrendingUp,
  Hammer,
  Percent,
} from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { ChartCard } from "@/components/ui/ChartCard";
import { euro } from "@/lib/format";
import { quoteTotaal } from "@/lib/quote-utils";
import { getOmzet, getLeadbronnen, KANAAL_LABEL } from "@/lib/analytics";

export default function ManagementPage() {
  const mounted = useMounted();
  const leads = useCrm((s) => s.leads);
  const quotes = useCrm((s) => s.quotes);

  const m = useMemo(() => {
    const nu = new Date();
    const startDag = new Date(new Date().setHours(0, 0, 0, 0));
    const startWeek = new Date(startDag);
    startWeek.setDate(startWeek.getDate() - ((startDag.getDay() + 6) % 7)); // maandag
    const startMaand = new Date(nu.getFullYear(), nu.getMonth(), 1);

    const leadsVandaag = leads.filter((l) => new Date(l.aangemaaktOp) >= startDag).length;
    const leadsWeek = leads.filter((l) => new Date(l.aangemaaktOp) >= startWeek).length;
    const leadsMaand = leads.filter((l) => new Date(l.aangemaaktOp) >= startMaand).length;

    const openOffertes = quotes.filter((q) => ["concept", "verstuurd", "bekeken"].includes(q.status));
    const geaccepteerd = quotes.filter((q) => q.status === "geaccepteerd");
    const omzetInOfferte = openOffertes.reduce((s, q) => s + quoteTotaal(q), 0);

    const openLeads = leads.filter((l) => !["opdracht_afgerond", "offerte_afgewezen"].includes(l.stage));
    const verwachteOmzet = openLeads.reduce((s, l) => s + (l.waarde * l.kans) / 100, 0);

    const geplaatst = leads.filter((l) => ["facturen_verstuurd", "opdracht_afgerond"].includes(l.stage)).length;
    const afgerond = leads.filter((l) => ["opdracht_afgerond", "offerte_afgewezen"].includes(l.stage));
    const gewonnen = leads.filter((l) => l.stage === "opdracht_afgerond");
    const conversie = afgerond.length ? Math.round((gewonnen.length / afgerond.length) * 100) : 0;

    return {
      leadsVandaag, leadsWeek, leadsMaand,
      openOffertes: openOffertes.length,
      geaccepteerd: geaccepteerd.length,
      omzetInOfferte,
      verwachteOmzet,
      geplaatst,
      conversie,
    };
  }, [leads, quotes]);

  const omzet = useMemo(() => getOmzet(), []);
  const leadbronnen = useMemo(() => getLeadbronnen(), []);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader
        titel="Management dashboard"
        subtitel="Realtime directie-overzicht — bijgewerkt op basis van je CRM-data"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-3">
        <StatCard label="Leads vandaag" waarde={String(m.leadsVandaag)} icon={UserPlus} accent="brand" />
        <StatCard label="Leads deze week" waarde={String(m.leadsWeek)} icon={Users} accent="brand" />
        <StatCard label="Leads deze maand" waarde={String(m.leadsMaand)} icon={CalendarRange} accent="brand" />
        <StatCard label="Open offertes" waarde={String(m.openOffertes)} icon={FileText} accent="amber" />
        <StatCard label="Geaccepteerde offertes" waarde={String(m.geaccepteerd)} icon={CheckCircle2} accent="emerald" />
        <StatCard label="Omzet in offerte" waarde={euro(m.omzetInOfferte)} icon={Euro} accent="amber" />
        <StatCard label="Verwachte omzet" waarde={euro(m.verwachteOmzet)} icon={TrendingUp} accent="brand" sub="gewogen pijplijn" />
        <StatCard label="Geplaatste projecten" waarde={String(m.geplaatst)} icon={Hammer} accent="emerald" />
        <StatCard label="Conversiepercentage" waarde={`${m.conversie}%`} icon={Percent} accent="brand" sub="gewonnen / afgerond" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard titel="Omzet per maand" subtitel="Laatste 12 maanden (incl. doel)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={omzet.perMaand}>
              <defs>
                <linearGradient id="omzetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="maand" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v: number) => euro(v)} />
              <Area type="monotone" dataKey="omzet" stroke="#2563eb" strokeWidth={2} fill="url(#omzetGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard titel="Leads per kanaal" subtitel="Verdeling van alle leads">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadbronnen.map((b) => ({ naam: KANAAL_LABEL[b.kanaal], leads: b.leads }))} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" stroke="#94a3b8" fontSize={11} />
              <YAxis type="category" dataKey="naam" width={80} stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Bar dataKey="leads" fill="#2563eb" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/marketing" className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Marketing →</Link>
        <Link href="/omzet" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Omzet →</Link>
        <Link href="/kpi" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">KPI's →</Link>
        <Link href="/rapportage" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Rapportages →</Link>
      </div>
    </div>
  );
}
