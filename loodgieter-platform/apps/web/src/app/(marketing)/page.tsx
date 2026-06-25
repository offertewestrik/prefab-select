import Link from "next/link";
import { Check, ClipboardList, Users, CalendarCheck } from "lucide-react";
import { brand, regionsSentence } from "@repo/core";
import { organizationLd, websiteLd } from "@repo/seo";
import { Button } from "@repo/ui";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/marketing/service-card";
import { LeadCta } from "@/components/marketing/lead-cta";
import { getServicesByCategory } from "@/features/catalog/server/queries";

export const revalidate = 3600;

const usps = [
  "Gecertificeerde vakmannen",
  "100% vrijblijvend en gratis",
  "Snel geholpen, vaak vandaag",
  "Vergelijk meerdere offertes",
];

const steps = [
  { icon: ClipboardList, title: "Doe je aanvraag", text: "Vertel in 2 minuten wat je nodig hebt." },
  { icon: Users, title: "Ontvang offertes", text: "Vakmannen uit je regio reageren snel." },
  { icon: CalendarCheck, title: "Plan de klus in", text: "Kies de beste vakman en plan direct in." },
];

export default async function HomePage() {
  let popular: { slug: string; name: string; shortDescription: string; priceFrom: number | null; priceTo: number | null; priceUnit: string | null }[] = [];
  try {
    const cats = await getServicesByCategory();
    popular = cats.flatMap((c) => c.services).slice(0, 8);
  } catch {
    popular = [];
  }

  return (
    <main>
      <JsonLd data={[organizationLd(), websiteLd()]} />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-gradient-to-b from-primary-50/60 to-white">
        <div className="mx-auto max-w-(--container-max) px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-neutral-900">
              {brand.tagline}
            </h1>
            <p className="mt-5 text-lg text-neutral-500">
              Vergelijk gratis offertes van gecertificeerde loodgieters en
              installateurs in {regionsSentence()}. Snel, makkelijk en betrouwbaar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/aanvraag">
                <Button size="lg" variant="accent">Vraag gratis offertes aan</Button>
              </Link>
              <Link href="/diensten">
                <Button size="lg" variant="outline">Bekijk alle diensten</Button>
              </Link>
            </div>
            <ul className="mt-8 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
              {usps.map((u) => (
                <li key={u} className="flex items-center gap-2 text-sm text-neutral-700">
                  <Check className="h-4 w-4 text-success-500" /> {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Populaire diensten */}
      {popular.length > 0 && (
        <section className="mx-auto max-w-(--container-max) px-6 py-16">
          <h2 className="text-2xl font-bold text-neutral-900">Populaire diensten</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </section>
      )}

      {/* Hoe het werkt */}
      <section id="hoe-het-werkt" className="bg-white">
        <div className="mx-auto max-w-(--container-max) px-6 py-16">
          <h2 className="text-2xl font-bold text-neutral-900">Zo werkt het</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-[var(--radius-xl)] border border-neutral-200 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-50 text-primary-600">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-neutral-500">Stap {i + 1}</span>
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-(--container-max) px-6 pb-8">
        <LeadCta />
      </div>
    </main>
  );
}
