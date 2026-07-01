import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Monorepo-root (…/loodgieter-platform). Zet de output-file-tracing root hier
// zodat Next.js het hele pnpm-workspace meeneemt én de "multiple lockfiles"
// waarschuwing verdwijnt.
const monorepoRoot = path.join(__dirname, "..", "..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/core", "@repo/seo", "@repo/db", "@repo/config", "@repo/content"],
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  outputFileTracingRoot: monorepoRoot,
  // Prisma's query-engine (.so.node) wordt door de bundler niet automatisch
  // naast de serverless-functie gekopieerd in een pnpm-monorepo. Zonder deze
  // include mist "libquery_engine-rhel-openssl-3.0.x.so.node" op de Vercel
  // runtime → PrismaClientInitializationError op elke DB-pagina.
  // Zie https://pris.ly/d/engine-not-found-nextjs
  outputFileTracingIncludes: {
    "/**": [
      "../../node_modules/.pnpm/@prisma+client@*/node_modules/.prisma/client/**/*",
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
