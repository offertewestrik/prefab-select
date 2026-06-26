import "server-only";
import { prisma } from "@/lib/prisma";
import type { JobType, JobPayloads } from "./types";

/** Plaatst een job in de queue (best-effort; faalt nooit hard op de hot path). */
export async function enqueue<T extends JobType>(
  type: T,
  payload: JobPayloads[T],
  opts?: { maxAttempts?: number; runAt?: Date },
): Promise<string | null> {
  try {
    const job = await prisma.job.create({
      data: {
        type,
        payload: payload as object,
        maxAttempts: opts?.maxAttempts ?? 3,
        runAt: opts?.runAt ?? new Date(),
      },
    });
    return job.id;
  } catch {
    return null;
  }
}

/** Exponentiële backoff: 1, 2, 4 … minuten (gemaximeerd op 1 uur). */
function backoffMs(attempts: number): number {
  return Math.min(60 * 60 * 1000, 2 ** Math.max(0, attempts - 1) * 60 * 1000);
}

export interface ProcessResult {
  claimed: number;
  completed: number;
  failed: number;
  retrying: number;
}

/**
 * Verwerkt tot `batchSize` jobs die klaarstaan. Elke job wordt atomair geclaimd
 * (status → RUNNING met guard) zodat gelijktijdige workers dezelfde job niet
 * dubbel uitvoeren. Fouten leiden tot RETRYING (met backoff) of FAILED.
 */
export async function processJobs(batchSize = 10, now: Date = new Date()): Promise<ProcessResult> {
  const candidates = await prisma.job.findMany({
    where: { status: { in: ["PENDING", "RETRYING"] }, runAt: { lte: now } },
    orderBy: { runAt: "asc" },
    take: batchSize,
    select: { id: true },
  });

  const res: ProcessResult = { claimed: 0, completed: 0, failed: 0, retrying: 0 };
  // Dynamisch geladen om een import-cyclus te voorkomen (handlers verwijzen
  // terug naar services die zelf jobs in de queue kunnen plaatsen).
  const { HANDLERS } = await import("./handlers");

  for (const { id } of candidates) {
    // Atomair claimen: alleen de worker die de overgang wint, verwerkt de job.
    const claim = await prisma.job.updateMany({
      where: { id, status: { in: ["PENDING", "RETRYING"] } },
      data: { status: "RUNNING", lockedAt: now, attempts: { increment: 1 } },
    });
    if (claim.count !== 1) continue; // andere worker was eerder
    res.claimed++;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) continue;

    const handler = HANDLERS[job.type as JobType];
    if (!handler) {
      await prisma.job.update({ where: { id }, data: { status: "FAILED", error: `Onbekend jobtype: ${job.type}`, lockedAt: null } });
      res.failed++;
      continue;
    }

    try {
      const result = await (handler as (p: unknown) => Promise<unknown>)(job.payload);
      await prisma.job.update({
        where: { id },
        data: { status: "COMPLETED", result: (result ?? {}) as object, error: null, lockedAt: null },
      });
      res.completed++;
    } catch (e) {
      const message = e instanceof Error ? e.message.slice(0, 500) : "error";
      if (job.attempts >= job.maxAttempts) {
        await prisma.job.update({ where: { id }, data: { status: "FAILED", error: message, lockedAt: null } });
        res.failed++;
      } else {
        await prisma.job.update({
          where: { id },
          data: { status: "RETRYING", error: message, lockedAt: null, runAt: new Date(now.getTime() + backoffMs(job.attempts)) },
        });
        res.retrying++;
      }
    }
  }

  return res;
}
