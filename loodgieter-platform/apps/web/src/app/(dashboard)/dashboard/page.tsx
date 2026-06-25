import { Card, CardContent } from "@repo/ui";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { prisma } from "@/lib/prisma";

export default async function DashboardOverview() {
  const company = await getCurrentCompany();

  const [newLeads, quotes, reviews] = company
    ? await Promise.all([
        prisma.leadMatch.count({ where: { companyId: company.id, status: "OFFERED" } }),
        prisma.quote.count({ where: { companyId: company.id } }),
        prisma.review.count({ where: { companyId: company.id, status: "PUBLISHED" } }),
      ])
    : [0, 0, 0];

  const kpis = [
    { label: "Nieuwe leads", value: newLeads },
    { label: "Offertes", value: quotes },
    { label: "Reviews", value: reviews },
    { label: "Credits", value: company?.creditBalance ?? 0 },
  ];

  return (
    <div>
      <PageHeading
        title={company ? `Welkom, ${company.name}` : "Dashboard"}
        subtitle={company ? undefined : "Je account is nog niet aan een bedrijf gekoppeld."}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent>
              <div className="text-sm text-neutral-500">{k.label}</div>
              <div className="mt-1 text-3xl font-bold text-neutral-900">{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
