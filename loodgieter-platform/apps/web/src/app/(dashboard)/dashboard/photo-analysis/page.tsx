import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { listPhotoAnalyses } from "@/features/photo-ai/service";

export const dynamic = "force-dynamic";

// Placeholder (Fase 21.1): zichtbaar voor de installateur; upload-UI volgt later.
export default async function DashboardPhotoAnalysis() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;

  const analyses = await listPhotoAnalyses({ take: 50 });

  return (
    <div>
      <PageHeading title="Foto-analyse" subtitle="AI-analyse van klusfoto's (binnenkort: foto's uploaden voor automatische herkenning)." />
      <p className="mb-4 rounded-[var(--radius-md)] bg-neutral-50 p-3 text-sm text-neutral-500">
        Deze functie wordt binnenkort geactiveerd. Je kunt straks foto's van een klus uploaden en krijgt automatisch
        herkende onderdelen, conditie en een prijsindicatie.
      </p>
      {analyses.length === 0 ? (
        <EmptyState>Nog geen analyses beschikbaar.</EmptyState>
      ) : (
        <ul className="space-y-2">
          {analyses.map((a) => (
            <li key={a.id} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-neutral-900">{a.detector}</span>
                <span className="text-neutral-400">{Math.round(a.confidence * 100)}% · {a.riskLevel}</span>
              </div>
              {a.summary && <p className="mt-1 text-neutral-600">{a.summary}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
