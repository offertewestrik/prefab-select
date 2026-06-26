import { NextResponse } from "next/server";
import { runDailyReport } from "@/features/ai/services";

export const dynamic = "force-dynamic";

/**
 * Cron: genereert het Admin AI-ochtendrapport. Beveiligd met CRON_SECRET
 * (Bearer of ?secret), zelfde patroon als /api/cron/expire-quotes.
 */
async function handle(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "cron_disabled" }, { status: 401 });

  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const provided = bearer ?? new URL(req.url).searchParams.get("secret");
  if (provided !== secret) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const result = await runDailyReport();
  return NextResponse.json(result);
}

export const GET = handle;
export const POST = handle;
