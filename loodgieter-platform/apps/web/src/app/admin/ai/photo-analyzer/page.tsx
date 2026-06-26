import Link from "next/link";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { DETECTOR_LIST, getVisionProvider } from "@repo/photo-ai";
import { listPhotoAnalyses } from "@/features/photo-ai/service";

export const dynamic = "force-dynamic";

// Placeholder (Fase 21.1): fundering staat, upload-UI en echte Vision-AI volgen later.
export default async function AdminPhotoAnalyzer() {
  const analyses = await listPhotoAnalyses({ take: 50 });
  const provider = getVisionProvider().name;

  return (
    <div>
      <Link href="/admin/ai" className="text-sm text-neutral-500 hover:text-neutral-900">← AI Command Center</Link>
      <PageHeading title="Photo Analyzer" subtitle={`Fundering · actieve provider: ${provider} · ${DETECTOR_LIST.length} detectors`} />

      <div className="mb-6 flex flex-wrap gap-2">
        {DETECTOR_LIST.map((d) => (
          <span key={d.key} className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700" title={d.description}>
            {d.label}
          </span>
        ))}
      </div>

      <p className="mb-4 rounded-[var(--radius-md)] bg-neutral-50 p-3 text-sm text-neutral-500">
        Upload-UI en echte Vision-AI volgen in een volgende fase. De fundering (provider-interface, detectors,
        opslag, logging) is klaar; analyses verschijnen hieronder zodra ze worden uitgevoerd.
      </p>

      {analyses.length === 0 ? (
        <EmptyState>Nog geen foto-analyses.</EmptyState>
      ) : (
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-left text-neutral-500">
              <tr>
                <th className="p-3">Detector</th>
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
