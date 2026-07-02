import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { Card, CardContent } from "@repo/ui";
import { getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { ContractorSettingsForm } from "@/features/contractor-settings/components/settings-form";

export const dynamic = "force-dynamic";

export default async function DashboardSettings() {
  const company = await getCurrentCompany();
  const settings = company ? await prisma.contractorSettings.findUnique({ where: { companyId: company.id } }) : null;

  return (
    <div>
      <PageHeading title="Instellingen" subtitle="Bedrijfsprofiel en offerte-voorkeuren." />
      {!company ? (
        <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>
      ) : (
        <div className="space-y-8">
          <Card>
            <CardContent>
              <dl className="space-y-2 text-sm">
                <Row label="Bedrijfsnaam" value={company.name} />
                <Row label="E-mail" value={company.email} />
                <Row label="Telefoon" value={company.phone} />
                <Row label="Status" value={company.status} />
                <Row label="Creditsaldo" value={String(company.creditBalance)} />
              </dl>
            </CardContent>
          </Card>

          <div>
            <h2 className="mb-1 text-sm font-semibold text-neutral-900">Offerte- & factuurinstellingen</h2>
            <p className="mb-3 text-sm text-neutral-500">Deze waarden worden automatisch voorgevuld bij nieuwe offertes en facturen.</p>
            <ContractorSettingsForm
              initial={{
                defaultVatRate: settings?.defaultVatRate ?? 21,
                defaultValidityDays: settings?.defaultValidityDays ?? 30,
                quotePrefix: settings?.quotePrefix ?? "OFF",
                iban: settings?.iban ?? "",
                defaultWarranty: settings?.defaultWarranty ?? "",
                defaultTerms: settings?.defaultTerms ?? "",
                footerNote: settings?.footerNote ?? "",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-neutral-100 py-2">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="font-medium text-neutral-900">{value}</dd>
    </div>
  );
}
