import { prisma } from "@/lib/prisma";
import { getSessionUser, getCurrentCompany } from "@/lib/guards";
import { getQuoteForCompany, parseLineItems } from "@/features/quotes/server/queries";
import { renderQuotePdf } from "@/features/quotes/server/pdf";

export const dynamic = "force-dynamic";

// GET /dashboard/offertes/[id]/pdf → professionele offerte-PDF (alleen eigenaar/admin).
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) return new Response("Niet ingelogd", { status: 401 });
  const isAdmin = (user as { role?: string } | null)?.role === "ADMIN";
  const company = await getCurrentCompany();

  const quote = await getQuoteForCompany(id, company?.id ?? "", isAdmin);
  if (!quote) return new Response("Niet gevonden", { status: 404 });

  const lead = quote.lead;
  const settings = await prisma.contractorSettings.findUnique({ where: { companyId: quote.companyId } });
  const pdf = await renderQuotePdf({
    number: quote.number,
    title: quote.title,
    introText: quote.introText,
    createdAt: quote.createdAt,
    validUntil: quote.validUntil,
    company: {
      name: quote.company.name,
      email: quote.company.email,
      phone: quote.company.phone,
      logoUrl: quote.company.logoUrl,
      street: quote.company.street,
      postcode: quote.company.postcode,
      city: quote.company.city,
      kvk: quote.company.kvk,
      vatNumber: quote.company.vatNumber,
      website: quote.company.website,
    },
    customer: {
      name: quote.customerName ?? lead?.contactName,
      email: quote.customerEmail ?? lead?.contactEmail,
      phone: quote.customerPhone ?? lead?.contactPhone,
      address: quote.customerAddress ?? [lead?.street, lead?.postcode, lead?.city].filter(Boolean).join(" "),
    },
    lineItems: parseLineItems(quote.lineItems),
    subtotalCents: quote.subtotalCents,
    discountCents: quote.discountCents,
    vatRate: quote.vatRate,
    vatCents: quote.vatCents,
    totalCents: quote.totalCents,
    terms: quote.terms,
    iban: settings?.iban,
    footerNote: settings?.footerNote,
    accentColor: settings?.accentColor,
  });

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="offerte-${quote.number}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
