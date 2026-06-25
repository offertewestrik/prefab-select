import Link from "next/link";
import { brand, regionsSentence } from "@repo/core";
import { Button } from "@repo/ui";

// Fase 0: een werkende start-homepage. De volledige marketing-UI (hero-visual,
// dienstkaarten uit de DB, reviews) volgt in Fase 1 + design-afwerking.
export default function HomePage() {
  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-20">
      <section className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
          {brand.name}
        </span>
        <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-neutral-900">
          {brand.tagline}
        </h1>
        <p className="mt-5 text-lg text-neutral-500">
          Vergelijk gratis offertes van gecertificeerde loodgieters en installateurs
          in {regionsSentence()}. Snel, makkelijk en betrouwbaar.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/aanvraag">
            <Button size="lg" variant="accent">
              Vraag gratis offertes aan
            </Button>
          </Link>
          <Link href="/diensten">
            <Button size="lg" variant="outline">
              Bekijk alle diensten
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-sm text-neutral-500">
          100% vrijblijvend en gratis · Gecertificeerde vakmannen ·{" "}
          <a className="font-medium text-primary-600" href={brand.phoneHref}>
            Spoed? Bel {brand.phone}
          </a>
        </p>
      </section>
    </main>
  );
}
