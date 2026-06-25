import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@repo/core";
import { Button } from "@repo/ui";

export const metadata: Metadata = {
  title: "Word partner",
  robots: { index: false, follow: true },
};

// Basis-stub. De volledige vakman-onboarding (account + bedrijf + werkgebied +
// goedkeuring) wordt in de volgende fase uitgewerkt.
export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Word partner van {brand.shortName}</h1>
      <p className="mt-3 text-neutral-500">
        De online aanmelding voor vakmannen wordt binnenkort geopend. Wil je nu al
        aansluiten? Neem contact met ons op, dan zetten we je account klaar.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/contact">
          <Button variant="accent">Neem contact op</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline">Inloggen</Button>
        </Link>
      </div>
    </main>
  );
}
