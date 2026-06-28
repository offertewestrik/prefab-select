import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { brand } from "@repo/core";
import { siteUrl } from "@repo/seo";
import { Button } from "@repo/ui";

const title = "Contact — vragen of offerte aanvragen";
const description = `Neem contact op met ${brand.name}. Bel ${brand.phone}, mail ons of vraag direct gratis en vrijblijvend offertes aan bij vakmannen uit je regio.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title,
    description,
    url: siteUrl("/contact"),
    type: "website",
    locale: "nl_NL",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Contact</h1>
      <p className="mt-3 text-neutral-500">
        Heb je een vraag? We helpen je graag. Voor een offerte kun je direct een
        gratis aanvraag doen.
      </p>
      <div className="mt-8 space-y-3">
        <a href={brand.phoneHref} className="flex items-center gap-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
          <Phone className="h-5 w-5 text-primary-600" /> {brand.phone}
        </a>
        <a href={`mailto:${brand.email}`} className="flex items-center gap-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
          <Mail className="h-5 w-5 text-primary-600" /> {brand.email}
        </a>
      </div>
      <div className="mt-8">
        <Link href="/aanvraag">
          <Button variant="accent">Gratis offerte aanvragen</Button>
        </Link>
      </div>
    </main>
  );
}
