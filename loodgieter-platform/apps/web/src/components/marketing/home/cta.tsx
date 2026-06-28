import Link from "next/link";
import { ArrowRight, ShieldCheck, Check, Clock3 } from "lucide-react";
import { Reveal } from "./reveal";

const trustPoints = [
  { icon: Check, label: "100% gratis" },
  { icon: Check, label: "Vrijblijvend" },
  { icon: ShieldCheck, label: "Gecertificeerde vakmannen" },
];

export function Cta() {
  return (
    <section className="mx-auto max-w-(--container-max) px-6 py-24">
      <Reveal as="div">
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-gradient-to-br from-primary-600 via-primary-700 to-navy-900 px-8 py-16 text-center shadow-premium ring-hairline sm:py-24">
          {/* Korrel-overlay */}
          <span className="grain pointer-events-none absolute inset-0" aria-hidden />

          {/* Zwevende glow-blobs */}
          <span
            className="float pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-500/40 blur-3xl"
            aria-hidden
          />
          <span
            className="float pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-accent-500/30 blur-3xl"
            style={{ animationDelay: "1.4s" }}
            aria-hidden
          />
          <span
            className="float pointer-events-none absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-white/10 blur-2xl"
            style={{ animationDelay: "0.7s" }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl">
            {/* Micro-chip */}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur">
              <Clock3 className="h-3.5 w-3.5" aria-hidden />
              ±2 min tot je eerste reactie
            </span>

            <h2 className="display mt-6 text-4xl text-white sm:text-5xl lg:text-6xl">
              Klaar om je klus te klaren?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Eén gratis aanvraag, meerdere offertes van gecertificeerde vakmannen
              uit jouw regio. Jij vergelijkt, jij kiest. Zo simpel is het.
            </p>

            {/* Knoppen */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/aanvraag"
                className="shimmer group inline-flex items-center justify-center gap-2 rounded-[var(--radius-xl)] bg-white px-7 py-4 font-semibold text-primary-700 shadow-float transition-transform hover:scale-[1.02]"
              >
                Vraag gratis offertes aan
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/diensten"
                className="inline-flex items-center justify-center rounded-[var(--radius-xl)] border border-white/30 px-7 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Bekijk alle diensten
              </Link>
            </div>

            {/* Trust-regel */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              {trustPoints.map((point) => (
                <span key={point.label} className="inline-flex items-center gap-1.5">
                  <point.icon className="h-4 w-4 text-white/90" aria-hidden />
                  {point.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
