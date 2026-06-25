import Link from "next/link";
import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@repo/ui";
import { companyStatusLabels } from "@repo/core";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { profileCompleteness } from "@/features/installers/server/onboarding";

export default async function DashboardOverview() {
  const company = await getCurrentCompany();

  const counts = company
    ? await prisma.installerCompany.findUnique({
        where: { id: company.id },
        include: { _count: { select: { services: true, coverage: true } } },
      })
    : null;

  const completeness = counts
    ? profileCompleteness({
        name: counts.name,
        phone: counts.phone,
        contactName: counts.contactName,
        kvk: counts.kvk,
        city: counts.city,
        servicesCount: counts._count.services,
        coverageCount: counts._count.coverage,
      })
    : 0;

  const [newLeads, quotes, reviews] = company
    ? await Promise.all([
        prisma.leadMatch.count({ where: { companyId: company.id, status: "OFFERED" } }),
        prisma.quote.count({ where: { companyId: company.id } }),
        prisma.review.count({ where: { companyId: company.id, status: "PUBLISHED" } }),
      ])
    : [0, 0, 0];

  const status = company?.status ?? "DRAFT";

  return (
    <div>
      <PageHeading title={company ? `Welkom, ${company.name}` : "Dashboard"} />

      {/* Statusbanner */}
      {status !== "APPROVED" && (
        <div className="mb-6 flex items-start gap-3 rounded-[var(--radius-xl)] border border-accent-500/30 bg-accent-500/5 p-4">
          {status === "PENDING_REVIEW" ? <Clock className="h-5 w-5 text-accent-600" /> : <AlertTriangle className="h-5 w-5 text-accent-600" />}
          <div className="text-sm">
            <div className="font-semibold text-neutral-900">Status: {companyStatusLabels[status]}</div>
            <p className="mt-0.5 text-neutral-600">
              {status === "DRAFT" && (
                <>Je profiel is nog niet ingediend. <Link href="/aanmelden-vakman/controle" className="font-medium text-primary-600">Rond je aanmelding af</Link> om leads te ontvangen.</>
              )}
              {status === "PENDING_REVIEW" && "Je profiel wordt beoordeeld. Je ontvangt nog geen leads tot je bent goedgekeurd."}
              {status === "REJECTED" && "Je aanmelding is afgewezen. Neem contact met ons op."}
              {status === "SUSPENDED" && "Je account is geschorst. Neem contact met ons op."}
            </p>
          </div>
        </div>
      )}
      {status === "APPROVED" && (
        <div className="mb-6 flex items-center gap-2 rounded-[var(--radius-md)] bg-success-500/10 px-3 py-2 text-sm text-success-500">
          <CheckCircle2 className="h-4 w-4" /> Je profiel is goedgekeurd — je ontvangt leads uit je werkgebied.
        </div>
      )}

      {/* Profiel-compleetheid */}
      {company && (
        <Card className="mb-6">
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-neutral-900">Profiel-compleetheid</span>
              <span className="text-neutral-500">{completeness}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full bg-primary-500" style={{ width: `${completeness}%` }} />
            </div>
            <div className="mt-3 flex gap-4 text-sm">
              <Link href="/dashboard/diensten" className="font-medium text-primary-600 hover:underline">Diensten beheren</Link>
              <Link href="/dashboard/werkgebied" className="font-medium text-primary-600 hover:underline">Werkgebied beheren</Link>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Nieuwe leads", value: newLeads },
          { label: "Offertes", value: quotes },
          { label: "Reviews", value: reviews },
          { label: "Credits", value: company?.creditBalance ?? 0 },
        ].map((k) => (
          <Card key={k.label}>
            <CardContent>
              <div className="text-sm text-neutral-500">{k.label}</div>
              <div className="mt-1 text-3xl font-bold text-neutral-900">{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
