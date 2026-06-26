import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AGENTS, type AgentKey } from "@repo/ai";
import { getAgentLogs } from "@/features/ai/stats";
import { TestRunButton } from "@/features/ai/components/test-run-button";

export const dynamic = "force-dynamic";

export default async function AdminAiAgentDetail({ params }: { params: Promise<{ agent: string }> }) {
  const { agent: key } = await params;
  const agent = AGENTS[key as AgentKey];
  if (!agent) notFound();

  const logs = await getAgentLogs(agent.id, 50);

  return (
    <div>
      <Link href="/admin/ai" className="text-sm text-neutral-500 hover:text-neutral-900">← AI Command Center</Link>
      <PageHeading title={agent.label} subtitle={agent.description} />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
          <h2 className="font-semibold text-neutral-900">Actieve prompt</h2>
          <span className="mt-1 inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">modus: {agent.mode}</span>
          <p className="mt-3 whitespace-pre-wrap rounded-[var(--radius-md)] bg-neutral-50 p-3 text-sm text-neutral-700">{agent.systemPrompt}</p>
        </section>

        <section className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
          <h2 className="font-semibold text-neutral-900">Test run</h2>
          <p className="mt-1 text-sm text-neutral-500">Voert de agent uit met representatieve demo-input via de actieve provider.</p>
          <div className="mt-3">
            <TestRunButton agent={agent.id} />
          </div>
        </section>
      </div>

      <h2 className="mt-8 font-semibold text-neutral-900">Recente logs ({logs.length})</h2>
      {logs.length === 0 ? (
        <p className="mt-2 text-sm text-neutral-500">Nog geen runs.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {logs.map((l) => (
            <li key={l.id} className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${l.status === "OK" ? "bg-success-500/10 text-success-600" : "bg-[color:var(--color-status-danger,#DC2626)]/10 text-[color:var(--color-status-danger,#DC2626)]"}`}>
                  {l.status}
                </span>
                <span className="text-xs text-neutral-400">
                  {l.provider}/{l.model} · {l.totalTokens} tokens · {l.latencyMs} ms · {l.createdAt.toLocaleString("nl-NL")}
                </span>
              </div>
              <div className="mt-1 text-neutral-700">{l.inputSummary}</div>
              {l.errorMessage && <div className="mt-1 text-xs text-[color:var(--color-status-danger,#DC2626)]">{l.errorMessage}</div>}
              {l.outputJson != null && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs text-primary-600">Output</summary>
                  <pre className="mt-1 overflow-x-auto rounded-[var(--radius-md)] bg-neutral-50 p-3 text-xs text-neutral-700">{JSON.stringify(l.outputJson, null, 2)}</pre>
                </details>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
