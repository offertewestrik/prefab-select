"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MapPin, Wrench, ArrowRight } from "lucide-react";

type ServiceOption = { slug: string; name: string };

/**
 * Live zoekbalk — koppelt aan de bestaande /vakmannen-directory via de
 * query-params `dienst` en `bij`. Verandert niets aan de backend.
 */
export function LiveSearch({ services }: { services: ServiceOption[] }) {
  const router = useRouter();
  const [dienst, setDienst] = useState("");
  const [bij, setBij] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (dienst) p.set("dienst", dienst);
    if (bij.trim()) p.set("bij", bij.trim());
    router.push(p.toString() ? `/vakmannen?${p}` : "/vakmannen");
  }

  return (
    <form
      onSubmit={submit}
      className="glass flex flex-col gap-2 rounded-[var(--radius-2xl)] p-2 sm:flex-row sm:items-center"
    >
      <label className="flex flex-1 items-center gap-3 rounded-[var(--radius-xl)] px-4 py-3 transition-colors hover:bg-white/60">
        <Wrench className="h-5 w-5 shrink-0 text-primary-600" aria-hidden />
        <span className="sr-only">Dienst</span>
        <select
          value={dienst}
          onChange={(e) => setDienst(e.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent text-[15px] font-medium text-neutral-900 outline-none"
        >
          <option value="">Welke klus heb je?</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
        </select>
      </label>

      <span className="hidden h-8 w-px bg-neutral-200 sm:block" />

      <label className="flex flex-1 items-center gap-3 rounded-[var(--radius-xl)] px-4 py-3 transition-colors hover:bg-white/60">
        <MapPin className="h-5 w-5 shrink-0 text-primary-600" aria-hidden />
        <span className="sr-only">Locatie</span>
        <input
          value={bij}
          onChange={(e) => setBij(e.target.value)}
          placeholder="Plaats of postcode"
          className="w-full bg-transparent text-[15px] font-medium text-neutral-900 placeholder:text-neutral-400 outline-none"
        />
      </label>

      <button
        type="submit"
        className="shimmer group inline-flex items-center justify-center gap-2 rounded-[var(--radius-xl)] bg-neutral-900 px-6 py-3.5 text-[15px] font-semibold text-white transition-transform hover:scale-[1.02] active:scale-100"
      >
        <Search className="h-4 w-4" aria-hidden />
        Vind vakmannen
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </button>
    </form>
  );
}
