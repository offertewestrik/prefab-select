import { requireRole } from "@/lib/guards";
import { SidebarLayout, type NavItem } from "@/components/dashboard/sidebar-layout";

const nav: NavItem[] = [
  { label: "Overzicht", href: "/dashboard" },
  { label: "Nieuwe leads", href: "/dashboard/leads" },
  { label: "Offertes", href: "/dashboard/quotes" },
  { label: "Reviews", href: "/dashboard/reviews" },
  { label: "Instellingen", href: "/dashboard/settings" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireRole("INSTALLER");
  return (
    <SidebarLayout title="Vakman-dashboard" nav={nav}>
      {children}
    </SidebarLayout>
  );
}
