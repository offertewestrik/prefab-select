// Upstash Redis via REST (werkt op edge & serverless). Optioneel: als de env
// niet is ingesteld, vallen rate-limiting en locks terug op "altijd toestaan".

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redisEnabled = Boolean(url && token);

async function command<T = unknown>(args: (string | number)[]): Promise<T | null> {
  if (!redisEnabled) return null;
  const res = await fetch(`${url}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { result: T };
  return data.result;
}

/** Atomic increment met TTL — basis voor rate limiting. */
export async function incrWithTtl(key: string, ttlSeconds: number): Promise<number> {
  const count = (await command<number>(["INCR", key])) ?? 0;
  if (count === 1) await command(["EXPIRE", key, ttlSeconds]);
  return count;
}

/** Eenvoudige lock via SET NX EX. Geeft true als de lock verkregen is. */
export async function acquireLock(key: string, ttlSeconds: number): Promise<boolean> {
  if (!redisEnabled) return true; // zonder Redis: geen lock, wel doorgaan
  const res = await command<string>(["SET", key, "1", "NX", "EX", ttlSeconds]);
  return res === "OK";
}

export async function releaseLock(key: string): Promise<void> {
  await command(["DEL", key]);
}
