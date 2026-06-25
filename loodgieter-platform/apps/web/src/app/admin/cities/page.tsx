import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { prisma } from "@/lib/prisma";

export default async function AdminCities() {
  const cities = await prisma.municipality.findMany({
    orderBy: { population: "desc" },
    include: { province: true },
    take: 500,
  });

  return (
    <div>
      <PageHeading title="Steden" subtitle={`${cities.length} gemeenten. (De)activeren stuurt de SEO-pagina's aan.`} />
      <AdminTable
        rows={cities}
        columns={[
          { key: "name", label: "Gemeente", render: (c) => <span className="font-medium text-neutral-900">{c.name}</span> },
          { key: "prov", label: "Provincie", render: (c) => c.province.name },
          { key: "pop", label: "Inwoners", render: (c) => c.population?.toLocaleString("nl-NL") ?? "—" },
          { key: "publish", label: "Status", render: (c) => c.publish },
        ]}
      />
    </div>
  );
}
