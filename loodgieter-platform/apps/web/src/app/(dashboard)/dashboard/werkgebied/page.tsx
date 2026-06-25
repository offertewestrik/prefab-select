import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { prisma } from "@/lib/prisma";
import { getCurrentCompany } from "@/lib/guards";
import { getCitiesByProvince } from "@/features/geo/server/queries";
import { CoveragePicker } from "@/features/installers/components/coverage-picker";

export default async function DashboardCoverage() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;

  const [provinces, current] = await Promise.all([
    getCitiesByProvince(),
    prisma.companyCoverage.findMany({ where: { companyId: company.id }, select: { municipalityId: true, radiusKm: true } }),
  ]);

  return (
    <div>
      <PageHeading title="Werkgebied" subtitle="Beheer in welke gemeenten je leads ontvangt." />
      <CoveragePicker
        provinces={provinces.map((p) => ({ id: p.id, name: p.name, municipalities: p.municipalities.map((m) => ({ id: m.id, name: m.name })) }))}
        selected={current.map((c) => c.municipalityId).filter((x): x is string => !!x)}
        radiusKm={current[0]?.radiusKm ?? undefined}
      />
    </div>
  );
}
