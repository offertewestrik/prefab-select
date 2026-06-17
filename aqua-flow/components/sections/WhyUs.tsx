"use client";

import { motion } from "framer-motion";
import { reasons } from "@/lib/site";

export function WhyUs() {
  return (
    <section id="why" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-mist to-paper" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold text-aqua-deep">
            لماذا يختارنا عملاؤنا
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
            نقية، نظيفة، صحية — وموثوقة
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass flex flex-col items-center rounded-3xl p-6 text-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-aqua-bright to-aqua-deep text-white shadow-glow">
                <r.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">
                {r.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
