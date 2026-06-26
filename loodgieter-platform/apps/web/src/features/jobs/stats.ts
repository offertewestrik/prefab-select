import "server-only";
import { prisma } from "@/lib/prisma";

export interface JobStats {
  pending: number;
  running: number;
  failed: number;
  retrying: number;
  completedToday: number;
  avgRuntimeMs: number | null;
}

/** Observability-cijfers voor het admin Jobs-dashboard. */
export async function getJobStats(now: Date = new Date()): Promise<JobStats> {
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const [grouped, completedToday, runtime] = await Promise.all([
    prisma.job.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.job.count({ where: { status: "COMPLETED", updatedAt: { gte: startOfDay } } }),
    prisma.job.aggregate({ where: { durationMs: { not: null } }, _avg: { durationMs: true } }),
  ]);
  const map = new Map(grouped.map((g) => [g.status, g._count._all]));

  return {
    pending: map.get("PENDING") ?? 0,
    running: map.get("RUNNING") ?? 0,
    failed: map.get("FAILED") ?? 0,
    retrying: map.get("RETRYING") ?? 0,
    completedToday,
    avgRuntimeMs: runtime._avg.durationMs != null ? Math.round(runtime._avg.durationMs) : null,
  };
}
