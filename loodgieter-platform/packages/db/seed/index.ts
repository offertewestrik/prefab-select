// Idempotente seed: categorieën, merken, diensten, provincies, gemeenten.
// Run: pnpm db:seed   (vereist DATABASE_URL/DIRECT_URL)

import { prisma } from "../src/index";
import { categories, brands, services } from "./data/services";
import { provinces, municipalities } from "./data/geo";

async function seedCatalog() {
  for (const c of categories) {
    await prisma.serviceCategory.upsert({
      where: { slug: c.slug },
      update: { name: c.name, order: c.order, icon: c.icon },
      create: { slug: c.slug, name: c.name, order: c.order, icon: c.icon },
    });
  }

  for (const b of brands) {
    await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { name: b.name, type: b.type },
      create: { slug: b.slug, name: b.name, type: b.type },
    });
  }

  for (const s of services) {
    const category = await prisma.serviceCategory.findUniqueOrThrow({
      where: { slug: s.category },
    });
    const service = await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        categoryId: category.id,
        shortDescription: s.short,
        longDescription: s.long,
        priceFrom: s.from ?? null,
        priceTo: s.to ?? null,
        priceUnit: s.unit ?? null,
      },
      create: {
        slug: s.slug,
        name: s.name,
        categoryId: category.id,
        shortDescription: s.short,
        longDescription: s.long,
        priceFrom: s.from ?? null,
        priceTo: s.to ?? null,
        priceUnit: s.unit ?? null,
        keywords: [],
      },
    });

    for (const brandSlug of s.brands ?? []) {
      const brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
      if (!brand) continue;
      await prisma.serviceBrand.upsert({
        where: { serviceId_brandId: { serviceId: service.id, brandId: brand.id } },
        update: {},
        create: { serviceId: service.id, brandId: brand.id },
      });
    }
  }
  console.log(`✓ Catalogus: ${categories.length} categorieën, ${brands.length} merken, ${services.length} diensten`);
}

async function seedGeo() {
  for (const p of provinces) {
    await prisma.province.upsert({
      where: { slug: p.slug },
      update: { name: p.name },
      create: { slug: p.slug, name: p.name },
    });
  }

  for (const m of municipalities) {
    const province = await prisma.province.findUniqueOrThrow({
      where: { slug: m.province },
    });
    await prisma.municipality.upsert({
      where: { slug: m.slug },
      update: { name: m.name, provinceId: province.id, population: m.population, lat: m.lat, lng: m.lng },
      create: {
        slug: m.slug,
        name: m.name,
        provinceId: province.id,
        population: m.population,
        lat: m.lat,
        lng: m.lng,
      },
    });
  }
  console.log(`✓ Geo: ${provinces.length} provincies, ${municipalities.length} gemeenten (startset)`);
}

const creditPackages = [
  { slug: "starter", name: "Starter", credits: 50, priceCents: 5000, order: 1 },
  { slug: "pro", name: "Pro", credits: 150, priceCents: 13500, order: 2 },
  { slug: "premium", name: "Premium", credits: 500, priceCents: 40000, order: 3 },
];

async function seedPackages() {
  for (const p of creditPackages) {
    await prisma.creditPackage.upsert({
      where: { slug: p.slug },
      update: { name: p.name, credits: p.credits, priceCents: p.priceCents, order: p.order, active: true },
      create: { ...p, active: true },
    });
  }
  console.log(`✓ Credit-pakketten: ${creditPackages.length}`);
}

async function main() {
  console.log("→ Seeden van Loodgieterplatform.nl…");
  await seedCatalog();
  await seedGeo();
  await seedPackages();
  console.log("✓ Klaar.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
