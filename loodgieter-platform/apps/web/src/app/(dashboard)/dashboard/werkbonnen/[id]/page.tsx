import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { getWorkOrder } from "@/features/workorders/server/service";
import { parseLineItems } from "@/features/quotes/server/queries";
import { WorkOrderEditor } from "@/features/workorders/components/workorder-editor";

export const dynamic = "force-dynamic";

export default async function WorkOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) redirect("/dashboard");
  const wo = await getWorkOrder(id, company.id);
  if (!wo) notFound();

  return (
    <div>
      <Link href="/dashboard/werkbonnen" className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="h-4 w-4" /> Terug naar werkbonnen
      </Link>
      <PageHeading title={`Werkbon ${wo.number}`} subtitle={wo.quote ? `Vanuit offerte ${wo.quote.number}` : undefined} />
      <WorkOrderEditor
        workOrderId={wo.id}
        status={wo.status}
        initial={{
          description: wo.description ?? "",
          hoursWorked: wo.hoursWorked,
          customerName: wo.customerName ?? wo.customer?.name ?? "",
          address: wo.address ?? "",
          notes: wo.notes ?? "",
          signedByName: wo.signedByName,
          lineItems: parseLineItems(wo.lineItems).map((li) => ({ description: li.description, qty: li.qty, unitPriceCents: li.unitPriceCents, kind: li.kind })),
        }}
      />
    </div>
  );
}
