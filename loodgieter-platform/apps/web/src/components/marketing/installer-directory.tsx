import { InstallerCard } from "./installer-card";
import { InstallerFilters } from "./installer-filters";
import { LeadCta } from "./lead-cta";
import type { DirectoryFilter, InstallerCardData } from "@/features/installers/server/directory";

interface Options {
  services: { slug: string; name: string }[];
  provinces: { slug: string; name: string }[];
  cities: { slug: string; name: string }[];
  certs: string[];
}

/** Volledig overzichtsblok: filters + resultaten + CTA. Herbruikt door alle vakmannen-pagina's. */
export function InstallerDirectory({
  title,
  intro,
  items,
  total,
  truncated,
  options,
  current,
  ctaServiceSlug,
  ctaCitySlug,
}: {
  title: string;
  intro: string;
  items: InstallerCardData[];
  total: number;
  truncated: boolean;
  options: Options;
  current: DirectoryFilter;
  ctaServiceSlug?: string;
  ctaCitySlug?: string;
}) {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">{title}</h1>
        <p className="mt-3 max-w-2xl text-neutral-500">{intro}</p>
      </header>

      <InstallerFilters options={options} current={current} />

      <p className="text-sm text-neutral-500">
        {total === 0 ? "Geen vakmannen gevonden" : `${total} ${total === 1 ? "vakman" : "vakmannen"} gevonden`}
        {truncated && ` — eerste ${items.length} getoond`}
      </p>

      {items.length === 0 ? (
        <div className="rounded-[var(--radius-xl)] border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
          <p className="text-neutral-600">Geen vakmannen gevonden met deze filters.</p>
          <p className="mt-1 text-sm text-neutral-400">Probeer een ander filter of vraag direct een offerte aan.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((c) => (
            <InstallerCard key={c.id} c={c} />
          ))}
        </div>
      )}

      <LeadCta serviceSlug={ctaServiceSlug} citySlug={ctaCitySlug} title="Liever direct offertes vergelijken?" />
    </div>
  );
}
