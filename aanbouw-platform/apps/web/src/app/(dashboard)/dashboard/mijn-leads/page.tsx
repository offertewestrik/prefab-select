import Link from "next/link";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { getPurchasedLeads } from "@/features/leads/server/access";

export default async function MyLeads() {
  const company = await getCurrentCompany();
  const leads = company ? await getPurchasedLeads(company.id) : [];

  return (
    <div>
      <PageHeading title="Mijn leads" subtitle="Gekochte leads met volledige klantgegevens." />
      {leads.length === 0 ? (
        <EmptyState>Je hebt nog geen leads gekocht.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Dienst</th>
                <th className="p-3">Plaats</th>
                <th className="p-3">Klant</th>
                <th className="p-3">Telefoon</th>
                <th className="p-3">Credits</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.leadId} className="border-t border-neutral-100">
                  <td className="p-3 font-medium text-neutral-900">{l.serviceName}</td>
                  <td className="p-3">{l.city}</td>
                  <td className="p-3">{l.contactName}</td>
                  <td className="p-3">{l.contactPhone}</td>
                  <td className="p-3">{l.creditsSpent}</td>
                  <td className="p-3 text-right">
                    <Link href={`/dashboard/leads/${l.leadId}`} className="font-medium text-primary-600 hover:underline">
                      Bekijk
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
