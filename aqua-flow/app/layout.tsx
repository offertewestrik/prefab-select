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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://alnaqaa.ae"),
  title: {
    default: "النقاء لمياه الشرب — توصيل مياه نقية في دبي يومياً | Al Naqaa",
    template: "%s · النقاء لمياه الشرب",
  },
  description:
    "النقاء لمياه الشرب: توصيل مياه شرب نقية في دبي — غالونات 19 لتر، عبوات مياه واشتراكات أسبوعية للفلل والمكاتب والشركات. مياه معالَجة بالترشيح والتعقيم بالأشعة فوق البنفسجية، تصل إلى بابك كل يوم.",
  applicationName: "النقاء لمياه الشرب",
  keywords: [
    "توصيل مياه دبي",
    "مياه شرب دبي",
    "غالون مياه 19 لتر",
    "توصيل مياه للفلل دبي",
    "مياه نقية دبي",
    "اشتراك مياه دبي",
    "توصيل مياه للمكاتب دبي",
    "مياه شرب نقية",
    "النقاء",
    "water delivery Dubai",
    "drinking water Dubai",
    "19L water gallon Dubai",
    "villa water supply Dubai",
    "office water delivery Dubai",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" as const },
  },
  openGraph: {
    title: "النقاء لمياه الشرب — توصيل مياه نقية في دبي يومياً",
    description:
      "مياه شرب نقية تُوصَّل يومياً للفلل والمكاتب والشركات في جميع أنحاء دبي — غالونات 19 لتر، عبوات واشتراكات أسبوعية.",
    type: "website",
    locale: "ar_AE",
    siteName: "النقاء لمياه الشرب",
    images: [
      {
        url: "/videos/hero-poster.png",
        width: 1376,
        height: 768,
        alt: "النقاء لمياه الشرب — منشأة تنقية المياه في دبي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "النقاء لمياه الشرب — توصيل مياه نقية في دبي",
    description:
      "غالونات 19 لتر وعبوات واشتراكات أسبوعية. مياه معالَجة بالكامل تصل إلى بابك يومياً.",
    images: ["/videos/hero-poster.png"],
  },
  category: "business",
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
