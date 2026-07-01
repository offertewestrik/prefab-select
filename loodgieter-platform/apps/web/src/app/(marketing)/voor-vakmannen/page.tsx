import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { brand, regionsSentence } from "@repo/core";
import { siteUrl, breadcrumbLd } from "@repo/seo";
import { Button } from "@repo/ui";
import { JsonLd } from "@/components/json-ld";

const title = "Voor vakmannen — exclusieve leads in jouw regio";
const description = `Word partner van ${brand.name} en ontvang exclusieve leads in jouw werkgebied. Geen abonnement, betaal per lead en bepaal zelf je diensten en regio.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/voor-vakmannen" },
  openGraph: {
    title,
    description,
    url: siteUrl("/voor-vakmannen"),
    type: "website",
    locale: "nl_NL",
  },
};

const benefits = [
  "Exclusieve leads in jouw werkgebied",
  "Betaal per lead met credits — geen verplichtingen",
  "Bepaal zelf je diensten en regio",
  "Hoge slagingskans, betrouwbare aanvragen",
  "Beheer alles in je eigen dashboard",
];

export default function ForProfessionalsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Voor vakmannen", path: "/voor-vakmannen" },
        ])}
      />
      <section className="border-b border-neutral-200 bg-navy-800 py-20 text-white">
        <div className="mx-auto max-w-(--container-max) px-6">
          <h1 className="max-w-3xl text-4xl font-bold leading-tight">
            Meer opdrachten in {regionsSentence()}?
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Sluit je aan bij {brand.name} en ontvang aanvragen van huiseigenaren
            uit jouw regio. Jij bepaalt je werkgebied en diensten.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/aanmelden-vakman">
              <Button size="lg" variant="accent">Word partner</Button>
            </Link>
            <Link href="/voor-vakmannen/badge" className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline">
              Al partner? Haal je gratis website-badge
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-6 py-16">
        <ul className="grid gap-4 sm:grid-cols-2">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
              <Check className="mt-0.5 h-5 w-5 text-success-500" />
              <span className="text-neutral-700">{b}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
