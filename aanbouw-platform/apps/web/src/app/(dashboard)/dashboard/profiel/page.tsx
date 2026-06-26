import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@repo/ui";
import { companyStatusLabels, type CompanyStatus } from "@repo/core";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { getOwnProfile } from "@/features/installers/server/profile";

export default async function ProfileOverview() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;
  const profile = await getOwnProfile(company.id);
  if (!profile) return <EmptyState>Bedrijf niet gevonden.</EmptyState>;

  const sections = [
    { href: "/dashboard/profiel/bedrijf", title: "Bedrijfsgegevens", desc: "Naam, omschrijving, contact, service" },
    { href: "/dashboard/profiel/media", title: "Media", desc: `Logo, omslagfoto, ${profile.photos.length} portfoliofoto's` },
    { href: "/dashboard/profiel/keurmerken", title: "Keurmerken", desc: `${profile.certifications.length} certificaten` },
  ];

  return (
    <div>
      <PageHeading title="Bedrijfsprofiel" subtitle="Een compleet profiel wint meer opdrachten." />

      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full bg-neutral-100 px-3 py-1">Status: {companyStatusLabels[profile.status as CompanyStatus]}</span>
        {profile.status === "APPROVED" && profile.publicVisible && (
          <Link href={`/vakmannen/${profile.slug}`} className="inline-flex items-center gap-1 font-medium text-primary-600 hover:underline">
            Bekijk je publieke profiel <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]">
              <CardContent>
                <div className="font-semibold text-neutral-900">{s.title}</div>
                <p className="mt-1 text-sm text-neutral-500">{s.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
