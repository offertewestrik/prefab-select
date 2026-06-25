import "server-only";
import { incrWithTtl, redisEnabled } from "./redis";

/**
 * Eenvoudige fixed-window rate limit. Zonder Redis altijd toegestaan
 * (development), zodat de app blijft werken.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<{ ok: boolean; remaining: number }> {
  if (!redisEnabled) return { ok: true, remaining: limit };
  const count = await incrWithTtl(`rl:${key}`, windowSeconds);
  return { ok: count <= limit, remaining: Math.max(0, limit - count) };
}
