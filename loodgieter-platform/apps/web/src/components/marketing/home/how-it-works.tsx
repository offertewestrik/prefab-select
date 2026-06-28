import { ClipboardList, Users, CalendarCheck } from "lucide-react";
import { Reveal } from "./reveal";

const steps = [
  { icon: ClipboardList, title: "Beschrijf je klus", text: "Vertel in 2 minuten wat je nodig hebt. Voeg eventueel foto's toe voor een scherpere offerte." },
  { icon: Users, title: "Ontvang offertes", text: "Gecertificeerde vakmannen uit jouw regio reageren — meestal binnen enkele uren." },
  { icon: CalendarCheck, title: "Kies & plan in", text: "Vergelijk prijs, reviews en beschikbaarheid. Kies je favoriet en plan direct in." },
];

export function HowItWorks() {
  return (
    <section id="hoe-het-werkt" className="relative overflow-hidden bg-neutral-50 py-24">
      <div className="mx-auto max-w-(--container-max) px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Zo werkt het</span>
          <h2 className="display mt-3 text-4xl text-neutral-900 sm:text-5xl">In drie stappen geregeld</h2>
          <p className="mt-4 text-lg text-neutral-500">Geen gedoe, geen verplichtingen. Gewoon snel de juiste vakman.</p>
        </Reveal>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* verbindingslijn */}
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-12 hidden h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent md:block" aria-hidden />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} as="div">
              <div className="lift group relative rounded-[var(--radius-2xl)] bg-white p-8 text-center ring-hairline hover:shadow-float">
                <div className="relative mx-auto grid h-24 w-24 place-items-center">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-50 to-accent-500/10" />
                  <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md">
                    <s.icon className="h-7 w-7" aria-hidden />
                  </span>
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-neutral-900 text-xs font-bold text-white">{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-neutral-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
