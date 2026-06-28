import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Set to "/prefab-select/la-vigor" by the GitHub Pages workflow (project pages
// live under https://<user>.github.io/<repo>/<project>/). Empty for local dev
// and root hosts like a custom domain (lavigor.com).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site → export to /out so it can be served by GitHub Pages,
  // Firebase Hosting, or any static host.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // This app lives in a subfolder of a larger repo; pin the tracing root
  // so Next.js doesn't pick up the parent lockfile.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
