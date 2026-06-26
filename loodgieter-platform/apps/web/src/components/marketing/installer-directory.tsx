import Link from "next/link";
import { urls } from "@repo/seo";
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

interface InternalLinks {
  services: { slug: string; name: string }[];
  cities: { slug: string; name: string }[];
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
  originLabel,
  internalLinks,
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
  originLabel?: string | null;
  internalLinks?: InternalLinks;
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
        {originLabel && ` in de buurt van ${originLabel}`}
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

      {internalLinks && (internalLinks.services.length > 0 || internalLinks.cities.length > 0) && (
        <nav className="grid gap-8 border-t border-neutral-200 pt-8 sm:grid-cols-2" aria-label="Interne links">
          {internalLinks.services.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">Populaire diensten</h2>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                {internalLinks.services.map((s) => (
                  <li key={s.slug}>
                    <Link href={urls.service(s.slug)} className="text-primary-600 hover:underline">{s.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {internalLinks.cities.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">Vakmannen per plaats</h2>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                {internalLinks.cities.map((c) => (
                  <li key={c.slug}>
                    <Link href={urls.installersByFacet(c.slug)} className="text-primary-600 hover:underline">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      )}
    </div>
  );
}
