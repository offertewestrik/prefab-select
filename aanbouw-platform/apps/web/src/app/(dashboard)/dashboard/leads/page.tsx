import Link from "next/link";
import { Lock } from "lucide-react";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { getAvailableLeads } from "@/features/leads/server/access";
import { urgencyLabels } from "@repo/core";

export default async function DashboardLeads() {
  const company = await getCurrentCompany();
  const leads = company ? await getAvailableLeads(company.id) : [];

  return (
    <div>
      <PageHeading title="Nieuwe leads" subtitle="Beschikbare aanvragen in jouw werkgebied. Klantgegevens worden vrijgegeven na aankoop." />
      {leads.length === 0 ? (
        <EmptyState>Er zijn op dit moment geen nieuwe leads.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Dienst</th>
                <th className="p-3">Plaats</th>
                <th className="p-3">Urgentie</th>
                <th className="p-3">Credits</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.leadId} className="border-t border-neutral-100">
                  <td className="p-3 font-medium text-neutral-900">{l.serviceName}</td>
                  <td className="p-3">{l.city}</td>
                  <td className="p-3">{urgencyLabels[l.urgency]}</td>
                  <td className="p-3">{l.priceCredits}</td>
                  <td className="p-3 text-right">
                    <Link href={`/dashboard/leads/${l.leadId}`} className="inline-flex items-center gap-1 font-medium text-primary-600 hover:underline">
                      <Lock className="h-3.5 w-3.5" /> Bekijk &amp; koop
                    </Link>
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
