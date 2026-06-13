import { exchangeCodeForTokens } from "@/lib/integrations/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Google stuurt de gebruiker hierheen terug met een ?code=... → wissel om voor tokens.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const fout = url.searchParams.get("error");
  // Achter App Hosting/Cloud Run is url.host het interne adres (0.0.0.0:8080),
  // dus bouwen we de publieke basis-URL op uit GOOGLE_REDIRECT_URI.
  const basis = process.env.GOOGLE_REDIRECT_URI
    ? new URL(process.env.GOOGLE_REDIRECT_URI).origin
    : `${url.protocol}//${url.host}`;

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
