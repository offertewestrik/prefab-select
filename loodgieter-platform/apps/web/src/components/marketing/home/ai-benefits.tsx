import { Sparkles, BadgeEuro, Clock3, GitCompare, type LucideIcon } from "lucide-react";
import { Reveal } from "./reveal";

type Benefit = { icon: LucideIcon; title: string; text: string };

const benefits: Benefit[] = [
  {
    icon: Sparkles,
    title: "Slimme matching",
    text: "Je aanvraag wordt automatisch gekoppeld aan de best passende vakmannen in jouw regio.",
  },
  {
    icon: BadgeEuro,
    title: "Transparante richtprijzen",
    text: "Direct inzicht in wat een klus gemiddeld kost, nog vóór je een offerte aanvraagt.",
  },
  {
    icon: Clock3,
    title: "Realtime beschikbaarheid",
    text: "Zie wie er nu beschikbaar is en snel kan reageren op jouw klus.",
  },
  {
    icon: GitCompare,
    title: "Heldere offertevergelijking",
    text: "Offertes overzichtelijk naast elkaar, zodat je in één oogopslag kunt kiezen.",
  },
];

export function AiBenefits() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-800 py-24 grain lg:py-32">
      {/* Zachte gloed-blobs voor diepte */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <span className="absolute -left-24 top-8 h-80 w-80 rounded-full bg-primary-500/25 blur-3xl" />
        <span className="absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-accent-500/15 blur-3xl" />
        <span className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-700/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-(--container-max) items-center gap-14 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* Linker kolom — kop, intro en live-chip */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-300 ring-hairline backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Slimme technologie
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="display mt-6 text-4xl text-white sm:text-5xl">
              Sneller de juiste match, dankzij{" "}
              <span className="text-gradient">slimme technologie</span>.
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-neutral-300">
              Achter de schermen doet ons platform het zoekwerk voor je. Van de juiste
              vakman tot een eerlijke richtprijs — zodat jij sneller een goede keuze maakt.
            </p>
          </Reveal>

          {/* Live mock-chip */}
          <Reveal delay={220}>
            <div className="glass-dark mt-9 inline-flex items-center gap-4 rounded-[var(--radius-2xl)] px-5 py-4 shadow-float">
              <span className="relative grid h-11 w-11 place-items-center rounded-full bg-success-500/15">
                <span className="glow-accent h-2.5 w-2.5 rounded-full bg-success-500" aria-hidden />
              </span>
              <div>
                <div className="text-sm font-semibold text-white">3 vakmannen gevonden</div>
                <div className="text-xs text-neutral-400">in 1,8 sec · regio Utrecht</div>
              </div>
              <span className="ml-2 hidden rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-primary-300 ring-hairline sm:inline-flex">
                Live
              </span>
            </div>
          </Reveal>
        </div>

        {/* Rechter kolom — 2x2 grid met glass-dark voordeelkaarten */}
        <div className="relative grid gap-5 sm:grid-cols-2">
          {/* verbindende gloed achter de kaarten */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-3xl" aria-hidden />

          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 110} as="div" className={i % 2 === 1 ? "sm:mt-8" : ""}>
              <div className="glass-dark lift group relative h-full rounded-[var(--radius-2xl)] p-6 shadow-float">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-md transition-transform group-hover:scale-105">
                  <b.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
