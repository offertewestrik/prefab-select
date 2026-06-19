/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",            // statische export → deploybaar op GitHub Pages / elke host
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  transpilePackages: ["three"],
};

export default nextConfig;
