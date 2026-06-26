import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { brand } from "@repo/core";
import { Button } from "@repo/ui";

export const metadata: Metadata = { title: "Aanmelden als vakman", robots: { index: true, follow: true } };

const steps = ["Bedrijfsgegevens", "Diensten kiezen", "Werkgebied instellen", "Controle & indienen"];

export default function OnboardingIntro() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Word partner van {brand.shortName}</h1>
      <p className="mt-3 text-neutral-500">
        In een paar stappen ben je aangemeld. Na goedkeuring ontvang je leads uit jouw werkgebied.
      </p>
      <ol className="mt-6 space-y-2">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3 text-sm text-neutral-700">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <ul className="mt-6 space-y-1 text-sm text-neutral-600">
        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Geen abonnementsverplichting — betaal per lead</li>
        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-success-500" /> Jij bepaalt je diensten en werkgebied</li>
      </ul>
      <div className="mt-8">
        <Link href="/aanmelden-vakman/bedrijf"><Button size="lg" variant="accent">Start aanmelding</Button></Link>
      </div>
    </div>
  );
}
