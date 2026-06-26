import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand as siteBrand } from "@repo/core";
import { urls, breadcrumbLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/marketing/service-card";
import { LeadCta } from "@/components/marketing/lead-cta";
import { buildMetadata } from "@/features/seo/metadata";
import { getBrandBySlug, getAllBrands } from "@/features/catalog/server/queries";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  const brands = await getAllBrands();
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>;
}): Promise<Metadata> {
  const { brand: slug } = await params;
  const b = await getBrandBySlug(slug);
  if (!b) return {};
  return buildMetadata({
    title: b.seoTitle ?? `${b.name} aannemer & onderhoud`,
    description:
      b.metaDescription ??
      `${b.name} laten installeren of onderhouden? Vergelijk gratis offertes van gecertificeerde ${b.name}-vakmannen via ${siteBrand.name}.`,
    path: urls.brand(slug),
  });
}

export default async function BrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params;
  const b = await getBrandBySlug(slug);
  if (!b) notFound();

  const services = b.services.map((s) => s.service).filter((s) => s.publish === "ACTIVE");

  return (
    <main>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Merken", path: "/merken" },
          { name: b.name, path: urls.brand(slug) },
        ])}
      />
      <section className="border-b border-neutral-200 bg-gradient-to-b from-primary-50/60 to-white">
        <div className="mx-auto max-w-(--container-max) px-6 py-14">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">{b.name}</h1>
          {b.description && <p className="mt-4 max-w-2xl text-lg text-neutral-500">{b.description}</p>}
        </div>
      </section>

      <div className="mx-auto max-w-(--container-max) px-6 py-12">
        {services.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-neutral-900">Diensten voor {b.name}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </>
        )}
        <div className="mt-10">
          <LeadCta title={`${b.name} laten installeren?`} />
        </div>
      </div>
    </main>
  );
}
