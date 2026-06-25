import { getSegmentUrls, urlsetXml } from "@/features/seo/sitemap";

export const revalidate = 86400;

export async function GET(_req: Request, { params }: { params: Promise<{ segment: string }> }) {
  const { segment } = await params;
  const name = segment.replace(/\.xml$/, "");
  const urls = await getSegmentUrls(name);
  return new Response(urlsetXml(urls), {
    headers: { "Content-Type": "application/xml" },
  });
}
