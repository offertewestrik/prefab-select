import { NextResponse } from "next/server";
import { leadInputSchema } from "@repo/core";
import { rateLimit } from "@/lib/ratelimit";
import { createLead } from "@/features/leads/server/create";

export const runtime = "nodejs";

function hashIp(ip: string): string {
  let h = 2166136261;
  for (let i = 0; i < ip.length; i++) {
    h ^= ip.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";

  const limit = await rateLimit(`leads:${ip}`, 5, 600); // 5 aanvragen / 10 min
  if (!limit.ok) {
    return NextResponse.json({ error: "Te veel aanvragen. Probeer het later opnieuw." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 400 });
  }

  const parsed = leadInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Controleer de ingevulde gegevens.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const result = await createLead(parsed.data, {
      source: req.headers.get("referer") ?? undefined,
      ipHash: hashIp(ip),
    });
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Er ging iets mis." },
      { status: 500 },
    );
  }
}
