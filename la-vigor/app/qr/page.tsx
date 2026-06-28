import type { Metadata } from "next";
import { QRAdmin } from "@/components/QRAdmin";

export const metadata: Metadata = {
  title: "QR Menu — Print & Setup",
  description: "Generate and print the La Vigor table QR code that opens the live online menu.",
  robots: { index: false, follow: false },
};

export default function QRPage() {
  return <QRAdmin />;
}
