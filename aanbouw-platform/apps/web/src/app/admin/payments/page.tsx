import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { prisma } from "@/lib/prisma";
import { euro } from "@/lib/format";
import { getAllPayments } from "@/features/billing/server/queries";
import { AdminAdjustForm } from "@/features/billing/components/admin-adjust-form";

export default async function AdminPayments() {
  const [payments, companies] = await Promise.all([
    getAllPayments(),
    prisma.installerCompany.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  return (
    <div className="space-y-8">
      <PageHeading title="Betalingen" subtitle="Alle credit-betalingen + handmatige correcties." />

      <div>
        <h2 className="mb-2 text-sm font-semibold text-neutral-900">Handmatig credits toevoegen / corrigeren</h2>
        <AdminAdjustForm companies={companies} />
      </div>

      <AdminTable
        rows={payments}
        empty="Er zijn nog geen betalingen."
        columns={[
          { key: "company", label: "Vakman", render: (p) => <span className="font-medium text-neutral-900">{p.company.name}</span> },
          { key: "pkg", label: "Pakket", render: (p) => p.package?.name ?? "—" },
          { key: "credits", label: "Credits", render: (p) => p.credits },
          { key: "amount", label: "Bedrag", render: (p) => euro(p.amountCents / 100) },
          { key: "status", label: "Status", render: (p) => p.status },
          { key: "date", label: "Datum", render: (p) => p.createdAt.toLocaleDateString("nl-NL") },
        ]}
      />
    </div>
  );
}
