// @repo/maps — geocoding/afstand-helpers + Mapbox Static Images URL-builder.
// Bewust dependency-vrij en zowel server- als client-veilig: de Static Images
// API gebruikt een PUBLIEKE token (NEXT_PUBLIC_MAPBOX_TOKEN) in de URL — dat is
// het bedoelde, veilige gebruik. Geen geheime sleutels in de client.

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapMarker extends LatLng {
  label?: string;
  primary?: boolean;
}

const EARTH_KM = 6371;
const toRad = (d: number) => (d * Math.PI) / 180;

/** Hemelsbrede afstand (km) tussen twee punten — Haversine. */
export function haversineKm(a: LatLng, b: LatLng): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return EARTH_KM * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

/** Zwaartepunt van een puntenwolk (of null bij leeg). */
export function centroid(points: LatLng[]): LatLng | null {
  if (points.length === 0) return null;
  const sum = points.reduce((acc, p) => ({ lat: acc.lat + p.lat, lng: acc.lng + p.lng }), { lat: 0, lng: 0 });
  return { lat: sum.lat / points.length, lng: sum.lng / points.length };
}

/** Client-veilige publieke Mapbox-token (alleen NEXT_PUBLIC_*). */
export function mapboxToken(): string | undefined {
  return process.env.NEXT_PUBLIC_MAPBOX_TOKEN || undefined;
}

/** Polygon-benadering van een cirkel (voor radius-overlay), in GeoJSON-volgorde [lng,lat]. */
function circleRing(center: LatLng, radiusKm: number, steps = 64): [number, number][] {
  const ring: [number, number][] = [];
  const latR = radiusKm / 110.574; // graden breedte per km
  const lngR = radiusKm / (111.32 * Math.cos(toRad(center.lat)));
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * 2 * Math.PI;
    ring.push([center.lng + lngR * Math.cos(t), center.lat + latR * Math.sin(t)]);
  }
  return ring;
}

export interface StaticMapOptions {
  markers: MapMarker[];
  center?: LatLng | null;
  radiusKm?: number | null;
  width?: number;
  height?: number;
}

/**
 * Bouwt een Mapbox Static Images URL met markers + optionele radius-cirkel.
 * Geeft null terug als er geen publieke token is (component toont dan fallback).
 */
export function staticMapUrl(opts: StaticMapOptions): string | null {
  const token = mapboxToken();
  if (!token) return null;

  const width = opts.width ?? 640;
  const height = opts.height ?? 360;
  const overlays: string[] = [];

  // Radius-cirkel (transparante vulling) eerst, zodat markers er bovenop liggen.
  if (opts.center && opts.radiusKm && opts.radiusKm > 0) {
    const geojson = {
      type: "Feature",
      properties: { "fill-opacity": 0.12, fill: "#2563EB", stroke: "#2563EB", "stroke-width": 1.5 },
      geometry: { type: "Polygon", coordinates: [circleRing(opts.center, opts.radiusKm)] },
    };
    overlays.push(`geojson(${encodeURIComponent(JSON.stringify(geojson))})`);
  }

  // Max ~40 markers om binnen de URL-limiet te blijven.
  for (const m of opts.markers.slice(0, 40)) {
    const pin = m.primary ? "pin-l" : "pin-s";
    const color = m.primary ? "+1d4ed8" : "+64748b";
    overlays.push(`${pin}${color}(${m.lng.toFixed(5)},${m.lat.toFixed(5)})`);
  }

  const overlayPart = overlays.join(",");
  // "auto" laat Mapbox automatisch in/uitzoomen op alle overlays.
  const viewport = overlays.length > 0 ? "auto" : opts.center ? `${opts.center.lng},${opts.center.lat},6` : "5.3,52.1,6";
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${overlayPart}/${viewport}/${width}x${height}@2x?access_token=${token}`;
}
