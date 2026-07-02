import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Navigation, FileText, ClipboardList } from "lucide-react";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { getMonteurJob } from "@/features/monteur/server/queries";
import { setAppointmentStatusAction } from "@/features/planning/server/actions";
import { createWorkOrderAction } from "@/features/workorders/server/actions";

export const dynamic = "force-dynamic";

const fullTime = (d: Date) => new Intl.DateTimeFormat("nl-NL", { weekday: "long", hour: "2-digit", minute: "2-digit" }).format(d);

// Snelle statusknoppen die een monteur onderweg nodig heeft.
const QUICK = [
  { status: "CONFIRMED", label: "Onderweg / bevestigd" },
  { status: "COMPLETED", label: "Klus afgerond" },
  { status: "NO_SHOW", label: "Niet thuis" },
];

export default async function MonteurJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;

  const job = await getMonteurJob(id, company.id);
  if (!job) notFound();
  const { appt, workOrder, name, phone, address } = job;

  return (
    <div className="mx-auto max-w-xl">
      <Link href="/dashboard/monteur" className="mb-3 inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800">
        <ArrowLeft className="h-4 w-4" /> Terug naar vandaag
      </Link>

      <PageHeading title={appt.title || "Klus"} subtitle={fullTime(appt.scheduledAt)} />

      {/* Klantgegevens + snelacties */}
      <div className="mt-4 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
        <div className="text-lg font-semibold text-neutral-900">{name ?? "Klant"}</div>
        {address && <div className="mt-0.5 text-sm text-neutral-600">{address}</div>}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a
            href={phone ? `tel:${phone.replace(/\s/g, "")}` : undefined}
            aria-disabled={!phone}
            className={`flex items-center justify-center gap-2 rounded-[var(--radius-lg)] px-3 py-3 text-sm font-semibold ${phone ? "bg-primary-600 text-white active:bg-primary-700" : "cursor-not-allowed bg-neutral-100 text-neutral-400"}`}
          >
            <Phone className="h-4 w-4" /> Bellen
          </a>
          <a
            href={address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!address}
            className={`flex items-center justify-center gap-2 rounded-[var(--radius-lg)] px-3 py-3 text-sm font-semibold ${address ? "bg-neutral-900 text-white active:bg-neutral-700" : "cursor-not-allowed bg-neutral-100 text-neutral-400"}`}
          >
            <Navigation className="h-4 w-4" /> Navigeer
          </a>
        </div>
      </div>

      {appt.notes && (
        <div className="mt-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-400">Notities</div>
          <p className="whitespace-pre-wrap text-sm text-neutral-700">{appt.notes}</p>
        </div>
      )}

      {/* Werkbon */}
      <div className="mt-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <ClipboardList className="h-4 w-4 text-neutral-400" /> Werkbon
        </div>
        {workOrder ? (
          <Link href={`/dashboard/werkbonnen/${workOrder.id}`} className="flex items-center justify-between rounded-[var(--radius-lg)] border border-neutral-200 px-3 py-3 text-sm active:bg-neutral-50">
            <span className="font-medium text-neutral-900">{workOrder.number}</span>
            <span className="text-primary-600">Openen / aftekenen →</span>
          </Link>
        ) : (
          <form action={createWorkOrderAction}>
            <input type="hidden" name="quoteId" value={appt.quoteId ?? ""} />
            <input type="hidden" name="customerId" value={appt.customerId ?? ""} />
            <button type="submit" className="w-full rounded-[var(--radius-lg)] bg-accent-500 px-3 py-3 text-sm font-semibold text-white active:opacity-90">
              + Werkbon aanmaken voor deze klus
            </button>
          </form>
        )}
        {appt.quote && (
          <Link href={`/dashboard/offertes/${appt.quote.id}`} className="mt-2 inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-800">
            <FileText className="h-4 w-4" /> Offerte {appt.quote.number} bekijken
          </Link>
        )}
      </div>

      {/* Status bijwerken */}
      <div className="mt-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
        <div className="mb-2 text-sm font-semibold text-neutral-900">Status bijwerken</div>
        <div className="space-y-2">
          {QUICK.map((q) => {
            const active = appt.status === q.status;
            return (
              <form key={q.status} action={setAppointmentStatusAction}>
                <input type="hidden" name="id" value={appt.id} />
                <input type="hidden" name="status" value={q.status} />
                <button
                  type="submit"
                  className={`w-full rounded-[var(--radius-lg)] border px-3 py-3 text-sm font-medium ${active ? "border-primary-500 bg-primary-50 text-primary-700" : "border-neutral-200 text-neutral-700 active:bg-neutral-50"}`}
                >
                  {active ? "✓ " : ""}{q.label}
                </button>
              </form>
            );
          })}
        </div>
      </div>
    </div>
  );
}
