"use client";

import { Coffee, Donut, CupSoda, Heart, Users } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const icons = [Coffee, Donut, CupSoda, Heart, Users];

export function WhyLaVigor() {
  const { t } = useLang();
  const items = t.why.items;

  return (
    <section id="why" className="relative overflow-hidden bg-espresso py-20 sm:py-28">
      <div className="absolute inset-0 warm-radial opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading title={t.why.title} subtitle={t.why.subtitle} tone="light" />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            // The 5th card spans wider on large screens for an editorial layout.
            const wide = i === items.length - 1 ? "lg:col-span-1" : "";
            return (
              <Reveal key={item.title} index={i} className={wide}>
                <div className="glass-dark group h-full rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-caramel to-caramel-bright text-choco shadow-glow transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
