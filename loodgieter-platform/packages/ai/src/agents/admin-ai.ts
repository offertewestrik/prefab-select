import { z } from "zod";
import type { AgentDefinition } from "./agent";
import { PROMPTS } from "../prompts";

export interface AdminAiInput {
  date: string;
  stats: {
    newLeads: number;
    newCompanies: number;
    revenueCents: number;
    creditsSold: number;
    newReviews: number;
    conversionPct: number;
    problems: string[];
  };
}

export const adminAiSchema = z.object({
  headline: z.string(),
  highlights: z.array(z.string()),
  concerns: z.array(z.string()),
  recommendedActions: z.array(z.string()),
});
export type AdminAiOutput = z.infer<typeof adminAiSchema>;

export const adminAi: AgentDefinition<AdminAiInput, AdminAiOutput> = {
  id: "admin-ai",
  label: "Admin AI",
  description: "Maakt elke ochtend een rapport: leads, bedrijven, omzet, credits, reviews, conversie, problemen.",
  mode: "json",
  systemPrompt: PROMPTS["admin-ai"],
  buildUser: (i) =>
    `Datum: ${i.date}\nNieuwe leads: ${i.stats.newLeads}\nNieuwe bedrijven: ${i.stats.newCompanies}\nOmzet (centen): ${i.stats.revenueCents}\nCredits verkocht: ${i.stats.creditsSold}\nNieuwe reviews: ${i.stats.newReviews}\nConversie: ${i.stats.conversionPct}%\nProblemen: ${i.stats.problems.join("; ") || "geen"}`,
  schema: adminAiSchema,
  sample: (i) => ({
    headline: `Dagrapport ${i.date}: ${i.stats.newLeads} leads, ${i.stats.newCompanies} nieuwe bedrijven.`,
    highlights: [
      `${i.stats.newLeads} nieuwe leads`,
      `€ ${(i.stats.revenueCents / 100).toFixed(0)} omzet`,
      `${i.stats.newReviews} nieuwe reviews`,
    ],
    concerns: i.stats.problems.length ? i.stats.problems : i.stats.conversionPct < 20 ? ["Lage conversie"] : [],
    recommendedActions: i.stats.newCompanies === 0 ? ["Acquisitie nieuwe vakmannen oppakken"] : ["Doorgaan op koers"],
  }),
};
