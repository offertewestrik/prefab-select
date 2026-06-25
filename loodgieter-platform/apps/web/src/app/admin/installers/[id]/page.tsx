import Link from "next/link";
import { notFound } from "next/navigation";
import { companyStatusLabels, type CompanyStatus } from "@repo/core";
import { Button, Card, CardContent } from "@repo/ui";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { getCompanyForAdmin } from "@/features/installers/server/admin";
import { approveCompanyAction, rejectCompanyAction, suspendCompanyAction } from "@/features/installers/server/actions";

export default async function AdminInstallerDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = await getCompanyForAdmin(id);
  if (!company) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/installers" className="text-sm text-neutral-500 hover:text-neutral-900">← Vakmannen</Link>
        <PageHeading title={company.name} subtitle={`Status: ${companyStatusLabels[company.status as CompanyStatus]}`} />
      </div>

      <Card>
        <CardContent>
          <h2 className="font-semibold text-neutral-900">Bedrijfsgegevens</h2>
          <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <Row label="Contactpersoon" value={company.contactName} />
            <Row label="E-mail" value={company.email} />
            <Row label="Telefoon" value={company.phone} />
            <Row label="KVK" value={company.kvk} />
            <Row label="Btw" value={company.vatNumber} />
            <Row label="Website" value={company.website} />
            <Row label="Adres" value={[company.street, company.postcode, company.city, company.province].filter(Boolean).join(", ")} />
          </dl>
        </CardContent>
      </Card>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent>
            <h2 className="font-semibold text-neutral-900">Diensten ({company.services.length})</h2>
            <ul className="mt-2 text-sm text-neutral-700">
              {company.services.map((s) => <li key={s.serviceId}>{s.service.name}</li>)}
              {company.services.length === 0 && <li className="text-neutral-400">Geen</li>}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="font-semibold text-neutral-900">Werkgebied ({company.coverage.length})</h2>
            <ul className="mt-2 text-sm text-neutral-700">
              {company.coverage.map((c) => <li key={c.id}>{c.municipality?.name ?? "—"}</li>)}
              {company.coverage.length === 0 && <li className="text-neutral-400">Geen</li>}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Acties */}
      <div className="flex flex-wrap gap-3">
        <form action={approveCompanyAction}>
          <input type="hidden" name="companyId" value={company.id} />
          <Button type="submit" variant="accent" disabled={company.status === "APPROVED"}>Goedkeuren</Button>
        </form>
        <form action={rejectCompanyAction}>
          <input type="hidden" name="companyId" value={company.id} />
          <Button type="submit" variant="outline" disabled={company.status === "REJECTED"}>Afwijzen</Button>
        </form>
        <form action={suspendCompanyAction}>
          <input type="hidden" name="companyId" value={company.id} />
          <Button type="submit" variant="outline" disabled={company.status === "SUSPENDED"}>Schorsen</Button>
        </form>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between gap-4 border-b border-neutral-100 py-1.5">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="text-right font-medium text-neutral-900">{value || "—"}</dd>
    </div>
  );
}
