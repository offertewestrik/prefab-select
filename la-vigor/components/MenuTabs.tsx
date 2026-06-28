"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { LinkButton } from "@/components/ui/button";
import { menu } from "@/lib/menu";

export function MenuTabs() {
  const { t, pick, dir } = useLang();
  const [active, setActive] = React.useState(menu[0].id);
  const current = menu.find((c) => c.id === active) ?? menu[0];

  return (
    <section id="menu" className="relative bg-cream-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading title={t.menu.title} subtitle={t.menu.subtitle} />

        {/* Category tabs */}
        <div className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-2">
          <div className="mx-auto flex gap-2">
            {menu.map((c) => {
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
                    on ? "text-choco" : "text-coffee/70 hover:text-espresso"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="menuTabPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-caramel to-caramel-bright shadow-[0_10px_30px_-12px_rgba(201,138,75,0.8)]"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative">{pick(c.categoryEn, c.categoryAr)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {current.items.map((item) => (
              <ProductCard key={item.slug} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center">
          <LinkButton href="/menu/" variant="primary" size="lg">
            {t.menu.viewFull}
            <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
