"use client";

import { Star, Quote } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { reviews } from "@/lib/i18n";

export function ReviewCards() {
  const { t, pick } = useLang();

  return (
    <section id="reviews" className="bg-cream-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading title={t.reviews.title} subtitle={t.reviews.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.nameEn} index={i}>
              <div className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_24px_60px_-40px_rgba(59,36,23,0.6)] ring-1 ring-espresso/5">
                <Quote className="h-8 w-8 text-caramel/30 rtl:scale-x-[-1]" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-caramel text-caramel" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-coffee/85">
                  “{pick(r.textEn, r.textAr)}”
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-caramel to-caramel-bright font-display text-lg font-bold text-choco">
                    {pick(r.nameEn, r.nameAr).charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-espresso">
                      {pick(r.nameEn, r.nameAr)}
                    </div>
                    {r.placeholder && (
                      <div className="text-[10px] uppercase tracking-wide text-coffee/40">
                        {t.common.replaceReview}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
