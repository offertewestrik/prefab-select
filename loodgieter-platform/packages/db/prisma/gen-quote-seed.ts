// Genereert COMPACTE, idempotente SQL om de platform-standaard offerte-templates
// te seeden. Run: node --experimental-strip-types prisma/gen-quote-seed.ts > /tmp/seed.sql
import { QUOTE_TEMPLATES, DEFAULT_TERMS, DEFAULT_WARRANTY } from "./quote-templates.data.ts";

const esc = (s: string): string => s.replace(/'/g, "''");
const q = (s: string | null | undefined): string => (s == null ? "NULL" : `'${esc(s)}'`);
const n = (v: number | null | undefined): string => (v == null ? "NULL" : String(v));
// Placeholders voor de veelvoorkomende gedeelde teksten (expand aan het eind).
const termsVal = (s: string) => (s === DEFAULT_TERMS ? "'§T§'" : q(s));
const warrVal = (s: string) => (s === DEFAULT_WARRANTY ? "'§W§'" : q(s));

const out: string[] = [];

// 1) Alle templates in één multi-row INSERT.
const tplRows = QUOTE_TEMPLATES.map((t) => {
  const id = `qt_${t.slug}`;
  const serviceId = t.serviceSlug ? `(SELECT id FROM "Service" WHERE slug=${q(t.serviceSlug)})` : "NULL";
  return `(${q(id)},NULL,${serviceId},${q(t.slug)},${q(t.title)},${q(t.description)},${n(t.defaultVatRate ?? 21)},${warrVal(t.warrantyText)},${termsVal(t.termsText)},${n(t.priceFromCents)},${n(t.priceToCents)},true,${n(t.order ?? 0)},CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`;
});
out.push(
  `INSERT INTO "QuoteTemplate" (id,"companyId","serviceId",slug,title,description,"defaultVatRate","warrantyText","termsText","priceFromCents","priceToCents",active,"order","createdAt","updatedAt") VALUES ${tplRows.join(",")} ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title,description=EXCLUDED.description,"serviceId"=EXCLUDED."serviceId","defaultVatRate"=EXCLUDED."defaultVatRate","warrantyText"=EXCLUDED."warrantyText","termsText"=EXCLUDED."termsText","priceFromCents"=EXCLUDED."priceFromCents","priceToCents"=EXCLUDED."priceToCents",active=true,"order"=EXCLUDED."order","updatedAt"=CURRENT_TIMESTAMP;`,
);

// 2) Per template: oude regels weg + één multi-row INSERT.
for (const t of QUOTE_TEMPLATES) {
  const id = `qt_${t.slug}`;
  out.push(`DELETE FROM "QuoteTemplateItem" WHERE "templateId"=${q(id)};`);
  const rows = t.items.map(
    (it, i) => `(${q(`${id}_i${i}`)},${q(id)},'${it.kind}',${q(it.description)},${n(it.qty ?? 1)},${n(it.unitPriceCents)},${n(it.hours)},${it.optional ? "true" : "false"},${i})`,
  );
  out.push(`INSERT INTO "QuoteTemplateItem" (id,"templateId",kind,description,qty,"unitPriceCents",hours,optional,"order") VALUES ${rows.join(",")};`);
}

// 3) Gedeelde teksten expanden.
out.push(`UPDATE "QuoteTemplate" SET "termsText"=${q(DEFAULT_TERMS)} WHERE "termsText"='§T§';`);
out.push(`UPDATE "QuoteTemplate" SET "warrantyText"=${q(DEFAULT_WARRANTY)} WHERE "warrantyText"='§W§';`);

console.log(out.join("\n"));
