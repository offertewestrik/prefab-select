import { Star } from "lucide-react";
import { TRUST_STATS } from "@/features/trust/data";

/** Statistiekenband op donkere achtergrond met kerncijfers. */
export function StatsBand() {
  return (
    <section className="bg-navy-800 text-white">
      <div className="mx-auto max-w-(--container-max) px-6 py-14">
        <div className="flex items-center justify-center gap-1 text-accent-500" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-current" />
          ))}
        </div>
        <p className="mt-2 text-center text-sm text-neutral-200/70">
          Beoordeeld door duizenden tevreden klanten
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-5">
          {TRUST_STATS.map((s) => (
            <div key={s.label}>
              <dt className="text-3xl font-bold tracking-tight text-white">{s.value}</dt>
              <dd className="mx-auto mt-2 max-w-[14ch] text-sm text-neutral-200/70">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
