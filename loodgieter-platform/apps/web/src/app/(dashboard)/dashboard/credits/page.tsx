import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@repo/ui";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { stripeEnabled } from "@/lib/stripe";
import { euro } from "@/lib/format";
import { getActivePackages, LOW_BALANCE_THRESHOLD } from "@/features/billing/server/packages";
import { getCreditOverview } from "@/features/billing/server/queries";
import { BuyCreditsButton } from "@/features/billing/components/buy-credits-button";

const TXN_LABELS: Record<string, string> = {
  TOPUP: "Opwaardering", SPEND: "Lead gekocht", REFUND: "Terugbetaling", BONUS: "Bonus", ADJUSTMENT: "Correctie",
};

export default async function CreditsPage() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;

  const [packages, overview] = await Promise.all([getActivePackages(), getCreditOverview(company.id)]);
  const balance = overview.company?.creditBalance ?? 0;
  const lowBalance = balance < LOW_BALANCE_THRESHOLD;

  return (
    <div className="space-y-8">
      <PageHeading title="Credits" subtitle="Waardeer je saldo op om leads te kopen." />

      <Card>
        <CardContent>
          <div className="text-sm text-neutral-500">Huidig saldo</div>
          <div className="mt-1 text-4xl font-bold text-neutral-900">{balance} credits</div>
          {lowBalance && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-accent-500/10 px-3 py-1.5 text-sm text-accent-600">
              <AlertTriangle className="h-4 w-4" /> Je saldo is laag. Waardeer op om leads te kunnen blijven kopen.
            </p>
          )}
        </CardContent>
      </Card>

      {!stripeEnabled && (
        <div className="rounded-[var(--radius-md)] bg-neutral-100 p-4 text-sm text-neutral-600">
          Online betalen is in deze omgeving nog niet geconfigureerd (Stripe-sleutel ontbreekt).
        </div>
      )}

      {/* Pakketten */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-neutral-900">Kies een pakket</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {packages.map((p) => (
            <Card key={p.id}>
              <CardContent>
                <div className="font-semibold text-neutral-900">{p.name}</div>
                <div className="mt-2 text-3xl font-bold text-neutral-900">{p.credits}</div>
                <div className="text-sm text-neutral-500">credits</div>
                <div className="mt-3 text-lg font-semibold text-primary-700">{euro(p.priceCents / 100)}</div>
                <div className="mt-4">
                  <BuyCreditsButton packageId={p.id} label="Opwaarderen" disabled={!stripeEnabled} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Transactiegeschiedenis */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-neutral-900">Transactiegeschiedenis</h2>
        {overview.transactions.length === 0 ? (
          <EmptyState>Nog geen transacties.</EmptyState>
        ) : (
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-left text-neutral-500">
                <tr><th className="p-3">Datum</th><th className="p-3">Type</th><th className="p-3 text-right">Mutatie</th><th className="p-3 text-right">Saldo</th></tr>
              </thead>
              <tbody>
                {overview.transactions.map((t) => (
                  <tr key={t.id} className="border-t border-neutral-100">
                    <td className="p-3">{t.createdAt.toLocaleDateString("nl-NL")}</td>
                    <td className="p-3">{TXN_LABELS[t.type] ?? t.type}</td>
                    <td className={`p-3 text-right font-medium ${t.amount >= 0 ? "text-success-500" : "text-neutral-900"}`}>{t.amount >= 0 ? "+" : ""}{t.amount}</td>
                    <td className="p-3 text-right">{t.balanceAfter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Gekochte leads */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-neutral-900">Gekochte leads</h2>
        {overview.purchases.length === 0 ? (
          <EmptyState>Nog geen leads gekocht.</EmptyState>
        ) : (
          <ul className="space-y-2">
            {overview.purchases.map((p) => (
              <li key={p.id} className="flex justify-between rounded-[var(--radius-md)] border border-neutral-200 bg-white p-3 text-sm">
                <span>{p.match.lead.service.name} — {p.match.lead.municipality.name}</span>
                <span className="text-neutral-500">{p.creditsSpent} credits · {p.createdAt.toLocaleDateString("nl-NL")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
