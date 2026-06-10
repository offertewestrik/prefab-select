import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppFrame } from "@/components/AppFrame";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Prefab Select CRM",
  description: "CRM-dashboard van Prefab Select — leads, pijplijn, offertes & rapportage.",
  // Geïnstalleerd als app op iPhone/iPad: fullscreen, eigen titel op het beginscherm.
  appleWebApp: {
    capable: true,
    title: "Prefab CRM",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#172554",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="font-sans">
        <Providers>
          <AppFrame>{children}</AppFrame>
        </Providers>
      </body>
    </html>
  );
}
