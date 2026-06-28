"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { LinkButton } from "@/components/ui/button";
import { QRCode } from "@/components/QRCode";
import { SITE_URL } from "@/lib/site";

export function QRMenuCTA() {
  const { t, dir } = useLang();
  const menuUrl = `${SITE_URL.replace(/\/$/, "")}/menu`;

  return (
    <section className="relative overflow-hidden bg-espresso py-20 sm:py-28">
      <div className="absolute inset-0 warm-radial" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-5 sm:px-8 lg:flex-row lg:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-md text-center lg:text-start"
        >
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-caramel-bright">
            {t.qr.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-cream sm:text-4xl lg:text-5xl">
            {t.qr.title}
          </h2>
          <p className="mt-5 text-lg text-cream/75">{t.qr.text}</p>
          <div className="mt-8 flex justify-center lg:justify-start">
            <LinkButton href="/menu/" variant="primary" size="lg">
              {t.qr.cta}
              <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
            </LinkButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <QRCode value={menuUrl} size={220} />
        </motion.div>
      </div>
    </section>
  );
}
