"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";
import { PhotoSlot } from "@/components/PhotoSlot";
import { LinkButton } from "@/components/ui/button";
import { asset, whatsappLink } from "@/lib/site";

/** Full-bleed parallax spotlight on the signature drink. */
export function SignatureSpotlight() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { pick, lang } = useLang();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-choco">
      {/* Parallax photo layer */}
      <motion.div style={{ y }} className="absolute inset-0 -top-[12%] h-[124%]">
        <PhotoSlot
          src={asset("/gallery/ice-caramel-mocha-pour.jpg")}
          alt="Ice Caramel Mocha being poured"
          label="ice-caramel-mocha-pour.jpg"
          className="h-full w-full"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-choco/90 via-choco/55 to-transparent rtl:bg-gradient-to-l" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-5 py-24 sm:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-lg"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-caramel-bright">
            {pick("Signature", "النجم")}
          </span>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-cream sm:text-5xl">
            {pick("Ice Caramel Mocha", "آيس كراميل موكا")}
          </h2>
          <p className="mt-5 text-lg text-cream/80">
            {pick(
              "Chocolate, caramel and cold-brewed coffee layered over ice and finished with silky cream. The cup everyone in Irbid is talking about.",
              "شوكولاتة وكراميل وقهوة باردة فوق الثلج مع لمسة كريمة ناعمة. الكوب الذي يتحدث عنه الجميع في إربد.",
            )}
          </p>
          <div className="mt-8">
            <LinkButton
              href={whatsappLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              {pick("Order yours", "اطلب كوبك")}
            </LinkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
