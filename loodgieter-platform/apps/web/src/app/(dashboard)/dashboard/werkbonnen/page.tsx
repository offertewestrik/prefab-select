import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { listWorkOrders } from "@/features/workorders/server/service";
import { createWorkOrderAction } from "@/features/workorders/server/actions";

export const dynamic = "force-dynamic";

const STATUS: Record<string, string> = { DRAFT: "Concept", COMPLETED: "Ingevuld", SIGNED: "Ondertekend" };

export default async function WerkbonnenPage() {
  const company = await getCurrentCompany();
  const orders = company ? await listWorkOrders(company.id) : [];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <PageHeading title="Werkbonnen" subtitle="Leg op locatie vast wat je hebt uitgevoerd en laat de klant aftekenen." />
        <form action={createWorkOrderAction}>
          <button className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
            <Plus className="h-4 w-4" /> Nieuwe werkbon
          </button>
        </form>
      </div>

      {orders.length === 0 ? (
        <EmptyState>Nog geen werkbonnen.</EmptyState>
      ) : (
        <div className="mt-4 overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500"><tr><th className="p-3">Nummer</th><th className="hidden p-3 sm:table-cell">Klant</th><th className="p-3">Uren</th><th className="p-3">Status</th><th className="p-3"></th></tr></thead>
            <tbody>
              {orders.map((w) => (
                <tr key={w.id} className="border-t border-neutral-100">
                  <td className="p-3 font-medium text-neutral-900">{w.number}</td>
                  <td className="hidden p-3 text-neutral-600 sm:table-cell">{w.customerName ?? w.customer?.name ?? "—"}</td>
                  <td className="p-3 text-neutral-600">{w.hoursWorked}</td>
                  <td className="p-3 text-neutral-600">{STATUS[w.status] ?? w.status}</td>
                  <td className="p-3 text-right"><Link href={`/dashboard/werkbonnen/${w.id}`} className="font-medium text-primary-600 hover:underline">Openen</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
