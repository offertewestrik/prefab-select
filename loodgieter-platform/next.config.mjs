/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // firebase-admin is a server-only package; keep it external to the bundle
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
