"use server";

import { revalidatePath } from "next/cache";
import { AGENTS, seoWriter, type AgentKey } from "@repo/ai";
import { requireRole } from "@/lib/guards";
import { rateLimit } from "@/lib/ratelimit";
import { runAgent } from "./run";
import { runDailyReport, summarizeCompanyReviews } from "./services";

// Representatieve demo-input per agent voor een "test run" vanuit het dashboard.
const DEMO_INPUTS: Record<AgentKey, unknown> = {
  "lead-analyzer": { service: "CV-ketel vervangen", city: "Eindhoven", urgency: "BINNEN_WEEK", description: "Mijn cv-ketel is 15 jaar oud en maakt lawaai. Graag vervangingsadvies.", attachmentCount: 0 },
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

/** Reviews van een bedrijf samenvatten (admin-only; intern opgeslagen). */
export async function summarizeReviewsAction(formData: FormData): Promise<void> {
  await requireRole("ADMIN");
  const companyId = String(formData.get("companyId") ?? "");
  if (companyId) {
    await summarizeCompanyReviews(companyId);
    revalidatePath(`/admin/installers/${companyId}`);
  }
}

export type SeoConceptState = { ok?: boolean; output?: string; error?: string };

/** SEO-conceptgenerator (admin-only). Levert alleen een concept; publiceert nooit. */
export async function seoConceptAction(_prev: SeoConceptState, formData: FormData): Promise<SeoConceptState> {
  await requireRole("ADMIN");
  const kindRaw = String(formData.get("kind") ?? "service");
  const kind = (["service", "city", "article", "service-city"].includes(kindRaw) ? kindRaw : "service") as
    | "service" | "city" | "article" | "service-city";
  const topic = String(formData.get("topic") ?? "").trim();
  if (!topic) return { ok: false, error: "Vul een onderwerp in." };

  const res = await runAgent(seoWriter, { kind, topic, context: String(formData.get("context") ?? "") }, { summary: `SEO-concept ${kind}: ${topic}` });
  if (!res.ok || !res.data) return { ok: false, error: "AI kon geen concept maken." };
  return { ok: true, output: JSON.stringify(res.data, null, 2) };
}
