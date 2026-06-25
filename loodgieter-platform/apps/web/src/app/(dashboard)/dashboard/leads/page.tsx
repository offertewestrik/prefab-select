import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { priceRange } from "@/lib/format";

export default async function DashboardLeads() {
  const company = await getCurrentCompany();
  const matches = company
    ? await prisma.leadMatch.findMany({
        where: { companyId: company.id, status: { in: ["OFFERED", "VIEWED"] } },
        orderBy: { offeredAt: "desc" },
        include: { lead: { include: { service: true, municipality: true } } },
      })
    : [];

  return (
    <div>
      <PageHeading title="Nieuwe leads" subtitle="Beschikbare aanvragen in jouw werkgebied." />
      {matches.length === 0 ? (
        <EmptyState>Er zijn op dit moment geen nieuwe leads.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Dienst</th>
                <th className="p-3">Plaats</th>
                <th className="p-3">Prijsindicatie</th>
                <th className="p-3">Credits</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => (
                <tr key={m.id} className="border-t border-neutral-100">
                  <td className="p-3 font-medium text-neutral-900">{m.lead.service.name}</td>
                  <td className="p-3">{m.lead.municipality.name}</td>
                  <td className="p-3">{priceRange(m.lead.service.priceFrom, m.lead.service.priceTo)}</td>
                  <td className="p-3">{m.priceCredits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
