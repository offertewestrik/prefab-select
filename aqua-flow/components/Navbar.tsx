"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, contact, whatsappLink, brand } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300",
            scrolled ? "glass" : "bg-transparent",
          )}
        >
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-aqua/20 shadow-glow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo}
                alt={`شعار ${brand.fullAr}`}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold tracking-tight text-navy">
                {brand.nameAr}
              </span>
              <span className="text-[11px] font-medium text-navy/45">
                لمياه الشرب
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-navy/70 transition-colors hover:bg-aqua/10 hover:text-navy"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${contact.phoneHref}`}
              className="flex items-center gap-2 text-sm font-semibold text-navy/80 hover:text-aqua-deep"
            >
              <Phone className="h-4 w-4" />
              {contact.phone}
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button size="sm">اطلب عبر واتساب</Button>
            </a>
          </div>

          <button
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl text-navy lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-navy/80 hover:bg-aqua/10"
              >
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1"
            >
              <Button size="sm" className="w-full">
                اطلب عبر واتساب
              </Button>
            </a>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
