import type { AgentDefinition } from "./agent";
import { leadAnalyzer } from "./lead-analyzer";
import { priceAdvisor } from "./price-advisor";
import { quoteAssistant } from "./quote-assistant";
import { seoWriter } from "./seo-writer";
import { photoAnalyzer } from "./photo-analyzer";
import { fraudDetector } from "./fraud-detector";
import { reviewSummarizer } from "./review-summarizer";
import { supportAssistant } from "./support-assistant";
import { adminAi } from "./admin-ai";

export * from "./agent";
export {
  leadAnalyzer,
  priceAdvisor,
  quoteAssistant,
  seoWriter,
  photoAnalyzer,
  fraudDetector,
  reviewSummarizer,
  supportAssistant,
  adminAi,
};

// Centrale registry: id → definitie. Het dashboard en runAgent lezen hieruit.
export const AGENTS = {
  "lead-analyzer": leadAnalyzer,
  "price-advisor": priceAdvisor,
  "quote-assistant": quoteAssistant,
  "seo-writer": seoWriter,
  "photo-analyzer": photoAnalyzer,
  "fraud-detector": fraudDetector,
  "review-summarizer": reviewSummarizer,
  "support-assistant": supportAssistant,
  "admin-ai": adminAi,
} as const;

export type AgentKey = keyof typeof AGENTS;
export const AGENT_KEYS = Object.keys(AGENTS) as AgentKey[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AGENT_LIST: AgentDefinition<any, any>[] = Object.values(AGENTS);
