import { z } from "zod";
import type { AgentDefinition } from "./agent";
import type { VisionImage } from "../types";
import { PROMPTS } from "../prompts";

export interface PhotoAnalyzerInput {
  imageUrls: string[];
  hint?: string;
}

export const photoAnalyzerSchema = z.object({
  detected: z.array(
    z.enum(["cv-ketel", "warmtepomp", "lekkage", "radiator", "vloerverwarming", "badkamer", "onbekend"]),
  ),
  condition: z.enum(["goed", "matig", "slecht", "onbekend"]),
  notes: z.string(),
});
export type PhotoAnalyzerOutput = z.infer<typeof photoAnalyzerSchema>;

export const photoAnalyzer: AgentDefinition<PhotoAnalyzerInput, PhotoAnalyzerOutput> = {
  id: "photo-analyzer",
  label: "Photo Analyzer",
  description: "Detecteert installatie-onderdelen op foto's (cv-ketel, warmtepomp, lekkage, e.d.) en hun toestand.",
  mode: "vision",
  systemPrompt: PROMPTS["photo-analyzer"],
  buildUser: (i) => `Beoordeel ${i.imageUrls.length} foto('s). ${i.hint ?? ""}`.trim(),
  images: (i): VisionImage[] => i.imageUrls.map((url) => ({ url })),
  schema: photoAnalyzerSchema,
  sample: (i) => ({
    detected: i.imageUrls.length > 0 ? ["cv-ketel"] : ["onbekend"],
    condition: "onbekend",
    notes: i.imageUrls.length === 0 ? "Geen foto's aangeleverd." : "Automatische detectie; laat ter plaatse beoordelen.",
  }),
};
