import { getSitemapSegments, sitemapIndexXml } from "@/features/seo/sitemap";

export const revalidate = 86400;

export async function GET() {
  // Build-robuust: onbereikbare DB tijdens `next build` mag de sitemap-build
  // niet laten crashen. We geven dan een lege index terug; ISR ververst hem.
  let segments: Awaited<ReturnType<typeof getSitemapSegments>> = [];
  try {
    segments = await getSitemapSegments();
  } catch {
    segments = [];
  }
  return new Response(sitemapIndexXml(segments), {
    headers: { "Content-Type": "application/xml" },
  });
}
