import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { listTodayAppointments } from "@/features/monteur/server/queries";

export const dynamic = "force-dynamic";

const STATUS = {
  PLANNED: { label: "Gepland", cls: "bg-neutral-100 text-neutral-600" },
  CONFIRMED: { label: "Bevestigd", cls: "bg-primary-50 text-primary-700" },
  COMPLETED: { label: "Afgerond", cls: "bg-success-500/10 text-success-600" },
  CANCELLED: { label: "Geannuleerd", cls: "bg-neutral-100 text-neutral-500" },
  NO_SHOW: { label: "Niet verschenen", cls: "bg-accent-500/10 text-accent-600" },
} satisfies Record<string, { label: string; cls: string }>;

const time = (d: Date) => new Intl.DateTimeFormat("nl-NL", { hour: "2-digit", minute: "2-digit" }).format(d);
const today = () => new Intl.DateTimeFormat("nl-NL", { weekday: "long", day: "numeric", month: "long" }).format(new Date());

export default async function MonteurPage() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;
  const jobs = await listTodayAppointments(company.id);

  return (
    <div className="mx-auto max-w-xl">
      <PageHeading title="Monteurmodus" subtitle={`Jouw klussen van vandaag — ${today()}`} />

      {jobs.length === 0 ? (
        <EmptyState>Geen afspraken voor vandaag. Plan klussen in via <Link href="/dashboard/planning" className="font-medium text-primary-600 hover:underline">Planning</Link>.</EmptyState>
      ) : (
        <div className="mt-4 space-y-3">
          {jobs.map((j) => {
            const s = STATUS[j.status] ?? STATUS.PLANNED;
            const who = j.customer?.name ?? j.lead?.contactName ?? "Klant";
            const city = j.customer?.city ?? j.lead?.city ?? null;
            return (
              <Link
                key={j.id}
                href={`/dashboard/monteur/${j.id}`}
                className="flex items-center gap-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4 active:bg-neutral-50"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[var(--radius-lg)] bg-primary-50 text-center">
                  <span className="text-base font-bold leading-none text-primary-700">{time(j.scheduledAt)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold text-neutral-900">{j.title || "Klus"}</div>
                  <div className="truncate text-sm text-neutral-600">{who}{city ? ` · ${city}` : ""}</div>
                  <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${s.cls}`}>{s.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-neutral-300" />
              </Link>
            );
          })}
        </div>
      )}

      <p className="mt-6 flex items-center justify-center gap-1.5 text-xs text-neutral-400">
        <MapPin className="h-3.5 w-3.5" /> Tik op een klus voor adres, telefoon en werkbon
      </p>
    </div>
  );
}
