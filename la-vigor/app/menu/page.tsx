import type { Metadata } from "next";
import { FullMenu } from "@/components/FullMenu";

export const metadata: Metadata = {
  title: "Menu — Coffee, Donuts & Iced Drinks",
  description:
    "Browse the full La Vigor menu: premium coffee, iced coffee, fresh donuts, desserts and cold drinks in Irbid. المنيو الكامل — قهوة، دونات ومشروبات باردة.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return <FullMenu />;
}
