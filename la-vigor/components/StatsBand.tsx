"use client";

import * as React from "react";
import { motion, useInView, animate } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";

/** Counts up from 0 → `to` once scrolled into view. */
function Counter({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  const { pick } = useLang();

  // Sourced from public Instagram / Facebook pages (see docs/SOURCE_RESEARCH).
  const stats = [
    { to: 7.9, decimals: 1, suffix: "K+", labelEn: "Instagram followers", labelAr: "متابع على إنستغرام" },
    { to: 9.7, decimals: 1, suffix: "K+", labelEn: "Facebook likes", labelAr: "إعجاب على فيسبوك" },
    { to: 98, decimals: 0, suffix: "%", labelEn: "Recommend us", labelAr: "ينصحون به" },
    { to: 5, decimals: 0, suffix: "★", labelEn: "Guest rating", labelAr: "تقييم الضيوف" },
  ];

  return (
    <section className="bg-choco-deep py-14 sm:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.labelEn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-4xl font-extrabold text-gradient sm:text-5xl">
              <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm font-medium text-cream/60">
              {pick(s.labelEn, s.labelAr)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
