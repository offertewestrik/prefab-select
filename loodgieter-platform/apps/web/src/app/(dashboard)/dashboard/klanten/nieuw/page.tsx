import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeading } from "@/components/dashboard/sidebar-layout";
import { requireRole } from "@/lib/guards";
import { CustomerForm } from "@/features/customers/components/customer-form";
import { createCustomerAction } from "@/features/customers/server/actions";

export default async function NieuweKlantPage() {
  await requireRole("INSTALLER");
  return (
    <div>
      <Link href="/dashboard/klanten" className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-900">
        <ArrowLeft className="h-4 w-4" /> Terug naar klanten
      </Link>
      <PageHeading title="Nieuwe klant" subtitle="Voeg een klant toe aan je bestand." />
      <CustomerForm action={createCustomerAction} submitLabel="Klant toevoegen" />
    </div>
  );
}
