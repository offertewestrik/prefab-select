import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { brand } from "@repo/core";
import { urls, breadcrumbLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/marketing/service-card";
import { LeadCta } from "@/components/marketing/lead-cta";
import { buildMetadata } from "@/features/seo/metadata";
import { getCityBySlug, getAllCitySlugs, getNearbyCities } from "@/features/geo/server/queries";
import { getServicesByCategory } from "@/features/catalog/server/queries";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = await getAllCitySlugs();
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return {};
  return buildMetadata({
    title: `Loodgieter & installateur in ${city.name}`,
    description: `Op zoek naar een loodgieter of installateur in ${city.name}? Vergelijk gratis offertes van gecertificeerde vakmannen via ${brand.name}.`,
    path: urls.city(slug),
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) notFound();

  const [categories, nearby] = await Promise.all([
    getServicesByCategory(),
    getNearbyCities(city.lat, city.lng, city.slug, 8),
  ]);

  return (
    <main>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Steden", path: "/steden" },
          { name: city.name, path: urls.city(slug) },
        ])}
      />

      <section className="border-b border-neutral-200 bg-gradient-to-b from-primary-50/60 to-white">
        <div className="mx-auto max-w-(--container-max) px-6 py-14">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            Loodgieter & installateur in {city.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-500">
            Alle installatie- en loodgietersdiensten in {city.name} ({city.province.name}).
            Vergelijk gratis offertes van gecertificeerde vakmannen uit de regio.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-neutral-700">
            <MapPin className="h-4 w-4 text-primary-600" /> {city.name}, {city.province.name}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-(--container-max) px-6 py-12 space-y-12">
        {categories.map((cat) => (
          <section key={cat.id}>
            <h2 className="text-xl font-bold text-neutral-900">
              {cat.name} in {city.name}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.services.map((s) => (
                <ServiceCard key={s.slug} service={s} citySlug={city.slug} />
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="text-xl font-bold text-neutral-900">Nabije gemeenten</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {nearby.map((c) => (
              <li key={c.slug}>
                <Link href={urls.city(c.slug)} className="text-primary-600 hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <LeadCta citySlug={city.slug} title={`Vakman nodig in ${city.name}?`} />
      </div>
    </main>
  );
}
