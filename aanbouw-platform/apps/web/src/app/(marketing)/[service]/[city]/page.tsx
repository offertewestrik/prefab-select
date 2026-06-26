import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@repo/core";
import { urls, breadcrumbLd, serviceLd, faqLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { ServiceCityTemplate } from "@/components/templates/service-city-template";
import { buildMetadata } from "@/features/seo/metadata";
import { getServiceCityData } from "@/features/seo/service-city";
import { serviceCityLinks } from "@/features/seo/internal-links";
import { getPriorityServiceCityPairs } from "@/features/catalog/server/queries";
import { getReviewsForServiceCity } from "@/features/reviews/server/aggregation";
import { ReviewsSection } from "@/components/marketing/reviews-section";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  // Alleen high-value combinaties pre-renderen; de rest via on-demand ISR.
  return getPriorityServiceCityPairs(30, 50);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}): Promise<Metadata> {
  const { service, city } = await params;
  const data = await getServiceCityData(service, city);
  if (!data) return {};
  const title =
    data.override?.seoTitle ?? `${data.service.name} in ${data.city.name} — vergelijk vakmannen`;
  const description =
    data.override?.metaDescription ??
    `${data.service.name} in ${data.city.name} nodig? ${data.service.shortDescription} Vergelijk gratis offertes van gecertificeerde vakmannen via ${brand.name}.`;
  return buildMetadata({ title, description, path: urls.serviceCity(service, city) });
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { service, city } = await params;
  const data = await getServiceCityData(service, city);
  if (!data) notFound();

  const links = await serviceCityLinks({
    serviceSlug: data.service.slug,
    serviceName: data.service.name,
    citySlug: data.city.slug,
    cityName: data.city.name,
    lat: data.city.lat,
    lng: data.city.lng,
    related: data.related.map((r) => ({ slug: r.slug, name: r.name })),
  });

  const path = urls.serviceCity(service, city);
  const reviews = await getReviewsForServiceCity(data.service.slug, data.city.name);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Diensten", path: "/diensten" },
            { name: data.service.name, path: urls.service(service) },
            { name: data.city.name, path },
          ]),
          serviceLd({
            name: `${data.service.name} in ${data.city.name}`,
            description: data.service.shortDescription,
            path,
            areaServed: data.city.name,
            priceFrom: data.service.priceFrom,
            rating: reviews.count > 0 ? { value: reviews.average, count: reviews.count } : undefined,
            reviews: reviews.latest.map((r) => ({ author: r.authorLabel, rating: r.rating, title: r.title, body: r.body })),
          }),
          ...(data.service.faqs.length
            ? [faqLd(data.service.faqs.map((f) => ({ question: f.question, answer: f.answer })))]
            : []),
        ]}
      />
      <ServiceCityTemplate data={data} links={links} />
      {reviews.count > 0 && (
        <div className="mx-auto max-w-(--container-max) px-6 pb-8">
          <ReviewsSection data={reviews} heading={`Beoordelingen voor ${data.service.name} in ${data.city.name}`} />
        </div>
      )}
    </>
  );
}
