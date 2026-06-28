import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppFrame } from "@/components/AppFrame";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Prefab Select CRM",
  description: "CRM-dashboard van Prefab Select — leads, pijplijn, offertes & rapportage.",
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
