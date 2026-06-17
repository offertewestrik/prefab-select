"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/site";

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-20">
      <div className="absolute inset-0 aurora-deep opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <span className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-aqua-bright ring-1 ring-white/15">
                <s.icon className="h-6 w-6" />
              </span>
              <span className="font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                {s.value}
              </span>
              <span className="mt-1 text-sm text-white/60">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
