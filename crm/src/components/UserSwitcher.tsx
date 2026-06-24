"use client";

import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { ROLE_META } from "@/lib/constants";
import { initialen } from "@/lib/format";

/**
 * Simuleert de "ingelogde" medewerker (geen echte auth in het prototype).
 * Bepaalt wat je ziet op "Mijn dag" en filtert eigen agenda/taken.
 */
export function UserSwitcher() {
  const mounted = useMounted();
  const users = useCrm((s) => s.users);
  const currentUserId = useCrm((s) => s.currentUserId);
  const setCurrentUser = useCrm((s) => s.setCurrentUser);
  const [open, setOpen] = useState(false);

  if (!mounted) return <div className="h-9 w-9 rounded-full bg-slate-200" />;

  const user = users.find((u) => u.id === currentUserId) ?? users[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 transition hover:bg-slate-100"
      >
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: user.kleur }}
        >
          {initialen(user.naam)}
        </span>
        <div className="hidden text-left sm:block">
          <p className="text-xs font-bold leading-tight text-slate-800">{user.naam}</p>
          <p className="text-[10px] leading-tight text-slate-400">{ROLE_META[user.rol].label}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-40 mt-2 w-60 rounded-xl border border-slate-100 bg-white p-1.5 shadow-lift">
            <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Inloggen als (demo)
            </p>
            {users.map((u) => (
              <button
                key={u.id}
                onClick={() => {
                  setCurrentUser(u.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-50 ${u.id === currentUserId ? "bg-brand-50" : ""}`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ backgroundColor: u.kleur }}>
                  {initialen(u.naam)}
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-slate-800">{u.naam}</span>
                  <span className="block text-[11px] text-slate-400">{ROLE_META[u.rol].label}</span>
                </span>
                {u.googleConnected && <span className="text-[10px] font-semibold text-emerald-600">G</span>}
              </button>
            ))}
            <div className="my-1 border-t border-slate-100" />
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/login";
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4 text-slate-400" /> Uitloggen
            </button>
          </div>
        </>
      )}
    </div>
  );
}
