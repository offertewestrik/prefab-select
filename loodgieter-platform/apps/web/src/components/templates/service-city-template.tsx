import Link from "next/link";
import { Check, MapPin, Users, Phone, Clock } from "lucide-react";
import { brand } from "@repo/core";
import { LeadCta } from "@/components/marketing/lead-cta";
import { priceRange } from "@/lib/format";
import type { ServiceCityData } from "@/features/seo/service-city";
import type { LinkItem } from "@/features/seo/internal-links";

/** Platte tekst met eenvoudige opmaak: ## subkop, "- " lijst, lege regel = alinea. */
function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim());
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="my-4 list-disc space-y-1 pl-5 text-neutral-700">
              {lines.map((l, j) => <li key={j}>{l.replace(/^-\s+/, "")}</li>)}
            </ul>
          );
        }
        if (lines.length === 1 && lines[0]!.startsWith("## ")) {
          return <h3 key={i} className="mt-6 text-lg font-bold text-neutral-900">{lines[0]!.replace(/^##\s+/, "")}</h3>;
        }
        return <p key={i} className="my-4 leading-relaxed text-neutral-700">{block}</p>;
      })}
    </>
  );
}

export function ServiceCityTemplate({
  data,
  links,
}: {
  data: ServiceCityData;
  links: { hubs: LinkItem[]; nearbyCities: LinkItem[]; relatedServices: LinkItem[] };
}) {
  const { service, city, installerCount, override, article } = data;
  const h1 = article?.seoTitle ?? override?.seoTitle ?? `${service.name} in ${city.name}`;
  const isEmergency = /(spoed|24-7|lekkage|ontstop|storing|gaslek)/.test(service.slug);
  const faqs = article && article.faqs.length > 0 ? article.faqs : service.faqs;

  return (
    <main className={isEmergency ? "pb-16 md:pb-0" : undefined}>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-gradient-to-b from-primary-50/60 to-white">
        <div className="mx-auto max-w-(--container-max) px-6 py-14">
          <nav className="text-sm text-neutral-500">
            <Link href="/diensten" className="hover:text-neutral-900">Diensten</Link>
            <span className="mx-2">/</span>
            <Link href={`/diensten/${service.slug}`} className="hover:text-neutral-900">{service.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">{city.name}</span>
          </nav>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-neutral-900">{h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-500">
            {service.shortDescription} Vergelijk gratis offertes van gecertificeerde
            vakmannen in {city.name} ({city.province.name}).
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-neutral-700">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary-600" /> {city.name}, {city.province.name}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary-600" />
              {installerCount > 0
                ? `${installerCount} beschikbare vakmannen`
                : "Vakmannen beschikbaar in jouw regio"}
            </span>
            <span className="font-medium text-primary-700">
              {priceRange(service.priceFrom, service.priceTo, service.priceUnit)}
            </span>
          </div>
        </div>
      </section>

      {isEmergency && (
        <div className="border-b border-red-100 bg-red-50">
          <div className="mx-auto flex max-w-(--container-max) flex-wrap items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-3 text-sm font-medium text-red-900">
              <Clock className="h-5 w-5 shrink-0 text-red-600" />
              <span>Spoed in {city.name}? Dag en nacht een loodgieter bereikbaar — vaak binnen enkele uren ter plaatse.</span>
            </div>
            <a
              href={brand.phoneHref}
              className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
            >
              <Phone className="h-4 w-4" /> Bel direct: {brand.phone}
            </a>
          </div>
        </div>
      )}

      <div className="mx-auto grid max-w-(--container-max) gap-12 px-6 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <article className="max-w-none">
            {article ? (
              <>
                <p className="text-lg leading-relaxed text-neutral-700">{article.intro}</p>
                {article.body.map((section, i) => (
                  <section key={i}>
                    <h2 className="mt-8 text-2xl font-bold tracking-tight text-neutral-900">{section.heading}</h2>
                    <RichText text={section.text} />
                  </section>
                ))}
              </>
            ) : override?.introHtml ? (
              <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: override.introHtml }} />
            ) : (
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-700">{service.longDescription}</p>
                <p className="text-neutral-700">
                  Zoek je {service.name.toLowerCase()} in {city.name}? Via {brand.name} ontvang
                  je vrijblijvend offertes van gecontroleerde vakmannen die actief zijn in{" "}
                  {city.name} en omgeving. Zo vergelijk je prijs, beschikbaarheid en
                  beoordelingen, en kies je zelf de beste vakman.
                </p>
              </div>
            )}
          </article>

          {faqs.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                Veelgestelde vragen over {service.name.toLowerCase()} in {city.name}
              </h2>
              <div className="mt-4 divide-y divide-neutral-200 rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
                {faqs.map((f, i) => (
                  <details key={i} className="group p-5">
                    <summary className="cursor-pointer list-none font-medium text-neutral-900">{f.question}</summary>
                    <p className="mt-2 text-sm text-neutral-500">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {links.relatedServices.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Andere diensten in {city.name}</h2>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {links.relatedServices.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-primary-600 hover:underline">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
            <h3 className="font-semibold text-neutral-900">Waarom via {brand.shortName}?</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {["Gecertificeerde vakmannen", "Gratis en vrijblijvend", "Lokale vakmannen in " + city.name, "Snel geholpen"].map((u) => (
                <li key={u} className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> {u}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
            <h3 className="font-semibold text-neutral-900">{service.name} in de regio</h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {links.nearbyCities.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-primary-600 hover:underline">{l.label.replace(service.name + " in ", "")}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1.5 border-t border-neutral-200 pt-4 text-sm">
              {links.hubs.map((l) => (
                <Link key={l.href} href={l.href} className="block text-neutral-500 hover:text-neutral-900">{l.label}</Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-(--container-max) px-6 pb-8">
        <LeadCta
          serviceSlug={service.slug}
          citySlug={city.slug}
          title={`${service.name} in ${city.name} nodig?`}
        />
      </div>

      {/* Sticky spoed-belbalk — alleen mobiel, altijd zichtbaar. Spoedzoekers
          zijn overwegend mobiel; direct bellen is dé conversie. */}
      {isEmergency && (
        <a
          href={brand.phoneHref}
          aria-label={`Bel direct met spoed: ${brand.phone}`}
          className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2.5 bg-red-600 px-4 py-3.5 text-sm font-bold text-white shadow-[0_-4px_16px_rgba(0,0,0,0.15)] md:hidden"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <Phone className="h-4 w-4" />
          24/7 spoed — bel {brand.phone}
        </a>
      )}
    </main>
  );
}
