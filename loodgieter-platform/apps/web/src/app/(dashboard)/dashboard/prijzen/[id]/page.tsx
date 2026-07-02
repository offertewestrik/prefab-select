import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getCurrentCompany } from "@/lib/guards";
import { getCompanyTemplate } from "@/features/pricing/server/queries";
import { deleteTemplateAction } from "@/features/pricing/server/actions";
import { PriceTemplateForm } from "@/features/pricing/components/price-template-form";
import type { QuoteItemKind } from "@/features/quotes/schema";

export const dynamic = "force-dynamic";

export default async function PrijsTemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = await getCurrentCompany();
  if (!company) return <EmptyState>Je account is nog niet aan een bedrijf gekoppeld.</EmptyState>;

  const t = await getCompanyTemplate(id, company.id);
  if (!t) notFound();

  const initial = {
    title: t.title,
    description: t.description ?? "",
    defaultVatRate: t.defaultVatRate,
    priceFromEuro: t.priceFromCents != null ? String(Math.round(t.priceFromCents / 100)) : "",
    priceToEuro: t.priceToCents != null ? String(Math.round(t.priceToCents / 100)) : "",
    warrantyText: t.warrantyText ?? "",
    termsText: t.termsText ?? "",
    active: t.active,
    items: t.items.map((it) => ({ kind: it.kind as QuoteItemKind, description: it.description, qty: it.qty, unitPriceCents: it.unitPriceCents, optional: it.optional })),
  };

  return (
    <div>
      <Link href="/dashboard/prijzen" className="mb-3 inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800">
        <ArrowLeft className="h-4 w-4" /> Terug naar prijzen
      </Link>
      <div className="flex items-start justify-between gap-4">
        <PageHeading title="Prijstemplate bewerken" subtitle="Pas titel, regels en prijzen aan naar jouw tarieven." />
        <form action={deleteTemplateAction}>
          <input type="hidden" name="templateId" value={t.id} />
          <button type="submit" className="shrink-0 rounded-[var(--radius-md)] border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 hover:border-[color:var(--color-status-danger,#DC2626)] hover:text-[color:var(--color-status-danger,#DC2626)]">
            Verwijderen
          </button>
        </form>
      </div>
      <PriceTemplateForm templateId={t.id} initial={initial} />
    </div>
  );
}
