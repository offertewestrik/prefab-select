import { getSitemapSegments, sitemapIndexXml } from "@/features/seo/sitemap";

export const revalidate = 86400;

export async function GET() {
  const segments = await getSitemapSegments();
  return new Response(sitemapIndexXml(segments), {
    headers: { "Content-Type": "application/xml" },
  });
}
