import { ShieldCheck, Sparkles, Clock3, BadgeEuro, MapPin, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TRUST_STATS } from "@/features/trust/data";
import { Reveal } from "./reveal";
import { StatCounter } from "./stat-counter";

type Reason = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const reasons: Reason[] = [
  {
    icon: ShieldCheck,
    title: "Alleen gecertificeerde vakmannen",
    text: "Elke installateur wordt vooraf gescreend en werkt met erkende keurmerken zoals InstallQ, Kiwa en KOMO.",
  },
  {
    icon: Sparkles,
    title: "Eén aanvraag, meerdere offertes",
    text: "Beschrijf je klus één keer en ontvang vergelijkbare offertes. Zo kies je rustig de beste prijs én vakman.",
  },
  {
    icon: Clock3,
    title: "Razendsnel geholpen",
    text: "Vakmannen uit jouw regio reageren vaak al binnen een uur — bij spoed dag en nacht beschikbaar.",
  },
  {
    icon: BadgeEuro,
    title: "100% gratis & vrijblijvend",
    text: "Het aanvragen en vergelijken van offertes is volledig kosteloos. Geen abonnement, geen verplichtingen.",
  },
];

/** Numerieke kerncijfers met count-up. Labels komen uit TRUST_STATS. */
const animatedStats: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}[] = [
  { value: 9.4, decimals: 1, label: TRUST_STATS[0]?.label ?? "Gemiddelde klantwaardering" },
  { value: 25000, suffix: "+", label: TRUST_STATS[1]?.label ?? "Succesvol uitgevoerde opdrachten" },
  { value: 500, suffix: "+", label: TRUST_STATS[2]?.label ?? "Aangesloten vakmannen" },
];

/** Niet-numerieke cijfers als statische tegels. */
const staticStats: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: MapPin, value: TRUST_STATS[3]?.value ?? "Heel Nederland", label: TRUST_STATS[3]?.label ?? "Altijd een loodgieter in de buurt" },
  { icon: Headset, value: TRUST_STATS[4]?.value ?? "24/7", label: TRUST_STATS[4]?.label ?? "Spoedservice beschikbaar" },
];

export function WhyUs() {
  return (
    <section id="waarom-ons" className="relative overflow-hidden bg-neutral-50 py-24 sm:py-32">
      {/* sfeerlicht op de achtergrond */}
      <div className="aurora pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <span className="aurora__blob aurora__blob--a" />
        <span className="aurora__blob aurora__blob--b" />
        <span className="aurora__blob aurora__blob--c" />
      </div>
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-(--container-max) px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Waarom Loodgieterplatform
          </span>
          <h2 className="display mt-3 text-4xl text-neutral-900 sm:text-5xl">
            De slimste route naar de <span className="text-gradient">juiste vakman</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-500">
            Duizenden Nederlanders vonden hier sneller, veiliger en voordeliger een loodgieter.
            Dit is waarom zij voor ons kiezen.
          </p>
        </Reveal>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Links — redenen met gradient-icoontegels */}
          <ul className="space-y-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 100} as="li">
                <div className="lift group flex gap-5 rounded-[var(--radius-2xl)] p-5 transition-colors hover:bg-white hover:shadow-float">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md transition-transform group-hover:scale-105">
                    <r.icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-neutral-900">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{r.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Rechts — verfijnd glazen statistiekpaneel */}
          <Reveal delay={150} className="lg:sticky lg:top-28">
            <div className="glass relative overflow-hidden rounded-[var(--radius-2xl)] p-8 shadow-premium ring-hairline sm:p-10">
              {/* decoratieve gloed */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-primary-200 to-accent-500/20 blur-3xl"
                aria-hidden
              />
              <p className="relative text-sm font-semibold uppercase tracking-wider text-primary-600">
                In cijfers
              </p>
              <p className="relative mt-2 text-base leading-relaxed text-neutral-500">
                Vertrouwen dat je terugziet in de praktijk.
              </p>

              <dl className="relative mt-8 space-y-7">
                {animatedStats.map((s) => (
                  <div key={s.label} className="border-b border-neutral-200/70 pb-7 last:border-0 last:pb-0">
                    <dt className="display text-4xl text-neutral-900 sm:text-5xl">
                      <StatCounter
                        value={s.value}
                        prefix={s.prefix}
                        suffix={s.suffix}
                        decimals={s.decimals}
                      />
                    </dt>
                    <dd className="mt-1.5 text-sm text-neutral-500">{s.label}</dd>
                  </div>
                ))}
              </dl>

              <div className="relative mt-8 grid grid-cols-2 gap-4">
                {staticStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-[var(--radius-lg)] bg-white/70 p-4 ring-hairline"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md">
                      <s.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <p className="mt-3 text-lg font-bold tracking-tight text-neutral-900">{s.value}</p>
                    <p className="mt-0.5 text-xs leading-snug text-neutral-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
