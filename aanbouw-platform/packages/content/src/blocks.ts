// Flexibel blokken-systeem. Pagina-content (Service, Municipality, Brand,
// LandingContent, Page) wordt opgeslagen als een array van deze blokken in een
// JSON-kolom. Eén discriminated union = type-veilig + valideerbaar + uitbreidbaar.
//
// De RENDERER leeft in de app (features/content/block-renderer) zodat Claude
// Design de visuele componenten kan koppelen. Dit package definieert alleen de
// datavorm — bewust framework-agnostisch.

import { z } from "zod";

const heroBlock = z.object({
  type: z.literal("hero"),
  title: z.string(),
  subtitle: z.string().optional(),
  imageUrl: z.string().url().optional(),
  primaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
});

const introBlock = z.object({
  type: z.literal("intro"),
  heading: z.string().optional(),
  body: z.string(), // markdown/rich text
});

const priceSectionBlock = z.object({
  type: z.literal("priceSection"),
  heading: z.string().optional(),
  from: z.number().optional(),
  to: z.number().optional(),
  unit: z.string().optional(),
  note: z.string().optional(),
});

const faqBlock = z.object({
  type: z.literal("faq"),
  heading: z.string().optional(),
  items: z.array(z.object({ question: z.string(), answer: z.string() })),
});

const reviewsBlock = z.object({
  type: z.literal("reviews"),
  heading: z.string().optional(),
  // leeg = dynamisch ophalen (bv. lokale reviews); gevuld = handmatig
  reviewIds: z.array(z.string()).optional(),
});

const relatedServicesBlock = z.object({
  type: z.literal("relatedServices"),
  heading: z.string().optional(),
  serviceSlugs: z.array(z.string()).optional(), // leeg = automatisch
});

const relatedCitiesBlock = z.object({
  type: z.literal("relatedCities"),
  heading: z.string().optional(),
  citySlugs: z.array(z.string()).optional(), // leeg = nabije steden
});

const ctaBlock = z.object({
  type: z.literal("cta"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
});

const calculatorBlock = z.object({
  type: z.literal("calculator"),
  calculator: z.enum([
    "aanbouw",
    "uitbouw",
    "dakopbouw",
    "garage-ombouw",
    "mantelzorgwoning",
    "veranda",
    "fundering",
    "vergunning",
  ]),
  heading: z.string().optional(),
});

const brandBlock = z.object({
  type: z.literal("brandBlock"),
  heading: z.string().optional(),
  brandSlugs: z.array(z.string()).optional(),
});

const knowledgeBlock = z.object({
  type: z.literal("knowledgeBlock"),
  heading: z.string().optional(),
  articleSlugs: z.array(z.string()).optional(),
});

const trustBlock = z.object({
  type: z.literal("trustBlock"),
  heading: z.string().optional(),
  items: z.array(z.string()).optional(),
});

const howItWorksBlock = z.object({
  type: z.literal("howItWorks"),
  heading: z.string().optional(),
  steps: z
    .array(z.object({ title: z.string(), text: z.string() }))
    .optional(),
});

export const contentBlockSchema = z.discriminatedUnion("type", [
  heroBlock,
  introBlock,
  priceSectionBlock,
  faqBlock,
  reviewsBlock,
  relatedServicesBlock,
  relatedCitiesBlock,
  ctaBlock,
  calculatorBlock,
  brandBlock,
  knowledgeBlock,
  trustBlock,
  howItWorksBlock,
]);

export const contentBlocksSchema = z.array(contentBlockSchema);

export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type ContentBlocks = z.infer<typeof contentBlocksSchema>;
export type BlockType = ContentBlock["type"];

/** Veilig parsen van onbekende JSON uit de database. */
export function parseBlocks(input: unknown): ContentBlocks {
  const result = contentBlocksSchema.safeParse(input);
  return result.success ? result.data : [];
}
