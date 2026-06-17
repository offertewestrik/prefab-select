"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { contact, navLinks, products, brand } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-aqua/10 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
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
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy/60">
              مياه شرب نقية وطازجة تُوصَّل يومياً للمنازل والمكاتب والشركات في
              جميع أنحاء الإمارات.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-navy">
روابط
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
            <h4 className="text-sm font-bold text-navy">
المنتجات
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
            <h4 className="text-sm font-bold text-navy">
تواصل معنا
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
دبي، الإمارات العربية المتحدة
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-aqua/10 pt-6 text-xs text-navy/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.fullAr}. جميع الحقوق محفوظة.</p>
          <p>{brand.taglineAr}</p>
        </div>
      </div>
    </footer>
  );
}
