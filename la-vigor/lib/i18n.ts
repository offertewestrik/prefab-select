// ----------------------------------------------------------------------------
// La Vigor — bilingual dictionary (English default, full Arabic / RTL).
//
// UI strings live here keyed by language. Content data (menu items, product
// descriptions) carries its own *En / *Ar fields in lib/menu.ts.
// ----------------------------------------------------------------------------

export type Lang = "en" | "ar";

export const dict = {
  en: {
    dir: "ltr",
    nav: {
      highlights: "Highlights",
      why: "Why La Vigor",
      menu: "Menu",
      gallery: "Gallery",
      reviews: "Reviews",
      location: "Location",
      fullMenu: "Full Menu",
    },
    hero: {
      eyebrow: "Modern Café · Donuts · Coffee · Irbid",
      title: "Where Coffee Meets Happiness",
      subtitle:
        "Fresh donuts, iced coffee and cozy moments in the heart of Irbid.",
      viewMenu: "View Menu",
      directions: "Get Directions",
      whatsapp: "Order on WhatsApp",
    },
    highlights: {
      title: "Made to crave",
      subtitle: "The favourites our guests come back for.",
    },
    why: {
      title: "Why La Vigor",
      subtitle: "More than a café — your everyday happy place in Irbid.",
      items: [
        { title: "Premium coffee", text: "Carefully crafted espresso, lattes and signature blends." },
        { title: "Fresh donuts", text: "Soft, sweet and made fresh — the perfect coffee companion." },
        { title: "Cold drinks", text: "Iced coffee, smoothies, shakes and fresh juices to refresh you." },
        { title: "Cozy atmosphere", text: "Warm, modern interiors — perfect to relax, study or work." },
        { title: "Family & friends", text: "A welcoming space for everyone, any time of day." },
      ],
    },
    menu: {
      title: "Explore the menu",
      subtitle: "Tap a category to see what's brewing.",
      viewFull: "View full menu",
      orderItem: "Order",
    },
    gallery: {
      title: "A taste of La Vigor",
      subtitle: "Coffee, donuts and good vibes.",
    },
    reviews: {
      title: "Loved in Irbid",
      subtitle: "What our guests are saying.",
    },
    location: {
      title: "Find us",
      subtitle: "Right beside Irbid City Center.",
      hours: "Opening hours",
      directions: "Open in Google Maps",
      callUs: "Call us",
    },
    qr: {
      eyebrow: "Scan. Choose. Enjoy.",
      title: "Browse the full menu on your phone",
      text:
        "Point your camera at the QR code at your table to open our live menu and order in seconds.",
      cta: "Open the menu",
    },
    footer: {
      tagline: "Modern café, donuts & coffee in Irbid, Jordan.",
      quickLinks: "Quick links",
      contact: "Contact",
      follow: "Follow us",
      rights: "All rights reserved.",
      openDaily: "Open daily",
    },
    common: {
      switchTo: "العربية",
      priceSoon: "Ask in store",
      replaceReview: "replace with real review",
    },
  },
  ar: {
    dir: "rtl",
    nav: {
      highlights: "الأكثر طلباً",
      why: "لماذا لا فيغور",
      menu: "المنيو",
      gallery: "المعرض",
      reviews: "التقييمات",
      location: "الموقع",
      fullMenu: "المنيو الكامل",
    },
    hero: {
      eyebrow: "كافيه عصري · دونات · قهوة · إربد",
      title: "قهوة، دونات، ومزاج رايق",
      subtitle: "دونات طازجة، قهوة باردة، وجلسات حلوة في قلب إربد.",
      viewMenu: "عرض المنيو",
      directions: "الموقع على الخريطة",
      whatsapp: "اطلب عبر واتساب",
    },
    highlights: {
      title: "نكهات تشتهيها",
      subtitle: "المفضّلة التي يعود إليها ضيوفنا دائماً.",
    },
    why: {
      title: "لماذا لا فيغور",
      subtitle: "أكثر من مجرد كافيه — مكانك المفضّل كل يوم في إربد.",
      items: [
        { title: "قهوة مميزة", text: "إسبريسو ولاتيه وخلطات مميزة محضّرة بعناية." },
        { title: "دونات طازجة", text: "طرية وحلوة وطازجة — الرفيق المثالي للقهوة." },
        { title: "مشروبات باردة", text: "آيس كوفي وسموذي وميلك شيك وعصائر طازجة تنعشك." },
        { title: "أجواء مريحة", text: "ديكور دافئ وعصري — مثالي للاسترخاء والدراسة والعمل." },
        { title: "للعائلة والأصدقاء", text: "مكان يرحّب بالجميع في أي وقت من اليوم." },
      ],
    },
    menu: {
      title: "اكتشف المنيو",
      subtitle: "اختر تصنيفاً لتشاهد ما لدينا.",
      viewFull: "عرض المنيو الكامل",
      orderItem: "اطلب",
    },
    gallery: {
      title: "لمحة من لا فيغور",
      subtitle: "قهوة، دونات، وأجواء حلوة.",
    },
    reviews: {
      title: "محبوب في إربد",
      subtitle: "ماذا يقول ضيوفنا.",
    },
    location: {
      title: "زورونا",
      subtitle: "بجانب إربد سيتي سنتر تماماً.",
      hours: "ساعات العمل",
      directions: "افتح في خرائط جوجل",
      callUs: "اتصل بنا",
    },
    qr: {
      eyebrow: "امسح. اختر. استمتع.",
      title: "تصفّح المنيو الكامل من هاتفك",
      text: "وجّه كاميرتك إلى رمز QR على الطاولة لفتح المنيو والطلب خلال ثوانٍ.",
      cta: "افتح المنيو",
    },
    footer: {
      tagline: "كافيه عصري، دونات وقهوة في إربد، الأردن.",
      quickLinks: "روابط سريعة",
      contact: "تواصل معنا",
      follow: "تابعونا",
      rights: "جميع الحقوق محفوظة.",
      openDaily: "مفتوح يومياً",
    },
    common: {
      switchTo: "English",
      priceSoon: "اسأل في المحل",
      replaceReview: "استبدل بتقييم حقيقي",
    },
  },
};

export type Dict = (typeof dict)["en"];

/** Placeholder reviews — replace with real Google/Facebook reviews. */
export const reviews = [
  {
    nameEn: "Sara",
    nameAr: "سارة",
    textEn:
      "Best coffee in Irbid! The iced caramel mocha is amazing and the donuts are always fresh.",
    textAr: "أفضل قهوة في إربد! الآيس كراميل موكا رائعة والدونات دائماً طازجة.",
    rating: 5,
    placeholder: true,
  },
  {
    nameEn: "Omar",
    nameAr: "عمر",
    textEn:
      "Cozy modern place right next to the city center. Perfect spot to study with friends.",
    textAr: "مكان عصري ومريح بجانب السيتي سنتر. مثالي للدراسة مع الأصدقاء.",
    rating: 5,
    placeholder: true,
  },
  {
    nameEn: "Lana",
    nameAr: "لانا",
    textEn:
      "Great vibes, friendly staff and delicious cold drinks. My favourite café in town.",
    textAr: "أجواء حلوة، طاقم ودود ومشروبات باردة لذيذة. كافيهي المفضّل في المدينة.",
    rating: 5,
    placeholder: true,
  },
];
