import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { prisma } from "@/lib/prisma";
import { getCurrentCompany } from "@/lib/guards";
import { getCitiesByProvince } from "@/features/geo/server/queries";
import { CoveragePicker } from "@/features/installers/components/coverage-picker";
import { CoverageMap } from "@/components/marketing/coverage-map";

export default async function DashboardCoverage() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;

  const [provinces, current] = await Promise.all([
    getCitiesByProvince(),
    prisma.companyCoverage.findMany({
      where: { companyId: company.id },
      select: { municipalityId: true, radiusKm: true, municipality: { select: { name: true, lat: true, lng: true } } },
    }),
  ]);

  const municipalities = current
    .map((c) => c.municipality)
    .filter((m): m is NonNullable<typeof m> => !!m)
    .map((m) => ({ name: m.name, lat: m.lat, lng: m.lng }));
  const homeBase =
    (company.city && municipalities.find((m) => m.name.toLowerCase() === company.city!.toLowerCase())) || null;

  return (
    <div>
      <PageHeading title="Werkgebied" subtitle="Beheer in welke gemeenten je leads ontvangt en zie je gebied op de kaart." />

      <div className="mb-8">
        <CoverageMap municipalities={municipalities} homeBase={homeBase} radiusKm={current[0]?.radiusKm ?? null} height={300} />
      </div>

      <CoveragePicker
        provinces={provinces.map((p) => ({ id: p.id, name: p.name, municipalities: p.municipalities.map((m) => ({ id: m.id, name: m.name })) }))}
        selected={current.map((c) => c.municipalityId).filter((x): x is string => !!x)}
        radiusKm={current[0]?.radiusKm ?? undefined}
      />
    </div>
  );
}
