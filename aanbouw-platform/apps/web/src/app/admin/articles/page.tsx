import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { AdminTable } from "@/components/dashboard/admin-table";
import { prisma } from "@/lib/prisma";

export default async function AdminArticles() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    take: 200,
    include: { category: true },
  });

  return (
    <div>
      <PageHeading title="Artikelen" subtitle="Kennisbank-content beheren." />
      <AdminTable
        rows={articles}
        empty="Er zijn nog geen artikelen."
        columns={[
          { key: "title", label: "Titel", render: (a) => <span className="font-medium text-neutral-900">{a.title}</span> },
          { key: "cat", label: "Categorie", render: (a) => a.category?.name ?? "—" },
          { key: "status", label: "Status", render: (a) => a.status },
        ]}
      />
    </div>
  );
}
