import type { Metadata } from "next";
import { brand } from "@repo/core";
import { LeadWizard } from "@/features/leads/components/lead-wizard";
import { getServicesByCategory } from "@/features/catalog/server/queries";
import { getCityBySlug } from "@/features/geo/server/queries";

export const metadata: Metadata = {
  title: "Gratis offerte aanvragen",
  description: `Doe in 2 minuten je aanvraag en ontvang gratis offertes van gecertificeerde vakmannen via ${brand.name}.`,
  robots: { index: false, follow: true },
};

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<{ dienst?: string; plaats?: string }>;
}) {
  const { dienst, plaats } = await searchParams;

  const categories = await getServicesByCategory();
  const services = categories.flatMap((c) =>
    c.services.map((s) => ({ slug: s.slug, name: s.name, category: c.name })),
  );

  let initialCity: string | undefined;
  if (plaats) {
    const city = await getCityBySlug(plaats);
    initialCity = city?.name;
  }

  return (
    <div>
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Gratis offertes aanvragen</h1>
        <p className="mt-2 text-neutral-500">In een paar stappen geregeld — 100% vrijblijvend.</p>
      </div>
      <LeadWizard services={services} initialService={dienst} initialCity={initialCity} />
    </div>
  );
}
