import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { listCustomers } from "@/features/customers/server/queries";

export const dynamic = "force-dynamic";

export default async function KlantenPage() {
  const company = await getCurrentCompany();
  const customers = company ? await listCustomers(company.id) : [];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <PageHeading title="Klanten" subtitle="Je klantenbestand — koppelbaar aan offertes." />
        <Link href="/dashboard/klanten/nieuw" className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700">
          <Plus className="h-4 w-4" /> Nieuwe klant
        </Link>
      </div>

      {customers.length === 0 ? (
        <EmptyState>
          Nog geen klanten.{" "}
          <Link href="/dashboard/klanten/nieuw" className="font-medium text-primary-600 hover:underline">Voeg je eerste klant toe</Link>.
        </EmptyState>
      ) : (
        <div className="mt-4 overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Naam</th>
                <th className="hidden p-3 sm:table-cell">Contact</th>
                <th className="hidden p-3 md:table-cell">Plaats</th>
                <th className="p-3">Offertes</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t border-neutral-100">
                  <td className="p-3 font-medium text-neutral-900">{c.name}</td>
                  <td className="hidden p-3 text-neutral-600 sm:table-cell">{[c.phone, c.email].filter(Boolean).join(" · ") || "—"}</td>
                  <td className="hidden p-3 text-neutral-600 md:table-cell">{c.city ?? "—"}</td>
                  <td className="p-3 text-neutral-600">{c._count.quotes}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/dashboard/offertes/nieuw?customerId=${c.id}`} className="font-medium text-neutral-600 hover:underline">Offerte</Link>
                      <Link href={`/dashboard/klanten/${c.id}`} className="font-medium text-primary-600 hover:underline">Bekijken</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
