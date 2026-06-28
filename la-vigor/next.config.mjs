import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Empty for local dev / root hosts. Set by a static-host workflow if needed.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export so the hero can be served by any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // This app lives in a subfolder of a larger repo; pin the tracing root so
  // Next.js does not pick up the parent lockfile.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
