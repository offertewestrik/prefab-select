import Link from "next/link";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { DETECTOR_LIST, getVisionProvider } from "@repo/photo-ai";
import { listPhotoAnalyses, getPhotoAnalyzerStats } from "@/features/photo-ai/service";

export const dynamic = "force-dynamic";

export default async function AdminPhotoAnalyzer() {
  const [analyses, stats] = await Promise.all([listPhotoAnalyses({ take: 50 }), getPhotoAnalyzerStats()]);
  const provider = getVisionProvider().name;
  const model = provider === "openai" ? process.env.OPENAI_VISION_MODEL ?? "gpt-4o-mini" : "mock";

  return (
    <div>
      <Link href="/admin/ai" className="text-sm text-neutral-500 hover:text-neutral-900">← AI Command Center</Link>
      <PageHeading title="Photo Analyzer" subtitle={`Provider: ${provider} · model: ${model} · ${DETECTOR_LIST.length} detectors`} />

      <div className="mb-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="Analyses" value={stats.total} />
        <Stat label="Voltooid" value={stats.completed} />
        <Stat label="Mislukt" value={stats.failed} danger={stats.failed > 0} />
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Fallback (mock)" value={stats.fallbackCount} danger={stats.fallbackCount > 0} />
        <Stat label="Gem. confidence" value={stats.avgConfidence != null ? `${stats.avgConfidence}%` : "—"} />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {DETECTOR_LIST.map((d) => (
          <span key={d.key} className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700" title={d.description}>
            {d.label}
          </span>
        ))}
      </div>

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
