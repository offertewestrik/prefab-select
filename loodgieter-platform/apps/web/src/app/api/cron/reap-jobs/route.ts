import { NextResponse } from "next/server";
import { reapStaleJobs } from "@/features/jobs/queue";

export const dynamic = "force-dynamic";

/**
 * Cron: herstelt vastgelopen RUNNING-jobs. Beveiligd met CRON_SECRET
 * (Bearer of ?secret). Drempel instelbaar via ?minutes=N (default 10).
 */
async function handle(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "cron_disabled" }, { status: 401 });

  const url = new URL(req.url);
  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const provided = bearer ?? url.searchParams.get("secret");
  if (provided !== secret) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const minutes = Math.min(1440, Math.max(1, Number(url.searchParams.get("minutes")) || 10));
  const result = await reapStaleJobs(minutes);
  return NextResponse.json({ ok: true, ...result });
}

export const GET = handle;
export const POST = handle;
