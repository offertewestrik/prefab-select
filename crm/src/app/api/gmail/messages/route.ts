import { getGmailMessages, isGmailConnected } from "@/lib/integrations/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/gmail/messages?email=klant@x.nl — mailwisseling met een klant.
export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get("email");
  if (!email) return Response.json({ error: "email vereist" }, { status: 400 });

  if (!(await isGmailConnected())) {
    return Response.json({ connected: false, messages: [] });
  }
  try {
    const messages = await getGmailMessages(email);
    return Response.json({ connected: true, messages });
  } catch (err) {
    console.error("Gmail-berichten ophalen mislukt:", err);
    return Response.json({ connected: true, messages: [], error: (err as Error).message });
  }
}
