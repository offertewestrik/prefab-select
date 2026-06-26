import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole, getCurrentCompany } from "@/lib/guards";

// Zorgt dat er een concept-offerte bestaat voor deze (gekochte) lead en gaat
// door naar de editor. Alleen toegankelijk voor de aannemer die de lead kocht.
export default async function NewQuoteForLead({ params }: { params: Promise<{ id: string }> }) {
  const { id: leadId } = await params;
  await requireRole("INSTALLER");
  const company = await getCurrentCompany();
  if (!company) redirect("/dashboard");

  const purchase = await prisma.leadPurchase.findFirst({
    where: { companyId: company.id, match: { leadId } },
  });
  if (!purchase) redirect(`/dashboard/leads/${leadId}`);

  const existing = await prisma.quote.findFirst({
    where: { companyId: company.id, leadId, status: "DRAFT" },
    orderBy: { createdAt: "desc" },
  });

  let quoteId = existing?.id;
  if (!quoteId) {
    const count = await prisma.quote.count({ where: { companyId: company.id } });
    const number = `OFF-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
    const created = await prisma.quote.create({
      data: { companyId: company.id, leadId, number, lineItems: [], status: "DRAFT" },
    });
    quoteId = created.id;
  }
  redirect(`/dashboard/offertes/${quoteId}`);
}
