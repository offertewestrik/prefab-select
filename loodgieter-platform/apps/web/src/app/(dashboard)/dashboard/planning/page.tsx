import Link from "next/link";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { listAppointments } from "@/features/planning/server/queries";
import { listCustomers } from "@/features/customers/server/queries";
import { AppointmentForm } from "@/features/planning/components/appointment-form";
import { AppointmentStatusSelect } from "@/features/planning/components/status-select";
import { deleteAppointmentAction } from "@/features/planning/server/actions";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  PLANNED: "Gepland", CONFIRMED: "Bevestigd", COMPLETED: "Afgerond", CANCELLED: "Geannuleerd", NO_SHOW: "Niet verschenen",
};
const dayFmt = (d: Date) => d.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
const timeFmt = (d: Date) => d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });

export default async function PlanningPage() {
  const company = await getCurrentCompany();
  const [appointments, customers] = company
    ? await Promise.all([listAppointments(company.id), listCustomers(company.id)])
    : [[], []];

  // Groepeer op dag.
  const groups = new Map<string, typeof appointments>();
  for (const a of appointments) {
    const key = a.scheduledAt.toISOString().slice(0, 10);
    (groups.get(key) ?? groups.set(key, []).get(key)!).push(a);
  }

  return (
    <div>
      <PageHeading title="Planning" subtitle="Plan je afspraken en klussen — gekoppeld aan klanten en offertes." />

      <div className="mb-6">
        <AppointmentForm customers={customers.map((c) => ({ id: c.id, name: c.name }))} />
      </div>

      {appointments.length === 0 ? (
        <EmptyState>Nog geen afspraken ingepland.</EmptyState>
      ) : (
        <div className="space-y-6">
          {[...groups.entries()].map(([day, items]) => (
            <div key={day}>
              <div className="mb-2 text-sm font-semibold capitalize text-neutral-900">{dayFmt(new Date(day))}</div>
              <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
                {items.map((a) => (
                  <div key={a.id} className="flex flex-wrap items-center gap-3 border-b border-neutral-100 p-3 last:border-0">
                    <div className="w-14 shrink-0 text-sm font-semibold text-neutral-900">{timeFmt(a.scheduledAt)}</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-neutral-900">
                        {a.title || "Afspraak"}
                        <span className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-normal text-neutral-500">{STATUS_LABEL[a.status] ?? a.status}</span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        {[a.customer?.name ?? a.lead?.contactName, a.address, a.quote ? `offerte ${a.quote.number}` : null].filter(Boolean).join(" · ") || "—"}
                        {a.durationMin ? ` · ${a.durationMin} min` : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {a.quote && <Link href={`/dashboard/offertes/${a.quote.id}`} className="text-xs font-medium text-primary-600 hover:underline">offerte</Link>}
                      <AppointmentStatusSelect id={a.id} status={a.status} />
                      <form action={deleteAppointmentAction}>
                        <input type="hidden" name="id" value={a.id} />
                        <button className="text-xs text-neutral-400 hover:text-[color:var(--color-status-danger,#DC2626)]">verwijderen</button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
