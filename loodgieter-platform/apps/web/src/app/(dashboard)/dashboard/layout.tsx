import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { SidebarLayout, type NavItem } from "@/components/dashboard/sidebar-layout";
import { unreadCount } from "@/features/notifications/server/service";
import { VerifyEmailBanner } from "@/features/auth/components/verify-email-banner";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("INSTALLER");
  const userId = (user as { id: string }).id;
  const [unread, dbUser] = await Promise.all([
    unreadCount(userId),
    prisma.user.findUnique({ where: { id: userId }, select: { emailVerified: true } }),
  ]);

  const nav: NavItem[] = [
    { label: "Overzicht", href: "/dashboard" },
    { label: "Nieuwe leads", href: "/dashboard/leads" },
    { label: "Mijn leads", href: "/dashboard/mijn-leads" },
    { label: "Offertes", href: "/dashboard/offertes" },
    { label: "Credits", href: "/dashboard/credits" },
    { label: "Profiel", href: "/dashboard/profiel" },
    { label: "Diensten", href: "/dashboard/diensten" },
    { label: "Werkgebied", href: "/dashboard/werkgebied" },
    { label: "Meldingen", href: "/dashboard/meldingen", badge: unread },
    { label: "Reviews", href: "/dashboard/reviews" },
    { label: "Foto-analyse", href: "/dashboard/photo-analysis" },
    { label: "Instellingen", href: "/dashboard/settings" },
  ];

  return (
    <SidebarLayout title="Vakman-dashboard" nav={nav}>
      {!dbUser?.emailVerified && <VerifyEmailBanner />}
      {children}
    </SidebarLayout>
  );
}
