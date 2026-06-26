import { z } from "zod";
import type { AgentDefinition } from "./agent";
import { PROMPTS } from "../prompts";

export interface PriceAdvisorInput {
  service: string;
  region: string;
  scope: string;
  priceFromCents?: number | null;
}

export const priceAdvisorSchema = z.object({
  marketPriceCents: z.number().int(),
  rangeMinCents: z.number().int(),
  rangeMaxCents: z.number().int(),
  materialCents: z.number().int(),
  labourHours: z.number(),
  vatRate: z.number().int(),
  regionalFactor: z.number(),
  advice: z.string(),
});
export type PriceAdvisorOutput = z.infer<typeof priceAdvisorSchema>;

export const priceAdvisor: AgentDefinition<PriceAdvisorInput, PriceAdvisorOutput> = {
  id: "price-advisor",
  label: "Price Advisor",
  description: "Berekent marktprijs, range, materiaal, arbeidsuren, btw en regionale correctie.",
  mode: "json",
  systemPrompt: PROMPTS["price-advisor"],
  buildUser: (i) =>
    `Dienst: ${i.service}\nRegio: ${i.region}\nOmvang: ${i.scope}\nRichtprijs vanaf (centen): ${i.priceFromCents ?? "onbekend"}`,
  schema: priceAdvisorSchema,
  sample: (i) => {
    const base = i.priceFromCents && i.priceFromCents > 0 ? i.priceFromCents : 75000;
    return {
      marketPriceCents: base,
      rangeMinCents: Math.round(base * 0.85),
      rangeMaxCents: Math.round(base * 1.3),
      materialCents: Math.round(base * 0.4),
      labourHours: 4,
      vatRate: 21,
      regionalFactor: 1.0,
      advice: `Marktconforme prijs voor ${i.service} in regio ${i.region}.`,
    };
  },
};
