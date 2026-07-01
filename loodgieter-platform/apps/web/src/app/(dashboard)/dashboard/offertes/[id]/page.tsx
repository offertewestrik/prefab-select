import { notFound } from "next/navigation";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { getSessionUser, getCurrentCompany } from "@/lib/guards";
import { getQuoteForCompany, parseLineItems } from "@/features/quotes/server/queries";
import { QuoteEditor } from "@/features/quotes/components/quote-editor";

export default async function QuoteEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  const isAdmin = (user as { role?: string } | null)?.role === "ADMIN";
  const company = await getCurrentCompany();

  const quote = await getQuoteForCompany(id, company?.id ?? "", isAdmin);
  if (!quote) notFound();

  const lead = quote.lead;

  return (
    <div>
      <PageHeading title={`Offerte ${quote.number}`} subtitle={lead ? `Voor ${lead.contactName} — ${lead.city}` : undefined} />
      <QuoteEditor
        quoteId={quote.id}
        number={quote.number}
        status={quote.status}
        company={{ name: quote.company.name, email: quote.company.email, phone: quote.company.phone, logoUrl: quote.company.logoUrl }}
        initial={{
          title: quote.title ?? "",
          introText: quote.introText ?? "",
          lineItems: parseLineItems(quote.lineItems),
          vatRate: quote.vatRate,
          discountCents: quote.discountCents ?? 0,
          validUntil: quote.validUntil ? quote.validUntil.toISOString().slice(0, 10) : "",
          terms: quote.terms ?? "",
          notes: quote.notes ?? "",
          customerName: quote.customerName ?? lead?.contactName ?? "",
          customerEmail: quote.customerEmail ?? lead?.contactEmail ?? "",
          customerPhone: quote.customerPhone ?? lead?.contactPhone ?? "",
          customerAddress: quote.customerAddress ?? [lead?.street, lead?.postcode, lead?.city].filter(Boolean).join(" ") ?? "",
        }}
      />
    </div>
  );
}
