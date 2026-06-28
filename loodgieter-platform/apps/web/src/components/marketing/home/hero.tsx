import Link from "next/link";
import { ShieldCheck, Star, ArrowRight, BadgeCheck, Clock3, FileText } from "lucide-react";
import { LiveSearch } from "./live-search";
import { Reveal } from "./reveal";

type ServiceOption = { slug: string; name: string };

export function Hero({ services, rating, reviewCount }: { services: ServiceOption[]; rating: string; reviewCount: number }) {
  return (
    <section className="relative overflow-hidden grain">
      {/* Aurora achtergrond */}
      <div className="aurora" aria-hidden>
        <span className="aurora__blob aurora__blob--a" />
        <span className="aurora__blob aurora__blob--b" />
        <span className="aurora__blob aurora__blob--c" />
      </div>

      <div className="relative mx-auto grid max-w-(--container-max) items-center gap-16 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
        {/* Linker kolom */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 ring-hairline backdrop-blur">
              <span className="flex -space-x-1.5">
                {["#1d4ed8", "#f97316", "#16a34a"].map((c) => (
                  <span key={c} className="h-4 w-4 rounded-full ring-2 ring-white" style={{ background: c }} />
                ))}
              </span>
              Het installatieplatform van Nederland
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-6 text-5xl text-neutral-900 sm:text-6xl lg:text-[4.25rem]">
              Vind de juiste vakman.{" "}
              <span className="text-gradient">Binnen 2 minuten.</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-500">
              Vergelijk gratis offertes van gecertificeerde loodgieters en installateurs
              bij jou in de buurt. Eén aanvraag, meerdere reacties, jij kiest.
            </p>
          </Reveal>

          <Reveal delay={200} className="mt-8">
            <LiveSearch services={services} />
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
              <Link
                href="/aanvraag"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-600"
              >
                Of vraag direct gratis offertes aan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-neutral-200/70 pt-7">
              <div className="flex items-center gap-2">
                <div className="flex text-accent-500" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="text-sm font-semibold text-neutral-900">{rating}/5</span>
                <span className="text-sm text-neutral-500">· {reviewCount > 0 ? `${reviewCount} beoordelingen` : "tevreden klanten"}</span>
              </div>
              <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                <ShieldCheck className="h-4 w-4 text-success-500" aria-hidden /> Erkende vakmannen
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-neutral-600">
                <BadgeCheck className="h-4 w-4 text-primary-600" aria-hidden /> 100% gratis & vrijblijvend
              </span>
            </div>
          </Reveal>
        </div>

        {/* Rechter kolom — zwevende product-mockup */}
        <Reveal delay={200} className="relative hidden lg:block">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto h-[30rem] w-full max-w-md">
      {/* Hoofdkaart: offerte */}
      <div className="glass float absolute left-0 top-6 w-[20rem] rounded-[var(--radius-2xl)] p-5 shadow-float">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Offerte · CV-ketel</span>
          <span className="rounded-full bg-success-500/10 px-2 py-0.5 text-[11px] font-semibold text-success-500">Nieuw</span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-500 text-white"><FileText className="h-5 w-5" /></span>
          <div>
            <div className="text-sm font-semibold text-neutral-900">Intergas HR-combiketel</div>
            <div className="text-xs text-neutral-500">incl. installatie & afvoer</div>
          </div>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-[11px] text-neutral-400">Totaal incl. btw</div>
            <div className="text-2xl font-bold tracking-tight text-neutral-900">€ 2.145</div>
          </div>
          <span className="rounded-[var(--radius-md)] bg-neutral-900 px-3 py-2 text-xs font-semibold text-white">Accepteren</span>
        </div>
      </div>

      {/* Reviewkaart */}
      <div className="glass float absolute -right-2 top-44 w-[15rem] rounded-[var(--radius-xl)] p-4 shadow-float" style={{ animationDelay: "1.2s" }}>
        <div className="flex items-center gap-1 text-accent-500" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
        </div>
        <p className="mt-2 text-sm leading-snug text-neutral-700">&ldquo;Binnen een uur drie scherpe offertes. Top geregeld!&rdquo;</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">SJ</span>
          <span className="text-xs font-medium text-neutral-500">Sanne · Utrecht</span>
        </div>
      </div>

      {/* Mini-badge: snel contact */}
      <div className="glass float absolute bottom-2 left-6 flex items-center gap-3 rounded-[var(--radius-xl)] px-4 py-3 shadow-float" style={{ animationDelay: "0.6s" }}>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-accent-500/15 text-accent-600"><Clock3 className="h-4 w-4" /></span>
        <div>
          <div className="text-sm font-bold text-neutral-900">±2 min</div>
          <div className="text-[11px] text-neutral-500">tot je eerste reactie</div>
        </div>
      </div>
    </div>
  );
}
