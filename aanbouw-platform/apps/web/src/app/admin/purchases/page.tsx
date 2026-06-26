import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { prisma } from "@/lib/prisma";

export default async function AdminPurchases() {
  const purchases = await prisma.leadPurchase.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      company: true,
      match: { include: { lead: { include: { service: true, municipality: true } } } },
    },
  });

  return (
    <div>
      <PageHeading title="Aankopen" subtitle={`${purchases.length} gekochte leads (admin ziet alles).`} />
      <AdminTable
        rows={purchases}
        empty="Er zijn nog geen leads gekocht."
        columns={[
          { key: "company", label: "Vakman", render: (p) => <span className="font-medium text-neutral-900">{p.company.name}</span> },
          { key: "service", label: "Dienst", render: (p) => p.match.lead.service.name },
          { key: "city", label: "Plaats", render: (p) => p.match.lead.municipality.name },
          { key: "credits", label: "Credits", render: (p) => p.creditsSpent },
          { key: "date", label: "Datum", render: (p) => p.createdAt.toLocaleDateString("nl-NL") },
        ]}
      />
    </div>
  );
}
