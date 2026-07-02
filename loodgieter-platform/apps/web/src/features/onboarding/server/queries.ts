import "server-only";
import { prisma } from "@/lib/prisma";

export interface OnboardingStep {
  key: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  done: boolean;
}

/** Bepaalt welke onboarding-stappen een bedrijf al heeft afgerond. */
export async function getOnboardingStatus(companyId: string): Promise<{ steps: OnboardingStep[]; done: number; total: number; complete: boolean }> {
  const company = await prisma.installerCompany.findUnique({
    where: { id: companyId },
    select: { name: true, phone: true, email: true, city: true, kvk: true, logoUrl: true, creditBalance: true },
  });

  const [serviceCount, coverageCount, settings] = await Promise.all([
    prisma.companyService.count({ where: { companyId } }),
    prisma.companyCoverage.count({ where: { companyId } }),
    prisma.contractorSettings.findUnique({ where: { companyId }, select: { companyId: true } }),
  ]);

  const profileDone = !!(company?.name && company.phone && company.email && company.city && company.kvk);

  const steps: OnboardingStep[] = [
    {
      key: "profile",
      title: "Bedrijfsgegevens",
      description: "Naam, KvK, telefoon, e-mail en plaats — zo weten klanten wie je bent.",
      href: "/dashboard/profiel",
      cta: "Profiel invullen",
      done: profileDone,
    },
    {
      key: "services",
      title: "Diensten kiezen",
      description: "Selecteer voor welke klussen je leads en offertes wilt ontvangen.",
      href: "/dashboard/diensten",
      cta: "Diensten kiezen",
      done: serviceCount > 0,
    },
    {
      key: "coverage",
      title: "Werkgebied instellen",
      description: "Bepaal in welke gemeenten je actief bent.",
      href: "/dashboard/werkgebied",
      cta: "Werkgebied instellen",
      done: coverageCount > 0,
    },
    {
      key: "settings",
      title: "Offerte-instellingen",
      description: "Standaard btw, geldigheid, garantie en voorwaarden voor je offertes en facturen.",
      href: "/dashboard/settings",
      cta: "Instellingen invullen",
      done: !!settings,
    },
    {
      key: "credits",
      title: "Credits opwaarderen",
      description: "Met credits koop je leads. Waardeer op om je eerste leads te kunnen ontvangen.",
      href: "/dashboard/credits",
      cta: "Credits bekijken",
      done: (company?.creditBalance ?? 0) > 0,
    },
  ];

  const done = steps.filter((s) => s.done).length;
  return { steps, done, total: steps.length, complete: done === steps.length };
}
