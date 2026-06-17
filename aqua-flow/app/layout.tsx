import type { Metadata, Viewport } from "next";
import { Tajawal, Cairo } from "next/font/google";
import "./globals.css";

const sans = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  display: "swap",
});

const display = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alnaqaa.ae"),
  title: {
    default: "النقاء لمياه الشرب — مياه نقية تصل إليك يومياً في دبي",
    template: "%s · النقاء",
  },
  description:
    "النقاء لمياه الشرب: نوصّل مياه شرب نقية ومُعالَجة يومياً للمنازل والمكاتب والشركات في جميع أنحاء دبي والإمارات.",
  keywords: [
    "مياه الشرب دبي",
    "توصيل مياه",
    "غالون مياه 19 لتر",
    "مياه نقية",
    "النقاء",
    "drinking water Dubai",
  ],
  openGraph: {
    title: "النقاء لمياه الشرب — مياه نقية تصل إليك يومياً",
    description:
      "مياه شرب نقية تُوصَّل يومياً للمنازل والمكاتب والشركات في جميع أنحاء الإمارات.",
    type: "website",
    locale: "ar_AE",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4fbff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
