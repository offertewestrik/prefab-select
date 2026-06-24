/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lint draaien we apart (npm run lint); het mag de prototype-build niet blokkeren.
  eslint: { ignoreDuringBuilds: true },
  // @react-pdf/renderer brengt enkele node-only modules mee; deze houden we
  // buiten de server-bundle zodat de PDF-route in de App Router blijft werken.
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
