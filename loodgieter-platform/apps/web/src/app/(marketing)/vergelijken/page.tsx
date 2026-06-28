import type { Metadata } from "next";
import { brand } from "@repo/core";
import { siteUrl, breadcrumbLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { LeadCta } from "@/components/marketing/lead-cta";

export const revalidate = 86400;

const title = "Vergelijken — diensten, merken en prijzen";
const description = `Vergelijk diensten, merken en prijzen voor installatie- en loodgieterswerk via ${brand.name}. Vraag gratis offertes aan en vergelijk vakmannen direct.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/vergelijken" },
  openGraph: {
    title,
    description,
    url: siteUrl("/vergelijken"),
    type: "website",
    locale: "nl_NL",
  },
};

// Tijdelijke basis-template. De interactieve vergelijk-functionaliteit
// (diensten/merken/prijzen naast elkaar) volgt in een latere fase.
export default function ComparisonPage() {
  return (
    <main className="mx-auto max-w-(--container-max) px-6 py-16">
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Vergelijken", path: "/vergelijken" },
        ])}
      />
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
