import type { Metadata } from "next";
import { brand } from "@repo/core";
import { ServiceCard } from "@/components/marketing/service-card";
import { getServicesByCategory } from "@/features/catalog/server/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Alle diensten",
  description: `Bekijk alle diensten voor woninguitbreiding van : van aanbouw en uitbouw tot dakopbouw, kozijnen en vergunningsbegeleiding.`,
  alternates: { canonical: "/diensten" },
};

export default async function ServicesPage() {
  const categories = await getServicesByCategory();

  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Alle diensten</h1>
      <p className="mt-3 max-w-2xl text-neutral-500">
        Kies de dienst die bij jouw klus past en ontvang gratis offertes van
        gecertificeerde vakmannen.
      </p>

      <div className="mt-12 space-y-14">
        {categories.map((cat) => (
          <section key={cat.id}>
            <h2 className="text-xl font-bold text-neutral-900">{cat.name}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.services.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
