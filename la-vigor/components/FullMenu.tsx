"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Clock, MapPin } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { ProductCard } from "@/components/ProductCard";
import { LinkButton } from "@/components/ui/button";
import { menu } from "@/lib/menu";
import { brand, contact, hours, location, whatsappLink } from "@/lib/site";

export function FullMenu() {
  const { t, pick, lang, dir } = useLang();
  const [active, setActive] = React.useState(menu[0].id);
  const navRef = React.useRef<HTMLDivElement>(null);

  // Scroll-spy: highlight the category whose section is in view.
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    menu.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Keep the active chip in view within the horizontal nav.
  React.useEffect(() => {
    const chip = navRef.current?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    chip?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  return (
    <>
      <Header />
      <main className="bg-cream">
        {/* Menu header */}
        <section className="relative overflow-hidden bg-choco pt-28 pb-14 text-center">
          <div className="absolute inset-0 warm-radial" />
          <div className="relative mx-auto max-w-3xl px-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-caramel-bright">
                {brand.name} · {pick(location.textEn, location.textAr)}
              </span>
              <h1 className="mt-4 font-display text-4xl font-extrabold text-cream sm:text-6xl">
                {t.nav.fullMenu}
              </h1>
              <p className="mt-4 text-cream/75">{pick(brand.taglineEn, brand.taglineAr)}</p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream/70">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-caramel" /> {hours.display}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-caramel" />
                  {pick(location.textEn, location.textAr)}
                </span>
              </div>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <LinkButton
                  href={whatsappLink(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.hero.whatsapp}
                </LinkButton>
                <LinkButton href="/" variant="outline">
                  <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                  {pick("Back home", "الرئيسية")}
                </LinkButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sticky category navigation */}
        <div className="sticky top-16 z-40 border-b border-espresso/10 bg-cream/90 backdrop-blur-xl sm:top-[4.5rem]">
          <div
            ref={navRef}
            className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 sm:px-8"
          >
            {menu.map((c) => {
              const on = c.id === active;
              return (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  data-cat={c.id}
                  onClick={() => setActive(c.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    on
                      ? "bg-gradient-to-r from-caramel to-caramel-bright text-choco shadow-[0_8px_24px_-10px_rgba(201,138,75,0.8)]"
                      : "bg-white text-coffee/70 ring-1 ring-espresso/5 hover:text-espresso"
                  }`}
                >
                  {pick(c.categoryEn, c.categoryAr)}
                </a>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          {menu.map((c) => (
            <section key={c.id} id={c.id} className="scroll-anchor mb-16 last:mb-0">
              <div className="mb-7 flex items-baseline justify-between gap-4 border-b border-espresso/10 pb-3">
                <h2 className="font-display text-2xl font-extrabold text-espresso sm:text-3xl">
                  {pick(c.categoryEn, c.categoryAr)}
                </h2>
                <span className="text-sm text-coffee/50">{c.items.length}</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {c.items.map((item) => (
                  <ProductCard key={item.slug} item={item} />
                ))}
              </div>
            </section>
          ))}

          <p className="mt-4 text-center text-xs text-coffee/40">
            {pick(
              "Prices confirmed in store. Tap any item to order on WhatsApp.",
              "الأسعار تُؤكَّد في المحل. اضغط على أي صنف للطلب عبر واتساب.",
            )}
          </p>
        </div>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
