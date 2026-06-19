import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3D Villa Tour — Droomhuis in Dubai",
  description:
    "Loop digitaal door exclusieve woningen in Dubai. Interactieve 3D-villatour met materiaalkeuze, dag/nacht-modus en plattegrond.",
  openGraph: {
    title: "3D Villa Tour — Droomhuis in Dubai",
    description: "Loop digitaal door exclusieve woningen in Dubai.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
