"use client";

import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { datumTijd } from "@/lib/format";
import {
  Megaphone,
  BarChart3,
  CalendarDays,
  Mail,
  Globe,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";
import type { Integration } from "@/lib/types";

const ICON: Record<string, any> = {
  "int-meta": Megaphone,
  "int-ga": BarChart3,
  "int-gcal": CalendarDays,
  "int-resend": Mail,
  "int-form": Globe,
  "int-config": SlidersHorizontal,
};

const CAT_LABEL: Record<Integration["categorie"], string> = {
  marketing: "Marketing",
  analytics: "Analytics",
  agenda: "Agenda",
  email: "E-mail",
  website: "Website",
};

export default function IntegratiesPage() {
  const mounted = useMounted();
  const integrations = useCrm((s) => s.integrations);
  const toggleIntegration = useCrm((s) => s.toggleIntegration);
  const reset = useCrm((s) => s.reset);

  if (!mounted) return <div className="h-96 animate-pulse rounded-2xl bg-slate-100" />;

  return (
    <div>
      <PageHeader
        titel="Integraties"
        subtitel="Koppel je marketing-, agenda- en websitebronnen"
        actie={
          <button
            onClick={() => {
              if (confirm("Alle dummy data terugzetten naar de begintoestand?")) reset();
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" /> Demo-data resetten
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((i) => {
          const Icon = ICON[i.id] ?? Globe;
          return (
            <div key={i.id} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${i.verbonden ? "bg-brand-50 text-brand-600" : "bg-slate-100 text-slate-400"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${i.verbonden ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {i.verbonden ? "Verbonden" : "Niet verbonden"}
                </span>
              </div>

              <h3 className="mt-4 font-bold text-slate-900">{i.naam}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{CAT_LABEL[i.categorie]}</p>
              <p className="mt-2 flex-1 text-sm text-slate-500">{i.beschrijving}</p>

              {i.verbonden && i.laatsteSync && (
                <p className="mt-3 text-xs text-slate-400">Laatste sync: {datumTijd(i.laatsteSync)}</p>
              )}

              <button
                onClick={() => toggleIntegration(i.id)}
                className={`mt-4 rounded-lg px-4 py-2 text-sm font-semibold transition ${i.verbonden ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-brand-600 text-white hover:bg-brand-700"}`}
              >
                {i.verbonden ? "Ontkoppelen" : "Koppelen"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-bold text-amber-900">ℹ️ Prototype-modus</h3>
        <p className="mt-1 text-sm text-amber-800">
          Alle koppelingen werken nu met dummy data. De echte API-calls (Supabase, Resend,
          Google Calendar &amp; Analytics, Meta Marketing API) zitten als mock-laag klaar in{" "}
          <code className="rounded bg-amber-100 px-1">src/lib/integrations</code>. Per stap
          vervangen we de mock door een echte verbinding zodra de API-keys zijn ingesteld.
        </p>
      </div>
    </div>
  );
}
