import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aquaflow.ae"),
  title: {
    default: "Aqua Flow — Premium Water Delivery Across Dubai",
    template: "%s · Aqua Flow",
  },
  description:
    "Reliable premium drinking water solutions for villas, residential communities, commercial buildings and construction projects across Dubai and the UAE.",
  keywords: [
    "water delivery Dubai",
    "water tanker Dubai",
    "villa water supply",
    "bulk water UAE",
    "construction water delivery",
    "drinking water Dubai",
  ],
  openGraph: {
    title: "Aqua Flow — Premium Water Delivery Across Dubai",
    description:
      "Reliable premium drinking water solutions for villas, communities, commercial buildings and construction projects.",
    type: "website",
    locale: "en_AE",
  },
};

export const viewport: Viewport = {
  themeColor: "#04060f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
