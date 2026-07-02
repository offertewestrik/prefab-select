import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { Card, CardContent } from "@repo/ui";
import { getCurrentCompany } from "@/lib/guards";
import { euro } from "@/lib/format";
import { computeCompanyStats } from "@/features/coach/server/service";
import { CoachPanel } from "@/features/coach/components/coach-panel";

export const dynamic = "force-dynamic";

export default async function CoachPage() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;
  const s = await computeCompanyStats(company.id, 30);

  const kpis = [
    { label: "Nieuwe leads (30d)", value: String(s.newLeads) },
    { label: "Offertes verstuurd (30d)", value: String(s.quotesSent) },
    { label: "Geaccepteerd (30d)", value: String(s.quotesAccepted) },
    { label: "Nog open", value: String(s.quotesOpen) },
    { label: "Omzet geaccepteerd (30d)", value: euro(s.acceptedRevenueCents / 100) },
    { label: "Openstaande facturen", value: `${s.openInvoicesCount} · ${euro(s.openInvoicesCents / 100)}` },
    { label: "Creditsaldo", value: String(s.creditBalance) },
    { label: "Reviews", value: `${s.reviewsCount}` },
  ];

  return (
    <div>
      <PageHeading title="AI Bedrijfscoach" subtitle="Concrete tips om meer uit je leads en offertes te halen — op basis van jouw cijfers." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent>
              <div className="text-xs text-neutral-500">{k.label}</div>
              <div className="mt-1 text-xl font-bold text-neutral-900">{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CoachPanel />
    </div>
  );
}
