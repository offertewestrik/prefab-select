import { z } from "zod";
import type { AgentDefinition } from "./agent";
import { PROMPTS } from "../prompts";

export interface FraudDetectorInput {
  kind: "lead" | "review";
  text: string;
  signals: {
    duplicateCount?: number;
    sameContactRecentCount?: number;
    accountAgeDays?: number;
  };
}

export const fraudDetectorSchema = z.object({
  riskScore: z.number().int().min(0).max(100),
  flags: z.array(z.string()),
  recommendation: z.enum(["toelaten", "controleren", "blokkeren"]),
});
export type FraudDetectorOutput = z.infer<typeof fraudDetectorSchema>;

export const fraudDetector: AgentDefinition<FraudDetectorInput, FraudDetectorOutput> = {
  id: "fraud-detector",
  label: "Fraud Detector",
  description: "Controleert op dubbele aanvragen, spam, verdachte patronen en nep-reviews.",
  mode: "json",
  systemPrompt: PROMPTS["fraud-detector"],
  buildUser: (i) =>
    `Type: ${i.kind}\nDuplicaten: ${i.signals.duplicateCount ?? 0}\nRecent zelfde contact: ${i.signals.sameContactRecentCount ?? 0}\nAccountleeftijd (dagen): ${i.signals.accountAgeDays ?? "?"}\nTekst: ${i.text}`,
  schema: fraudDetectorSchema,
  sample: (i) => {
    const dup = i.signals.duplicateCount ?? 0;
    const recent = i.signals.sameContactRecentCount ?? 0;
    let score = 0;
    const flags: string[] = [];
    if (dup > 0) { score += 40; flags.push(`${dup} mogelijke duplicaten`); }
    if (recent >= 3) { score += 35; flags.push("veel aanvragen van zelfde contact"); }
    if (i.text.length < 15) { score += 15; flags.push("zeer korte tekst"); }
    score = Math.min(100, score);
    return {
      riskScore: score,
      flags,
      recommendation: score >= 70 ? "blokkeren" : score >= 35 ? "controleren" : "toelaten",
    };
  },
};
