"use client";

import { Plus } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { PhotoSlot } from "@/components/PhotoSlot";
import { CURRENCY, type MenuItem } from "@/lib/menu";
import { whatsappLink } from "@/lib/site";

/** A single menu item — photo, name, description, optional price, order link. */
export function ProductCard({ item }: { item: MenuItem }) {
  const { pick, lang, t } = useLang();
  const orderText =
    lang === "ar"
      ? `مرحباً لا فيغور، أود طلب: ${item.nameAr}`
      : `Hi La Vigor, I'd like to order: ${item.nameEn}`;
  const orderHref = `${whatsappLink(lang).split("?")[0]}?text=${encodeURIComponent(orderText)}`;

  return (
    <article className="group flex gap-4 rounded-3xl bg-white p-3 shadow-[0_18px_50px_-36px_rgba(59,36,23,0.6)] ring-1 ring-espresso/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-30px_rgba(59,36,23,0.5)]">
      <PhotoSlot
        src={item.image}
        alt={pick(item.nameEn, item.nameAr)}
        label={`${item.slug}.jpg`}
        className="h-24 w-24 shrink-0 rounded-2xl sm:h-28 sm:w-28"
        imgClassName="transition-transform duration-700 group-hover:scale-110"
      />
      <div className="flex min-w-0 flex-1 flex-col py-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold leading-tight text-espresso">
            {pick(item.nameEn, item.nameAr)}
          </h3>
          {item.price ? (
            <span className="shrink-0 rounded-full bg-caramel/15 px-3 py-1 text-sm font-bold text-coffee">
              {item.price} {pick(CURRENCY.en, CURRENCY.ar)}
            </span>
          ) : null}
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-coffee/70">
          {pick(item.descriptionEn, item.descriptionAr)}
        </p>
        <a
          href={orderHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-fit items-center gap-1 pt-2 text-sm font-bold text-caramel transition-colors hover:text-coffee"
        >
          <Plus className="h-4 w-4" />
          {t.menu.orderItem}
        </a>
      </div>
    </article>
  );
}
