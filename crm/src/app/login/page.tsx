"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [wachtwoord, setWachtwoord] = useState("");
  const [fout, setFout] = useState(false);
  const [bezig, setBezig] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBezig(true);
    setFout(false);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wachtwoord }),
    });
    if (res.ok) {
      window.location.href = "/";
    } else {
      setFout(true);
      setBezig(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-8 shadow-soft">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="text-2xl font-black tracking-tight text-brand-700">Prefab</span>
          <span className="rounded-md bg-brand-600 px-2 py-0.5 text-2xl font-black tracking-tight text-white">Select</span>
        </div>
        <div className="mb-4 flex items-center justify-center gap-2 text-slate-500">
          <Lock className="h-4 w-4" />
          <span className="text-sm font-semibold">CRM-toegang</span>
        </div>
        <label className="mb-1 block text-xs font-semibold text-slate-500">Wachtwoord</label>
        <input
          type="password"
          autoFocus
          value={wachtwoord}
          onChange={(e) => setWachtwoord(e.target.value)}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
          placeholder="Team-wachtwoord"
        />
        {fout && <p className="mt-2 text-sm text-rose-600">Onjuist wachtwoord, probeer opnieuw.</p>}
        <button
          type="submit"
          disabled={bezig || !wachtwoord}
          className="mt-5 w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-40"
        >
          {bezig ? "Bezig…" : "Inloggen"}
        </button>
      </form>
    </div>
  );
}
