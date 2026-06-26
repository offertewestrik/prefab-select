import { z } from "zod";
import type { AgentDefinition } from "./agent";
import { PROMPTS } from "../prompts";

export interface LeadAnalyzerInput {
  service: string;
  city: string;
  urgency: string;
  description: string;
  attachmentCount: number;
}

export const leadAnalyzerSchema = z.object({
  summary: z.string(),
  urgency: z.enum(["laag", "normaal", "hoog", "spoed"]),
  complexity: z.enum(["eenvoudig", "gemiddeld", "complex"]),
  risks: z.array(z.string()),
  missingInfo: z.array(z.string()),
  estimatedDurationHours: z.number(),
  recommendedServices: z.array(z.string()),
  recommendedBrands: z.array(z.string()),
});
export type LeadAnalyzerOutput = z.infer<typeof leadAnalyzerSchema>;

export const leadAnalyzer: AgentDefinition<LeadAnalyzerInput, LeadAnalyzerOutput> = {
  id: "lead-analyzer",
  label: "Lead Analyzer",
  description: "Analyseert elke aanvraag: samenvatting, urgentie, complexiteit, risico's en aanbevelingen.",
  mode: "json",
  systemPrompt: PROMPTS["lead-analyzer"],
  buildUser: (i) =>
    `Dienst: ${i.service}\nPlaats: ${i.city}\nUrgentie: ${i.urgency}\nBijlagen: ${i.attachmentCount}\nOmschrijving: ${i.description}`,
  schema: leadAnalyzerSchema,
  sample: (i) => ({
    summary: `Aanvraag voor ${i.service} in ${i.city}.`,
    urgency: i.urgency.toLowerCase().includes("spoed") ? "spoed" : "normaal",
    complexity: i.description.length > 200 ? "complex" : "gemiddeld",
    risks: i.attachmentCount === 0 ? ["Geen foto's meegestuurd"] : [],
    missingInfo: i.description.length < 40 ? ["Beknopte omschrijving — vraag om meer detail"] : [],
    estimatedDurationHours: 3,
    recommendedServices: [i.service],
    recommendedBrands: [],
  }),
};
