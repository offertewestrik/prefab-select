"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/site";
import { SmartImage } from "@/components/SmartImage";

export function Products() {
  return (
    <section id="products" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold text-aqua-deep">
            منتجاتنا
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
            مياه نقية بكل الأحجام التي تحتاجها
          </h2>
          <p className="mt-4 text-lg text-navy/65">
            من غالونات 19 لتر الرئيسية إلى العبوات والاشتراكات المجدولة —
            للمنازل والشركات على حدٍّ سواء.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-aqua/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_40px_80px_-30px_rgba(8,145,178,0.45)]"
            >
              {/* Generated product image (falls back to aqua gradient) */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-aqua-soft/50 via-mist to-white">
                <SmartImage
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {p.highlight && (
                  <span className="absolute start-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-aqua-deep shadow-sm backdrop-blur">
                    {p.highlight}
                  </span>
                )}
                <span className="absolute bottom-4 end-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-aqua to-aqua-deep text-white shadow-glow">
                  <p.icon className="h-6 w-6" />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">
                  {p.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
