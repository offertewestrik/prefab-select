import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentCompany } from "@/lib/guards";
import { getServicesByCategory } from "@/features/catalog/server/queries";
import { ServicesPicker } from "@/features/installers/components/services-picker";

export default async function OnboardingServices() {
  const company = await getCurrentCompany();
  if (!company) redirect("/aanmelden-vakman/bedrijf");

  const [categories, current] = await Promise.all([
    getServicesByCategory(),
    prisma.companyService.findMany({ where: { companyId: company.id }, select: { serviceId: true } }),
  ]);

  return (
    <div>
      <p className="text-sm font-medium text-primary-600">Stap 2 van 4</p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">Welke diensten bied je aan?</h1>
      <p className="mt-2 text-neutral-500">Je ontvangt alleen leads voor de diensten die je selecteert.</p>
      <div className="mt-6">
        <ServicesPicker
          categories={categories.map((c) => ({ id: c.id, name: c.name, services: c.services.map((s) => ({ id: s.id, name: s.name })) }))}
          selected={current.map((c) => c.serviceId)}
          next="/aanmelden-vakman/werkgebied"
          submitLabel="Opslaan en verder"
        />
      </div>
    </div>
  );
}
