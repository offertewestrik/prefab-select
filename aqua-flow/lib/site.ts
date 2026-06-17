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

/** هوية العلامة — النقاء لمياه الشرب، دبي. */
export const brand = {
  name: "Al Naqaa",
  nameAr: "النقاء",
  full: "Al Naqaa Drinking Water",
  fullAr: "النقاء لمياه الشرب",
  taglineAr: "مياه نقية .. حياة صحية",
  taglineEn: "Pure water, healthy life",
  location: "دبي · الإمارات العربية المتحدة",
  logo: "/brand-logo.jpg",
};

/** بيانات التواصل — قابلة للتهيئة عبر متغيرات NEXT_PUBLIC_*. */
export const contact = {
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+971 50 000 0000",
  phoneHref: (process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+971500000000").replace(/\s/g, ""),
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "971500000000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@alnaqaa.ae",
};

export const whatsappBase = `https://wa.me/${contact.whatsapp}`;
export const whatsappLink = `${whatsappBase}?text=${encodeURIComponent(
  "مرحباً النقاء، أود طلب مياه شرب نقية.",
)}`;

/**
 * وسائط القسم الرئيسي — مُولّدة عبر Higgsfield وتُقدَّم من شبكة CDN دائمة.
 * للاستضافة الذاتية، نزّلها إلى /public واضبط متغيرات البيئة على مسارات محلية.
 */
export const heroMedia = {
  videoUrl: process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? "/videos/hero.mp4",
  posterUrl: process.env.NEXT_PUBLIC_HERO_POSTER_URL ?? "/videos/hero-poster.png",
};

/** Short "watch the process" clip (gallon being filled). AI-generated. */
export const processClip = {
  videoUrl: process.env.NEXT_PUBLIC_PROCESS_VIDEO_URL ?? "/videos/process.mp4",
  posterUrl: "/products/gallon.png",
};

export type Product = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: string;
  image: string;
};

export const products: Product[] = [
  {
    icon: Droplet,
    title: "غالونات مياه 19 لتر",
    description:
      "منتجنا الرئيسي. غالونات قابلة لإعادة التعبئة سعة 19 لتراً من مياه شرب نقية طازجة — مثالية للمنازل والمكاتب.",
    highlight: "الأكثر طلباً",
    image: "/products/gallon.png",
  },
  {
    icon: Boxes,
    title: "عبوات مياه الشرب",
    description:
      "مياه صافية في عبوات بأحجام متعددة — من 330 مل إلى 1.5 لتر — مثالية للمناسبات والمكاتب والتنقل.",
    image: "/products/bottles.png",
  },
  {
    icon: CalendarClock,
    title: "اشتراكات المياه",
    description:
      "اضبطها وانسَها. توصيل أسبوعي مجدول حتى لا تنفد مياهك النقية أبداً.",
    highlight: "توصيل أسبوعي",
    image: "/products/delivery.png",
  },
  {
    icon: Building2,
    title: "توصيل الشركات",
    description:
      "إمداد موثوق بالجملة للشركات والمكاتب والمدارس والعيادات — فوترة بسيطة وتوصيل في الموعد.",
    image: "/products/office.png",
  },
];

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

/** رحلة التنقية — تعكس الرسوم ثلاثية الأبعاد. */
export const processSteps: ProcessStep[] = [
  {
    step: "٠١",
    title: "مياه المصدر",
    description: "تبدأ كل قطرة كمياه خام تدخل منشأة الإنتاج الحديثة لدينا.",
  },
  {
    step: "٠٢",
    title: "ترشيح متعدد المراحل",
    description:
      "أغشية الترسيب والكربون والتناضح العكسي تزيل الشوائب على مراحل متتالية.",
  },
  {
    step: "٠٣",
    title: "تعقيم بالأشعة فوق البنفسجية",
    description:
      "أشعة فوق بنفسجية عالية الكثافة تقضي على أي كائنات دقيقة متبقية لأمان تام.",
  },
  {
    step: "٠٤",
    title: "تعبئة الغالون",
    description:
      "تُعبّأ المياه النقية في غالونات صحية سعة 19 لتراً تحت رقابة جودة صارمة.",
  },
  {
    step: "٠٥",
    title: "التوصيل إليك",
    description:
      "تصل المياه النقية الطازجة إلى بابك — يومياً وفي الموعد، كل يوم.",
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
    title: "مياه نقية 100%",
    description: "كل غالون يمر بترشيح متعدد المراحل وتعقيم بالأشعة فوق البنفسجية.",
  },
  {
    icon: Truck,
    title: "توصيل يومي",
    description: "مياه طازجة عند بابك كل يوم وفي الموعد المحدد.",
  },
  {
    icon: Wallet,
    title: "أسعار مناسبة",
    description: "نقاء متميّز دون سعر مرتفع.",
  },
  {
    icon: FlaskConical,
    title: "تقنية ترشيح حديثة",
    description: "منشأة إنتاج احترافية مع رقابة جودة صارمة.",
  },
  {
    icon: Zap,
    title: "خدمة سريعة",
    description: "استجابة سريعة وفِرق توصيل موثوقة وودودة.",
  },
];

/** أبرز ملامح منشأة الإنتاج في قسم «من نحن». */
export const facilityHighlights: string[] = [
  "خط ترشيح حديث",
  "مراحل ترشيح متعددة",
  "تعقيم بالأشعة فوق البنفسجية",
  "معايير رقابة جودة عالية",
  "بيئة إنتاج احترافية",
];

export const navLinks = [
  { href: "#about", label: "من نحن" },
  { href: "#process", label: "التنقية" },
  { href: "#products", label: "منتجاتنا" },
  { href: "#why", label: "لماذا نحن" },
  { href: "#order", label: "اطلب الآن" },
];
