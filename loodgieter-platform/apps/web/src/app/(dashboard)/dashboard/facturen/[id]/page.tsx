import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { euro } from "@/lib/format";
import { getInvoiceForCompany } from "@/features/invoices/server/service";
import { setInvoiceStatusAction } from "@/features/invoices/server/actions";
import { parseLineItems } from "@/features/quotes/server/queries";

export const dynamic = "force-dynamic";

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) redirect("/dashboard");
  const inv = await getInvoiceForCompany(id, company.id);
  if (!inv) notFound();
  const items = parseLineItems(inv.lineItems);

  return (
    <div>
      <Link href="/dashboard/facturen" className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="h-4 w-4" /> Terug naar facturen
      </Link>
      <div className="flex items-center justify-between gap-4">
        <PageHeading title={`Factuur ${inv.number}`} subtitle={inv.customerName ?? inv.customer?.name ?? undefined} />
        <a href={`/dashboard/facturen/${inv.id}/pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:border-neutral-300">
          📄 PDF
        </a>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <Info label="Status" value={inv.status} />
        <Info label="Bedrag incl. btw" value={euro(inv.amountCents / 100)} />
        <Info label="Vervaldatum" value={inv.dueDate ? inv.dueDate.toLocaleDateString("nl-NL") : "—"} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["PAID", "OPEN", "OVERDUE", "CANCELLED"] as const).map((st) => (
          <form action={setInvoiceStatusAction} key={st}>
            <input type="hidden" name="id" value={inv.id} />
            <input type="hidden" name="status" value={st} />
            <button className={`rounded-[var(--radius-md)] border px-3 py-1.5 text-sm font-medium ${inv.status === st ? "border-primary-500 bg-primary-50 text-primary-700" : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300"}`}>
              {st === "PAID" ? "Betaald" : st === "OPEN" ? "Open" : st === "OVERDUE" ? "Verlopen" : "Annuleren"}
            </button>
          </form>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500"><tr><th className="p-3">Omschrijving</th><th className="p-3 text-right">Aantal</th><th className="p-3 text-right">Stukprijs</th><th className="p-3 text-right">Totaal</th></tr></thead>
          <tbody>
            {items.filter((li) => !li.optional).map((li, i) => (
              <tr key={i} className="border-t border-neutral-100">
                <td className="p-3 text-neutral-900">{li.description}</td>
                <td className="p-3 text-right">{li.qty}</td>
                <td className="p-3 text-right">{euro(li.unitPriceCents / 100)}</td>
                <td className="p-3 text-right">{euro((li.qty * li.unitPriceCents) / 100)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-neutral-200 p-3 text-right text-sm">
          <div className="text-neutral-500">Subtotaal: {euro(inv.subtotalCents / 100)}{inv.discountCents ? ` · Korting: ${euro(inv.discountCents / 100)}` : ""} · Btw ({inv.vatRate}%): {euro(inv.vatCents / 100)}</div>
          <div className="mt-1 text-base font-bold text-neutral-900">Totaal: {euro(inv.amountCents / 100)}</div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-neutral-200 bg-white p-3">
      <div className="text-xs uppercase text-neutral-400">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-neutral-900">{value}</div>
    </div>
  );
}
