/* eslint-disable @next/next/no-img-element */
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { getOwnProfile } from "@/features/installers/server/profile";
import { MediaUploader } from "@/features/installers/components/media-uploader";
import { removePhotoAction } from "@/features/installers/server/profile-actions";

export default async function ProfileMediaPage() {
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Geen bedrijf gekoppeld.</EmptyState>;
  const p = await getOwnProfile(company.id);
  if (!p) return <EmptyState>Bedrijf niet gevonden.</EmptyState>;

  return (
    <div className="space-y-8">
      <PageHeading title="Media" subtitle="Logo, omslagfoto en portfolio. Toegestane formaten: afbeeldingen (logo max 2MB, overig max 4MB)." />

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
          {p.logoUrl ? <img src={p.logoUrl} alt="logo" className="mb-3 h-20 w-20 rounded-[var(--radius-md)] object-cover" /> : <div className="mb-3 h-20 w-20 rounded-[var(--radius-md)] bg-neutral-100" />}
          <MediaUploader endpoint="companyLogo" label="Logo uploaden" />
        </div>
        <div className="rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5">
          {p.coverImageUrl ? <img src={p.coverImageUrl} alt="omslag" className="mb-3 h-20 w-full rounded-[var(--radius-md)] object-cover" /> : <div className="mb-3 h-20 w-full rounded-[var(--radius-md)] bg-neutral-100" />}
          <MediaUploader endpoint="companyCover" label="Omslagfoto uploaden" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-neutral-900">Portfolio</h2>
        <MediaUploader endpoint="portfolio" label="Portfoliofoto's toevoegen" />
        {p.photos.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {p.photos.map((ph) => (
              <div key={ph.id} className="relative">
                <img src={ph.url} alt={ph.caption ?? "portfolio"} className="h-32 w-full rounded-[var(--radius-md)] object-cover" />
                <form action={removePhotoAction} className="absolute right-1 top-1">
                  <input type="hidden" name="id" value={ph.id} />
                  <button className="rounded-full bg-white/90 px-2 py-0.5 text-xs text-[color:var(--color-status-danger,#DC2626)] shadow">verwijder</button>
                </form>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
