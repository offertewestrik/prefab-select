import type { Metadata } from "next";
import Link from "next/link";
import { brand, regionsSentence } from "@repo/core";
import { Button } from "@repo/ui";
import { UspGrid } from "@/components/marketing/trust/usp-grid";
import { StatsBand } from "@/components/marketing/trust/stats-band";
import { BrandWall } from "@/components/marketing/trust/brand-wall";
import { CertificationWall } from "@/components/marketing/trust/certification-wall";
import { LeadCta } from "@/components/marketing/lead-cta";

export const metadata: Metadata = {
  title: "Keurmerken & A-merken — waarom kiezen voor ons",
  description: `Het Trust Center van ${brand.name}: erkende keurmerken (InstallQ, Kiwa, KOMO, VCA, STEK), A-merken en garanties. Vergelijk gecertificeerde loodgieters in ${regionsSentence()}.`,
  alternates: { canonical: "/keurmerken" },
};

export default function TrustCenterPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-gradient-to-b from-primary-50/60 to-white">
        <div className="mx-auto max-w-(--container-max) px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Trust Center</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl">
              Betrouwbaar, gecertificeerd en met garantie
            </h1>
            <p className="mt-5 text-lg text-neutral-500">
              Bij {brand.name} werk je uitsluitend met gecertificeerde vakmannen die
              voldoen aan de hoogste kwaliteitseisen en werken met erkende A-merken.
              Zo weet je zeker dat je klus in goede handen is.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/aanvraag">
                <Button size="lg" variant="accent">Vraag gratis offertes aan</Button>
              </Link>
              <Link href="/vakmannen">
                <Button size="lg" variant="outline">Bekijk vakmannen</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <StatsBand />
      <CertificationWall />
      <BrandWall />
      <UspGrid title="Wat je van ons mag verwachten" subtitle="Twaalf zekerheden bij elke aanvraag." />

      <div className="mx-auto max-w-(--container-max) px-6 py-12">
        <LeadCta />
      </div>
    </main>
  );
}
