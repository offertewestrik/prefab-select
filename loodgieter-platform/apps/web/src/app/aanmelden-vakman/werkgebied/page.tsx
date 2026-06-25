import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentCompany } from "@/lib/guards";
import { getCitiesByProvince } from "@/features/geo/server/queries";
import { CoveragePicker } from "@/features/installers/components/coverage-picker";

export default async function OnboardingCoverage() {
  const company = await getCurrentCompany();
  if (!company) redirect("/aanmelden-vakman/bedrijf");

  const [provinces, current] = await Promise.all([
    getCitiesByProvince(),
    prisma.companyCoverage.findMany({ where: { companyId: company.id }, select: { municipalityId: true, radiusKm: true } }),
  ]);
  const selected = current.map((c) => c.municipalityId).filter((x): x is string => !!x);

  return (
    <div>
      <p className="text-sm font-medium text-primary-600">Stap 3 van 4</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">In welk gebied werk je?</h1>
      <p className="mt-2 text-neutral-500">Kies de gemeenten waar je actief bent.</p>
      <div className="mt-6">
        <CoveragePicker
          provinces={provinces.map((p) => ({ id: p.id, name: p.name, municipalities: p.municipalities.map((m) => ({ id: m.id, name: m.name })) }))}
          selected={selected}
          radiusKm={current[0]?.radiusKm ?? undefined}
          next="/aanmelden-vakman/controle"
          submitLabel="Opslaan en verder"
        />
      </div>
    </div>
  );
}
