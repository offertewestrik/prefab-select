import type { Metadata } from "next";
import { brand, regionsSentence } from "@repo/core";

export const metadata: Metadata = {
  title: "Over ons",
  description: `Over ${brand.name}: het platform dat huiseigenaren koppelt aan gecertificeerde loodgieters en installateurs in ${regionsSentence()}.`,
  alternates: { canonical: "/over-ons" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Over {brand.name}</h1>
      <div className="prose prose-neutral mt-6 max-w-none text-neutral-700">
        <p>
          {brand.name} verbindt huiseigenaren met gecertificeerde loodgieters en
          installateurs in {regionsSentence()}. Of het nu gaat om een nieuwe
          CV-ketel, een warmtepomp, een lekkage of een complete badkamerrenovatie:
          wij zorgen dat je snel en eenvoudig de juiste vakman vindt.
        </p>
        <p>
          Je doet vrijblijvend een aanvraag, ontvangt offertes van vakmannen uit
          je regio en kiest zelf met wie je in zee gaat. Gratis, snel en
          betrouwbaar.
        </p>
      </div>
    </main>
  );
}
