import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { prisma } from "@/lib/prisma";

export default async function AdminLeads() {
  const leads = await prisma.leadRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { service: true, municipality: true },
  });

  return (
    <div>
      <PageHeading title="Leads" subtitle={`${leads.length} recente aanvragen.`} />
      <AdminTable
        rows={leads}
        empty="Er zijn nog geen leads binnengekomen."
        columns={[
          { key: "service", label: "Dienst", render: (l) => <span className="font-medium text-neutral-900">{l.service.name}</span> },
          { key: "city", label: "Plaats", render: (l) => l.municipality.name },
          { key: "name", label: "Naam", render: (l) => l.contactName },
          { key: "status", label: "Status", render: (l) => l.status },
          {
            key: "risk",
            label: "Risico",
            render: (l) =>
              l.fraudScore != null && l.fraudScore >= 70 ? (
                <span className="rounded-full bg-[color:var(--color-status-danger,#DC2626)]/10 px-2 py-0.5 text-xs font-medium text-[color:var(--color-status-danger,#DC2626)]">⚠ {l.fraudScore}</span>
              ) : (
                <span className="text-xs text-neutral-300">—</span>
              ),
          },
          { key: "date", label: "Datum", render: (l) => l.createdAt.toLocaleDateString("nl-NL") },
        ]}
      />
    </div>
  );
}
