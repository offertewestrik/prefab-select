import { NextResponse } from "next/server";
import { enqueue } from "@/features/jobs/queue";

export const dynamic = "force-dynamic";

/**
 * Cron: plant een photo.cleanup_orphans-job in (verweesde uploads opruimen).
 * Beveiligd met CRON_SECRET (Bearer of ?secret).
 */
async function handle(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "cron_disabled" }, { status: 401 });

  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const provided = bearer ?? new URL(req.url).searchParams.get("secret");
  if (provided !== secret) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const jobId = await enqueue("photo.cleanup_orphans", {});
  return NextResponse.json({ ok: true, queued: jobId });
}

export const GET = handle;
export const POST = handle;
