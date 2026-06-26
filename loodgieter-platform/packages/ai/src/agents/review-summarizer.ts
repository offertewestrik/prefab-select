import { z } from "zod";
import type { AgentDefinition } from "./agent";
import { PROMPTS } from "../prompts";

export interface ReviewSummarizerInput {
  companyName: string;
  reviews: { rating: number; body: string }[];
}

export const reviewSummarizerSchema = z.object({
  sentiment: z.enum(["positief", "gemengd", "negatief"]),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  improvements: z.array(z.string()),
});
export type ReviewSummarizerOutput = z.infer<typeof reviewSummarizerSchema>;

export const reviewSummarizer: AgentDefinition<ReviewSummarizerInput, ReviewSummarizerOutput> = {
  id: "review-summarizer",
  label: "Review Summarizer",
  description: "Vat veel reviews samen tot sterke punten, zwakke punten en verbeterpunten.",
  mode: "json",
  systemPrompt: PROMPTS["review-summarizer"],
  buildUser: (i) =>
    `Bedrijf: ${i.companyName}\nReviews (${i.reviews.length}):\n` +
    i.reviews.slice(0, 100).map((r, n) => `${n + 1}. [${r.rating}★] ${r.body}`).join("\n"),
  schema: reviewSummarizerSchema,
  sample: (i) => {
    const avg = i.reviews.length ? i.reviews.reduce((s, r) => s + r.rating, 0) / i.reviews.length : 0;
    return {
      sentiment: avg >= 4 ? "positief" : avg >= 3 ? "gemengd" : "negatief",
      strengths: ["Vakkundig werk", "Snelle reactie"],
      weaknesses: avg < 4 ? ["Communicatie kan beter"] : [],
      improvements: ["Houd klanten proactief op de hoogte van de planning"],
    };
  },
};
