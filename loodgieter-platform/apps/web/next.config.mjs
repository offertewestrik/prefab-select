import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // De repo bevat meerdere lockfiles (buitenste package-lock.json + deze
  // pnpm-workspace). Next moet de workspace-root expliciet op
  // loodgieter-platform zetten, anders kiest het de verkeerde root en serveert
  // Vercel routes niet (404 op /). Zie de "additional lockfiles"-waarschuwing.
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@repo/ui", "@repo/core", "@repo/seo", "@repo/db", "@repo/config", "@repo/content"],
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
