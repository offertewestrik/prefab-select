"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LinkButton } from "@/components/ui/button";
import { brand } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useLang();
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === "";
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // In-page anchors work from any page by prefixing with "/" when off-home.
  const h = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const links = [
    { href: h("highlights"), label: t.nav.highlights },
    { href: h("why"), label: t.nav.why },
    { href: h("menu"), label: t.nav.menu },
    { href: h("gallery"), label: t.nav.gallery },
    { href: h("location"), label: t.nav.location },
  ];

  // Solid header once scrolled or when not on the (dark) home hero.
  const solid = scrolled || !onHome;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-cream/85 shadow-[0_10px_40px_-24px_rgba(59,36,23,0.6)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-[4.5rem] sm:px-8">
        <Link
          href="/"
          className={cn(
            "font-display text-xl font-extrabold tracking-tight transition-colors sm:text-2xl",
            solid ? "text-espresso" : "text-cream",
          )}
        >
          {brand.name}
          <span className="text-caramel">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                solid
                  ? "text-coffee hover:bg-espresso/5 hover:text-espresso"
                  : "text-cream/85 hover:bg-white/10 hover:text-cream",
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher tone={solid ? "light" : "dark"} />
          <LinkButton
            href="/menu/"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {t.nav.fullMenu}
          </LinkButton>
          <button
            onClick={() => setOpen((p) => !p)}
            aria-label="Menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
              solid ? "text-espresso hover:bg-espresso/10" : "text-cream hover:bg-white/10",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-espresso/10 bg-cream/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 font-semibold text-espresso hover:bg-espresso/5"
                >
                  {l.label}
                </Link>
              ))}
              <LinkButton
                href="/menu/"
                variant="primary"
                className="mt-2"
                onClick={() => setOpen(false)}
              >
                {t.nav.fullMenu}
              </LinkButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
