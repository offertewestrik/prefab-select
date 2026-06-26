import type { Metadata } from "next";
import Link from "next/link";
import { brand, regionsSentence } from "@repo/core";
import { urls } from "@repo/seo";
import { getCitiesByProvince } from "@/features/geo/server/queries";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Steden & regio's",
  description: `${brand.name} werkt met gecertificeerde vakmannen in ${regionsSentence()}. Vind een aannemer of aannemer in jouw gemeente.`,
  alternates: { canonical: "/steden" },
};

export default async function CitiesPage() {
  const provinces = await getCitiesByProvince();

  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Steden & regio&apos;s</h1>
      <p className="mt-3 max-w-2xl text-neutral-500">
        Vind gecertificeerde bouwbedrijven en bouwbedrijven in jouw gemeente.
      </p>

      <div className="mt-12 space-y-10">
        {provinces.map((p) => (
          <section key={p.id}>
            <h2 className="text-xl font-bold text-neutral-900">{p.name}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
              {p.municipalities.map((m) => (
                <li key={m.id}>
                  <Link href={urls.city(m.slug)} className="text-primary-600 hover:underline">
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
