"use client";

import { useEffect, useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

interface Status {
  configured: boolean;
  connected: boolean;
  email?: string | null;
}

export function GmailCard() {
  const [status, setStatus] = useState<Status | null>(null);
  const [melding, setMelding] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/integrations/google/status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus({ configured: false, connected: false }));

    const p = new URLSearchParams(window.location.search).get("gmail");
    if (p === "verbonden") setMelding("Gmail succesvol gekoppeld! ✅");
    else if (p === "geweigerd") setMelding("Koppeling geweigerd in het Google-scherm.");
    else if (p === "mislukt") setMelding("Koppeling mislukt — probeer het opnieuw.");
  }, []);

  async function ontkoppel() {
    await fetch("/api/integrations/google/disconnect", { method: "POST" });
    window.location.href = "/integraties";
  }

  return (
    <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${status?.connected ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"}`}>
            <Mail className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-bold text-slate-900">Google — Gmail &amp; Agenda</h3>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">E-mail + Agenda · Google Workspace</p>
          </div>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${status?.connected ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
          {status?.connected ? "Verbonden" : "Niet verbonden"}
        </span>
      </div>

      {melding && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2 text-sm text-brand-800">
          <CheckCircle2 className="h-4 w-4" /> {melding}
        </div>
      )}

      <p className="mt-3 text-sm text-slate-500">
        Verstuur offertes en facturen vanaf je eigen Gmail-adres, en laat CRM-afspraken automatisch in je Google Agenda verschijnen.
      </p>

      {status && !status.configured && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4" /> Google is nog niet geconfigureerd (client-ID/secret ontbreken).
        </div>
      )}

      {status?.connected ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-sm text-slate-600">Gekoppeld als <strong>{status.email}</strong></span>
          <a href="/api/integrations/google/connect" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Opnieuw koppelen (voor agenda)
          </a>
          <button onClick={ontkoppel} className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200">
            Ontkoppelen
          </button>
        </div>
      ) : (
        <a
          href="/api/integrations/google/connect"
          className={`mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white ${status?.configured ? "bg-brand-600 hover:bg-brand-700" : "pointer-events-none bg-slate-300"}`}
        >
          <Mail className="h-4 w-4" /> Verbind Gmail
        </a>
      )}
    </div>
  );
}
