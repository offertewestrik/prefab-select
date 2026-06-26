// Maakt test-/dev-gebruikers aan voor lokaal testen van login & rollen.
//
//   pnpm db:create-admin       → ADMIN
//   pnpm db:create-installer   → INSTALLER (+ bedrijf, werkgebied, diensten)
//   pnpm db:create-homeowner   → HOMEOWNER
//   pnpm db:create-dev-users   → alle drie
//
// ⚠️  ALLEEN VOOR LOKAAL/DEVELOPMENT. Gebruik deze accounts/wachtwoorden NOOIT
//     in productie.

import bcrypt from "bcryptjs";
import { prisma } from "../src/index";

const DEV_USERS = {
  admin: {
    email: "admin@loodgieterplatform.nl",
    name: "Dev Admin",
    role: "ADMIN" as const,
    password: "Admin!2026dev",
  },
  installer: {
    email: "installateur@loodgieterplatform.nl",
    name: "Dev Installateur",
    role: "INSTALLER" as const,
    password: "Installer!2026dev",
  },
  homeowner: {
    email: "klant@loodgieterplatform.nl",
    name: "Dev Klant",
    role: "HOMEOWNER" as const,
    password: "Klant!2026dev",
  },
};

type Kind = keyof typeof DEV_USERS;

async function createUser(kind: Kind) {
  const cfg = DEV_USERS[kind];
  const passwordHash = await bcrypt.hash(cfg.password, 10);

  const user = await prisma.user.upsert({
    where: { email: cfg.email },
    update: { name: cfg.name, role: cfg.role, passwordHash, emailVerified: new Date() },
    create: {
      email: cfg.email,
      name: cfg.name,
      role: cfg.role,
      passwordHash,
      emailVerified: new Date(),
    },
  });

  // Installateur krijgt een actief bedrijf + werkgebied + diensten, zodat het
  // dashboard en de matching meteen data tonen.
  if (kind === "installer") {
    const company = await prisma.installerCompany.upsert({
      where: { slug: "demo-installatiebedrijf" },
      update: { status: "APPROVED" },
      create: {
        slug: "demo-installatiebedrijf",
        name: "Demo Installatiebedrijf",
        email: cfg.email,
        phone: "085 060 58 72",
        status: "APPROVED",
        creditBalance: 100,
        description: "Demo-bedrijf voor lokaal testen.",
      },
    });

    await prisma.companyMember.upsert({
      where: { companyId_userId: { companyId: company.id, userId: user.id } },
      update: { role: "OWNER" },
      create: { companyId: company.id, userId: user.id, role: "OWNER" },
    });

    // Koppel een paar diensten + een werkgebied (Eindhoven) indien aanwezig.
    const services = await prisma.service.findMany({
      where: { slug: { in: ["cv-ketel-vervangen", "lekkage", "warmtepomp"] } },
      select: { id: true },
    });
    for (const s of services) {
      await prisma.companyService.upsert({
        where: { companyId_serviceId: { companyId: company.id, serviceId: s.id } },
        update: {},
        create: { companyId: company.id, serviceId: s.id },
      });
    }
    const eindhoven = await prisma.municipality.findUnique({ where: { slug: "eindhoven" } });
    if (eindhoven) {
      const existing = await prisma.companyCoverage.findFirst({
        where: { companyId: company.id, municipalityId: eindhoven.id },
      });
      if (!existing) {
        await prisma.companyCoverage.create({
          data: { companyId: company.id, municipalityId: eindhoven.id },
        });
      }
    }
  }

  console.log(`✓ ${cfg.role.padEnd(9)} ${cfg.email}  (wachtwoord: ${cfg.password})`);
}

async function main() {
  const arg = (process.argv[2] ?? "all") as Kind | "all";
  const kinds: Kind[] = arg === "all" ? (Object.keys(DEV_USERS) as Kind[]) : [arg];

  if (arg !== "all" && !DEV_USERS[arg as Kind]) {
    console.error(`Onbekend type "${arg}". Gebruik: admin | installer | homeowner | all`);
    process.exit(1);
  }

  console.log("→ Dev-testgebruikers aanmaken (ALLEEN lokaal/dev)…");
  for (const k of kinds) await createUser(k);
  console.log("✓ Klaar. Log in op /login.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
