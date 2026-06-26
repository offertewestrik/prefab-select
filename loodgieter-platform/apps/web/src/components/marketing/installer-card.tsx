/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { MapPin, Star, ShieldCheck, Wrench, Zap } from "lucide-react";
import { Button } from "@repo/ui";
import { urls } from "@repo/seo";
import type { InstallerCardData } from "@/features/installers/server/directory";

/** Eén vakman-kaart in het overzicht. Toont uitsluitend publieke gegevens. */
export function InstallerCard({ c }: { c: InstallerCardData }) {
  const profileHref = urls.installer(c.slug);
  const quoteParams = new URLSearchParams();
  if (c.services[0]) quoteParams.set("dienst", c.services[0].slug);
  const quoteHref = quoteParams.toString() ? `/aanvraag?${quoteParams}` : "/aanvraag";

  return (
    <article className="flex flex-col rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
      <div className="flex items-start gap-4">
        {c.logoUrl ? (
          <img src={c.logoUrl} alt={c.name} className="h-14 w-14 shrink-0 rounded-[var(--radius-lg)] object-cover" />
        ) : (
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[var(--radius-lg)] bg-primary-50 text-primary-600">
            <Wrench className="h-6 w-6" />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-neutral-900">
            <Link href={profileHref} className="hover:text-primary-700">
              {c.name}
            </Link>
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
            {c.ratingCount > 0 ? (
              <span className="inline-flex items-center gap-1 text-trust">
                <Star className="h-4 w-4 fill-current" /> {c.ratingAvg.toFixed(1)}
                <span className="text-neutral-400">({c.ratingCount} reviews)</span>
              </span>
            ) : (
              <span className="text-neutral-400">Nog geen reviews</span>
            )}
            {c.city && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {c.city}
              </span>
            )}
          </div>
        </div>
        {c.emergencyService && (
          <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-500/10 px-2 py-0.5 text-xs font-medium text-accent-600">
            <Zap className="h-3 w-3" /> 24/7 spoed
          </span>
        )}
      </div>

      {c.services.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {c.services.slice(0, 5).map((s) => (
            <span key={s.slug} className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs text-neutral-700">
              {s.name}
            </span>
          ))}
          {c.services.length > 5 && (
            <span className="px-1 text-xs text-neutral-400">+{c.services.length - 5}</span>
          )}
        </div>
      )}

      <div className="mt-3 space-y-1 text-sm text-neutral-500">
        {c.provinces.length > 0 && (
          <p>
            <span className="text-neutral-400">Werkgebied:</span> {c.provinces.join(", ")}
            {c.coverageCount > 0 && ` · ${c.coverageCount} gemeenten`}
          </p>
        )}
        {c.certifications.length > 0 && (
          <p className="inline-flex flex-wrap items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-success-500" />
            {c.certifications.slice(0, 4).join(", ")}
          </p>
        )}
      </div>

      <div className="mt-5 flex gap-2 pt-2">
        <Link href={profileHref} className="flex-1">
          <Button variant="outline" className="w-full">
            Bekijk profiel
          </Button>
        </Link>
        <Link href={quoteHref} className="flex-1">
          <Button variant="accent" className="w-full">
            Vraag offerte aan
          </Button>
        </Link>
      </div>
    </article>
  );
}
