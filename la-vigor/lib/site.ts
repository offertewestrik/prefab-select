/**
 * La Vigor — site content for the hero.
 * Centralised so copy & nav stay in one place (and to keep components clean).
 */

export const brand = {
  name: "La Vigor",
  sub: "Donuts Cafe",
  tagline: "Where Coffee Meets Happiness",
  subtitle: "Premium coffee. Fresh donuts. Made with passion every day.",
  location: "Irbid, Jordan",
  // WhatsApp ordering (from the brand sheet).
  whatsapp: "https://wa.me/962795212757",
} as const;

export const navLinks = [
  { label: "Home", href: "#home", labelAr: "الرئيسية" },
  { label: "Menu", href: "#menu", labelAr: "القائمة" },
  { label: "About Us", href: "#about", labelAr: "من نحن" },
  { label: "Gallery", href: "#gallery", labelAr: "المعرض" },
  { label: "Reviews", href: "#reviews", labelAr: "التقييمات" },
  { label: "Contact", href: "#contact", labelAr: "تواصل" },
] as const;

export const features = [
  { icon: "Coffee", label: "Premium Coffee", note: "Single-origin, freshly pulled" },
  { icon: "Donut", label: "Fresh Donuts", note: "Baked every morning" },
  { icon: "Armchair", label: "Cozy Atmosphere", note: "Your warm corner of Irbid" },
  { icon: "HeartHandshake", label: "Friendly Staff", note: "Hospitality, every cup" },
] as const;

/** Headline split into lines for the mask-reveal animation. */
export const headlineLines = ["Where Coffee", "Meets", "Happiness"] as const;
