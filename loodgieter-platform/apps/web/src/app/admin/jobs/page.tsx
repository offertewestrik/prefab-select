import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { prisma } from "@/lib/prisma";
import { retryJobAction, cancelJobAction } from "@/features/jobs/actions";

export const dynamic = "force-dynamic";

type Status = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED" | "RETRYING";

const statusStyles: Record<string, string> = {
  PENDING: "bg-neutral-100 text-neutral-600",
  RUNNING: "bg-primary-50 text-primary-700",
  COMPLETED: "bg-success-500/10 text-success-600",
  FAILED: "bg-[color:var(--color-status-danger,#DC2626)]/10 text-[color:var(--color-status-danger,#DC2626)]",
  RETRYING: "bg-accent-500/10 text-accent-600",
};

export default async function AdminJobs({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const sp = await searchParams;
  const status = (["PENDING", "RUNNING", "COMPLETED", "FAILED", "RETRYING"].includes(sp.status ?? "") ? sp.status : undefined) as Status | undefined;

  const [jobs, counts] = await Promise.all([
    prisma.job.findMany({ where: { status }, orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.job.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);
  const countMap = new Map(counts.map((c) => [c.status, c._count._all]));

  return (
    <div>
      <PageHeading title="Jobs" subtitle="Achtergrondtaken (AI, e-mail, matching). Worker draait via /api/cron/process-jobs." />

      <form className="mb-4 flex flex-wrap items-end gap-2 text-sm">
        <select name="status" defaultValue={sp.status ?? ""} className="h-9 rounded-[var(--radius-md)] border border-neutral-200 px-2">
          <option value="">Alle</option>
          {(["PENDING", "RUNNING", "RETRYING", "COMPLETED", "FAILED"] as const).map((s) => (
            <option key={s} value={s}>{s} ({countMap.get(s) ?? 0})</option>
          ))}
        </select>
        <button className="h-9 rounded-[var(--radius-md)] bg-primary-500 px-3 font-medium text-white">Filter</button>
      </form>

      {jobs.length === 0 ? (
        <EmptyState>Geen jobs gevonden.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Pogingen</th>
                <th className="p-3">RunAt</th>
                <th className="p-3">Laatste fout</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-t border-neutral-100">
                  <td className="p-3 font-medium text-neutral-900">{j.type}</td>
                  <td className="p-3"><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[j.status] ?? ""}`}>{j.status}</span></td>
                  <td className="p-3">{j.attempts}/{j.maxAttempts}</td>
                  <td className="p-3 text-neutral-500">{j.runAt.toLocaleString("nl-NL")}</td>
                  <td className="p-3 max-w-xs truncate text-[color:var(--color-status-danger,#DC2626)]" title={j.error ?? ""}>{j.error ?? "—"}</td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
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
