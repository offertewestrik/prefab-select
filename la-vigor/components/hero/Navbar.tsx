"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Logo } from "../brand/Logo";
import { navLinks, brand } from "../../lib/site";
import { navDrop } from "../../lib/motion";
import { cn } from "../../lib/utils";

/**
 * Sticky transparent glass navigation:
 *  • Logo left · links center · language switch + Order Now right.
 *  • Transparent over the hero, frosts (glass) once the page scrolls.
 *  • Slides down on mount; animated full-screen mobile drawer.
 */
export function Navbar({ started }: { started: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "AR">("EN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      variants={navDrop}
      initial="hidden"
      animate={started ? "show" : "hidden"}
      className={cn(
        "fixed inset-x-0 top-0 z-[200] transition-[background,box-shadow,backdrop-filter] duration-500",
        scrolled
          ? "border-b border-cream-100/10 bg-coffee-black/70 backdrop-blur-[20px] shadow-[0_2px_30px_rgba(15,9,5,0.4)]"
          : "bg-transparent"
      )}
    >
      <nav className="container-lv flex h-[76px] items-center justify-between">
        <a href="#home" aria-label="La Vigor — home" className="z-10">
          <Logo />
        </a>

        {/* center links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-[0.92rem] font-medium text-cream-100/80 transition-colors duration-300 hover:text-cream-50"
              >
                {l.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-300 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        {/* right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch lang={lang} setLang={setLang} />
          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 px-5 py-2.5 text-[0.85rem] font-semibold tracking-wide text-espresso-950 shadow-[0_8px_30px_rgba(200,160,99,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(200,160,99,0.5)] sm:inline-flex"
          >
            <ShoppingBag className="size-4" strokeWidth={2} />
            Order Now
          </a>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex size-11 items-center justify-center rounded-full border border-cream-100/15 text-cream-100 transition-colors hover:bg-cream-100/10 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>{open && <MobileMenu lang={lang} setLang={setLang} onClose={() => setOpen(false)} />}</AnimatePresence>
    </motion.header>
  );
}

function LangSwitch({
  lang,
  setLang,
}: {
  lang: "EN" | "AR";
  setLang: (l: "EN" | "AR") => void;
}) {
  return (
    <div className="relative flex items-center rounded-full border border-cream-100/15 p-0.5 text-[0.72rem] font-semibold text-cream-100/70">
      {(["EN", "AR"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="relative z-10 rounded-full px-2.5 py-1 transition-colors duration-300"
          style={{ color: lang === l ? "#1a0f09" : undefined }}
          aria-pressed={lang === l}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 -z-10 rounded-full bg-gold-300"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  );
}

function MobileMenu({
  lang,
  setLang,
  onClose,
}: {
  lang: "EN" | "AR";
  setLang: (l: "EN" | "AR") => void;
  onClose: () => void;
}) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-[400] bg-coffee-black/50 backdrop-blur-sm lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-y-0 right-0 z-[500] flex w-[min(86vw,360px)] flex-col bg-gradient-to-b from-espresso-900 to-coffee-black p-7 shadow-[0_24px_60px_rgba(15,9,5,0.6)] lg:hidden"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 220, damping: 30 }}
      >
        <div className="mb-10 flex items-center justify-between">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center rounded-full border border-cream-100/15 text-cream-100 transition-colors hover:bg-cream-100/10"
          >
            <X className="size-5" />
          </button>
        </div>

        <ul className="flex flex-col gap-1">
          {navLinks.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={l.href}
                onClick={onClose}
                className="flex items-baseline justify-between border-b border-cream-100/8 py-4 font-display text-2xl text-cream-50 transition-colors hover:text-gold-300"
              >
                {l.label}
                <span className="font-sans text-xs tracking-widest text-cream-100/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex items-center gap-3 text-cream-100/60">
            <span className="text-xs uppercase tracking-[0.3em]">Language</span>
            <LangSwitch lang={lang} setLang={setLang} />
          </div>
          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-300 to-gold-500 py-3.5 font-semibold tracking-wide text-espresso-950 shadow-[0_8px_30px_rgba(200,160,99,0.35)]"
          >
            <ShoppingBag className="size-4" strokeWidth={2} />
            Order Now
          </a>
        </div>
      </motion.div>
    </>
  );
}

export default Navbar;
