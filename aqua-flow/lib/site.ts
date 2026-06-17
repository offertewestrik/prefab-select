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
  Droplets,
  Clock,
  Award,
  Users,
  Sun,
  type LucideIcon,
} from "lucide-react";

/** Base path prefix (e.g. "/prefab-select" on GitHub Pages; "" elsewhere). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
/** Prefix a /public path with the deployment base path. */
export const asset = (p: string) => `${BASE}${p}`;

/** هوية العلامة — النقاء لمياه الشرب، دبي. */
export const brand = {
  name: "Al Naqaa",
  nameAr: "النقاء",
  full: "Al Naqaa Drinking Water",
  fullAr: "النقاء لمياه الشرب",
  taglineAr: "مياه نقية .. حياة صحية",
  taglineEn: "Pure water, healthy life",
  location: "دبي · الإمارات العربية المتحدة",
  logo: asset("/brand-logo.jpg"),
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
  videoUrl: process.env.NEXT_PUBLIC_HERO_VIDEO_URL ?? asset("/videos/hero.mp4"),
  posterUrl:
    process.env.NEXT_PUBLIC_HERO_POSTER_URL ?? asset("/videos/hero-poster.png"),
};

/** Short "watch the process" clip (gallon being filled). AI-generated. */
export const processClip = {
  videoUrl:
    process.env.NEXT_PUBLIC_PROCESS_VIDEO_URL ?? asset("/videos/process.mp4"),
  posterUrl: asset("/products/gallon.png"),
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
    image: asset("/products/gallon.png"),
  },
  {
    icon: Boxes,
    title: "عبوات مياه الشرب",
    description:
      "مياه صافية في عبوات بأحجام متعددة — من 330 مل إلى 1.5 لتر — مثالية للمناسبات والمكاتب والتنقل.",
    image: asset("/products/bottles.png"),
  },
  {
    icon: CalendarClock,
    title: "اشتراكات المياه",
    description:
      "اضبطها وانسَها. توصيل أسبوعي مجدول حتى لا تنفد مياهك النقية أبداً.",
    highlight: "توصيل أسبوعي",
    image: asset("/products/delivery.png"),
  },
  {
    icon: Building2,
    title: "توصيل الشركات",
    description:
      "إمداد موثوق بالجملة للشركات والمكاتب والمدارس والعيادات — فوترة بسيطة وتوصيل في الموعد.",
    image: asset("/products/office.png"),
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
  { href: "#areas", label: "مناطق التوصيل" },
  { href: "#faq", label: "الأسئلة" },
  { href: "#order", label: "اطلب الآن" },
];

/* -------------------------------------------------------------------------- */
/*  KPI / مؤشرات الثقة                                                         */
/* -------------------------------------------------------------------------- */
export type Stat = { icon: LucideIcon; value: string; label: string };

export const stats: Stat[] = [
  { icon: Droplets, value: "+500,000", label: "لتر يُوصَّل شهرياً" },
  { icon: Clock, value: "24/7", label: "خدمة وتوصيل طارئ" },
  { icon: Award, value: "+15", label: "سنة خبرة" },
  { icon: Users, value: "+10,000", label: "عميل سعيد" },
];

/* -------------------------------------------------------------------------- */
/*  مناطق التوصيل في دبي (SEO)                                                 */
/* -------------------------------------------------------------------------- */
export const serviceAreas: string[] = [
  "نخيل جميرا",
  "دبي مارينا",
  "وسط مدينة دبي",
  "الخليج التجاري",
  "قرية جميرا الدائرية (JVC)",
  "مرتفعات الإمارات",
  "المرابع العربية",
  "تلال دبي",
  "ميدان",
  "جميرا",
  "البرشاء",
  "مردف",
  "ديرة",
  "بر دبي",
  "دبي لاند",
  "القوز",
];

/* -------------------------------------------------------------------------- */
/*  آراء العملاء                                                               */
/* -------------------------------------------------------------------------- */
export type Testimonial = { quote: string; name: string; area: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "أفضل خدمة توصيل مياه جرّبناها في دبي — دائماً في الموعد، ومياه نقية فعلاً. ننصح بها بشدة.",
    name: "أحمد العامري",
    area: "نخيل جميرا",
  },
  {
    quote:
      "نعتمد عليهم لتوصيل المياه لمكتبنا أسبوعياً. خدمة احترافية وسريعة وفريق ودود.",
    name: "سارة منصور",
    area: "الخليج التجاري",
  },
  {
    quote:
      "جودة ممتازة وأسعار مناسبة. الاشتراك الأسبوعي وفّر علينا الكثير من العناء.",
    name: "خالد راشد",
    area: "المرابع العربية",
  },
];

/* -------------------------------------------------------------------------- */
/*  الأسئلة الشائعة (SEO + FAQ schema)                                         */
/* -------------------------------------------------------------------------- */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "كم يستغرق توصيل المياه في دبي؟",
    a: "نوصّل في نفس اليوم في معظم مناطق دبي، وغالباً خلال ساعات قليلة من تأكيد طلبك. كما نوفّر توصيلاً طارئاً على مدار الساعة.",
  },
  {
    q: "هل تقدّمون التوصيل للفلل والمجمّعات السكنية؟",
    a: "نعم، نخدم الفلل والمجمّعات والأبراج السكنية في جميع أنحاء دبي، من نخيل جميرا ودبي مارينا إلى المرابع العربية وتلال دبي.",
  },
  {
    q: "ما حجم الغالون وما المنتجات المتوفّرة؟",
    a: "منتجنا الأكثر طلباً هو غالون 19 لتر القابل لإعادة التعبئة، بالإضافة إلى عبوات مياه بأحجام مختلفة واشتراكات توصيل أسبوعية.",
  },
  {
    q: "هل المياه معالَجة بالكامل وآمنة للشرب؟",
    a: "بالتأكيد. تمرّ مياهنا بترشيح متعدد المراحل وتعقيم بالأشعة فوق البنفسجية تحت رقابة جودة صارمة في منشأة إنتاج حديثة.",
  },
  {
    q: "هل يمكنني الاشتراك في توصيل أسبوعي منتظم؟",
    a: "نعم، نوفّر اشتراكات بتوصيل أسبوعي مجدول حتى لا تنفد مياهك النقية أبداً، مع إمكانية التعديل في أي وقت.",
  },
  {
    q: "كيف أطلب المياه؟",
    a: "أرسل طلبك مباشرةً عبر واتساب أو اتصل بنا، وسنؤكّد موعد التوصيل فوراً — دون الحاجة إلى أي حساب.",
  },
];

/** فقرة تعريفية غنية بالكلمات المفتاحية لتحسين الظهور في دبي. */
export const seoIntro =
  "النقاء لمياه الشرب هي خدمتك الموثوقة لتوصيل مياه الشرب النقية في دبي. نوفّر غالونات مياه 19 لتر، وعبوات مياه بأحجام متعددة، واشتراكات توصيل أسبوعية للفلل والمكاتب والشركات في جميع أنحاء الإمارة — من نخيل جميرا ودبي مارينا إلى وسط مدينة دبي والخليج التجاري والمرابع العربية. مياهنا معالَجة بالكامل عبر ترشيح متعدد المراحل وتعقيم بالأشعة فوق البنفسجية، وتصل إلى بابك طازجةً كل يوم.";

/* -------------------------------------------------------------------------- */
/*  الجودة والاعتمادات                                                         */
/* -------------------------------------------------------------------------- */
export type QualityBadge = { icon: LucideIcon; title: string };

export const qualityBadges: QualityBadge[] = [
  { icon: FlaskConical, title: "ترشيح متعدد المراحل (RO)" },
  { icon: Sun, title: "تعقيم بالأشعة فوق البنفسجية" },
  { icon: ShieldCheck, title: "رقابة جودة على كل دفعة" },
  { icon: Boxes, title: "تعبئة صحية مُحكمة" },
  { icon: Building2, title: "منشأة إنتاج حديثة" },
  { icon: Droplet, title: "مياه صالحة للشرب 100%" },
];

/** شعارات الجهات الرسمية — أضف الصور الحقيقية في /public/certs لعرضها. */
export type Accreditation = { label: string; image: string };

export const accreditations: Accreditation[] = [
  { label: "بلدية دبي", image: "/certs/dubai-municipality.png" },
  { label: "هيئة الإمارات للمواصفات (ESMA)", image: "/certs/esma.png" },
  { label: "ISO 22000", image: "/certs/iso-22000.png" },
  { label: "حلال", image: "/certs/halal.png" },
];
