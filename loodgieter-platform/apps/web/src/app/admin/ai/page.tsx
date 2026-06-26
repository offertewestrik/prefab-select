import Link from "next/link";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { getProvider } from "@repo/ai";
import { getAgentStats, getOverallStats } from "@/features/ai/stats";
import { prisma } from "@/lib/prisma";
import { generateDailyReportAction } from "@/features/ai/actions";

export const dynamic = "force-dynamic";

export default async function AdminAiOverview() {
  const [agents, overall, latestReport] = await Promise.all([
    getAgentStats(),
    getOverallStats(),
    prisma.aiDailyReport.findFirst({ orderBy: { date: "desc" } }),
  ]);
  const provider = getProvider().name;

  return (
    <div>
      <PageHeading title="AI Command Center" subtitle={`Actieve provider: ${provider} · ${agents.length} agents`} />

      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <Stat label="Runs (totaal)" value={String(overall.runs)} />
        <Stat label="Foutpercentage" value={`${overall.errorRate}%`} />
        <Stat label="Tokens (totaal)" value={overall.totalTokens.toLocaleString("nl-NL")} />
        <Stat label="Gem. responstijd" value={`${overall.avgLatencyMs} ms`} />
      </div>

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="p-3">Agent</th>
              <th className="p-3">Modus</th>
              <th className="p-3">Runs</th>
              <th className="p-3">Fouten</th>
              <th className="p-3">Tokens</th>
              <th className="p-3">Gem. ms</th>
              <th className="p-3">Laatste run</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a.id} className="border-t border-neutral-100">
                <td className="p-3">
                  <div className="font-medium text-neutral-900">{a.label}</div>
                  <div className="text-xs text-neutral-400">{a.description}</div>
                </td>
                <td className="p-3"><span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs">{a.mode}</span></td>
                <td className="p-3">{a.runs}</td>
                <td className={`p-3 ${a.errors > 0 ? "text-[color:var(--color-status-danger,#DC2626)]" : ""}`}>{a.errors}</td>
                <td className="p-3">{a.totalTokens.toLocaleString("nl-NL")}</td>
                <td className="p-3">{a.avgLatencyMs}</td>
                <td className="p-3 text-neutral-500">{a.lastRun ? a.lastRun.toLocaleString("nl-NL") : "—"}</td>
                <td className="p-3 text-right">
                  <Link href={`/admin/ai/${a.id}`} className="font-medium text-primary-600 hover:underline">Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-neutral-900">Admin AI — dagrapport</h2>
          <form action={generateDailyReportAction}>
            <button className="rounded-[var(--radius-md)] border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              Nu genereren
            </button>
          </form>
        </div>
        {latestReport ? (
          <pre className="mt-3 overflow-x-auto rounded-[var(--radius-md)] bg-neutral-50 p-3 text-xs text-neutral-700">
            {JSON.stringify(latestReport.reportJson, null, 2)}
          </pre>
        ) : (
          <p className="mt-2 text-sm text-neutral-500">Nog geen rapport gegenereerd.</p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
      <div className="text-xs text-neutral-400">{label}</div>
      <div className="mt-1 text-2xl font-bold text-neutral-900">{value}</div>
    </div>
  );
}
