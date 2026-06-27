import Link from "next/link";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { DETECTOR_LIST, DETECTOR_KEYS, getVisionProvider } from "@repo/photo-ai";
import { listPhotoAnalyses, getPhotoAnalyzerStats, getProviderBreakdown } from "@/features/photo-ai/service";
import { ReanalyzeButton } from "@/features/photo-ai/components/reanalyze-button";
import { cleanupOrphansAction } from "@/features/photo-ai/actions";

export const dynamic = "force-dynamic";

type Status = "PENDING" | "COMPLETED" | "FAILED";

export default async function AdminPhotoAnalyzer({
  searchParams,
}: {
  searchParams: Promise<{ provider?: string; status?: string; detector?: string; fallback?: string }>;
}) {
  const sp = await searchParams;
  const status = (["PENDING", "COMPLETED", "FAILED"].includes(sp.status ?? "") ? sp.status : undefined) as Status | undefined;
  const detector = DETECTOR_KEYS.includes(sp.detector as never) ? sp.detector : undefined;
  const fallbackOnly = sp.fallback === "1";

  const [analyses, stats, breakdown] = await Promise.all([
    listPhotoAnalyses({ take: 100, provider: sp.provider || undefined, status, detector, fallbackOnly }),
    getPhotoAnalyzerStats(),
    getProviderBreakdown(),
  ]);
  const provider = getVisionProvider().name;
  const model = provider === "openai" ? process.env.OPENAI_VISION_MODEL ?? "gpt-4o-mini" : "mock";

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link href="/admin/ai" className="text-sm text-neutral-500 hover:text-neutral-900">← AI Command Center</Link>
        <Link href="/admin/ai/photo-analyzer/live-test" className="text-sm font-medium text-primary-600 hover:underline">Live-test →</Link>
      </div>
      <PageHeading title="Photo Analyzer" subtitle={`Provider: ${provider} · model: ${model} · ${DETECTOR_LIST.length} detectors`} />

      <div className="mb-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="Analyses" value={stats.total} />
        <Stat label="Voltooid" value={stats.completed} />
        <Stat label="Mislukt" value={stats.failed} danger={stats.failed > 0} />
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Fallback (mock)" value={stats.fallbackCount} danger={stats.fallbackCount > 0} />
        <Stat label="Gem. confidence" value={stats.avgConfidence != null ? `${stats.avgConfidence}%` : "—"} />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        <span className="font-medium text-neutral-700">Per provider:</span>
        {breakdown.length === 0 ? <span>—</span> : breakdown.map((b) => (
          <span key={b.provider} className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">{b.provider}: {b.count}</span>
        ))}
        <form action={cleanupOrphansAction} className="ml-auto">
          <button className="rounded-[var(--radius-md)] border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50">
            Orphan-uploads opruimen
          </button>
        </form>
      </div>

      {/* Filters */}
      <form className="mb-4 flex flex-wrap items-end gap-2 text-sm">
        <select name="provider" defaultValue={sp.provider ?? ""} className="h-9 rounded-[var(--radius-md)] border border-neutral-200 px-2">
          <option value="">Alle providers</option>
          <option value="openai">openai</option>
          <option value="mock">mock</option>
          <option value="pending">pending</option>
        </select>
        <select name="status" defaultValue={sp.status ?? ""} className="h-9 rounded-[var(--radius-md)] border border-neutral-200 px-2">
          <option value="">Alle statussen</option>
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="FAILED">FAILED</option>
        </select>
        <select name="detector" defaultValue={sp.detector ?? ""} className="h-9 rounded-[var(--radius-md)] border border-neutral-200 px-2">
          <option value="">Alle detectors</option>
          {DETECTOR_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
        <label className="inline-flex items-center gap-1 text-xs text-neutral-600">
          <input type="checkbox" name="fallback" value="1" defaultChecked={fallbackOnly} /> alleen fallback
        </label>
        <button className="h-9 rounded-[var(--radius-md)] bg-primary-500 px-3 font-medium text-white">Filter</button>
      </form>

      {stats.recentErrors.length > 0 && (
        <div className="mb-6 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-neutral-900">Laatste fouten</h2>
          <ul className="mt-2 space-y-1 text-xs text-neutral-500">
            {stats.recentErrors.map((e, i) => (
              <li key={i}>{e.createdAt.toLocaleString("nl-NL")} · {e.provider} · {e.errorMessage ?? "—"}</li>
            ))}
          </ul>
        </div>
      )}

      {analyses.length === 0 ? (
        <EmptyState>Nog geen foto-analyses.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Detector</th>
                <th className="p-3">Provider</th>
                <th className="p-3">Status</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Risico</th>
                <th className="p-3">Objecten</th>
                <th className="p-3">Datum</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {analyses.map((a) => (
                <tr key={a.id} className="border-t border-neutral-100">
                  <td className="p-3 font-medium text-neutral-900">{a.detector}</td>
                  <td className="p-3">{a.provider}</td>
                  <td className="p-3">{a.status}</td>
                  <td className="p-3">{Math.round(a.confidence * 100)}%</td>
                  <td className="p-3">{a.riskLevel}</td>
                  <td className="p-3">{a._count.objects}</td>
                  <td className="p-3 text-neutral-500">{a.createdAt.toLocaleDateString("nl-NL")}</td>
                  <td className="p-3 text-right">{a.leadId ? <ReanalyzeButton leadId={a.leadId} allowForce compact /> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
