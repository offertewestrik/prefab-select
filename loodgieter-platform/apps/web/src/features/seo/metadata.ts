import "server-only";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@repo/seo";

interface BaseMeta {
  title: string;
  description: string;
  path: string;
  ogImageUrl?: string;
}

/**
 * Bouwt Next Metadata uit een basis + optionele DB-override (SeoMeta).
 * Zo komt SEO-content altijd uit data, nooit hardcoded, en kan de admin per
 * URL overschrijven (zie docs/04 §7).
 */
export async function buildMetadata(base: BaseMeta): Promise<Metadata> {
  const override = await prisma.seoMeta.findUnique({ where: { path: base.path } }).catch(() => null);

  const title = override?.title ?? base.title;
  const description = override?.description ?? base.description;
  const canonical = override?.canonical ?? base.path;
  const ogImage = override?.ogImageUrl ?? base.ogImageUrl ?? defaultOgImage(title);

  return {
    title,
    description,
    alternates: { canonical },
    robots: override?.noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: siteUrl(canonical),
      type: "website",
      locale: "nl_NL",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

/** Dynamische OG-afbeelding (zie app/api/og). */
export function defaultOgImage(title: string): string {
  return siteUrl(`/api/og?title=${encodeURIComponent(title)}`);
}
