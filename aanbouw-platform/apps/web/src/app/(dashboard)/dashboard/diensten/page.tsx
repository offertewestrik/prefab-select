import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { prisma } from "@/lib/prisma";
import { getCurrentCompany } from "@/lib/guards";
import { getServicesByCategory } from "@/features/catalog/server/queries";
import { ServicesPicker } from "@/features/installers/components/services-picker";

export default async function DashboardServices() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;

  const [categories, current] = await Promise.all([
    getServicesByCategory(),
    prisma.companyService.findMany({ where: { companyId: company.id }, select: { serviceId: true } }),
  ]);

  return (
    <div>
      <PageHeading title="Diensten" subtitle="Beheer voor welke diensten je leads ontvangt." />
      <ServicesPicker
        categories={categories.map((c) => ({ id: c.id, name: c.name, services: c.services.map((s) => ({ id: s.id, name: s.name })) }))}
        selected={current.map((c) => c.serviceId)}
      />
    </div>
  );
}
