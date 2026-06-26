import { z } from "zod";
import type { AgentDefinition } from "./agent";
import { PROMPTS } from "../prompts";

export interface SeoWriterInput {
  kind: "service" | "city" | "article" | "service-city";
  topic: string;
  context?: string;
}

export const seoWriterSchema = z.object({
  title: z.string(),
  metaDescription: z.string(),
  intro: z.string(),
  sections: z.array(z.object({ heading: z.string(), body: z.string() })),
  faq: z.array(z.object({ question: z.string(), answer: z.string() })),
  schemaText: z.string(),
});
export type SeoWriterOutput = z.infer<typeof seoWriterSchema>;

export const seoWriter: AgentDefinition<SeoWriterInput, SeoWriterOutput> = {
  id: "seo-writer",
  label: "SEO Writer",
  description: "Genereert concept dienst-/stadpagina's, kennisbank, FAQ, meta descriptions en schema-teksten.",
  mode: "json",
  systemPrompt: PROMPTS["seo-writer"],
  buildUser: (i) => `Type: ${i.kind}\nOnderwerp: ${i.topic}\nContext: ${i.context ?? "-"}`,
  schema: seoWriterSchema,
  sample: (i) => ({
    title: `${i.topic} — vergelijk vakmannen`,
    metaDescription: `Alles over ${i.topic}. Vergelijk gratis offertes van gecertificeerde vakmannen.`,
    intro: `Op zoek naar ${i.topic}? Hieronder leggen we uit wat erbij komt kijken.`,
    sections: [
      { heading: "Wat houdt het in?", body: `Een korte uitleg over ${i.topic}.` },
      { heading: "Waar let je op?", body: "Vraag altijd meerdere offertes op en let op certificering." },
    ],
    faq: [{ question: `Wat kost ${i.topic}?`, answer: "Dat hangt af van de situatie; vergelijk offertes." }],
    schemaText: `Service: ${i.topic}`,
  }),
};
