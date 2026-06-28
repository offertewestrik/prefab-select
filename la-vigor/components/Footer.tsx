"use client";

import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { brand, contact, hours, location } from "@/lib/site";

export function Footer() {
  const { t, pick } = useLang();
  const year = 2026; // build-time constant; bump as needed.

  const links = [
    { href: "/#highlights", label: t.nav.highlights },
    { href: "/#why", label: t.nav.why },
    { href: "/menu/", label: t.nav.fullMenu },
    { href: "/#gallery", label: t.nav.gallery },
    { href: "/#location", label: t.nav.location },
  ];

  return (
    <footer className="bg-choco-deep pt-16 text-cream/70">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="font-display text-2xl font-extrabold text-cream">
            {brand.name}
            <span className="text-caramel">.</span>
          </div>
          <p className="mt-3 max-w-xs text-sm">{t.footer.tagline}</p>
          <div className="mt-5 flex gap-3">
            <SocialLink href={contact.instagram} label="Instagram">
              <Instagram className="h-5 w-5" />
            </SocialLink>
            <SocialLink href={contact.facebook} label="Facebook">
              <Facebook className="h-5 w-5" />
            </SocialLink>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-cream">
            {t.footer.quickLinks}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-colors hover:text-caramel">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-cream">
            {t.footer.contact}
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
              {pick(location.textEn, location.textAr)}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-caramel" />
              <a href={`tel:${contact.phoneHref}`} className="hover:text-caramel" dir="ltr">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0 text-caramel" />
              {hours.display}
            </li>
          </ul>
        </div>

        {/* Hours highlight */}
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-cream">
            {t.footer.openDaily}
          </h3>
          <div className="mt-4 rounded-2xl border border-caramel/20 bg-white/5 p-5">
            <div className="font-display text-2xl font-extrabold text-gradient" dir="ltr">
              {hours.display}
            </div>
            <div className="mt-1 text-sm">{pick(hours.everyDayEn, hours.everyDayAr)}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-cream/50">
        © {year} {brand.name}. {t.footer.rights}
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cream transition-all hover:-translate-y-0.5 hover:border-caramel/50 hover:text-caramel"
    >
      {children}
    </a>
  );
}
