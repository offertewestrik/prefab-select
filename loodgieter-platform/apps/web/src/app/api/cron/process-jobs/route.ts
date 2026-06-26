import { NextResponse } from "next/server";
import { processJobs } from "@/features/jobs/queue";

export const dynamic = "force-dynamic";

/**
 * Worker-endpoint: verwerkt klaarstaande jobs. Beveiligd met CRON_SECRET
 * (Bearer of ?secret). Batchgrootte instelbaar via ?batch=N (default 10, max 50).
 */
async function handle(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "cron_disabled" }, { status: 401 });

  const url = new URL(req.url);
  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const provided = bearer ?? url.searchParams.get("secret");
  if (provided !== secret) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const batch = Math.min(50, Math.max(1, Number(url.searchParams.get("batch")) || 10));
  const result = await processJobs(batch);
  return NextResponse.json({ ok: true, ...result });
}

export const GET = handle;
export const POST = handle;
