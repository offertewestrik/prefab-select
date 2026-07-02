import Link from "next/link";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { euro } from "@/lib/format";
import { listInvoices } from "@/features/invoices/server/service";

export const dynamic = "force-dynamic";

const STATUS: Record<string, { label: string; cls: string }> = {
  OPEN: { label: "Open", cls: "bg-amber-100 text-amber-700" },
  PAID: { label: "Betaald", cls: "bg-green-100 text-green-700" },
  OVERDUE: { label: "Verlopen", cls: "bg-red-100 text-red-700" },
  CANCELLED: { label: "Geannuleerd", cls: "bg-neutral-100 text-neutral-500" },
};

export default async function FacturenPage() {
  const company = await getCurrentCompany();
  const invoices = company ? await listInvoices(company.id) : [];

  return (
    <div>
      <PageHeading title="Facturen" subtitle="Maak facturen vanuit geaccepteerde offertes en houd betalingen bij." />
      {invoices.length === 0 ? (
        <EmptyState>
          Nog geen facturen. Maak er een vanuit een <Link href="/dashboard/offertes" className="font-medium text-primary-600 hover:underline">geaccepteerde offerte</Link>.
        </EmptyState>
      ) : (
        <div className="mt-4 overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Nummer</th>
                <th className="hidden p-3 sm:table-cell">Klant</th>
                <th className="p-3">Bedrag</th>
                <th className="p-3">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => {
                const st = STATUS[inv.status] ?? { label: inv.status, cls: "bg-neutral-100 text-neutral-500" };
                return (
                  <tr key={inv.id} className="border-t border-neutral-100">
                    <td className="p-3 font-medium text-neutral-900">{inv.number}</td>
                    <td className="hidden p-3 text-neutral-600 sm:table-cell">{inv.customerName ?? inv.customer?.name ?? "—"}</td>
                    <td className="p-3">{euro(inv.amountCents / 100)}</td>
                    <td className="p-3"><span className={`rounded px-2 py-0.5 text-xs font-medium ${st.cls}`}>{st.label}</span></td>
                    <td className="p-3 text-right"><Link href={`/dashboard/facturen/${inv.id}`} className="font-medium text-primary-600 hover:underline">Openen</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
