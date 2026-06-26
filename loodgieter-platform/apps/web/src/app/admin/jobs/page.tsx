import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { prisma } from "@/lib/prisma";
import { JOB_TYPES } from "@/features/jobs/types";
import { getJobStats } from "@/features/jobs/stats";
import { retryJobAction, cancelJobAction, clearCompletedJobsAction } from "@/features/jobs/actions";

export const dynamic = "force-dynamic";

type Status = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "RETRYING";

const statusStyles: Record<string, string> = {
  PENDING: "bg-neutral-100 text-neutral-600",
  RUNNING: "bg-primary-50 text-primary-700",
  COMPLETED: "bg-success-500/10 text-success-600",
  FAILED: "bg-[color:var(--color-status-danger,#DC2626)]/10 text-[color:var(--color-status-danger,#DC2626)]",
  RETRYING: "bg-accent-500/10 text-accent-600",
};

export default async function AdminJobs({ searchParams }: { searchParams: Promise<{ status?: string; type?: string }> }) {
  const sp = await searchParams;
  const status = (["PENDING", "RUNNING", "COMPLETED", "FAILED", "RETRYING"].includes(sp.status ?? "") ? sp.status : undefined) as Status | undefined;
  const type = JOB_TYPES.includes(sp.type as never) ? sp.type : undefined;

  const [stats, jobs] = await Promise.all([
    getJobStats(),
    prisma.job.findMany({ where: { status, type }, orderBy: { createdAt: "desc" }, take: 200 }),
  ]);

  return (
    <div>
      <PageHeading title="Jobs" subtitle="Achtergrondtaken (AI, e-mail, matching). Worker + reaper draaien via cron." />

      <div className="mb-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Running" value={stats.running} />
        <Stat label="Retrying" value={stats.retrying} />
        <Stat label="Failed" value={stats.failed} danger={stats.failed > 0} />
        <Stat label="Voltooid vandaag" value={stats.completedToday} />
        <Stat label="Gem. runtime" value={stats.avgRuntimeMs != null ? `${stats.avgRuntimeMs} ms` : "—"} />
      </div>

      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <form className="flex flex-wrap items-end gap-2 text-sm">
          <select name="status" defaultValue={sp.status ?? ""} className="h-9 rounded-[var(--radius-md)] border border-neutral-200 px-2">
            <option value="">Alle statussen</option>
            {(["PENDING", "RUNNING", "RETRYING", "COMPLETED", "FAILED"] as const).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="type" defaultValue={sp.type ?? ""} className="h-9 rounded-[var(--radius-md)] border border-neutral-200 px-2">
            <option value="">Alle types</option>
            {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button className="h-9 rounded-[var(--radius-md)] bg-primary-500 px-3 font-medium text-white">Filter</button>
        </form>
        <form action={clearCompletedJobsAction} className="flex items-end gap-2 text-sm">
          <input type="hidden" name="days" value="7" />
          <button className="h-9 rounded-[var(--radius-md)] border border-neutral-200 px-3 font-medium text-neutral-700 hover:bg-neutral-50">
            Voltooide jobs ouder dan 7 dagen wissen
          </button>
        </form>
      </div>

      {jobs.length === 0 ? (
        <EmptyState>Geen jobs gevonden.</EmptyState>
      ) : (
        <ul className="space-y-2">
          {jobs.map((j) => (
            <li key={j.id} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-900">{j.type}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[j.status] ?? ""}`}>{j.status}</span>
                  <span className="text-xs text-neutral-400">{j.attempts}/{j.maxAttempts} · {j.durationMs != null ? `${j.durationMs} ms` : "—"} · {j.runAt.toLocaleString("nl-NL")}</span>
                </div>
                <div className="flex gap-2">
                  {(j.status === "FAILED" || j.status === "RETRYING") && (
                    <form action={retryJobAction}>
                      <input type="hidden" name="id" value={j.id} />
                      <button className="rounded-[var(--radius-md)] border border-neutral-200 px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-50">Opnieuw</button>
                    </form>
                  )}
                  {(j.status === "PENDING" || j.status === "RETRYING") && (
                    <form action={cancelJobAction}>
                      <input type="hidden" name="id" value={j.id} />
                      <button className="rounded-[var(--radius-md)] border border-neutral-200 px-2 py-1 text-xs font-medium text-[color:var(--color-status-danger,#DC2626)] hover:bg-neutral-50">Annuleren</button>
                    </form>
                  )}
                </div>
              </div>
              {j.error && <p className="mt-2 text-xs text-[color:var(--color-status-danger,#DC2626)]">{j.error}</p>}
              <details className="mt-2">
                <summary className="cursor-pointer text-xs text-primary-600">Payload / resultaat</summary>
                <div className="mt-1 grid gap-2 sm:grid-cols-2">
                  <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-neutral-50 p-2 text-xs text-neutral-700">payload: {JSON.stringify(j.payload, null, 2)}</pre>
                  <pre className="overflow-x-auto rounded-[var(--radius-md)] bg-neutral-50 p-2 text-xs text-neutral-700">result: {JSON.stringify(j.result, null, 2)}</pre>
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value, danger }: { label: string; value: string | number; danger?: boolean }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-3">
      <div className="text-xs text-neutral-400">{label}</div>
      <div className={`mt-1 text-xl font-bold ${danger ? "text-[color:var(--color-status-danger,#DC2626)]" : "text-neutral-900"}`}>{value}</div>
    </div>
  );
}
