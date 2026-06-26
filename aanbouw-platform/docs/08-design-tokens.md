# 08 — Design tokens

Afgeleid uit het aangeleverde design (LoodgieterDirect-stijl). De **volledige
visuele afwerking komt later** (na de motor), maar deze tokens leggen nu de basis
vast zodat alle componenten consistent zijn. Tokens leven in
`packages/config/tokens.ts` + een Tailwind v4-preset; light & dark thema.

## Kleuren

```
// Primair — vertrouwen/actie (knoppen, links, accenten)
primary-50   #EFF6FF
primary-500  #2563EB      // hoofdblauw (CTA "Vraag offertes aan", logo)
primary-600  #1D4ED8
primary-700  #1E40AF

// Donker — dashboard-zijbalk / footers
navy-900     #0B1220
navy-800     #0F172A      // sidebar achtergrond
navy-700     #111827

// Accent — spoed/urgentie (oranje CTA's "Spoed aannemer")
accent-500   #F97316
accent-600   #EA580C

// Succes — checkmarks, reviews
success-500  #16A34A
trust-green  #00B67A      // Trustpilot-groen (review-sterren)

// Neutralen (slate-schaal) — tekst, randen, kaarten
neutral-50   #F8FAFC      // pagina-achtergrond
neutral-100  #F1F5F9
neutral-200  #E2E8F0      // randen
neutral-500  #64748B      // secundaire tekst
neutral-900  #0F172A      // primaire tekst

// Status (badges)
info #0EA5E9   warning #F59E0B   danger #DC2626
```

## Typografie

```
font-sans:  "Inter", system-ui, sans-serif      // of Geist
Schaal (clamp, responsief):
  display  3rem / 1.1 / -0.02em  (hero "Vind binnen 2 minuten…")
  h1       2.25rem  h2 1.75rem  h3 1.375rem
  body     1rem / 1.6   small 0.875rem   caption 0.75rem
gewichten: 400 / 500 / 600 / 700
```

## Vormgeving

```
radius:   sm 6px · md 10px · lg 14px · xl 20px · 2xl 28px · full 9999px
          (kaarten gebruiken lg–xl, knoppen md, pills full)
shadow:   sm  0 1px 2px rgba(15,23,42,.06)
          md  0 4px 12px rgba(15,23,42,.08)
          lg  0 12px 32px rgba(15,23,42,.10)   // premium floating cards
spacing:  4px-basisgrid (Tailwind-default)
container: max 1280px, royale witruimte, sectie-padding 80–120px
```

## Effecten (uit het design)

- **Glassmorphism** — drijvende kaarten op hero (bv. "Radiatoren verwarmen"):
  `bg-white/70 backdrop-blur-md border border-white/40 shadow-lg`.
- **Subtiele gradients** — secties & badges: zacht blauw→wit, navy→navy-700.
- **Floating cards / parallax** — productkaarten over de hero-afbeelding.
- **Micro-animaties** (Framer Motion) — hover-lift op kaarten, fade/slide-in bij
  scroll, stappen-overgangen in de wizard, tellende KPI's in dashboard.

## Component-bibliotheek (`packages/ui`)

Op basis van **shadcn/ui** (Radix) + tokens, opgebouwd in lagen:

| Laag | Componenten |
|------|-------------|
| **Atomen** | Button, Input, Select, Checkbox, Radio, Badge, Avatar, Icon, Tag, Spinner, Tooltip |
| **Moleculen** | FormField, SearchBar, RatingStars, PriceTag, StatCard (KPI), Breadcrumbs, Pagination, StepIndicator |
| **Organismen** | Header/Nav, Footer, ServiceCard, CityCard, ReviewCard, LeadCard, WizardStep, DashboardSidebar, DataTable, FaqAccordion, CoverageMap |
| **Templates** | MarketingLayout, ServiceMiniSite, ServiceCityTemplate, CityTemplate, DashboardLayout, AdminLayout |

Alles **herbruikbaar, getypeerd, toegankelijk (WCAG AA)** en thema-bewust.
Iconen via **lucide-react** (consistent icon-systeem).

> Logo: in het design "LoodgieterDirect" met druppel-icoon. Definitieve naam +
> logo bevestigen we (zie merknaam-vraag); de tokens blijven gelijk.
