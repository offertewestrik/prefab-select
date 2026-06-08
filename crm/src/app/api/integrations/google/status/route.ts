import { isGmailConnected, isGoogleConfigured } from "@/lib/integrations/google";
import { getGoogleTokens } from "@/lib/data/google-repo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Is Gmail gekoppeld? (voor de knop in het CRM)
export async function GET() {
  if (!isGoogleConfigured()) return Response.json({ configured: false, connected: false });
  const connected = await isGmailConnected();
  const tokens = connected ? await getGoogleTokens() : null;
  return Response.json({ configured: true, connected, email: tokens?.email ?? null });
}
