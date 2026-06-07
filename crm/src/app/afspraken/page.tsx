"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { datum, tijd } from "@/lib/format";
import { CalendarDays, MapPin, RefreshCw, CheckCircle2 } from "lucide-react";
import type { Appointment } from "@/lib/types";

const TYPE_LABEL: Record<Appointment["type"], string> = {
  intake: "Intake",
  showroom: "Showroom",
  locatiebezoek: "Locatiebezoek",
  oplevering: "Oplevering",
  overig: "Overig",
};

export default function AfsprakenPage() {
  const mounted = useMounted();
  const appointments = useCrm((s) => s.appointments);
  const leads = useCrm((s) => s.leads);
  const toggleGoogleSync = useCrm((s) => s.toggleGoogleSync);
  const integrations = useCrm((s) => s.integrations);
  const toggleIntegration = useCrm((s) => s.toggleIntegration);

  const gcal = integrations.find((i) => i.id === "int-gcal");
  const [syncMelding, setSyncMelding] = useState<string | null>(null);

  const gegroepeerd = useMemo(() => {
    const groepen = new Map<string, Appointment[]>();
    [...appointments]
      .sort((a, b) => +new Date(a.start) - +new Date(b.start))
      .forEach((a) => {
        const dag = datum(a.start);
        if (!groepen.has(dag)) groepen.set(dag, []);
        groepen.get(dag)!.push(a);
      });
    return Array.from(groepen.entries());
  }, [appointments]);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  function synchroniseerAlles() {
    if (!gcal?.verbonden) {
      setSyncMelding("Koppel eerst Google Calendar via 'Integraties'.");
      return;
    }
    appointments.filter((a) => !a.googleSynced).forEach((a) => toggleGoogleSync(a.id));
    setSyncMelding("Alle afspraken gesynchroniseerd met Google Calendar (mock).");
  }

  return (
    <div>
      <PageHeader
        titel="Afspraken"
        subtitel="Plan intakes, showroombezoeken en opleveringen in"
        actie={
          <button onClick={synchroniseerAlles} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            <RefreshCw className="h-4 w-4" /> Sync met Google
          </button>
        }
      />

      {/* Google Calendar status */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${gcal?.verbonden ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
            <CalendarDays className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">Google Calendar</p>
            <p className="text-xs text-slate-400">{gcal?.verbonden ? "Verbonden — afspraken worden gesynchroniseerd" : "Niet verbonden"}</p>
          </div>
        </div>
        <button
          onClick={() => toggleIntegration("int-gcal")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${gcal?.verbonden ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-brand-600 text-white hover:bg-brand-700"}`}
        >
          {gcal?.verbonden ? "Ontkoppelen" : "Koppelen"}
        </button>
      </div>

      {syncMelding && (
        <div className="mb-4 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">{syncMelding}</div>
      )}

      <div className="space-y-6">
        {gegroepeerd.map(([dag, items]) => (
          <div key={dag}>
            <h3 className="mb-2 text-sm font-bold text-slate-500">{dag}</h3>
            <div className="space-y-2">
              {items.map((a) => {
                const lead = leads.find((l) => l.id === a.leadId);
                return (
                  <div key={a.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
                    <div className="w-16 shrink-0 text-center">
                      <p className="text-lg font-black text-slate-900">{tijd(a.start)}</p>
                      <p className="text-[11px] text-slate-400">{tijd(a.eind)}</p>
                    </div>
                    <div className="h-12 w-1 shrink-0 rounded-full bg-brand-200" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-bold text-slate-800">{a.titel}</p>
                        <Badge>{TYPE_LABEL[a.type]}</Badge>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-slate-400">
                        {lead && <Link href={`/leads/${lead.id}`} className="hover:text-brand-600">{lead.naam}</Link>}
                        {a.locatie && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.locatie}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleGoogleSync(a.id)}
                      className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${a.googleSynced ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                    >
                      {a.googleSynced ? <><CheckCircle2 className="h-3.5 w-3.5" /> Gesynct</> : "Sync"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {gegroepeerd.length === 0 && <p className="py-12 text-center text-slate-400">Geen afspraken gepland.</p>}
      </div>
    </div>
  );
}
