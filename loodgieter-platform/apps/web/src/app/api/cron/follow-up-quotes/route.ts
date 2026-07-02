import { NextResponse } from "next/server";
import { followUpQuotes } from "@/features/quotes/server/mutations";

export const dynamic = "force-dynamic";

/**
 * Cron-endpoint: stuurt een herinnering voor SENT-offertes die al enkele dagen
 * open staan. Beveiliging identiek aan expire-quotes: vereist CRON_SECRET
 * (Authorization: Bearer <secret> of ?secret=).
 */
async function handle(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ error: "cron_disabled" }, { status: 401 });
  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const provided = bearer ?? new URL(req.url).searchParams.get("secret");
  if (provided !== secret) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const result = await followUpQuotes();
  return NextResponse.json({ ok: true, ...result });
}

export const GET = handle;
export const POST = handle;
