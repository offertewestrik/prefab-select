import type { Metadata, Viewport } from "next";
import { Tajawal, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SITE_URL } from "@/lib/site";

// Both fonts cover Arabic + Latin so the type looks consistent in either
// language / direction.
const sans = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const display = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "La Vigor Irbid — Coffee, Donuts & Iced Drinks",
    template: "%s · La Vigor",
  },
  description:
    "Visit La Vigor in Irbid for fresh donuts, premium coffee, iced drinks and cozy moments near Irbid City Center. لا فيغور إربد — قهوة، دونات ومشروبات باردة.",
  keywords: [
    "La Vigor Irbid",
    "La Vigor Donuts",
    "coffee in Irbid",
    "best coffee Irbid",
    "donuts Irbid",
    "iced coffee Irbid",
    "café near Irbid City Center",
    "لا فيغور اربد",
    "لافيجور اربد",
    "دونات اربد",
    "قهوة اربد",
    "كافيه اربد",
    "آيس كوفي اربد",
  ],
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/" },
  },
  openGraph: {
    title: "La Vigor Irbid — Coffee, Donuts & Iced Drinks",
    description:
      "Fresh donuts, premium coffee and iced drinks in the heart of Irbid, beside Irbid City Center.",
    type: "website",
    locale: "en_JO",
    alternateLocale: "ar_JO",
    siteName: "La Vigor",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#3b2417",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
