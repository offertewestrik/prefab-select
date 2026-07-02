import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { euro } from "@/lib/format";
import { listCompanyTemplates, listPlatformTemplates } from "@/features/pricing/server/queries";
import { createEmptyTemplateAction, copyPlatformTemplateAction } from "@/features/pricing/server/actions";

export const dynamic = "force-dynamic";

export default async function PrijzenPage() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;

  const [mine, platform] = await Promise.all([listCompanyTemplates(company.id), listPlatformTemplates()]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <PageHeading title="Prijzen & templates" subtitle="Beheer je eigen tarieven. Deze verschijnen bij het maken van een offerte." />
        <form action={createEmptyTemplateAction}>
          <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700">
            <Plus className="h-4 w-4" /> Nieuwe template
          </button>
        </form>
      </div>

      {mine.length === 0 ? (
        <EmptyState>Nog geen eigen prijstemplates. Maak er een aan of kopieer hieronder een standaardtemplate en pas de prijzen aan.</EmptyState>
      ) : (
        <div className="mt-4 overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Template</th>
                <th className="hidden p-3 sm:table-cell">Regels</th>
                <th className="hidden p-3 md:table-cell">Richtprijs</th>
                <th className="p-3">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {mine.map((t) => (
                <tr key={t.id} className="border-t border-neutral-100">
                  <td className="p-3 font-medium text-neutral-900">{t.title}</td>
                  <td className="hidden p-3 text-neutral-600 sm:table-cell">{t._count.items}</td>
                  <td className="hidden p-3 text-neutral-600 md:table-cell">
                    {t.priceFromCents != null ? `vanaf ${euro(t.priceFromCents / 100)}` : "—"}
                  </td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${t.active ? "bg-success-500/10 text-success-600" : "bg-neutral-100 text-neutral-500"}`}>
                      {t.active ? "Actief" : "Uit"}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link href={`/dashboard/prijzen/${t.id}`} className="font-medium text-primary-600 hover:underline">Bewerken</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-sm font-semibold text-neutral-900">Standaardtemplates kopiëren</h2>
        <p className="mb-3 text-sm text-neutral-500">Begin met een kant-en-klare template en pas de prijzen aan naar jouw tarieven.</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {platform.map((t) => (
            <form key={t.id} action={copyPlatformTemplateAction} className="rounded-[var(--radius-lg)] border border-neutral-200 bg-white p-3">
              <input type="hidden" name="sourceId" value={t.id} />
              <div className="text-sm font-medium text-neutral-900">{t.title}</div>
              <div className="mt-0.5 text-xs text-neutral-400">{t.service?.category?.name ?? "Overig"} · {t._count.items} regels</div>
              <button type="submit" className="mt-2 text-sm font-medium text-primary-600 hover:underline">Kopiëren naar mijn prijzen</button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
