# 03 — Datamodel

PostgreSQL via Prisma. Hieronder het volledige v1-schema, geordend per bounded
context. Alle tabellen hebben `id` (cuid), `createdAt`, `updatedAt` tenzij
anders vermeld. Indexen op alle slugs en foreign keys.

> Notatie is Prisma-achtig pseudoschema; relaties en enums staan expliciet.

## Enums

```prisma
enum UserRole        { HOMEOWNER  INSTALLER  ADMIN }
enum CompanyRole     { OWNER  MEMBER }
enum CompanyStatus   { PENDING  ACTIVE  SUSPENDED  REJECTED }
enum LeadStatus      { NEW  MATCHING  DISTRIBUTED  PARTIALLY_SOLD  SOLD_OUT  CLOSED  EXPIRED  SPAM }
enum MatchStatus     { OFFERED  VIEWED  PURCHASED  ACCEPTED  REJECTED  EXPIRED }
enum Urgency         { SPOED  BINNEN_WEEK  FLEXIBEL }
enum Daypart         { OCHTEND  MIDDAG  AVOND  MAAKT_NIET_UIT }
enum AppointmentStatus { PLANNED  CONFIRMED  COMPLETED  CANCELLED  NO_SHOW }
enum ReviewStatus    { PENDING  PUBLISHED  REJECTED }
enum ArticleStatus   { DRAFT  SCHEDULED  PUBLISHED  ARCHIVED }
enum PageStatus      { DRAFT  PUBLISHED }
enum CreditTxnType   { TOPUP  SPEND  REFUND  BONUS  ADJUSTMENT }
enum PublishState    { ACTIVE  HIDDEN }   // voor diensten/steden in de SEO-index
```

---

## Context: Identity & Access

```prisma
User {
  id            String   @id
  role          UserRole @default(HOMEOWNER)
  name          String?
  email         String   @unique
  emailVerified DateTime?
  phone         String?
  image         String?
  passwordHash  String?            // bij e-mail/wachtwoord; null bij magic-link/OAuth
  memberships   CompanyMember[]
  leads         LeadRequest[]      // door huiseigenaar aangemaakte aanvragen
  // Auth.js relaties:
  accounts      Account[]
  sessions      Session[]
}

Account  { ... }   // Auth.js (OAuth providers)
Session  { ... }   // Auth.js
VerificationToken { ... }  // Auth.js (magic links)

InstallerCompany {
  id           String         @id
  slug         String         @unique     // voor publieke bedrijfspagina
  name         String
  kvk          String?        @unique
  vatNumber    String?
  email        String
  phone        String
  website      String?
  logoUrl      String?
  description  String?                     // bedrijfsomschrijving (publiek profiel)
  foundedYear  Int?
  status       CompanyStatus  @default(PENDING)
  ratingAvg    Float          @default(0)  // gedenormaliseerd voor performance
  ratingCount  Int            @default(0)
  creditBalance Int           @default(0)  // saldo in credit-eenheden (zie Billing)
  autoBuy      Boolean        @default(false) // automatisch leads kopen binnen criteria

  members      CompanyMember[]
  services     CompanyService[]
  coverage     CompanyCoverage[]
  certifications Certification[]
  matches      LeadMatch[]
  reviews      Review[]
  appointments Appointment[]
  creditTxns   CreditTransaction[]
  stripeCustomerId String?
}

CompanyMember {
  id        String       @id
  companyId String
  userId    String
  role      CompanyRole  @default(MEMBER)
  @@unique([companyId, userId])
}

Certification {           // Sterkin, OK CV Keur, F-gassen, etc. → vertrouwen + filtering
  id        String  @id
  companyId String
  type      String
  number    String?
  validUntil DateTime?
}
```

---

## Context: Geo  (basis van de stad-pagina's)

```prisma
Province {
  id     String @id
  name   String @unique          // "Noord-Brabant"
  slug   String @unique          // "noord-brabant"
  municipalities Municipality[]
}

Municipality {                   // alle ~342 NL-gemeenten (seed)
  id         String @id
  name       String              // "Eindhoven"
  slug       String @unique      // "eindhoven"
  provinceId String
  cbsCode    String? @unique     // koppeling met open CBS-data
  population Int?
  lat        Float
  lng        Float
  publish    PublishState @default(ACTIVE)  // gemeente aan/uit in SEO-index
  places     Place[]
  @@index([provinceId])
}

Place {                          // woonplaatsen/kernen binnen gemeente (fase 2-uitbreiding)
  id             String @id
  name           String
  slug           String @unique
  municipalityId String
  lat            Float
  lng            Float
}

CompanyCoverage {                // werkgebied van een vakman
  id         String @id
  companyId  String
  // ofwel per gemeente, ofwel als straal rond een centrum:
  municipalityId String?
  centerLat  Float?
  centerLng  Float?
  radiusKm   Int?
  @@index([companyId])
  @@index([municipalityId])
}
```

> **Matching-geo:** een lead heeft een gemeente + lat/lng. Een vakman matcht als
> de leadgemeente in z'n `CompanyCoverage` valt (per gemeente óf binnen straal).
> Voor straal-queries gebruiken we de Postgres-extensie **`earthdistance`/`postgis`**
> (of een Haversine-functie) — geïndexeerd voor snelheid.

---

## Context: Catalog  (basis van de dienst-pagina's)

```prisma
ServiceCategory {
  id        String @id
  slug      String @unique       // "verwarming", "loodgieterswerk", "koeling"
  name      String
  parentId  String?              // boomstructuur
  order     Int    @default(0)
  icon      String?
  services  Service[]
}

Service {
  id              String @id
  slug            String @unique     // "cv-ketel-vervangen"
  name            String             // "CV-ketel vervangen"
  categoryId      String
  // SEO/content:
  shortDescription String            // voor kaarten & meta
  longDescription  String  @db.Text  // rich content (MDX/portable text) voor de mini-site
  heroImageUrl     String?
  icon             String?
  // prijsindicatie (voedt calculator + "vanaf €…"):
  priceFrom        Int?
  priceTo          Int?
  priceUnit        String?           // "per stuk", "per m²", "per uur"
  avgDurationHrs   Float?
  // SEO-velden:
  seoTitle         String?
  metaDescription  String?
  keywords         String[]
  publish          PublishState @default(ACTIVE)
  // relaties:
  brands           ServiceBrand[]
  faqs             Faq[]
  relatedFrom      ServiceRelation[] @relation("from")
  relatedTo        ServiceRelation[] @relation("to")
  leads            LeadRequest[]
  @@index([categoryId])
}

Brand {                              // Intergas, Remeha, Nefit, Vaillant, ATAG…
  id     String @id
  slug   String @unique
  name   String
  logoUrl String?
  type   String?                     // "cv-ketel", "warmtepomp", "airco"
  services ServiceBrand[]
}

ServiceBrand { serviceId String; brandId String; @@id([serviceId, brandId]) }

ServiceRelation {                    // handmatige/gegenereerde "gerelateerde diensten"
  fromId String; toId String; @@id([fromId, toId])
}
```

---

## Context: SEO / Content

```prisma
// Override-content voor specifieke dienst×stad-combinaties (de rest is generiek).
LandingContent {
  id             String @id
  serviceId      String
  municipalityId String
  introHtml      String? @db.Text     // unieke lokale tekst (optioneel)
  customFaqs     Json?
  seoTitle       String?
  metaDescription String?
  noindex        Boolean @default(false)
  @@unique([serviceId, municipalityId])
}

Faq {
  id        String  @id
  scope     String                    // "SERVICE" | "CITY" | "GLOBAL" | "SERVICE_CITY"
  serviceId String?
  question  String
  answer    String  @db.Text
  order     Int     @default(0)
}

SeoMeta {                             // centrale meta-overrides per willekeurige URL/entiteit
  id          String  @id
  path        String  @unique         // bv. "/diensten/cv-ketel-vervangen"
  title       String?
  description String?
  ogImageUrl  String?
  canonical   String?
  noindex     Boolean @default(false)
}

Redirect {                            // 301/302-beheer in admin
  id        String @id
  from      String @unique
  to        String
  permanent Boolean @default(true)
}

// Kennisbank/blog (structuur staat klaar; vullen kan vanaf fase 2)
Article {
  id          String @id
  slug        String @unique
  title       String
  excerpt     String?
  content     String @db.Text          // MDX/portable text
  coverImageUrl String?
  categoryId  String?
  authorId    String?
  status      ArticleStatus @default(DRAFT)
  publishedAt DateTime?
  seoTitle    String?
  metaDescription String?
  readingTime Int?
  tags        ArticleTag[]
}
ArticleCategory { id String @id; slug String @unique; name String; parentId String? }
Author { id String @id; userId String?; name String; slug String @unique; bio String?; avatarUrl String? }
Tag { id String @id; slug String @unique; name String }
ArticleTag { articleId String; tagId String; @@id([articleId, tagId]) }

// Generieke CMS-pagina's (over-ons, voor-vakmannen): blokken-gebaseerd
Page {
  id      String @id
  slug    String @unique
  title   String
  blocks  Json                         // page-builder blokken
  status  PageStatus @default(DRAFT)
  seoTitle String?; metaDescription String?
}
```

---

## Context: Marketplace / Leads

```prisma
LeadRequest {
  id             String   @id
  // wie/wat/waar:
  homeownerId    String?              // null bij gast-aanvraag
  serviceId      String
  brandId        String?              // gekozen merk indien relevant
  municipalityId String
  postcode       String
  houseNumber    String?
  street         String?
  city           String
  lat            Float?
  lng            Float?
  // klus:
  urgency        Urgency
  description    String  @db.Text
  preferredDate  DateTime?
  preferredDaypart Daypart @default(MAAKT_NIET_UIT)
  budgetIndication String?
  // contact:
  contactName    String
  contactEmail   String
  contactPhone   String
  // marketplace:
  status         LeadStatus @default(NEW)
  priceCredits   Int                  // wat een vakman betaalt voor deze lead
  maxBuyers      Int        @default(3)
  soldCount      Int        @default(0)
  // herkomst/seo:
  source         String?              // landingspagina-URL
  utm            Json?
  // anti-fraude:
  spamScore      Float?
  ipHash         String?

  photos         LeadPhoto[]
  matches        LeadMatch[]
  appointments   Appointment[]
  @@index([serviceId]) @@index([municipalityId]) @@index([status])
}

LeadPhoto { id String @id; leadId String; url String; aiAnalysis Json? }  // AI-veld nu leeg

LeadMatch {                           // aanbod van één lead aan één vakman
  id         String @id
  leadId     String
  companyId  String
  status     MatchStatus @default(OFFERED)
  priceCredits Int
  offeredAt  DateTime @default(now())
  viewedAt   DateTime?
  purchasedAt DateTime?
  @@unique([leadId, companyId])
  @@index([companyId, status])
}

LeadPurchase {
  id           String @id
  leadMatchId  String @unique
  companyId    String
  creditsSpent Int
  creditTxnId  String?              // koppeling naar de afschrijving
}

Appointment {                         // "wij plannen in" — door vakman ingepland
  id         String @id
  leadId     String
  companyId  String
  scheduledAt DateTime
  status     AppointmentStatus @default(PLANNED)
  notes      String?
  @@index([companyId])
}
```

### Lead-matching & distributie (kort)

1. Aanvraag binnen → `validateLead` (Zod) + spam-check (Turnstile, rate-limit, IP).
2. **Prijsbepaling**: `priceCredits` o.b.v. dienst (configbaar in admin) × urgentie.
3. **Matching**: zoek `ACTIVE` bedrijven met de dienst in `CompanyService` én de
   leadgemeente in `CompanyCoverage`. Sorteer op rating/abonnement.
4. **Distributie**: maak `LeadMatch` (status `OFFERED`) voor de top-N
   (max `maxBuyers`). Verstuur e-mail/in-app-melding (Resend).
5. **Kopen**: vakman koopt → atomic transactie: credits afschrijven
   (`CreditTransaction`), `LeadPurchase`, `MatchStatus=PURCHASED`,
   `LeadRequest.soldCount++`. Redis-lock voorkomt over-verkoop boven `maxBuyers`.
6. **Inplannen**: vakman maakt `Appointment` → huiseigenaar krijgt bevestiging.

---

## Context: Billing  (basis in v1)

```prisma
CreditTransaction {
  id          String @id
  companyId   String
  type        CreditTxnType
  amount      Int                  // + bij topup/bonus, − bij spend
  balanceAfter Int
  reference   String?              // leadId / stripePaymentIntent
  createdAt   DateTime @default(now())
  @@index([companyId])
}

Invoice {                           // factuur voor credit-aankoop (BTW)
  id          String @id
  companyId   String
  number      String @unique
  amountCents Int
  vatCents    Int
  status      String               // "paid" | "open"
  pdfUrl      String?
  stripeInvoiceId String?
  createdAt   DateTime @default(now())
}

// Plan/Subscription tabellen staan klaar maar worden pas in fase 3 actief.
Plan { id String @id; slug String @unique; name String; priceMonthlyCents Int; features Json; includedCredits Int }
Subscription { id String @id; companyId String @unique; planId String; stripeSubscriptionId String?; status String; currentPeriodEnd DateTime? }
```

---

## Context: Reviews  (basis in v1)

```prisma
Review {
  id         String @id
  companyId  String
  leadId     String?              // geverifieerde review na een echte klus
  authorName String
  rating     Int                  // 1–5
  title      String?
  body       String @db.Text
  status     ReviewStatus @default(PENDING)
  reply      String?              // reactie van de vakman
  verified   Boolean @default(false)
  createdAt  DateTime @default(now())
  @@index([companyId, status])
}
ReviewInvite { id String @id; leadId String; companyId String; token String @unique; sentAt DateTime? }
```

---

## Cross-cutting

```prisma
Notification { id String @id; userId String; type String; payload Json; readAt DateTime?; createdAt DateTime @default(now()) }
EmailLog     { id String @id; to String; template String; status String; providerId String?; createdAt DateTime @default(now()) }
AuditLog     { id String @id; actorId String?; action String; entityType String; entityId String; diff Json?; createdAt DateTime @default(now()) }
```

## Seed-strategie

- **Diensten & categorieën** — geseed uit een `services.ts`-bron (de lijst uit de
  opdracht: cv-ketel, warmtepomp, airco, radiatoren, vloerverwarming, badkamer,
  leidingwerk, lekkage, ontstopping, boiler, zonnepanelen, laadpalen, elektra…),
  met categorie-indeling en merken.
- **Provincies & gemeenten** — geseed uit open **CBS/PDOK**-data (alle ~342
  gemeenten met `lat/lng`, `population`, `cbsCode`). Hiermee staan álle
  gemeenten direct in het systeem; in admin per stuk te (de)activeren.
- **Merken** — Intergas, Remeha, Nefit, Vaillant, ATAG, Daikin, Mitsubishi…
- Idempotente seeds (`upsert` op slug) zodat re-runs veilig zijn.
