import { requireRole } from "@/lib/guards";
import { SidebarLayout, type NavItem } from "@/components/dashboard/sidebar-layout";

const nav: NavItem[] = [
  { label: "Overzicht", href: "/admin" },
  { label: "Diensten", href: "/admin/services" },
  { label: "Steden", href: "/admin/cities" },
  { label: "SEO-pagina's", href: "/admin/seo-pages" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Offertes", href: "/admin/quotes" },
  { label: "Aankopen", href: "/admin/purchases" },
  { label: "Betalingen", href: "/admin/payments" },
  { label: "Credit-pakketten", href: "/admin/credit-packages" },
  { label: "Vakmannen", href: "/admin/installers" },
  { label: "Reviews", href: "/admin/reviews" },
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
