import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { brand } from "@repo/core";
import { siteUrl, breadcrumbLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { BadgeEmbed } from "@/components/marketing/badge-embed";

const title = "Gratis partnerbadge voor je website";
const description = `Ben je aangesloten bij ${brand.name}? Plaats onze gratis badge op je eigen website met één regel code en laat klanten zien dat je een gecontroleerde partner bent.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/voor-vakmannen/badge" },
  openGraph: {
    title,
    description,
    url: siteUrl("/voor-vakmannen/badge"),
    type: "website",
    locale: "nl_NL",
  },
};

const steps = [
  "Kies hieronder de donkere of lichte badge die het best bij je website past.",
  "Klik op “Kopieer code” om de HTML-code te kopiëren.",
  "Plak de code in je website — bijvoorbeeld in de footer of op je “Over ons”-pagina.",
  "Klaar: de badge verschijnt en linkt naar Loodgieterplatform.nl.",
];

export default function BadgePage() {
  // Schone basis-URL zonder trailing slash voor de embedcode.
  const base = siteUrl("/").replace(/\/$/, "");

  return (
    <main>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Voor vakmannen", path: "/voor-vakmannen" },
          { name: "Partnerbadge", path: "/voor-vakmannen/badge" },
        ])}
      />

      <section className="border-b border-neutral-200 bg-navy-800 py-16 text-white">
        <div className="mx-auto max-w-(--container-max) px-6">
          <nav className="text-sm text-white/60">
            <Link href="/voor-vakmannen" className="hover:text-white">Voor vakmannen</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Partnerbadge</span>
          </nav>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight">
            Gratis partnerbadge voor je website
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Laat bezoekers van je eigen website zien dat je een gecontroleerde
            partner bent van {brand.name}. Plaats de badge met één regel code —
            gratis, en zonder gedoe.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Kies je badge</h2>
            <p className="mt-2 text-neutral-600">
              Kopieer de code en plak die op je website. De badge past zich aan een
              breedte van 280 pixels aan en linkt automatisch naar {brand.name}.
            </p>
            <div className="mt-6">
              <BadgeEmbed siteUrl={base} />
            </div>
          </div>

          <aside>
            <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold text-neutral-900">In 4 stappen geplaatst</h3>
              <ol className="mt-4 space-y-3 text-sm text-neutral-700">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
              <h3 className="font-semibold text-neutral-900">Waarom de badge plaatsen?</h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                {[
                  "Meer vertrouwen bij bezoekers van je site",
                  "Laat zien dat je een gecontroleerde partner bent",
                  "Volledig gratis voor aangesloten vakmensen",
                ].map((u) => (
                  <li key={u} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-500" /> {u}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-sm text-neutral-500">
              Nog geen partner?{" "}
              <Link href="/aanmelden-vakman" className="font-medium text-primary-600 hover:underline">
                Meld je gratis aan
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
