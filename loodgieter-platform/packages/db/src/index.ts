import { PrismaClient } from "@prisma/client";

// Singleton — voorkomt meerdere clients tijdens hot-reload in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Tijdens `next build` worden veel pagina's parallel voorgerenderd. De
// Supabase-transactionpooler met connection_limit=1 loopt daarbij vast
// (Prisma P2024: "Timed out fetching a new connection from the connection
// pool"). Daarom gebruiken we tijdens de build de directe verbinding
// (DIRECT_URL, geen pooler-limiet) en op runtime (serverless) de pooler
// (DATABASE_URL, IPv4). Beide staan al als env-variabele in Vercel.
const isBuild = process.env.NEXT_PHASE === "phase-production-build";
const datasourceUrl =
  isBuild && process.env.DIRECT_URL ? process.env.DIRECT_URL : process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(datasourceUrl ? { datasourceUrl } : {}),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from "@prisma/client";
