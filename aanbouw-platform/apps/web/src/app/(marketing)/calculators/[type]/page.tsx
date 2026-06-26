import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@repo/core";
import { CalculatorTemplate } from "@/components/templates/calculator-template";
import { buildMetadata } from "@/features/seo/metadata";

export const revalidate = 86400;

const CALCULATORS: Record<string, { title: string; intro: string }> = {
  aanbouw: { title: "Aanbouw calculator", intro: "Bereken een indicatie voor een aanbouw aan je woning." },
  uitbouw: { title: "Uitbouw calculator", intro: "Bereken de indicatieve kosten van een uitbouw per m²." },
  dakopbouw: { title: "Dakopbouw calculator", intro: "Bereken een indicatie voor een dakopbouw of extra verdieping." },
  "garage-ombouw": { title: "Garage ombouw calculator", intro: "Bereken de kosten van het ombouwen van je garage tot leefruimte." },
  mantelzorgwoning: { title: "Mantelzorgwoning calculator", intro: "Bereken een indicatie voor een (prefab) mantelzorgwoning." },
  veranda: { title: "Veranda calculator", intro: "Bereken de kosten van een veranda of overkapping." },
  fundering: { title: "Fundering calculator", intro: "Bereken een indicatie voor fundering en grondwerk." },
  vergunning: { title: "Vergunning calculator", intro: "Check of je een omgevingsvergunning nodig hebt en wat begeleiding kost." },
};

export function generateStaticParams() {
  return Object.keys(CALCULATORS).map((type) => ({ type }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;
  const c = CALCULATORS[type];
  if (!c) return {};
  return buildMetadata({
    title: `${c.title} — gratis prijsindicatie`,
    description: `${c.intro} Gratis en vrijblijvend via ${brand.name}.`,
    path: `/calculators/${type}`,
  });
}

export default async function CalculatorPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const c = CALCULATORS[type];
  if (!c) notFound();
  return <CalculatorTemplate title={c.title} intro={c.intro} />;
}
