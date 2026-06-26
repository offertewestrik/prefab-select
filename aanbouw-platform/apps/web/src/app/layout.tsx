import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { brand } from "@repo/core";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aanbouwplatform.nl"),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: `${brand.name}: vergelijk gratis offertes van gecertificeerde bouwbedrijven en bouwbedrijven. ${brand.tagline}.`,
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: brand.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
