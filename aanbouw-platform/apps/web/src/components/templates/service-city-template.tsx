import Link from "next/link";
import { Check, MapPin, Users } from "lucide-react";
import { brand } from "@repo/core";
import { LeadCta } from "@/components/marketing/lead-cta";
import { priceRange } from "@/lib/format";
import type { ServiceCityData } from "@/features/seo/service-city";
import type { LinkItem } from "@/features/seo/internal-links";

// Tijdelijke basis-layout. Visuele afwerking volgt via Claude Design.
export function ServiceCityTemplate({
  data,
  links,
}: {
  data: ServiceCityData;
  links: { hubs: LinkItem[]; nearbyCities: LinkItem[]; relatedServices: LinkItem[] };
}) {
  const { service, city, installerCount, override } = data;
  const h1 = override?.seoTitle ?? `${service.name} in ${city.name}`;

  return (
    <main>
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

      <div className="mx-auto grid max-w-(--container-max) gap-12 px-6 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <article className="prose prose-neutral max-w-none">
            {override?.introHtml ? (
              <div dangerouslySetInnerHTML={{ __html: override.introHtml }} />
            ) : (
              <>
                <p className="text-neutral-700">{service.longDescription}</p>
                <p className="text-neutral-700">
                  Zoek je {service.name.toLowerCase()} in {city.name}? Via {brand.name} ontvang
                  je vrijblijvend offertes van gecontroleerde vakmannen die actief zijn in{" "}
                  {city.name} en omgeving. Zo vergelijk je prijs, beschikbaarheid en
                  beoordelingen, en kies je zelf de beste vakman.
                </p>
              </>
            )}
          </article>

          {service.faqs.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                Veelgestelde vragen over {service.name.toLowerCase()} in {city.name}
              </h2>
              <div className="mt-4 divide-y divide-neutral-200 rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
                {service.faqs.map((f) => (
                  <details key={f.id} className="group p-5">
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
    </main>
  );
}
