"use client";

import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { CheckCircle2, XCircle, RefreshCw, AlertTriangle } from "lucide-react";

type Health = {
  ok: boolean;
  aantalLeads: number | string;
  bestanden: { tabel: string; bucket: string; aantalBestandenInDatabase: number | null };
  producten: { tabel: string; schrijftest: string };
  config: Record<string, unknown>;
  reden?: string;
};

function isGoed(v: unknown): boolean {
  if (typeof v === "number") return true;
  if (typeof v === "boolean") return v;
  if (typeof v === "string") return v.startsWith("OK");
  return false;
}

function StatusRij({ label, waarde, hint }: { label: string; waarde: unknown; hint?: string }) {
  const goed = isGoed(waarde);
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-3 last:border-0">
      <div className="min-w-0">
        <p className="font-semibold text-slate-900">{label}</p>
        <p className={`mt-0.5 break-words text-sm ${goed ? "text-slate-500" : "text-rose-700"}`}>
          {String(waarde)}
        </p>
        {!goed && hint && <p className="mt-1 text-xs text-amber-700">{hint}</p>}
      </div>
      {goed ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
      )}
    </div>
  );
}

export default function SysteemstatusPage() {
  const [data, setData] = useState<Health | null>(null);
  const [laden, setLaden] = useState(true);
  const [fout, setFout] = useState<string | null>(null);

  const laad = useCallback(async () => {
    setLaden(true);
    setFout(null);
    try {
      const res = await fetch("/api/health/supabase", { cache: "no-store" });
      setData(await res.json());
    } catch (e) {
      setFout((e as Error).message);
    } finally {
      setLaden(false);
    }
  }, []);

  useEffect(() => {
    laad();
  }, [laad]);

  return (
    <div>
      <PageHeader
        titel="Systeemstatus"
        subtitel="Controleert of de database en koppelingen in productie echt werken"
        actie={
          <button
            onClick={laad}
            disabled={laden}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${laden ? "animate-spin" : ""}`} /> Opnieuw testen
          </button>
        }
      />

      {fout && (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          Kon de status niet ophalen: {fout}
        </div>
      )}

      {laden && !data && <div className="h-72 animate-pulse rounded-2xl bg-slate-100" />}

      {data && (
        <div className="space-y-6">
          {/* Totaaloordeel */}
          <div
            className={`flex items-center gap-3 rounded-2xl border p-5 ${
              data.ok ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"
            }`}
          >
            {data.ok ? (
              <CheckCircle2 className="h-7 w-7 shrink-0 text-emerald-600" />
            ) : (
              <AlertTriangle className="h-7 w-7 shrink-0 text-amber-600" />
            )}
            <div>
              <p className="font-black text-slate-900">
                {data.ok ? "Alles werkt — klaar voor gebruik" : "Er zijn nog aandachtspunten"}
              </p>
              <p className="text-sm text-slate-600">
                {data.ok
                  ? "Database en kernfuncties zijn bereikbaar en beschrijfbaar."
                  : data.reden ?? "Bekijk hieronder wat er nog niet in orde is."}
              </p>
            </div>
          </div>

          {/* Database & opslag */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
            <h3 className="mb-2 font-bold text-slate-900">Database &amp; opslag</h3>
            <StatusRij
              label="Database bereikbaar (leads)"
              waarde={data.aantalLeads}
              hint="Controleer de Supabase-secrets (URL en service role key)."
            />
            <StatusRij
              label="Producten — tabel leesbaar"
              waarde={data.producten?.tabel}
              hint="De products-tabel ontbreekt? Voer migratie 0011_producten.sql uit in Supabase."
            />
            <StatusRij
              label="Producten — toevoegen & verwijderen"
              waarde={data.producten?.schrijftest}
              hint="Schrijven/verwijderen werkt niet: controleer de service role key (niet de anon key) en de RLS-policy van de products-tabel."
            />
            <StatusRij
              label="Bestanden — tabel"
              waarde={data.bestanden?.tabel}
              hint="Voer migratie 0012_bestanden.sql uit in Supabase."
            />
            <StatusRij
              label="Bestanden — opslagbucket"
              waarde={data.bestanden?.bucket}
              hint="De storage-bucket wordt normaal automatisch aangemaakt; controleer de Supabase Storage-rechten."
            />
          </section>

          {/* Configuratie / secrets */}
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
            <h3 className="mb-2 font-bold text-slate-900">Configuratie (secrets)</h3>
            {Object.entries(data.config ?? {}).map(([k, v]) => (
              <StatusRij key={k} label={k} waarde={v} />
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
