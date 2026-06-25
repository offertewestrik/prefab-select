import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@repo/ui";
import { prisma } from "@/lib/prisma";
import { getCurrentCompany } from "@/lib/guards";
import { submitForReviewAction } from "@/features/installers/server/actions";

export default async function OnboardingReview() {
  const current = await getCurrentCompany();
  if (!current) redirect("/aanmelden-vakman/bedrijf");

  const company = await prisma.installerCompany.findUniqueOrThrow({
    where: { id: current.id },
    include: {
      services: { include: { service: true } },
      coverage: { include: { municipality: true } },
    },
  });

  const hasServices = company.services.length > 0;
  const hasCoverage = company.coverage.length > 0;
  const complete = hasServices && hasCoverage;

  return (
    <div>
      <p className="text-sm font-medium text-primary-600">Stap 4 van 4</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">Controleer en dien in</h1>

      <div className="mt-6 space-y-4">
        <Section title="Bedrijf" editHref="/aanmelden-vakman/bedrijf">
          {company.name} · {company.phone} · {company.email}
          {company.city ? ` · ${company.city}` : ""}
        </Section>
        <Section title={`Diensten (${company.services.length})`} editHref="/aanmelden-vakman/diensten">
          {hasServices ? company.services.map((s) => s.service.name).join(", ") : <span className="text-[color:var(--color-status-danger,#DC2626)]">Nog geen diensten gekozen</span>}
        </Section>
        <Section title={`Werkgebied (${company.coverage.length})`} editHref="/aanmelden-vakman/werkgebied">
          {hasCoverage ? company.coverage.map((c) => c.municipality?.name).filter(Boolean).join(", ") : <span className="text-[color:var(--color-status-danger,#DC2626)]">Nog geen werkgebied ingesteld</span>}
        </Section>
      </div>

      <form action={submitForReviewAction} className="mt-8">
        <Button type="submit" variant="accent" size="lg" disabled={!complete}>Indienen ter beoordeling</Button>
        {!complete && <p className="mt-2 text-sm text-neutral-500">Vul eerst je diensten én werkgebied in.</p>}
      </form>
    </div>
  );
}

function Section({ title, editHref, children }: { title: string; editHref: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-neutral-900">{title}</h2>
        <Link href={editHref} className="text-sm font-medium text-primary-600 hover:underline">Wijzig</Link>
      </div>
      <div className="mt-1 text-sm text-neutral-600">{children}</div>
    </div>
  );
}
