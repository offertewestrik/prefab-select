"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/site";

export function Products() {
  return (
    <section id="products" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-aqua-deep">
            Our Products
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
            Pure water, every size you need
          </h2>
          <p className="mt-4 text-lg text-navy/65">
            From flagship 19L gallons to bottled water and scheduled
            subscriptions — for homes and businesses alike.
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
              className="group relative flex flex-col rounded-3xl bg-white p-7 ring-1 ring-aqua/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_40px_80px_-30px_rgba(8,145,178,0.45)]"
            >
              {p.highlight && (
                <span className="absolute right-5 top-5 rounded-full bg-aqua/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-aqua-deep">
                  {p.highlight}
                </span>
              )}
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-aqua to-aqua-deep text-white shadow-glow">
                <p.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">
                {p.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
