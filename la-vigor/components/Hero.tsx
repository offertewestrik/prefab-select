"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { LinkButton } from "@/components/ui/button";
import { PhotoSlot } from "@/components/PhotoSlot";
import { asset, location, whatsappLink } from "@/lib/site";

export function Hero() {
  const { t, lang, dir } = useLang();
  const arrow = dir === "rtl" ? "rotate-180" : "";

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-choco">
      {/* Background photo */}
      <PhotoSlot
        src={asset("/gallery/hero-iced-coffee-donut.jpg")}
        alt="Iced coffee and fresh donuts at La Vigor"
        label="hero-iced-coffee-donut.jpg"
        className="absolute inset-0 h-full w-full"
        imgClassName="scale-105"
      />

      {/* Warm tints + readability gradient */}
      <div className="absolute inset-0 warm-radial" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(27,17,11,0.92) 0%, rgba(39,24,16,0.55) 45%, rgba(39,24,16,0.35) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-block rounded-full border border-caramel/30 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-caramel-bright backdrop-blur-sm"
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="max-w-3xl font-display text-4xl font-extrabold leading-[1.1] text-cream sm:text-6xl lg:text-7xl"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-xl text-lg text-cream/80 sm:text-xl"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <LinkButton href="/menu/" variant="primary" size="lg">
            {t.hero.viewMenu}
            <ArrowRight className={`h-4 w-4 ${arrow}`} />
          </LinkButton>
          <LinkButton
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
          >
            <MapPin className="h-4 w-4" />
            {t.hero.directions}
          </LinkButton>
          <LinkButton
            href={whatsappLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
          >
            <MessageCircle className="h-4 w-4" />
            {t.hero.whatsapp}
          </LinkButton>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <Link
        href="#highlights"
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-cream/40 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-cream/60" />
        </motion.div>
      </Link>
    </section>
  );
}
