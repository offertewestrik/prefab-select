import { requireRole } from "@/lib/guards";
import { SidebarLayout, type NavItem } from "@/components/dashboard/sidebar-layout";

const nav: NavItem[] = [
  { label: "Overzicht", href: "/admin" },
  { label: "Diensten", href: "/admin/services" },
  { label: "Steden", href: "/admin/cities" },
  { label: "SEO-pagina's", href: "/admin/seo-pages" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Vakmannen", href: "/admin/installers" },
  { label: "Artikelen", href: "/admin/articles" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole("ADMIN");
  return (
    <SidebarLayout title="Admin" nav={nav}>
      {children}
    </SidebarLayout>
  );
}
