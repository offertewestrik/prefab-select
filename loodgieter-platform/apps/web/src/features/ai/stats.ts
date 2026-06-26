import "server-only";
import { AGENT_LIST } from "@repo/ai";
import { prisma } from "@/lib/prisma";

export interface AgentStat {
  id: string;
  label: string;
  description: string;
  mode: string;
  runs: number;
  errors: number;
  avgLatencyMs: number;
  totalTokens: number;
  lastRun: Date | null;
}

/** Per-agent statistieken, samengevoegd met de registry (ook agents zonder runs). */
export async function getAgentStats(): Promise<AgentStat[]> {
  const [agg, err] = await Promise.all([
    prisma.aiInvocation.groupBy({
      by: ["agent"],
      _count: { _all: true },
      _avg: { latencyMs: true },
      _sum: { totalTokens: true },
      _max: { createdAt: true },
    }),
    prisma.aiInvocation.groupBy({ by: ["agent"], where: { status: "ERROR" }, _count: { _all: true } }),
  ]);
  const aggMap = new Map(agg.map((a) => [a.agent, a]));
  const errMap = new Map(err.map((e) => [e.agent, e._count._all]));

  return AGENT_LIST.map((a) => {
    const g = aggMap.get(a.id);
    return {
      id: a.id,
      label: a.label,
      description: a.description,
      mode: a.mode,
      runs: g?._count._all ?? 0,
      errors: errMap.get(a.id) ?? 0,
      avgLatencyMs: Math.round(g?._avg.latencyMs ?? 0),
      totalTokens: g?._sum.totalTokens ?? 0,
      lastRun: g?._max.createdAt ?? null,
    };
  });
}

export async function getOverallStats() {
  const [agg, errors] = await Promise.all([
    prisma.aiInvocation.aggregate({ _count: { _all: true }, _sum: { totalTokens: true }, _avg: { latencyMs: true } }),
    prisma.aiInvocation.count({ where: { status: "ERROR" } }),
  ]);
  const runs = agg._count._all;
  return {
    runs,
    errors,
    errorRate: runs > 0 ? Math.round((errors / runs) * 100) : 0,
    totalTokens: agg._sum.totalTokens ?? 0,
    avgLatencyMs: Math.round(agg._avg.latencyMs ?? 0),
  };
}

export function getAgentLogs(agent: string, take = 50) {
  return prisma.aiInvocation.findMany({ where: { agent }, orderBy: { createdAt: "desc" }, take });
}
