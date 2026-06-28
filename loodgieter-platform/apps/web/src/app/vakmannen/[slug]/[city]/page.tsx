import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@repo/core";
import { urls, breadcrumbLd, itemListLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { InstallerDirectory } from "@/components/marketing/installer-directory";
import { buildMetadata } from "@/features/seo/metadata";
import { getServiceBySlug, getPriorityServiceCityPairs } from "@/features/catalog/server/queries";
import { getCityBySlug } from "@/features/geo/server/queries";
import {
  searchInstallers,
  getDirectoryFilterOptions,
  parseDirectoryParams,
} from "@/features/installers/server/directory";

export const revalidate = 3600;
export const dynamicParams = true;

/** Prerender van high-value dienst×stad-combinaties; rest via on-demand ISR. */
export async function generateStaticParams() {
  // Kleine seed pre-renderen (build-tijd DB-belasting laag voor Supabase-pooler);
  // de rest komt via on-demand ISR (dynamicParams).
  const pairs = await getPriorityServiceCityPairs(20, 30);
  return pairs.slice(0, 10).map((p) => ({ slug: p.service, city: p.city }));
}

async function resolve(serviceSlug: string, citySlug: string) {
  const [service, city] = await Promise.all([getServiceBySlug(serviceSlug), getCityBySlug(citySlug)]);
  if (!service || !city) return null;
  return { service, city };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city } = await params;
  const data = await resolve(slug, city);
  if (!data) return { robots: { index: false, follow: false } };
  return buildMetadata({
    title: `${data.service.name} in ${data.city.name} — vakmannen vergelijken`,
    description: `Vergelijk vakmannen voor ${data.service.name.toLowerCase()} in ${data.city.name}. Beoordelingen, keurmerken en gratis offertes via ${brand.name}.`,
    path: urls.installersByServiceCity(slug, city),
  });
}

export default async function InstallerServiceCityPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; city: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug, city } = await params;
  const data = await resolve(slug, city);
  if (!data) notFound();

  const base = parseDirectoryParams(await searchParams);
  const filter = { ...base, service: data.service.slug, city: data.city.slug };

  const [{ items, total, truncated }, options] = await Promise.all([
    searchInstallers(filter),
    getDirectoryFilterOptions(),
  ]);
  const path = urls.installersByServiceCity(slug, city);

  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-10">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Vakmannen", path: urls.installers() },
            { name: data.service.name, path: urls.installersByFacet(slug) },
            { name: data.city.name, path },
          ]),
          itemListLd(items.map((x) => ({ name: x.name, path: urls.installer(x.slug) }))),
        ]}
      />
      <InstallerDirectory
        title={`${data.service.name} in ${data.city.name}`}
        intro={`Gecertificeerde vakmannen voor ${data.service.name.toLowerCase()} met werkgebied ${data.city.name}. Vergelijk beoordelingen en vraag gratis offertes aan.`}
        items={items}
        total={total}
        truncated={truncated}
        options={options}
        current={filter}
        ctaServiceSlug={data.service.slug}
        ctaCitySlug={data.city.slug}
      />
    </main>
  );
}
