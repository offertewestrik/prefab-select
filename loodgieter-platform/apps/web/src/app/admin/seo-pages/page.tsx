import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { prisma } from "@/lib/prisma";

export default async function AdminSeoPages() {
  const [overrides, redirects] = await Promise.all([
    prisma.seoMeta.findMany({ orderBy: { updatedAt: "desc" }, take: 200 }),
    prisma.redirect.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
  ]);

  return (
    <div>
      <PageHeading
        title="SEO-pagina's"
        subtitle="Meta-overrides en redirects. Sitemaps worden automatisch gegenereerd."
      />
      <h2 className="mb-2 text-sm font-semibold text-neutral-900">Meta-overrides</h2>
      <AdminTable
        rows={overrides}
        empty="Nog geen meta-overrides. Pagina's gebruiken automatische SEO."
        columns={[
          { key: "path", label: "Pad", render: (o) => <span className="font-medium">{o.path}</span> },
          { key: "title", label: "Title", render: (o) => o.title ?? "—" },
          { key: "noindex", label: "Noindex", render: (o) => (o.noindex ? "ja" : "nee") },
        ]}
      />
      <h2 className="mb-2 mt-8 text-sm font-semibold text-neutral-900">Redirects</h2>
      <AdminTable
        rows={redirects}
        empty="Nog geen redirects ingesteld."
        columns={[
          { key: "from", label: "Van", render: (r) => r.from },
          { key: "to", label: "Naar", render: (r) => r.to },
          { key: "perm", label: "Type", render: (r) => (r.permanent ? "301" : "302") },
        ]}
      />
    </div>
  );
}
