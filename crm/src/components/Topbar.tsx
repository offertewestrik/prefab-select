"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { NewLeadDialog } from "./NewLeadDialog";

export function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="relative flex-1 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Zoek leads, offertes…"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-500 focus:bg-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Nieuwe lead</span>
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-950 text-xs font-bold text-white">
          PS
        </div>
      </div>

      <NewLeadDialog open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
