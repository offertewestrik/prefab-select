import { PrismaClient } from "@prisma/client";

// Singleton — voorkomt meerdere clients tijdens hot-reload in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Tijdens `next build` worden veel pagina's parallel voorgerenderd. De
// Supabase-transactionpooler met connection_limit=1 loopt daarbij vast
// (Prisma P2024). Daarom gebruiken we tijdens de build de directe verbinding
// (DIRECT_URL, geen pooler-limiet) en op runtime (serverless) de pooler
// (DATABASE_URL, IPv4). Beide staan al als env-variabele in Vercel.
const isBuild = process.env.NEXT_PHASE === "phase-production-build";
const baseUrl =
  isBuild && process.env.DIRECT_URL ? process.env.DIRECT_URL : process.env.DATABASE_URL;

/**
 * Op de Vercel-runtime rendert elke stad/dienst-pagina met meerdere
 * parallelle Prisma-queries (Promise.all: gemeente, diensten, nabije
 * gemeenten én drie review-queries = tot ~5 tegelijk). Met connection_limit=1
 * op de Supabase-pooler vechten die queries om één verbinding en lopen ze
 * over de pool-timeout van 10s → P2024 op (niet vooraf gerenderde) steden.
 * We verruimen daarom de pool en verlengen de timeout. Voor de
 * transaction-pooler zetten we bovendien pgbouncer=true (schakelt prepared
 * statements uit — vereist bij transaction-pooling).
 *
 * Alleen op runtime; de build gebruikt de directe DIRECT_URL ongewijzigd.
 */
function withRuntimePool(url: string | undefined): string | undefined {
  if (!url || isBuild) return url;
  try {
    const u = new URL(url);
    if (!u.searchParams.has("connection_limit")) u.searchParams.set("connection_limit", "5");
    if (!u.searchParams.has("pool_timeout")) u.searchParams.set("pool_timeout", "20");
    if (u.hostname.includes("pooler") && !u.searchParams.has("pgbouncer")) {
      u.searchParams.set("pgbouncer", "true");
    }
    return u.toString();
  } catch {
    return url;
  }
}

const datasourceUrl = withRuntimePool(baseUrl);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(datasourceUrl ? { datasourceUrl } : {}),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from "@prisma/client";
