import { z } from "zod";
import type { AgentDefinition } from "./agent";
import { PROMPTS } from "../prompts";

export interface SupportAssistantInput {
  role: "klant" | "installateur" | "admin";
  question: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export const supportAssistantSchema = z.object({
  answer: z.string(),
  links: z.array(z.object({ label: z.string(), href: z.string() })),
});
export type SupportAssistantOutput = z.infer<typeof supportAssistantSchema>;

export const supportAssistant: AgentDefinition<SupportAssistantInput, SupportAssistantOutput> = {
  id: "support-assistant",
  label: "Support Assistant",
  description: "Helpt klanten, installateurs en admins met vragen over het platform.",
  mode: "chat",
  systemPrompt: PROMPTS["support-assistant"],
  buildUser: (i) =>
    (i.history ?? []).map((h) => `${h.role}: ${h.content}`).join("\n") + `\n[${i.role}] ${i.question}`,
  schema: supportAssistantSchema,
  sample: (i) => ({
    answer:
      i.role === "installateur"
        ? "Je kunt je werkgebied en diensten beheren in je dashboard. Heb je een specifieke vraag?"
        : "Je kunt gratis en vrijblijvend een aanvraag doen; vakmannen reageren met offertes.",
    links:
      i.role === "installateur"
        ? [{ label: "Dashboard", href: "/dashboard" }]
        : [{ label: "Aanvraag doen", href: "/aanvraag" }],
  }),
};
