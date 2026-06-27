import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { brand } from "@repo/core";
import { urls, breadcrumbLd, serviceLd, faqLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/marketing/service-card";
import { LeadCta } from "@/components/marketing/lead-cta";
import { BrandWall } from "@/components/marketing/trust/brand-wall";
import { CertificationWall } from "@/components/marketing/trust/certification-wall";
import { priceRange } from "@/lib/format";
import { getServiceBySlug, getAllServiceSlugs } from "@/features/catalog/server/queries";
import { getTopCities } from "@/features/geo/server/queries";
import { getReviewsForService } from "@/features/reviews/server/aggregation";
import { ReviewsSection } from "@/components/marketing/reviews-section";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getAllServiceSlugs();
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  const title = service.seoTitle ?? `${service.name} — vergelijk vakmannen`;
  const description =
    service.metaDescription ??
    `${service.name}: ${service.shortDescription} Vergelijk gratis offertes van gecertificeerde vakmannen via ${brand.name}.`;
  return {
    title,
    description,
    alternates: { canonical: urls.service(slug) },
    openGraph: { title, description, url: urls.service(slug) },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [topCities, reviews] = await Promise.all([getTopCities(12), getReviewsForService(slug)]);
  const related = service.relatedFrom.map((r) => r.to).filter((t) => t.publish === "ACTIVE");

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Diensten", path: "/diensten" },
            { name: service.name, path: urls.service(slug) },
          ]),
          serviceLd({
            name: service.name,
            description: service.shortDescription,
            path: urls.service(slug),
            priceFrom: service.priceFrom,
            rating: reviews.count > 0 ? { value: reviews.average, count: reviews.count } : undefined,
            reviews: reviews.latest.map((r) => ({ author: r.authorLabel, rating: r.rating, title: r.title, body: r.body })),
          }),
          ...(service.faqs.length
            ? [faqLd(service.faqs.map((f) => ({ question: f.question, answer: f.answer })))]
            : []),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-gradient-to-b from-primary-50/60 to-white">
        <div className="mx-auto max-w-(--container-max) px-6 py-16">
          <nav className="text-sm text-neutral-500">
            <Link href="/diensten" className="hover:text-neutral-900">Diensten</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">{service.name}</span>
          </nav>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-neutral-900">
            {service.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-500">{service.shortDescription}</p>
          <p className="mt-4 text-lg font-semibold text-primary-700">
            {priceRange(service.priceFrom, service.priceTo, service.priceUnit)}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-(--container-max) gap-12 px-6 py-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <article className="prose prose-neutral max-w-none">
            <p className="text-neutral-700">{service.longDescription}</p>
          </article>

          <div className="mt-8 space-y-6">
            <BrandWall
              variant="compact"
              category={service.category.slug}
              title={`A-merken voor ${service.name.toLowerCase()}`}
              subtitle="Onze vakmannen werken uitsluitend met onderdelen van gerenommeerde fabrikanten."
            />
            <CertificationWall
              variant="compact"
              category={service.category.slug}
              title="Keurmerken & erkenningen"
              subtitle="Vakmannen voor deze klus zijn aangesloten bij erkende dakkeurmerken."
            />
          </div>

          {service.faqs.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-neutral-900">Veelgestelde vragen</h2>
              <div className="mt-4 divide-y divide-neutral-200 rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
                {service.faqs.map((f) => (
                  <details key={f.id} className="group p-5">
                    <summary className="cursor-pointer list-none font-medium text-neutral-900">
                      {f.question}
                    </summary>
                    <p className="mt-2 text-sm text-neutral-500">{f.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: voordelen + steden */}
        <aside className="space-y-6">
          <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
            <h3 className="font-semibold text-neutral-900">Waarom via {brand.shortName}?</h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              {["Gecertificeerde vakmannen", "Gratis en vrijblijvend", "Meerdere offertes vergelijken", "Snel geholpen"].map((u) => (
                <li key={u} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-success-500" /> {u}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6">
            <h3 className="font-semibold text-neutral-900">{service.name} per stad</h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {topCities.map((c) => (
                <li key={c.slug}>
                  <Link href={urls.serviceCity(slug, c.slug)} className="text-primary-600 hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {reviews.count > 0 && (
        <div className="mx-auto max-w-(--container-max) px-6 pb-8">
          <ReviewsSection data={reviews} heading={`Beoordelingen voor ${service.name}`} />
        </div>
      )}

      {related.length > 0 && (
        <section className="mx-auto max-w-(--container-max) px-6 pb-8">
          <h2 className="text-xl font-bold text-neutral-900">Gerelateerde diensten</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ServiceCard key={r.slug} service={r} />
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-(--container-max) px-6 pb-8">
        <LeadCta serviceSlug={slug} title={`Offerte voor ${service.name}?`} />
      </div>
    </main>
  );
}
