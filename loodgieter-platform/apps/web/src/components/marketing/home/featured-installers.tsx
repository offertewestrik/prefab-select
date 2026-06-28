import Link from "next/link";
import { Star, ShieldCheck, MapPin, ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";

type InstallerCard = {
  id: string;
  slug: string;
  name: string;
  logoUrl: string | null;
  ratingAvg: number;
  ratingCount: number;
  emergencyService: boolean;
  city: string | null;
  services: { name: string; slug: string }[];
  provinces: string[];
  coverageCount: number;
  certifications: string[];
  shortDescription: string | null;
  distanceKm: number | null;
};

/** Bouwt een monogram (max 2 letters) uit de bedrijfsnaam. */
function monogram(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words.map((w) => w[0] ?? "").join("");
  if (!letters) return "?";
  if (words.length === 1) return (words[0] ?? "").slice(0, 2).toUpperCase();
  return letters.slice(0, 2).toUpperCase();
}

/** Rendert 5 sterren met accent-fill evenredig aan ratingAvg (0–5). */
function Stars({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(5, value));
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, clamped - i));
        return (
          <span key={i} className="relative inline-block h-4 w-4">
            <Star className="absolute inset-0 h-4 w-4 text-neutral-200" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function FeaturedInstallers({ installers }: { installers: InstallerCard[] }) {
  if (installers.length === 0) return null;
  const items = installers.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-neutral-50 py-24">
      <div className="mx-auto max-w-(--container-max) px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                Uitgelichte vakmannen
              </span>
              <h2 className="display mt-3 text-4xl text-neutral-900 sm:text-5xl">
                Topbeoordeelde professionals
              </h2>
              <p className="mt-4 text-lg text-neutral-500">
                Gecertificeerde, hoog gewaardeerde vakmannen uit jouw regio — zorgvuldig
                geselecteerd op kwaliteit, betrouwbaarheid en klanttevredenheid.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/vakmannen"
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Bekijk alle vakmannen
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((inst, i) => {
            const chips = inst.services.slice(0, 3);
            const coverage =
              inst.coverageCount > 0
                ? `${inst.coverageCount} gemeenten`
                : inst.provinces.slice(0, 2).join(", ");
            return (
              <Reveal key={inst.id} delay={i * 60} as="div">
                <Link
                  href={`/vakmannen/${inst.slug}`}
                  className="lift group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] bg-white p-6 ring-hairline hover:shadow-float"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary-100 to-accent-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Header: logo/monogram + naam + plaats */}
                  <div className="flex items-start gap-4">
                    {inst.logoUrl ? (
                      <img
                        src={inst.logoUrl}
                        alt={`Logo van ${inst.name}`}
                        width={56}
                        height={56}
                        loading="lazy"
                        className="h-14 w-14 shrink-0 rounded-2xl bg-white object-contain ring-hairline"
                      />
                    ) : (
                      <span
                        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-lg font-bold text-white shadow-md"
                        aria-hidden
                      >
                        {monogram(inst.name)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-lg font-bold tracking-tight text-neutral-900">
                        {inst.name}
                      </h3>
                      {inst.city && (
                        <p className="mt-0.5 flex items-center gap-1 text-sm text-neutral-500">
                          <MapPin className="h-3.5 w-3.5 text-neutral-400" aria-hidden />
                          <span className="truncate">Gevestigd in {inst.city}</span>
                        </p>
                      )}
                    </div>
                    {inst.emergencyService && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-500/10 px-2.5 py-1 text-xs font-semibold text-accent-600">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                        24/7 spoed
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="mt-4 flex items-center gap-2">
                    <Stars value={inst.ratingAvg} />
                    <span className="text-sm font-medium text-neutral-600">
                      {inst.ratingCount === 0
                        ? "Nieuw op het platform"
                        : `${inst.ratingAvg.toFixed(1)} · ${inst.ratingCount} reviews`}
                    </span>
                  </div>

                  {/* Service-chips */}
                  {chips.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {chips.map((s) => (
                        <span
                          key={s.slug}
                          className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer: dekking + pijl */}
                  <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-neutral-500">
                      <MapPin className="h-4 w-4 text-primary-500" aria-hidden />
                      {coverage || "Heel Nederland"}
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100 text-neutral-500 transition-all group-hover:bg-primary-600 group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
