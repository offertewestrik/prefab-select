"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { serviceAreas, seoIntro } from "@/lib/site";

export function ServiceAreas() {
  return (
    <section id="areas" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 aurora-light opacity-60" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold text-aqua-deep">مناطق التوصيل في دبي</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
            نوصّل المياه النقية في كل أنحاء دبي
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-navy/65">{seoIntro}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {serviceAreas.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="glass flex items-center gap-2.5 rounded-2xl px-4 py-3.5 text-sm font-medium text-navy"
            >
              <MapPin className="h-4 w-4 shrink-0 text-aqua-deep" />
              {area}
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-navy/50">
          لا ترى منطقتك؟ تواصل معنا عبر واتساب — نغطّي جميع أنحاء دبي.
        </p>
      </div>
    </section>
  );
}
