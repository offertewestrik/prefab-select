import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  // This app lives in a subfolder of a larger repo; pin the tracing root
  // so Next.js doesn't pick up the parent lockfile.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
