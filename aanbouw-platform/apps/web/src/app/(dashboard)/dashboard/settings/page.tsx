import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { Card, CardContent } from "@repo/ui";
import { getCurrentCompany } from "@/lib/guards";

export default async function DashboardSettings() {
  const company = await getCurrentCompany();

  return (
    <div>
      <PageHeading title="Instellingen" subtitle="Bedrijfsprofiel en voorkeuren." />
      {!company ? (
        <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>
      ) : (
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
