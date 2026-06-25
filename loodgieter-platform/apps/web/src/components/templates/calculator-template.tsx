import { LeadCta } from "@/components/marketing/lead-cta";

// Tijdelijke basis-template voor calculators. De interactieve rekenlogica
// (CV/warmtepomp/badkamer/airco/vloerverwarming/radiator/subsidie/besparing)
// volgt in een latere fase; structuur + SEO staan nu klaar.
export function CalculatorTemplate({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  return (
    <main>
      <section className="border-b border-neutral-200 bg-gradient-to-b from-primary-50/60 to-white py-14">
        <div className="mx-auto max-w-(--container-max) px-6">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-500">{intro}</p>
        </div>
      </section>

      <div className="mx-auto max-w-(--container-max) px-6 py-12">
        <div className="rounded-[var(--radius-xl)] border border-dashed border-neutral-300 bg-white p-8 text-center text-neutral-500">
          De interactieve calculator wordt binnenkort toegevoegd. Vraag intussen
          gratis een persoonlijke prijsindicatie aan.
        </div>
        <div className="mt-10">
          <LeadCta title="Liever direct een offerte op maat?" />
        </div>
      </div>
    </main>
  );
}
