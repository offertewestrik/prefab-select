import { Button } from "@repo/ui";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { getOwnProfile } from "@/features/installers/server/profile";
import { MediaUploader } from "@/features/installers/components/media-uploader";
import { addCertAction, removeCertAction } from "@/features/installers/server/profile-actions";

export default async function ProfileCertsPage() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Geen bedrijf gekoppeld.</EmptyState>;
  const p = await getOwnProfile(company.id);
  if (!p) return <EmptyState>Bedrijf niet gevonden.</EmptyState>;

  return (
    <div className="space-y-8">
      <PageHeading title="Keurmerken & certificaten" subtitle="Bijv. Sterkin, OK CV Keur, F-gassen. Vergroot het vertrouwen van klanten." />

      <form action={addCertAction} className="flex flex-wrap items-end gap-3 rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-4">
        <label className="text-sm"><span className="mb-1 block font-medium text-neutral-900">Keurmerk *</span>
          <input name="type" required className="h-10 rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" placeholder="Sterkin" />
        </label>
        <label className="text-sm"><span className="mb-1 block font-medium text-neutral-900">Nummer</span>
          <input name="number" className="h-10 rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" />
        </label>
        <label className="text-sm"><span className="mb-1 block font-medium text-neutral-900">Geldig tot</span>
          <input name="validUntil" type="date" className="h-10 rounded-[var(--radius-md)] border border-neutral-200 px-3 text-sm" />
        </label>
        <Button type="submit">Toevoegen</Button>
      </form>

      <div>
        <MediaUploader endpoint="certificate" label="Certificaat-bestand uploaden (afbeelding of PDF)" />
      </div>

      {p.certifications.length === 0 ? (
        <EmptyState>Nog geen keurmerken toegevoegd.</EmptyState>
      ) : (
        <ul className="space-y-2">
          {p.certifications.map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded-[var(--radius-md)] border border-neutral-200 bg-white p-3 text-sm">
              <span>
                <span className="font-medium text-neutral-900">{c.type}</span>
                {c.number ? ` · ${c.number}` : ""}
                {c.validUntil ? ` · geldig tot ${c.validUntil.toLocaleDateString("nl-NL")}` : ""}
                {c.fileUrl ? <a href={c.fileUrl} className="ml-2 text-primary-600 hover:underline">bestand</a> : null}
              </span>
              <form action={removeCertAction}>
                <input type="hidden" name="id" value={c.id} />
                <button className="text-[color:var(--color-status-danger,#DC2626)]">verwijder</button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
