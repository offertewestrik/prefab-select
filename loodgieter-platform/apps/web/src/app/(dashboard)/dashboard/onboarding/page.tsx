import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { getOnboardingStatus } from "@/features/onboarding/server/queries";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;

  const { steps, done, total, complete } = await getOnboardingStatus(company.id);
  const pct = Math.round((done / total) * 100);

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeading title="Aan de slag" subtitle="Rond deze stappen af om klaar te zijn voor je eerste leads en offertes." />

      {/* Voortgang */}
      <div className="mt-4 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-neutral-900">{done} van {total} afgerond</span>
          <span className="text-neutral-500">{pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
          <div className="h-full rounded-full bg-primary-600 transition-all" style={{ width: `${pct}%` }} />
        </div>
        {complete && (
          <p className="mt-3 text-sm font-medium text-success-500">🎉 Je profiel is compleet — je bent klaar om leads te ontvangen en offertes te versturen!</p>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {steps.map((s, i) => (
          <div key={s.key} className={`flex items-start gap-3 rounded-[var(--radius-xl)] border p-4 ${s.done ? "border-neutral-200 bg-neutral-50/60" : "border-neutral-200 bg-white"}`}>
            <div className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-semibold ${s.done ? "bg-success-500 text-white" : "bg-neutral-100 text-neutral-500"}`}>
              {s.done ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-neutral-900">{s.title}</div>
              <p className="mt-0.5 text-sm text-neutral-600">{s.description}</p>
            </div>
            <Link
              href={s.href}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium ${s.done ? "text-neutral-500 hover:text-neutral-800" : "bg-primary-600 text-white hover:bg-primary-700"}`}
            >
              {s.done ? "Wijzigen" : s.cta}
              {!s.done && <ArrowRight className="h-4 w-4" />}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
