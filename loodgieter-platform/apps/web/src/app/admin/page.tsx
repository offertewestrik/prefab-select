import { Card, CardContent } from "@repo/ui";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { prisma } from "@/lib/prisma";

export default async function AdminOverview() {
  const [services, cities, leads, installers, articles] = await Promise.all([
    prisma.service.count(),
    prisma.municipality.count(),
    prisma.leadRequest.count(),
    prisma.installerCompany.count(),
    prisma.article.count(),
  ]);

  const kpis = [
    { label: "Diensten", value: services },
    { label: "Gemeenten", value: cities },
    { label: "Leads", value: leads },
    { label: "Vakmannen", value: installers },
    { label: "Artikelen", value: articles },
  ];

  return (
    <div>
      <PageHeading title="Admin-overzicht" subtitle="Beheer diensten, steden, SEO en leads." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
