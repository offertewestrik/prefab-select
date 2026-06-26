import { z } from "zod";
import type { AgentDefinition } from "./agent";
import { PROMPTS } from "../prompts";

export interface QuoteAssistantInput {
  service: string;
  city: string;
  description: string;
  marketPriceCents?: number | null;
}

export const quoteAssistantSchema = z.object({
  title: z.string(),
  introText: z.string(),
  lineItems: z.array(
    z.object({ description: z.string(), qty: z.number(), unitPriceCents: z.number().int() }),
  ),
  terms: z.string(),
  planning: z.string(),
});
export type QuoteAssistantOutput = z.infer<typeof quoteAssistantSchema>;

export const quoteAssistant: AgentDefinition<QuoteAssistantInput, QuoteAssistantOutput> = {
  id: "quote-assistant",
  label: "Quote Assistant",
  description: "Genereert een concept-offerte: werkzaamheden, materiaal, voorwaarden en planning.",
  mode: "json",
  systemPrompt: PROMPTS["quote-assistant"],
  buildUser: (i) =>
    `Dienst: ${i.service}\nPlaats: ${i.city}\nOmschrijving: ${i.description}\nRichtprijs (centen): ${i.marketPriceCents ?? "onbekend"}`,
  schema: quoteAssistantSchema,
  sample: (i) => {
    const labour = i.marketPriceCents ? Math.round(i.marketPriceCents * 0.6) : 45000;
    const material = i.marketPriceCents ? Math.round(i.marketPriceCents * 0.4) : 30000;
    return {
      title: `Offerte ${i.service}`,
      introText: `Hartelijk dank voor uw aanvraag voor ${i.service} in ${i.city}. Hierbij onze vrijblijvende offerte.`,
      lineItems: [
        { description: `Arbeid ${i.service}`, qty: 1, unitPriceCents: labour },
        { description: "Materiaal en onderdelen", qty: 1, unitPriceCents: material },
      ],
      terms: "Geldig 30 dagen. Uitvoering in overleg. Garantie conform onze voorwaarden.",
      planning: "Inplanbaar binnen 1–2 weken na akkoord.",
    };
  },
};
