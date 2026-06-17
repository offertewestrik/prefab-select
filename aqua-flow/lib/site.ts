import {
  Droplet,
  Boxes,
  CalendarClock,
  Building2,
  ShieldCheck,
  Truck,
  Wallet,
  FlaskConical,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Central contact details — overridable via NEXT_PUBLIC_* env vars. */
export const contact = {
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+971 50 000 0000",
  phoneHref: (process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+971500000000").replace(/\s/g, ""),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971500000000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@aquaflow.ae",
};

export const whatsappBase = `https://wa.me/${contact.whatsapp}`;
export const whatsappLink = `${whatsappBase}?text=${encodeURIComponent(
  "Hello Aqua Flow, I would like to order purified drinking water.",
)}`;

export type Product = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: string;
};

export const products: Product[] = [
  {
    icon: Droplet,
    title: "19 Litre Water Gallons",
    description:
      "Our flagship product. Refillable 19L gallons of freshly purified drinking water — ideal for homes and offices.",
    highlight: "Most popular",
  },
  {
    icon: Boxes,
    title: "Bottled Drinking Water",
    description:
      "Crystal-clear bottled water in a range of sizes — from 330ml to 1.5L — perfect for events, desks and on the go.",
  },
  {
    icon: CalendarClock,
    title: "Water Subscriptions",
    description:
      "Set it and forget it. Scheduled weekly delivery so you never run out of pure drinking water again.",
    highlight: "Weekly delivery",
  },
  {
    icon: Building2,
    title: "Business Deliveries",
    description:
      "Reliable bulk supply for companies, offices, schools and clinics — billed simply, delivered on time.",
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

/** The purification journey — mirrors the 3D animation. */
export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Source Water",
    description: "Every drop begins as raw water entering our modern production facility.",
  },
  {
    step: "02",
    title: "Multi-Stage Filtration",
    description:
      "Sediment, carbon and reverse-osmosis membranes strip out impurities in successive stages.",
  },
  {
    step: "03",
    title: "UV Disinfection",
    description:
      "High-intensity UV light neutralises any remaining micro-organisms for total safety.",
  },
  {
    step: "04",
    title: "Filling the Gallon",
    description:
      "Purified water is sealed into hygienic 19L gallons under strict quality control.",
  },
  {
    step: "05",
    title: "Delivered to You",
    description:
      "Fresh, pure water arrives at your door — daily, on schedule, every single day.",
  },
];

export type Reason = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const reasons: Reason[] = [
  {
    icon: ShieldCheck,
    title: "100% Purified Water",
    description: "Every gallon passes multi-stage filtration and UV disinfection.",
  },
  {
    icon: Truck,
    title: "Daily Delivery",
    description: "Fresh water at your door every day, right on schedule.",
  },
  {
    icon: Wallet,
    title: "Affordable Prices",
    description: "Premium purity without the premium price tag.",
  },
  {
    icon: FlaskConical,
    title: "Modern Filtration Technology",
    description: "A professional production facility with rigorous quality control.",
  },
  {
    icon: Zap,
    title: "Fast Service",
    description: "Quick response and reliable, friendly delivery teams.",
  },
];

/** Highlights of the production facility shown in the About section. */
export const facilityHighlights: string[] = [
  "Modern filtration line",
  "Multiple filtration stages",
  "UV disinfection",
  "High quality control standards",
  "Professional production environment",
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#products", label: "Products" },
  { href: "#why", label: "Why us" },
  { href: "#order", label: "Order" },
];
