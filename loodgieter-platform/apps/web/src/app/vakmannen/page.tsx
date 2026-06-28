import type { Metadata } from "next";
import { regionsSentence } from "@repo/core";
import { urls, breadcrumbLd, itemListLd, localBusinessLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { InstallerDirectory } from "@/components/marketing/installer-directory";
import { buildMetadata } from "@/features/seo/metadata";
import {
  searchInstallers,
  getDirectoryFilterOptions,
  parseDirectoryParams,
} from "@/features/installers/server/directory";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: `Vakmannen vergelijken — loodgieters & installateurs`,
    description: `Vergelijk gecertificeerde loodgieters en installateurs in ${regionsSentence()}. Filter op dienst, plaats, beoordeling en spoedservice en vraag direct gratis offertes aan.`,
    path: urls.installers(),
  });
}

export default async function InstallersIndexPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filter = parseDirectoryParams(sp);

  const [{ items, total, truncated, origin }, options] = await Promise.all([
    searchInstallers(filter),
    getDirectoryFilterOptions(),
  ]);

  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-10">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Vakmannen", path: urls.installers() },
          ]),
          itemListLd(items.map((c) => ({ name: c.name, path: urls.installer(c.slug) }))),
          // AggregateRating per vakman met beoordelingen (rich results waar mogelijk).
          ...items
            .filter((c) => c.ratingCount > 0)
            .map((c) =>
              localBusinessLd({ name: c.name, slug: c.slug, city: c.city ?? undefined, ratingAvg: c.ratingAvg, ratingCount: c.ratingCount }),
            ),
        ]}
      />
      <InstallerDirectory
        title="Vind een betrouwbare vakman"
        intro={`Vergelijk gecertificeerde loodgieters en installateurs in ${regionsSentence()}. Filter op dienst, plaats, beoordeling, keurmerk en spoedservice.`}
        items={items}
        total={total}
        truncated={truncated}
        options={options}
        current={filter}
        ctaServiceSlug={filter.service}
        ctaCitySlug={filter.city}
        originLabel={origin?.label ?? null}
        internalLinks={{ services: options.services.slice(0, 12), cities: options.cities.slice(0, 12) }}
      />
    </main>
  );
}
