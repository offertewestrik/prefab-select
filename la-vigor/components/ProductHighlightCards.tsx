"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { PhotoSlot } from "@/components/PhotoSlot";
import { menu, highlightSlugs } from "@/lib/menu";
import { whatsappLink } from "@/lib/site";

export function ProductHighlightCards() {
  const { t, pick, lang } = useLang();

  const allItems = menu.flatMap((c) => c.items);
  const items = highlightSlugs
    .map((slug) => allItems.find((i) => i.slug === slug))
    .filter(Boolean) as typeof allItems;

  return (
    <section id="highlights" className="relative bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading title={t.highlights.title} subtitle={t.highlights.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.slug} index={i}>
              <TiltCard className="group h-full">
                <a
                  href={whatsappLink(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-34px_rgba(59,36,23,0.5)] ring-1 ring-espresso/5 transition-shadow duration-300 hover:shadow-[0_34px_80px_-30px_rgba(59,36,23,0.6)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <PhotoSlot
                      src={item.image}
                      alt={pick(item.nameEn, item.nameAr)}
                      label={`${item.slug}.jpg`}
                      className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-choco/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-caramel px-3 py-1 text-xs font-bold text-choco opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {t.menu.orderItem}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="font-display text-xl font-bold text-espresso">
                      {pick(item.nameEn, item.nameAr)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-coffee/75">
                      {pick(item.descriptionEn, item.descriptionAr)}
                    </p>
                  </div>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
