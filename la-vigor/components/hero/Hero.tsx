"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, UtensilsCrossed, ShoppingBag, Navigation } from "lucide-react";

import { Navbar } from "./Navbar";
import { Preloader } from "./Preloader";
import { HeroBackground } from "./HeroBackground";
import { FloatingBeans } from "./FloatingBeans";
import { HeroProduct } from "./HeroProduct";
import { ScrollIndicator } from "./ScrollIndicator";
import { FeatureStrip } from "./FeatureStrip";

import { brand } from "../../lib/site";
import { maskLineChild, blurUp, fadeUp, stagger, staggerItem } from "../../lib/motion";

export function Hero() {
  const [started, setStarted] = useState(false);
  const onDone = useCallback(() => setStarted(true), []);

  return (
    <>
      <AnimatePresence>{!started && <Preloader onDone={onDone} />}</AnimatePresence>

      <Navbar started={started} />

      <section
        id="home"
        className="relative min-h-[100svh] w-full overflow-hidden bg-coffee-black text-cream-50"
      >
        <HeroBackground started={started} />
        <FloatingBeans />

        <div className="relative z-10 flex min-h-[100svh] flex-col">
          <div className="container-lv grid flex-1 items-center gap-8 pt-28 lg:grid-cols-12 lg:gap-6 lg:pt-24">
            {/* ── Copy ── */}
            <div className="order-2 max-w-2xl lg:order-1 lg:col-span-7">
              {/* eyebrow / location */}
              <motion.div
                variants={blurUp}
                initial="hidden"
                animate={started ? "show" : "hidden"}
                custom={0.2}
                className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-gold-300/25 bg-gold-300/10 px-4 py-1.5 backdrop-blur-sm"
              >
                <MapPin className="size-3.5 text-gold-300" strokeWidth={1.75} />
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-cream-100/80">
                  {brand.location} · Coffee &amp; Donuts
                </span>
              </motion.div>

              {/* headline — mask reveal */}
              <motion.h1
                initial="hidden"
                animate={started ? "show" : "hidden"}
                className="font-display font-semibold leading-[0.98] tracking-tight"
                aria-label={brand.tagline}
              >
                <span className="mask-line">
                  <motion.span variants={maskLineChild} custom={0} className="block">
                    <span className="script-accent text-[clamp(2rem,5vw,3.4rem)] font-light text-gold-300">
                      Where
                    </span>
                  </motion.span>
                </span>
                <span className="mask-line">
                  <motion.span
                    variants={maskLineChild}
                    custom={1}
                    className="block text-[clamp(2.75rem,8vw,5.5rem)] text-cream-50"
                  >
                    Coffee Meets
                  </motion.span>
                </span>
                <span className="mask-line">
                  <motion.span
                    variants={maskLineChild}
                    custom={2}
                    className="block text-[clamp(2.75rem,8vw,5.5rem)] text-gradient-gold"
                  >
                    Happiness
                  </motion.span>
                </span>
              </motion.h1>

              {/* subtitle */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate={started ? "show" : "hidden"}
                custom={0.9}
                className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-cream-100/75"
              >
                {brand.subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={stagger(0.12, 1.05)}
                initial="hidden"
                animate={started ? "show" : "hidden"}
                className="mt-9 flex flex-wrap items-center gap-3.5"
              >
                <motion.a
                  variants={staggerItem}
                  href="#menu"
                  className="group inline-flex h-13 items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 px-7 text-[0.95rem] font-semibold tracking-wide text-espresso-950 shadow-[0_10px_36px_rgba(200,160,99,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_46px_rgba(200,160,99,0.5)]"
                >
                  <UtensilsCrossed className="size-[1.05rem]" strokeWidth={1.75} />
                  View Menu
                </motion.a>
                <motion.a
                  variants={staggerItem}
                  href={brand.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center gap-2.5 rounded-full border border-cream-100/25 bg-cream-100/5 px-7 text-[0.95rem] font-semibold tracking-wide text-cream-50 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300/50 hover:bg-cream-100/10"
                >
                  <ShoppingBag className="size-[1.05rem]" strokeWidth={1.75} />
                  Order Now
                </motion.a>
                <motion.a
                  variants={staggerItem}
                  href="#contact"
                  className="group inline-flex h-13 items-center gap-2 rounded-full px-4 text-[0.95rem] font-semibold tracking-wide text-cream-100/80 transition-colors duration-300 hover:text-gold-300"
                >
                  <Navigation className="size-[1.05rem] transition-transform duration-300 group-hover:rotate-12" strokeWidth={1.75} />
                  Find Us
                </motion.a>
              </motion.div>
            </div>

            {/* ── Product ── */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              <HeroProduct started={started} />
            </div>
          </div>

          {/* feature strip — sits at the foot of the hero in normal flow
              (no absolute pinning, so it never overlaps content on mobile) */}
          <div className="mt-10 shrink-0 lg:mt-0">
            <div className="divider-gold mx-auto max-w-[1320px]" />
            <div className="container-lv py-6 lg:py-7">
              <FeatureStrip started={started} />
            </div>
          </div>
        </div>

        <ScrollIndicator started={started} />
      </section>
    </>
  );
}

export default Hero;
