import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { getOwnProfile } from "@/features/installers/server/profile";
import { ProfileForm } from "@/features/installers/components/profile-form";

export default async function ProfileCompanyPage() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Geen bedrijf gekoppeld.</EmptyState>;
  const p = await getOwnProfile(company.id);
  if (!p) return <EmptyState>Bedrijf niet gevonden.</EmptyState>;

  const oh = (p.openingHours as { text?: string } | null)?.text ?? "";

  return (
    <div>
      <PageHeading title="Bedrijfsgegevens" subtitle="Dit is wat klanten op je publieke profiel zien." />
      <ProfileForm
        initial={{
          name: p.name,
          shortDescription: p.shortDescription ?? "",
          description: p.description ?? "",
          specialties: p.specialties.join(", "),
          yearsExperience: p.yearsExperience?.toString() ?? "",
          employees: p.employees?.toString() ?? "",
          kvk: p.kvk ?? "",
          vatNumber: p.vatNumber ?? "",
          phone: p.phone,
          email: p.email,
          website: p.website ?? "",
          street: p.street ?? "",
          postcode: p.postcode ?? "",
          city: p.city ?? "",
          province: p.province ?? "",
          openingHours: oh,
          emergencyService: p.emergencyService,
          warrantyText: p.warrantyText ?? "",
        }}
      />
    </div>
  );
}
