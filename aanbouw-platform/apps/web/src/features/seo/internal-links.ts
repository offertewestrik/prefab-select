import "server-only";
import { urls } from "@repo/seo";
import { getNearbyCities } from "@/features/geo/server/queries";

export type LinkItem = { label: string; href: string };

/**
 * Interne links voor een dienst×stad-pagina (zie docs/04 §5).
 * Bouwt: dienst-hub, stad-hub, dienst in nabije steden, gerelateerde diensten.
 */
export async function serviceCityLinks(input: {
  serviceSlug: string;
  serviceName: string;
  citySlug: string;
  cityName: string;
  lat: number;
  lng: number;
  related: { slug: string; name: string }[];
}): Promise<{ nearbyCities: LinkItem[]; relatedServices: LinkItem[]; hubs: LinkItem[] }> {
  const nearby = await getNearbyCities(input.lat, input.lng, input.citySlug, 6);

  return {
    hubs: [
      { label: `Alle steden voor ${input.serviceName}`, href: urls.service(input.serviceSlug) },
      { label: `Alle diensten in ${input.cityName}`, href: urls.city(input.citySlug) },
    ],
    nearbyCities: nearby.map((c) => ({
      label: `${input.serviceName} in ${c.name}`,
      href: urls.serviceCity(input.serviceSlug, c.slug),
    })),
    relatedServices: input.related.map((r) => ({
      label: `${r.name} in ${input.cityName}`,
      href: urls.serviceCity(r.slug, input.citySlug),
    })),
  };
}
