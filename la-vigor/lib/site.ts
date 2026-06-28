// ----------------------------------------------------------------------------
// La Vigor — central business configuration.
//
// Everything a non-developer might want to change (phone, hours, links, prices)
// lives here or in lib/menu.ts. Values can be overridden at build time with
// NEXT_PUBLIC_* environment variables so the live site can be reconfigured
// without touching source.
//
// SOURCE: data/business.json from the brand package. Confirm phone, hours and
// permission to use Google Maps / social photos with the client before launch.
// ----------------------------------------------------------------------------

/** Base path prefix (e.g. "/prefab-select/la-vigor" on GitHub Pages; "" elsewhere). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
/** Prefix a /public path with the deployment base path. */
export const asset = (p: string) => `${BASE}${p}`;

/** Public URL the QR code points at. Override per deployment. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lavigor.com";

export const brand = {
  name: "La Vigor",
  variants: ["La Vigor", "La Vigor Donuts", "LaVigor Donuts Cafe"],
  city: "Irbid",
  country: "Jordan",
  cityAr: "إربد",
  taglineEn: "Where Coffee Meets Happiness",
  taglineAr: "قهوة، دونات، ومزاج رايق",
  logo: asset("/logo.svg"),
};

/** Location — shown in the Location section and the footer. */
export const location = {
  textEn: "Irbid — beside Irbid City Center",
  textAr: "إربد — بجانب إربد سيتي سنتر",
  mapsUrl:
    "https://www.google.com/maps/place/La+Vigor/@32.5362077,35.8645359,17z/data=!4m15!1m8!3m7!1s0x151c770ea8c9a75b:0x5b097086ce17a8c0!2sLa+Vigor!8m2!3d32.5362077!4d35.8645359!10e9!16s%2Fg%2F11fcpdq4ln!3m5!1s0x151c770ea8c9a75b:0x5b097086ce17a8c0!8m2!3d32.5362077!4d35.8645359!16s%2Fg%2F11fcpdq4ln",
  // Public, key-less Google Maps embed centred on the venue coordinates.
  mapsEmbed:
    "https://www.google.com/maps?q=32.5362077,35.8645359&z=17&output=embed",
  lat: 32.5362077,
  lng: 35.8645359,
};

/** Opening hours. Easy to adjust; same every day per current info. */
export const hours = {
  display: process.env.NEXT_PUBLIC_OPENING_HOURS || "08:00 — 00:00",
  everyDayEn: "Open every day",
  everyDayAr: "مفتوح كل يوم",
};

/**
 * Contact details. The primary phone doubles as the WhatsApp number.
 * Jordan country code is +962; a leading 0 is dropped for international format.
 */
const PRIMARY_PHONE = process.env.NEXT_PUBLIC_PHONE_NUMBER || "0795212757";
const toIntl = (local: string) => "962" + local.replace(/^0/, "").replace(/\D/g, "");

export const contact = {
  phoneDisplay: PRIMARY_PHONE,
  phoneHref: "+" + toIntl(PRIMARY_PHONE),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || toIntl(PRIMARY_PHONE),
  alternatives: ["07856833399", "+962 7 8683 3399"],
  instagram: "https://www.instagram.com/la.vigor.jo/",
  facebook: "https://www.facebook.com/lavigorjordan/",
};

export const whatsappBase = `https://wa.me/${contact.whatsapp}`;
/** Pre-filled WhatsApp order message, localised. */
export const whatsappLink = (lang: "en" | "ar") =>
  `${whatsappBase}?text=${encodeURIComponent(
    lang === "ar"
      ? "مرحباً لا فيغور، أود تقديم طلب 🙂"
      : "Hi La Vigor, I'd like to place an order 🙂",
  )}`;
