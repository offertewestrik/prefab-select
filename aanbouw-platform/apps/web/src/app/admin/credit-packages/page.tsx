import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { euro } from "@/lib/format";
import { getAllPackages } from "@/features/billing/server/packages";

export default async function AdminCreditPackages() {
  const packages = await getAllPackages();

  return (
    <div>
      <PageHeading title="Credit-pakketten" subtitle="De pakketten die bouwbedrijven kunnen kopen." />
      <AdminTable
        rows={packages}
        empty="Nog geen pakketten. Voeg ze toe via de seed of database."
        columns={[
          { key: "name", label: "Naam", render: (p) => <span className="font-medium text-neutral-900">{p.name}</span> },
          { key: "credits", label: "Credits", render: (p) => p.credits },
          { key: "price", label: "Prijs", render: (p) => euro(p.priceCents / 100) },
          { key: "active", label: "Actief", render: (p) => (p.active ? "ja" : "nee") },
        ]}
      />
    </div>
  );
}
