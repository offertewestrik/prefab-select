import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { requireRole, getCurrentCompany } from "@/lib/guards";
import { listQuoteTemplates } from "@/features/quotes/server/templates";
import { QuoteCreateForm, type TemplateOption } from "@/features/quotes/components/quote-create-form";

export const dynamic = "force-dynamic";

export default async function NewQuotePage() {
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) redirect("/dashboard");

  const templates = await listQuoteTemplates(company.id);
  const options: TemplateOption[] = templates.map((t) => ({
    id: t.id,
    title: t.title,
    categoryName: t.service?.category?.name ?? "Overige diensten",
    priceFromCents: t.priceFromCents,
    priceToCents: t.priceToCents,
    itemCount: t._count.items,
  }));

  return (
    <div>
      <Link href="/dashboard/offertes" className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="h-4 w-4" /> Terug naar offertes
      </Link>
      <PageHeading title="Nieuwe offerte" subtitle="Kies een template als startpunt en vul de klantgegevens in." />
      <QuoteCreateForm templates={options} />
    </div>
  );
}
