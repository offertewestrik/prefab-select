import "server-only";
import { mapboxToken, type LatLng } from "@repo/maps";
import { prisma } from "@/lib/prisma";

export interface GeoPoint extends LatLng {
  label: string;
}

const POSTCODE_RE = /^\s*(\d{4})\s*([a-zA-Z]{2})?\s*$/;

/**
 * Zet een ingevoerde herkomst (plaats-slug, plaatsnaam of postcode) om naar
 * coördinaten. Gemeenten komen uit de eigen database (lat/lng aanwezig);
 * postcodes worden — indien een publieke Mapbox-token beschikbaar is —
 * best-effort gegeocodeerd. Geeft null als niets resolvet.
 */
export async function geocodeOrigin(input: string): Promise<GeoPoint | null> {
  const q = input.trim();
  if (!q) return null;

  // 1) Gemeente op slug.
  const bySlug = await prisma.municipality.findFirst({
    where: { slug: q.toLowerCase(), publish: "ACTIVE" },
    select: { name: true, lat: true, lng: true },
  });
  if (bySlug) return { lat: bySlug.lat, lng: bySlug.lng, label: bySlug.name };

  // 2) Gemeente op naam.
  const byName = await prisma.municipality.findFirst({
    where: { name: { equals: q, mode: "insensitive" }, publish: "ACTIVE" },
    select: { name: true, lat: true, lng: true },
  });
  if (byName) return { lat: byName.lat, lng: byName.lng, label: byName.name };

  // 3) Postcode via Mapbox (alleen met publieke token; best-effort).
  const pc = POSTCODE_RE.exec(q);
  const token = mapboxToken();
  if (pc && token) {
    try {
      const search = encodeURIComponent(`${pc[1]}${pc[2] ? " " + pc[2].toUpperCase() : ""}`);
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?country=nl&types=postcode,place&limit=1&access_token=${token}`;
      const res = await fetch(url, { next: { revalidate: 86400 } });
      if (res.ok) {
        const data = (await res.json()) as { features?: { center?: [number, number]; place_name?: string }[] };
        const f = data.features?.[0];
        if (f?.center) return { lng: f.center[0], lat: f.center[1], label: f.place_name ?? q };
      }
    } catch {
      // Negeer geocoding-fouten; valt terug op null.
    }
  }

  return null;
}
