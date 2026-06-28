import type { Metadata } from "next";
import Link from "next/link";
import { brand as siteBrand } from "@repo/core";
import { urls, siteUrl, breadcrumbLd, itemListLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { getAllBrands } from "@/features/catalog/server/queries";

export const revalidate = 86400;

const title = "Merken — CV-ketels, warmtepompen & airco";
const description = `Alle merken die onze vakmannen installeren en onderhouden — van CV-ketels tot warmtepompen en airco. Bekijk diensten per merk via ${siteBrand.name}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/merken" },
  openGraph: {
    title,
    description,
    url: siteUrl("/merken"),
    type: "website",
    locale: "nl_NL",
  },
};

export default async function BrandsPage() {
  const brands = await getAllBrands();
  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-16">
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Merken", path: "/merken" },
          ]),
          itemListLd(brands.map((b) => ({ name: b.name, path: urls.brand(b.slug) }))),
        ]}
      />
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Merken</h1>
      <p className="mt-3 max-w-2xl text-neutral-500">
        Onze vakmannen werken met alle bekende merken. Bekijk per merk de
        beschikbare diensten.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((b) => (
          <Link
            key={b.id}
            href={urls.brand(b.slug)}
            aria-label={`${b.name} installatie en onderhoud — bekijk diensten`}
            className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6 text-center font-semibold text-neutral-900 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
          >
            {b.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
