import { NextResponse } from "next/server";
import { expireQuotes, followUpQuotes } from "@/features/quotes/server/mutations";

export const dynamic = "force-dynamic";

/**
 * Cron-endpoint: laat verlopen SENT-offertes verlopen.
 *
 * Beveiliging: vereist CRON_SECRET. Vercel Cron stuurt deze als
 * `Authorization: Bearer <CRON_SECRET>`. Handmatig aanroepen kan ook via
 * `?secret=<CRON_SECRET>`. Zonder (juist) secret → 401.
 */
async function handle(req: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // Geen secret geconfigureerd → endpoint is uit (niet open laten staan).
    return NextResponse.json({ error: "cron_disabled" }, { status: 401 });
  }

  const auth = req.headers.get("authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  const fromQuery = new URL(req.url).searchParams.get("secret");
  const provided = bearer ?? fromQuery;

  if (provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Verloop + follow-up in één dagelijkse run (bespaart een aparte cron op Hobby).
  const expired = await expireQuotes();
  const followUp = await followUpQuotes();
  return NextResponse.json({ ok: true, ...expired, followUp });
}

export const GET = handle;
export const POST = handle;
