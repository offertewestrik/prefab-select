"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/site";

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold text-aqua-deep">آراء عملائنا</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
            موثوقون من آلاف العائلات والشركات
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col rounded-3xl bg-white p-7 ring-1 ring-aqua/10 shadow-[0_30px_60px_-40px_rgba(8,145,178,0.5)]"
            >
              <Quote className="h-9 w-9 text-aqua/30" />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-navy/75">
                {t.quote}
              </blockquote>
              <div className="mt-5 flex items-center gap-1 text-aqua-deep">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <figcaption className="mt-3 text-sm font-bold text-navy">
                {t.name}
                <span className="mr-2 font-normal text-navy/50"> · {t.area}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
