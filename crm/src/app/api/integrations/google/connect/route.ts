import { buildGoogleAuthUrl, isGoogleConfigured } from "@/lib/integrations/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Start de Google-koppeling: stuurt de gebruiker naar het Google-inlogscherm.
export async function GET() {
  if (!isGoogleConfigured()) {
    return Response.json(
      { error: "Google niet geconfigureerd (GOOGLE_CLIENT_ID/SECRET/REDIRECT_URI ontbreken)." },
      { status: 503 },
    );
  }
  const url = buildGoogleAuthUrl("gmail");
  return Response.redirect(url, 302);
}
