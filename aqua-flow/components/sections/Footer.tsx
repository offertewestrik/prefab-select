"use client";

import { Droplets, Phone, Mail, MapPin } from "lucide-react";
import { contact, navLinks, products } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-aqua/10 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-aqua to-aqua-deep text-white shadow-glow">
                <Droplets className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-tight text-navy">
                Aqua<span className="text-aqua-deep">Flow</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy/60">
              Fresh purified drinking water, delivered daily to homes, offices
              and businesses across the Emirates.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-navy">
              Explore
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-navy/60 transition-colors hover:text-aqua-deep"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-navy">
              Products
            </h4>
            <ul className="mt-4 space-y-2.5">
              {products.map((p) => (
                <li key={p.title} className="text-sm text-navy/60">
                  {p.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-navy">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="flex items-center gap-2 text-sm text-navy/60 hover:text-aqua-deep"
                >
                  <Phone className="h-4 w-4 text-aqua-deep" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-sm text-navy/60 hover:text-aqua-deep"
                >
                  <Mail className="h-4 w-4 text-aqua-deep" />
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-navy/60">
                <MapPin className="h-4 w-4 text-aqua-deep" />
                United Arab Emirates
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-aqua/10 pt-6 text-xs text-navy/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Aqua Flow Water Services. All rights reserved.</p>
          <p>Pure water, delivered daily.</p>
        </div>
      </div>
    </footer>
  );
}
