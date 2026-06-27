import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { prisma } from "@/lib/prisma";
import { ReanalyzeButton } from "@/features/photo-ai/components/reanalyze-button";

export default async function AdminLeads() {
  const leads = await prisma.leadRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { service: true, municipality: true },
  });

  // Laatste foto-analyse per lead (geen relatie op LeadRequest, dus apart ophalen).
  const analyses = await prisma.photoAnalysis.findMany({
    where: { leadId: { in: leads.map((l) => l.id) } },
    orderBy: { createdAt: "desc" },
    select: { leadId: true, status: true, riskLevel: true, confidence: true, provider: true },
  });
  const photoByLead = new Map<string, { status: string; riskLevel: string; confidence: number; provider: string }>();
  for (const a of analyses) if (a.leadId && !photoByLead.has(a.leadId)) photoByLead.set(a.leadId, a);

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
          {
            key: "photo",
            label: "Foto-analyse",
            render: (l) => {
              const p = photoByLead.get(l.id);
              if (!p) return <span className="text-xs text-neutral-300">—</span>;
              return (
                <span className="inline-flex items-center gap-1 text-xs">
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-600">{p.status}</span>
                  {p.status === "COMPLETED" && (
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-600">{p.provider} · {p.riskLevel} · {Math.round(p.confidence * 100)}%</span>
                  )}
                </span>
              );
            },
          },
          {
            key: "reanalyze",
            label: "",
            render: (l) => (photoByLead.has(l.id) ? <ReanalyzeButton leadId={l.id} allowForce compact /> : <span className="text-xs text-neutral-300">—</span>),
          },
          { key: "date", label: "Datum", render: (l) => l.createdAt.toLocaleDateString("nl-NL") },
        ]}
      />
    </div>
  );
}
