"use client";

import { motion } from "framer-motion";
import { Coffee, Donut, Armchair, HeartHandshake, type LucideIcon } from "lucide-react";
import { features } from "../../lib/site";
import { stagger, staggerItem } from "../../lib/motion";

const ICONS: Record<string, LucideIcon> = { Coffee, Donut, Armchair, HeartHandshake };

/** Bottom feature strip — four pillars on a fine glass shelf. */
export function FeatureStrip({ started }: { started: boolean }) {
  return (
    <motion.ul
      variants={stagger(0.12, 1.4)}
      initial="hidden"
      animate={started ? "show" : "hidden"}
      className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-8"
    >
      {features.map((f) => {
        const Icon = ICONS[f.icon] ?? Coffee;
        return (
          <motion.li
            key={f.label}
            variants={staggerItem}
            className="group flex items-center gap-3.5"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold-300/30 bg-gold-300/10 text-gold-300 transition-all duration-500 group-hover:scale-110 group-hover:border-gold-300/60 group-hover:bg-gold-300/20">
              <Icon className="size-5" strokeWidth={1.5} />
            </span>
            <div className="flex flex-col">
              <span className="text-[0.95rem] font-semibold text-cream-50">{f.label}</span>
              <span className="text-[0.74rem] text-cream-100/55">{f.note}</span>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export default FeatureStrip;
