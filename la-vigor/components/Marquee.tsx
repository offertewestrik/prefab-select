"use client";

import { useLang } from "@/components/LanguageProvider";
import { Coffee } from "lucide-react";

/** Endless scrolling brand strip between sections. */
export function Marquee() {
  const { pick, dir } = useLang();
  const words = pick(
    [
      "Fresh Donuts",
      "Premium Coffee",
      "Iced Caramel Mocha",
      "Cozy Vibes",
      "Made in Irbid",
      "Cold Drinks",
    ],
    ["دونات طازجة", "قهوة مميزة", "آيس كراميل موكا", "أجواء حلوة", "صنع في إربد", "مشروبات باردة"],
  );

  // Duplicate the list so the loop is seamless.
  const items = [...words, ...words];

  return (
    <div className="relative overflow-hidden border-y border-caramel/20 bg-espresso py-4">
      <div
        className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-8"
        style={{ animationDirection: dir === "rtl" ? "reverse" : "normal" }}
      >
        {items.map((w, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="font-display text-lg font-bold uppercase tracking-wide text-cream/90 sm:text-2xl">
              {w}
            </span>
            <Coffee className="h-5 w-5 shrink-0 text-caramel" />
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
