import "server-only";
import { getProvider, type AgentDefinition } from "@repo/ai";
import { prisma } from "@/lib/prisma";

export interface RunMeta {
  /** Korte, PII-vrije samenvatting voor de log. */
  summary: string;
  userId?: string | null;
  companyId?: string | null;
  leadId?: string | null;
}

export interface RunResult<O> {
  ok: boolean;
  data?: O;
  error?: string;
  usage?: { promptTokens: number; completionTokens: number; totalTokens: number };
  latencyMs: number;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

/**
 * Voert één agent uit: provider aanroepen → output valideren tegen het schema →
 * AiInvocation loggen (zonder PII) → resultaat teruggeven. Provider-onafhankelijk.
 */
export async function runAgent<I, O>(
  agent: AgentDefinition<I, O>,
  input: I,
  meta: RunMeta,
): Promise<RunResult<O>> {
  const provider = getProvider();
  const start = Date.now();
  const ids = { userId: meta.userId ?? null, companyId: meta.companyId ?? null, leadId: meta.leadId ?? null };

  try {
    const completion =
      agent.mode === "vision" && agent.images && provider.vision
        ? await provider.vision({
            system: agent.systemPrompt,
            prompt: agent.buildUser(input),
            images: agent.images(input),
            jsonSchema: { type: "object" },
            mock: agent.sample(input),
          })
        : await provider.complete({
            system: agent.systemPrompt,
            messages: [{ role: "user", content: agent.buildUser(input) }],
            jsonSchema: { type: "object" },
            mock: agent.sample(input),
          });

    const latencyMs = Date.now() - start;
    const parsed = agent.schema.safeParse(completion.json ?? safeJson(completion.text));

    if (!parsed.success) {
      await prisma.aiInvocation.create({
        data: {
          agent: agent.id,
          provider: provider.name,
          model: completion.model,
          status: "ERROR",
          inputSummary: meta.summary,
          promptTokens: completion.usage.promptTokens,
          completionTokens: completion.usage.completionTokens,
          totalTokens: completion.usage.totalTokens,
          latencyMs,
          errorMessage: "schema_invalid",
          ...ids,
        },
      });
      return { ok: false, error: "schema_invalid", usage: completion.usage, latencyMs };
    }

    await prisma.aiInvocation.create({
      data: {
        agent: agent.id,
        provider: provider.name,
        model: completion.model,
        status: "OK",
        inputSummary: meta.summary,
        outputJson: parsed.data as object,
        promptTokens: completion.usage.promptTokens,
        completionTokens: completion.usage.completionTokens,
        totalTokens: completion.usage.totalTokens,
        latencyMs,
        ...ids,
      },
    });
    return { ok: true, data: parsed.data, usage: completion.usage, latencyMs };
  } catch (e) {
    const latencyMs = Date.now() - start;
    await prisma.aiInvocation
      .create({
        data: {
          agent: agent.id,
          provider: provider.name,
          model: "unknown",
          status: "ERROR",
          inputSummary: meta.summary,
          latencyMs,
          errorMessage: e instanceof Error ? e.message.slice(0, 500) : "error",
          ...ids,
        },
      })
      .catch(() => {});
    return { ok: false, error: "provider_error", latencyMs };
  }
}
