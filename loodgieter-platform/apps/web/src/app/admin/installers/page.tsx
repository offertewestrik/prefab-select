import Link from "next/link";
import { companyStatusLabels, type CompanyStatus } from "@repo/core";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { prisma } from "@/lib/prisma";

export default async function AdminInstallers() {
  const installers = await prisma.installerCompany.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    take: 200,
    include: { _count: { select: { services: true, coverage: true } } },
  });

  return (
    <div>
      <PageHeading title="Vakmannen" subtitle="Aanmeldingen beoordelen en bedrijven beheren." />
      <AdminTable
        rows={installers}
        empty="Er zijn nog geen vakmannen geregistreerd."
        columns={[
          { key: "name", label: "Bedrijf", render: (c) => <span className="font-medium text-neutral-900">{c.name}</span> },
          { key: "status", label: "Status", render: (c) => companyStatusLabels[c.status as CompanyStatus] ?? c.status },
          { key: "svc", label: "Diensten", render: (c) => c._count.services },
          { key: "cov", label: "Gemeenten", render: (c) => c._count.coverage },
          { key: "credits", label: "Credits", render: (c) => c.creditBalance },
          { key: "act", label: "", render: (c) => <Link href={`/admin/installers/${c.id}`} className="font-medium text-primary-600 hover:underline">Bekijk</Link> },
        ]}
      />
    </div>
  );
}
