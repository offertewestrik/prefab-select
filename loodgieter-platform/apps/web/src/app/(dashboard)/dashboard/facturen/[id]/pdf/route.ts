import { getSessionUser, getCurrentCompany } from "@/lib/guards";
import { getInvoiceForCompany } from "@/features/invoices/server/service";
import { parseLineItems } from "@/features/quotes/server/queries";
import { renderQuotePdf } from "@/features/quotes/server/pdf";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) return new Response("Niet ingelogd", { status: 401 });
  const company = await getCurrentCompany();
  const inv = company ? await getInvoiceForCompany(id, company.id) : null;
  if (!inv) return new Response("Niet gevonden", { status: 404 });

  const pdf = await renderQuotePdf({
    kind: "invoice",
    number: inv.number,
    title: null,
    introText: inv.introText,
    createdAt: inv.createdAt,
    validUntil: inv.dueDate,
    company: {
      name: inv.company.name,
      email: inv.company.email,
      phone: inv.company.phone,
      logoUrl: inv.company.logoUrl,
      street: inv.company.street,
      postcode: inv.company.postcode,
      city: inv.company.city,
      kvk: inv.company.kvk,
      vatNumber: inv.company.vatNumber,
    },
    customer: { name: inv.customerName ?? inv.customer?.name, email: inv.customerEmail, address: inv.customerAddress },
    lineItems: parseLineItems(inv.lineItems),
    subtotalCents: inv.subtotalCents,
    discountCents: inv.discountCents,
    vatRate: inv.vatRate,
    vatCents: inv.vatCents,
    totalCents: inv.amountCents,
    terms: inv.terms,
  });

  return new Response(new Uint8Array(pdf), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="factuur-${inv.number}.pdf"`, "Cache-Control": "no-store" },
  });
}
