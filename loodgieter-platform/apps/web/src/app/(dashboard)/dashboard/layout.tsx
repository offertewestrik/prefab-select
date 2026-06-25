import { requireRole } from "@/lib/guards";
import { SidebarLayout, type NavItem } from "@/components/dashboard/sidebar-layout";
import { unreadCount } from "@/features/notifications/server/service";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("INSTALLER");
  const unread = await unreadCount((user as { id: string }).id);

  const nav: NavItem[] = [
    { label: "Overzicht", href: "/dashboard" },
    { label: "Nieuwe leads", href: "/dashboard/leads" },
    { label: "Mijn leads", href: "/dashboard/mijn-leads" },
    { label: "Offertes", href: "/dashboard/quotes" },
    { label: "Credits", href: "/dashboard/credits" },
    { label: "Diensten", href: "/dashboard/diensten" },
    { label: "Werkgebied", href: "/dashboard/werkgebied" },
    { label: "Meldingen", href: "/dashboard/meldingen", badge: unread },
    { label: "Reviews", href: "/dashboard/reviews" },
    { label: "Instellingen", href: "/dashboard/settings" },
  ];

  return (
    <SidebarLayout title="Vakman-dashboard" nav={nav}>
      {children}
    </SidebarLayout>
  );
}
