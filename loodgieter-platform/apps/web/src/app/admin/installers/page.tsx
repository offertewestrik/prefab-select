import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { prisma } from "@/lib/prisma";

export default async function AdminInstallers() {
  const installers = await prisma.installerCompany.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <PageHeading title="Vakmannen" subtitle="Bedrijven goedkeuren en beheren." />
      <AdminTable
        rows={installers}
        empty="Er zijn nog geen vakmannen geregistreerd."
        columns={[
          { key: "name", label: "Bedrijf", render: (c) => <span className="font-medium text-neutral-900">{c.name}</span> },
          { key: "status", label: "Status", render: (c) => c.status },
          { key: "rating", label: "Beoordeling", render: (c) => (c.ratingCount > 0 ? `${c.ratingAvg.toFixed(1)} (${c.ratingCount})` : "—") },
          { key: "credits", label: "Credits", render: (c) => c.creditBalance },
        ]}
      />
    </div>
  );
}
