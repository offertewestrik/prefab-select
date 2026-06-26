import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@repo/core";
import { CalculatorTemplate } from "@/components/templates/calculator-template";
import { buildMetadata } from "@/features/seo/metadata";

export const revalidate = 86400;

const CALCULATORS: Record<string, { title: string; intro: string }> = {
  cv: { title: "CV-ketel calculator", intro: "Bereken een indicatie voor een nieuwe of vervangende CV-ketel." },
  warmtepomp: { title: "Warmtepomp calculator", intro: "Bereken de indicatieve kosten en besparing van een warmtepomp." },
  badkamer: { title: "Badkamer calculator", intro: "Bereken een indicatie voor je badkamerrenovatie." },
  airco: { title: "Airco calculator", intro: "Bereken een indicatie voor het installeren van een airco." },
  vloerverwarming: { title: "Vloerverwarming calculator", intro: "Bereken de kosten van vloerverwarming per m²." },
  radiator: { title: "Radiator calculator", intro: "Bereken de kosten voor het plaatsen of vervangen van radiatoren." },
  subsidie: { title: "Subsidie calculator", intro: "Bereken voor welke subsidies (zoals ISDE) je in aanmerking komt." },
  besparing: { title: "Besparings calculator", intro: "Bereken hoeveel je kunt besparen op je energierekening." },
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
