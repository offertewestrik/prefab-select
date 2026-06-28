// ----------------------------------------------------------------------------
// La Vigor — menu data (source of truth for /menu and the homepage preview).
//
// Prices are intentionally blank until confirmed by the client. Fill in the
// `price` field (e.g. "1.50") and it appears automatically; leave it empty and
// the price chip is hidden. Currency is configured once below.
//
// To swap a placeholder image for a real photo, drop the file into
// /public/menu/<slug>.jpg — the slug already matches each item's filename.
// ----------------------------------------------------------------------------

import { asset } from "./site";

/** Displayed next to every price. Jordanian Dinar. */
export const CURRENCY = { en: "JOD", ar: "د.أ" } as const;

export type MenuItem = {
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  /** Empty string = price hidden until confirmed. */
  price: string;
  image: string;
};

export type MenuCategory = {
  id: string;
  categoryEn: string;
  categoryAr: string;
  items: MenuItem[];
};

const img = (slug: string) => asset(`/menu/${slug}.jpg`);

export const menu: MenuCategory[] = [
  {
    id: "highlights",
    categoryEn: "Highlights",
    categoryAr: "الأكثر طلباً",
    items: [
      {
        slug: "donut",
        nameEn: "Donut",
        nameAr: "دونات",
        descriptionEn: "Soft, sweet donut — perfect with coffee.",
        descriptionAr: "دونات طرية وحلوة، مثالية مع القهوة.",
        price: "",
        image: img("donut"),
      },
      {
        slug: "ice-coffee",
        nameEn: "Ice Coffee",
        nameAr: "آيس كوفي",
        descriptionEn: "Refreshing iced coffee for warm days.",
        descriptionAr: "قهوة باردة ومنعشة للأيام الحارة.",
        price: "",
        image: img("ice-coffee"),
      },
      {
        slug: "ice-caramel-mocha",
        nameEn: "Ice Caramel Mocha",
        nameAr: "آيس كراميل موكا",
        descriptionEn: "Iced coffee with chocolate, caramel and a creamy finish.",
        descriptionAr: "قهوة باردة مع الشوكولاتة والكراميل بطعم كريمي.",
        price: "",
        image: img("ice-caramel-mocha"),
      },
      {
        slug: "cappuccino",
        nameEn: "Cappuccino",
        nameAr: "كبتشينو",
        descriptionEn: "Classic cappuccino with rich coffee and soft milk foam.",
        descriptionAr: "كبتشينو كلاسيكي بطعم قهوة غني ورغوة حليب ناعمة.",
        price: "",
        image: img("cappuccino"),
      },
    ],
  },
  {
    id: "coffee",
    categoryEn: "Coffee",
    categoryAr: "القهوة",
    items: [
      {
        slug: "espresso",
        nameEn: "Espresso",
        nameAr: "إسبريسو",
        descriptionEn: "Strong and pure coffee shot.",
        descriptionAr: "شوت قهوة قوي وصافي.",
        price: "",
        image: img("espresso"),
      },
      {
        slug: "americano",
        nameEn: "Americano",
        nameAr: "أمريكانو",
        descriptionEn: "Smooth black coffee.",
        descriptionAr: "قهوة سوداء ناعمة.",
        price: "",
        image: img("americano"),
      },
      {
        slug: "cappuccino-coffee",
        nameEn: "Cappuccino",
        nameAr: "كبتشينو",
        descriptionEn: "Rich espresso with steamed milk foam.",
        descriptionAr: "إسبريسو غني مع رغوة حليب.",
        price: "",
        image: img("cappuccino"),
      },
      {
        slug: "latte",
        nameEn: "Latte",
        nameAr: "لاتيه",
        descriptionEn: "Creamy coffee with steamed milk.",
        descriptionAr: "قهوة كريمية مع الحليب.",
        price: "",
        image: img("latte"),
      },
      {
        slug: "mocha",
        nameEn: "Mocha",
        nameAr: "موكا",
        descriptionEn: "Coffee with rich chocolate notes.",
        descriptionAr: "قهوة بطعم الشوكولاتة.",
        price: "",
        image: img("mocha"),
      },
    ],
  },
  {
    id: "iced-coffee",
    categoryEn: "Iced Coffee",
    categoryAr: "القهوة الباردة",
    items: [
      {
        slug: "ice-coffee-2",
        nameEn: "Ice Coffee",
        nameAr: "آيس كوفي",
        descriptionEn: "Cold, refreshing coffee.",
        descriptionAr: "قهوة باردة ومنعشة.",
        price: "",
        image: img("ice-coffee"),
      },
      {
        slug: "ice-latte",
        nameEn: "Ice Latte",
        nameAr: "آيس لاتيه",
        descriptionEn: "Cold latte with milk.",
        descriptionAr: "لاتيه بارد مع الحليب.",
        price: "",
        image: img("ice-latte"),
      },
      {
        slug: "ice-caramel-mocha-2",
        nameEn: "Ice Caramel Mocha",
        nameAr: "آيس كراميل موكا",
        descriptionEn: "Caramel, chocolate and iced coffee.",
        descriptionAr: "كراميل وشوكولاتة وقهوة باردة.",
        price: "",
        image: img("ice-caramel-mocha"),
      },
      {
        slug: "ice-vanilla-latte",
        nameEn: "Ice Vanilla Latte",
        nameAr: "آيس فانيلا لاتيه",
        descriptionEn: "Vanilla iced latte.",
        descriptionAr: "لاتيه بارد بالفانيلا.",
        price: "",
        image: img("ice-vanilla-latte"),
      },
    ],
  },
  {
    id: "donuts-desserts",
    categoryEn: "Donuts & Desserts",
    categoryAr: "الدونات والحلويات",
    items: [
      {
        slug: "donut-2",
        nameEn: "Donut",
        nameAr: "دونات",
        descriptionEn: "Fresh donut with sweet glaze.",
        descriptionAr: "دونات طازجة بطبقة حلوة.",
        price: "",
        image: img("donut"),
      },
      {
        slug: "chocolate-donut",
        nameEn: "Chocolate Donut",
        nameAr: "دونات شوكولاتة",
        descriptionEn: "Donut with rich chocolate topping.",
        descriptionAr: "دونات بطبقة شوكولاتة.",
        price: "",
        image: img("chocolate-donut"),
      },
      {
        slug: "brownie",
        nameEn: "Brownie",
        nameAr: "براوني",
        descriptionEn: "Rich, fudgy chocolate dessert.",
        descriptionAr: "حلى شوكولاتة غني.",
        price: "",
        image: img("brownie"),
      },
      {
        slug: "cheesecake",
        nameEn: "Cheesecake",
        nameAr: "تشيز كيك",
        descriptionEn: "Creamy cheesecake slice.",
        descriptionAr: "قطعة تشيز كيك كريمية.",
        price: "",
        image: img("cheesecake"),
      },
    ],
  },
  {
    id: "cold-drinks",
    categoryEn: "Cold Drinks",
    categoryAr: "المشروبات الباردة",
    items: [
      {
        slug: "milkshake",
        nameEn: "Milkshake",
        nameAr: "ميلك شيك",
        descriptionEn: "Creamy cold milkshake.",
        descriptionAr: "ميلك شيك بارد وكريمي.",
        price: "",
        image: img("milkshake"),
      },
      {
        slug: "smoothie",
        nameEn: "Smoothie",
        nameAr: "سموذي",
        descriptionEn: "Fresh and fruity cold drink.",
        descriptionAr: "مشروب فواكه بارد ومنعش.",
        price: "",
        image: img("smoothie"),
      },
      {
        slug: "natural-orange",
        nameEn: "Natural Orange",
        nameAr: "برتقال طبيعي",
        descriptionEn: "Freshly squeezed orange juice.",
        descriptionAr: "عصير برتقال طازج.",
        price: "",
        image: img("natural-orange"),
      },
      {
        slug: "cocktail",
        nameEn: "Cocktail / Juices",
        nameAr: "كوكتيل وعصائر",
        descriptionEn: "Mixed fruit cocktail.",
        descriptionAr: "كوكتيل فواكه مشكل.",
        price: "",
        image: img("cocktail"),
      },
    ],
  },
];

/** The four hero products featured on the homepage highlight cards. */
export const highlightSlugs = [
  "donut",
  "ice-coffee",
  "ice-caramel-mocha",
  "cappuccino",
];
