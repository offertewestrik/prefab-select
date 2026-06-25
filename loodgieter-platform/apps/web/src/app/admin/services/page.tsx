import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { prisma } from "@/lib/prisma";
import { priceRange } from "@/lib/format";

export default async function AdminServices() {
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
    include: { category: true },
  });

  return (
    <div>
      <PageHeading title="Diensten" subtitle={`${services.length} diensten. Bewerken volgt in de CMS-iteratie.`} />
      <AdminTable
        rows={services}
        columns={[
          { key: "name", label: "Naam", render: (s) => <span className="font-medium text-neutral-900">{s.name}</span> },
          { key: "cat", label: "Categorie", render: (s) => s.category.name },
          { key: "price", label: "Prijsindicatie", render: (s) => priceRange(s.priceFrom, s.priceTo, s.priceUnit) },
          { key: "publish", label: "Status", render: (s) => s.publish },
        ]}
      />
    </div>
  );
}
