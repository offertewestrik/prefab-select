import { sha256hex, AUTH_COOKIE } from "@/lib/auth-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const verwacht = process.env.CRM_PASSWORD;
  // Geen wachtwoord ingesteld → beveiliging staat uit, altijd toelaten.
  if (!verwacht) return Response.json({ ok: true });

  let wachtwoord = "";
  try {
    wachtwoord = (await req.json()).wachtwoord ?? "";
  } catch {
    /* leeg */
  }
  if (wachtwoord !== verwacht) {
    return Response.json({ ok: false, error: "Onjuist wachtwoord" }, { status: 401 });
  }

  const token = await sha256hex(verwacht);
  const res = Response.json({ ok: true });
  res.headers.set(
    "Set-Cookie",
    `${AUTH_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
  );
  return res;
}
