"use server";

import { revalidatePath } from "next/cache";
import { AGENTS, type AgentKey } from "@repo/ai";
import { requireRole } from "@/lib/guards";
import { rateLimit } from "@/lib/ratelimit";
import { runAgent } from "./run";
import { runDailyReport } from "./services";

// Representatieve demo-input per agent voor een "test run" vanuit het dashboard.
const DEMO_INPUTS: Record<AgentKey, unknown> = {
  "lead-analyzer": { service: "CV-ketel vervangen", city: "Eindhoven", urgency: "NORMAAL", description: "Mijn cv-ketel is 15 jaar oud en maakt lawaai. Graag vervangingsadvies.", attachmentCount: 0 },
  "price-advisor": { service: "CV-ketel vervangen", region: "Noord-Brabant", scope: "Standaard combiketel inclusief montage", priceFromCents: 180000 },
  "quote-assistant": { service: "CV-ketel vervangen", city: "Eindhoven", description: "Vervangen combiketel", marketPriceCents: 200000 },
  "seo-writer": { kind: "service", topic: "warmtepomp installeren", context: "Noord-Brabant" },
  "photo-analyzer": { imageUrls: ["https://example.com/ketel.jpg"], hint: "Vermoedelijk cv-ketel" },
  "fraud-detector": { kind: "lead", text: "Snel iemand nodig!!!", signals: { duplicateCount: 2, sameContactRecentCount: 4, accountAgeDays: 0 } },
  "review-summarizer": { companyName: "Demo Installatiebedrijf", reviews: [{ rating: 5, body: "Top service" }, { rating: 4, body: "Netjes maar laat" }] },
  "support-assistant": { role: "klant", question: "Hoe vraag ik een offerte aan?" },
  "admin-ai": { date: "2026-06-26", stats: { newLeads: 12, newCompanies: 1, revenueCents: 45000, creditsSold: 30, newReviews: 3, conversionPct: 25, problems: [] } },
};

export type TestRunState = { ok?: boolean; output?: string; error?: string };

/** Voert een agent uit met demo-input (admin-only). */
export async function testRunAgentAction(_prev: TestRunState, formData: FormData): Promise<TestRunState> {
  const user = await requireRole("ADMIN");
  const key = String(formData.get("agent") ?? "") as AgentKey;
  const agent = AGENTS[key];
  if (!agent) return { ok: false, error: "Onbekende agent." };

  const rl = await rateLimit(`ai-test:${(user as { id: string }).id}`, 30, 3600);
  if (!rl.ok) return { ok: false, error: "Te veel testruns; probeer later opnieuw." };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await runAgent(agent as any, DEMO_INPUTS[key], { summary: `Testrun ${agent.label}`, userId: (user as { id: string }).id });
  revalidatePath(`/admin/ai/${key}`);
  revalidatePath("/admin/ai");
  if (!result.ok) return { ok: false, error: result.error ?? "Mislukt." };
  return { ok: true, output: JSON.stringify(result.data, null, 2) };
}

/** Genereer handmatig het dagrapport (admin-only). */
export async function generateDailyReportAction(): Promise<void> {
  await requireRole("ADMIN");
  await runDailyReport();
  revalidatePath("/admin/ai");
}
