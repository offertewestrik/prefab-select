import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/providers/SmoothScroll";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "La Vigor — Where Coffee Meets Happiness · Irbid, Jordan",
  description:
    "La Vigor Donuts Cafe in Irbid, Jordan. Premium coffee, fresh donuts and a cozy atmosphere — made with passion every day.",
  keywords: [
    "La Vigor",
    "coffee Irbid",
    "donuts Jordan",
    "specialty coffee",
    "iced caramel mocha",
    "cafe Irbid",
  ],
  openGraph: {
    title: "La Vigor — Where Coffee Meets Happiness",
    description:
      "Premium coffee. Fresh donuts. Made with passion every day. Irbid, Jordan.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#171411",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-coffee-black font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
