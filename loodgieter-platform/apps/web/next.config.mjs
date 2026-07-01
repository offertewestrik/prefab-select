/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/core", "@repo/seo", "@repo/db", "@repo/config", "@repo/content"],
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  // Prisma's query-engine (.so.node) wordt door de bundler niet automatisch
  // naast de serverless-functie gekopieerd in een pnpm-monorepo. Zonder deze
  // include mist "libquery_engine-rhel-openssl-3.0.x.so.node" op de Vercel
  // runtime → PrismaClientInitializationError op elke DB-pagina.
  // Zie https://pris.ly/d/engine-not-found-nextjs
  //
  // NB: we zetten bewust GEEN outputFileTracingRoot. Next.js leidt de
  // workspace-root al correct af (dezelfde locatie die Prisma op runtime
  // doorzoekt); het expliciet overschrijven brak de trace-collectie
  // ("Cannot find module server.runtime.prod.js" via noop.js).
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
