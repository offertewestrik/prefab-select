import type { Metadata } from "next";
import { brand } from "@repo/core";
import { LeadCta } from "@/components/marketing/lead-cta";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Vergelijken",
  description: `Vergelijk diensten, bouwbedrijven en richtprijzen voor woninguitbreiding via .`,
  alternates: { canonical: "/vergelijken" },
};

// Tijdelijke basis-template. De interactieve vergelijk-functionaliteit
// (diensten/merken/prijzen naast elkaar) volgt in een latere fase.
export default function ComparisonPage() {
  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Vergelijken</h1>
      <p className="mt-3 max-w-2xl text-neutral-500">
        Binnenkort vergelijk je hier eenvoudig diensten, merken en prijzen. Vraag
        intussen gratis offertes aan en vergelijk vakmannen direct.
      </p>
      <div className="mt-10">
        <LeadCta />
      </div>
    </main>
  );
}
