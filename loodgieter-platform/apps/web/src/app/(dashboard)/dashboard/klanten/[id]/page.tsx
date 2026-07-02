import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { euro } from "@/lib/format";
import { getCustomer } from "@/features/customers/server/queries";
import { CustomerForm } from "@/features/customers/components/customer-form";
import { updateCustomerAction, deleteCustomerAction } from "@/features/customers/server/actions";
import { QuoteStatusBadge } from "@/features/quotes/components/quote-status-badge";

export const dynamic = "force-dynamic";

export default async function KlantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) redirect("/dashboard");
  const customer = await getCustomer(id, company.id);
  if (!customer) notFound();

  return (
    <div>
      <Link href="/dashboard/klanten" className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="h-4 w-4" /> Terug naar klanten
      </Link>
      <div className="flex items-center justify-between gap-4">
        <PageHeading title={customer.name} subtitle="Klantgegevens bewerken en offertes bekijken." />
        <Link href={`/dashboard/offertes/nieuw?customerId=${customer.id}`} className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
          <Plus className="h-4 w-4" /> Nieuwe offerte
        </Link>
      </div>

      <CustomerForm action={updateCustomerAction.bind(null, customer.id)} initial={customer} submitLabel="Wijzigingen opslaan" />

      {/* Offertes van deze klant */}
      <div className="mt-8">
        <h2 className="text-sm font-semibold text-neutral-900">Offertes van deze klant</h2>
        {customer.quotes.length === 0 ? (
          <p className="mt-2 text-sm text-neutral-500">Nog geen offertes.</p>
        ) : (
          <div className="mt-2 overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <tbody>
                {customer.quotes.map((q) => (
                  <tr key={q.id} className="border-b border-neutral-100 last:border-0">
                    <td className="p-3 font-medium text-neutral-900">{q.number}</td>
                    <td className="p-3">{euro(q.totalCents / 100)}</td>
                    <td className="p-3"><QuoteStatusBadge status={q.status} /></td>
                    <td className="p-3 text-right"><Link href={`/dashboard/offertes/${q.id}`} className="font-medium text-primary-600 hover:underline">Openen</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <form action={deleteCustomerAction} className="mt-8">
        <input type="hidden" name="customerId" value={customer.id} />
        <button className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-[color:var(--color-status-danger,#DC2626)]">
          <Trash2 className="h-4 w-4" /> Klant verwijderen
        </button>
      </form>
    </div>
  );
}
