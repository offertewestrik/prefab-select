"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Users,
  Euro,
  Trophy,
  FileText,
  ArrowRight,
  CheckSquare,
  CalendarDays,
} from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { Badge, Avatar } from "@/components/ui/Badge";
import { PRODUCT_LABEL, STAGE_META, STAGE_ORDER, SOURCE_LABEL } from "@/lib/constants";
import { euro, datumTijd, relatief } from "@/lib/format";

export default function DashboardPage() {
  const mounted = useMounted();
  const { leads, tasks, appointments, notes } = useCrm();

  const stats = useMemo(() => {
    const open = leads.filter((l) => !["gewonnen", "verloren"].includes(l.stage));
    const gewonnen = leads.filter((l) => l.stage === "gewonnen");
    const pipelineWaarde = open.reduce((s, l) => s + l.waarde, 0);
    const gewogen = open.reduce((s, l) => s + (l.waarde * l.kans) / 100, 0);
    const afgerond = leads.filter((l) => ["gewonnen", "verloren"].includes(l.stage));
    const winratio = afgerond.length
      ? Math.round((gewonnen.length / afgerond.length) * 100)
      : 0;
    return {
      openLeads: open.length,
      pipelineWaarde,
      gewogen,
      gewonnenWaarde: gewonnen.reduce((s, l) => s + l.waarde, 0),
      winratio,
    };
  }, [leads]);

  const perStage = useMemo(
    () =>
      STAGE_ORDER.map((stage) => ({
        stage,
        leads: leads.filter((l) => l.stage === stage),
      })),
    [leads],
  );

  const recenteLeads = useMemo(
    () =>
      [...leads]
        .sort((a, b) => +new Date(b.aangemaaktOp) - +new Date(a.aangemaaktOp))
        .slice(0, 6),
    [leads],
  );

  const takenVandaag = useMemo(() => {
    const eindVandaag = new Date();
    eindVandaag.setHours(23, 59, 59, 999);
    return tasks
      .filter((t) => !t.voltooid && new Date(t.vervaldatum) <= eindVandaag)
      .sort((a, b) => +new Date(a.vervaldatum) - +new Date(b.vervaldatum));
  }, [tasks]);

  const komendeAfspraken = useMemo(
    () =>
      [...appointments]
        .filter((a) => new Date(a.start) >= new Date(new Date().setHours(0, 0, 0, 0)))
        .sort((a, b) => +new Date(a.start) - +new Date(b.start))
        .slice(0, 4),
    [appointments],
  );

  const activiteit = useMemo(
    () =>
      [...notes]
        .sort((a, b) => +new Date(b.aangemaaktOp) - +new Date(a.aangemaaktOp))
        .slice(0, 5),
    [notes],
  );

  if (!mounted) return <DashboardSkeleton />;

  const maxInStage = Math.max(...perStage.map((p) => p.leads.length), 1);

  return (
    <div>
      <PageHeader
        titel="Dashboard"
        subtitel="Overzicht van je leads, pijplijn en activiteiten"
      />

      {/* KPI's */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open leads" waarde={String(stats.openLeads)} icon={Users} sub="in de pijplijn" trend={{ waarde: "+3 deze week", positief: true }} />
        <StatCard label="Pijplijnwaarde" waarde={euro(stats.pipelineWaarde)} icon={Euro} sub={`${euro(stats.gewogen)} gewogen`} accent="amber" />
        <StatCard label="Gewonnen (totaal)" waarde={euro(stats.gewonnenWaarde)} icon={Trophy} sub="omzet uit CRM" accent="emerald" trend={{ waarde: "+12%", positief: true }} />
        <StatCard label="Win-ratio" waarde={`${stats.winratio}%`} icon={FileText} sub="van afgeronde leads" accent="brand" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pijplijn overzicht */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Pijplijn-overzicht</h2>
            <Link href="/pipeline" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
              Open pijplijn <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {perStage.map(({ stage, leads }) => {
              const waarde = leads.reduce((s, l) => s + l.waarde, 0);
              return (
                <div key={stage} className="flex items-center gap-3">
                  <div className="flex w-44 shrink-0 items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${STAGE_META[stage].dot}`} />
                    <span className="truncate text-sm font-medium text-slate-700">{STAGE_META[stage].label}</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-6 overflow-hidden rounded-lg bg-slate-50">
                      <div
                        className={`flex h-full items-center rounded-lg ${STAGE_META[stage].dot} opacity-80`}
                        style={{ width: `${Math.max((leads.length / maxInStage) * 100, leads.length ? 8 : 0)}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12 shrink-0 text-right text-sm font-bold text-slate-900">{leads.length}</div>
                  <div className="hidden w-24 shrink-0 text-right text-xs text-slate-400 sm:block">{euro(waarde)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Taken vandaag */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-bold text-slate-900">
              <CheckSquare className="h-4 w-4 text-brand-600" /> Taken vandaag
            </h2>
            <Link href="/taken" className="text-sm font-semibold text-brand-600 hover:text-brand-700">Alles</Link>
          </div>
          {takenVandaag.length === 0 ? (
            <p className="text-sm text-slate-400">Geen openstaande taken. 🎉</p>
          ) : (
            <ul className="space-y-3">
              {takenVandaag.slice(0, 5).map((t) => (
                <li key={t.id} className="flex items-start gap-3">
                  <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${t.prioriteit === "hoog" ? "bg-rose-500" : t.prioriteit === "normaal" ? "bg-amber-500" : "bg-slate-300"}`} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-700">{t.titel}</p>
                    <p className="text-xs text-slate-400">{relatief(t.vervaldatum)} · {t.toegewezenAan}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <h2 className="mb-3 mt-6 flex items-center gap-2 font-bold text-slate-900">
            <CalendarDays className="h-4 w-4 text-brand-600" /> Komende afspraken
          </h2>
          {komendeAfspraken.length === 0 ? (
            <p className="text-sm text-slate-400">Geen afspraken gepland.</p>
          ) : (
            <ul className="space-y-3">
              {komendeAfspraken.map((a) => (
                <li key={a.id} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-700">{a.titel}</p>
                    <p className="text-xs text-slate-400">{datumTijd(a.start)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recente leads + activiteit */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Recente leads</h2>
            <Link href="/leads" className="text-sm font-semibold text-brand-600 hover:text-brand-700">Alle leads</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recenteLeads.map((l) => (
              <Link key={l.id} href={`/leads/${l.id}`} className="flex items-center gap-3 py-3 transition hover:bg-slate-50/60">
                <Avatar naam={l.naam} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{l.naam}</p>
                  <p className="truncate text-xs text-slate-400">{PRODUCT_LABEL[l.product]} · {SOURCE_LABEL[l.source]}</p>
                </div>
                <Badge className={STAGE_META[l.stage].kleur}>{STAGE_META[l.stage].label}</Badge>
                <span className="hidden w-24 text-right text-sm font-bold text-slate-700 sm:block">{euro(l.waarde)}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
          <h2 className="mb-4 font-bold text-slate-900">Laatste activiteit</h2>
          <ul className="space-y-4">
            {activiteit.map((n) => {
              const lead = leads.find((l) => l.id === n.leadId);
              return (
                <li key={n.id} className="flex gap-3">
                  <Avatar naam={n.auteur} />
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold">{n.auteur}</span> · {lead?.naam ?? "onbekend"}
                    </p>
                    <p className="line-clamp-2 text-xs text-slate-400">{n.tekst}</p>
                    <p className="mt-0.5 text-[11px] text-slate-300">{relatief(n.aangemaaktOp)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-8 w-48 rounded bg-slate-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-100" />
        ))}
      </div>
      <div className="mt-6 h-80 rounded-2xl bg-slate-100" />
    </div>
  );
}
