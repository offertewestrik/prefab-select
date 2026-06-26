import type { Metadata } from "next";
import Link from "next/link";
import { brand as siteBrand } from "@repo/core";
import { urls } from "@repo/seo";
import { getAllBrands } from "@/features/catalog/server/queries";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Merken",
  description: `Merken en materialen waarmee onze bouwbedrijven werken — van kozijnen en schuifpuien tot gevelstenen. Vergelijk via ${siteBrand.name}.`,
  alternates: { canonical: "/merken" },
};

export default async function BrandsPage() {
  const brands = await getAllBrands();
  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-16">
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
            className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-6 text-center font-semibold text-neutral-900 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
          >
            {b.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
