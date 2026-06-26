import Link from "next/link";
import { Button } from "@repo/ui";
import { brand } from "@repo/core";

/** Herbruikbare call-to-action-band (onderaan dienst-/stadpagina's). */
export function LeadCta({
  title = "Klaar voor je klus?",
  subtitle = "Ontvang vrijblijvend offertes van gecertificeerde vakmannen uit jouw regio.",
  serviceSlug,
  citySlug,
}: {
  title?: string;
  subtitle?: string;
  serviceSlug?: string;
  citySlug?: string;
}) {
  const params = new URLSearchParams();
  if (serviceSlug) params.set("dienst", serviceSlug);
  if (citySlug) params.set("plaats", citySlug);
  const href = params.toString() ? `/aanvraag?${params}` : "/aanvraag";

  return (
    <section className="overflow-hidden rounded-[var(--radius-2xl)] bg-navy-800 px-8 py-12 text-white">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-3 text-neutral-200/80">{subtitle}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={href}>
            <Button size="lg" variant="accent">
              Vraag gratis offertes aan
            </Button>
          </Link>
          <a href={brand.phoneHref}>
            <Button size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">
              Bel {brand.phone}
            </Button>
          </a>
        </div>
        <p className="mt-4 text-sm text-neutral-200/60">100% vrijblijvend en gratis</p>
      </div>
    </section>
  );
}
