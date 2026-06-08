import { exchangeCodeForTokens } from "@/lib/integrations/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Google stuurt de gebruiker hierheen terug met een ?code=... → wissel om voor tokens.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const fout = url.searchParams.get("error");
  const basis = `${url.protocol}//${url.host}`;

  if (fout) return Response.redirect(`${basis}/integraties?gmail=geweigerd`, 302);
  if (!code) return Response.redirect(`${basis}/integraties?gmail=geen_code`, 302);

  try {
    const { email } = await exchangeCodeForTokens(code);
    return Response.redirect(`${basis}/integraties?gmail=verbonden&adres=${encodeURIComponent(email)}`, 302);
  } catch (err) {
    console.error("Gmail-koppeling mislukt:", err);
    return Response.redirect(`${basis}/integraties?gmail=mislukt`, 302);
  }
}
