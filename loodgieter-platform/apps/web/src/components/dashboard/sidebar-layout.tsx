import Link from "next/link";
import { Droplets } from "lucide-react";
import { brand } from "@repo/core";

export type NavItem = { label: string; href: string };

// Herbruikbare donkere zijbalk-layout voor dashboard én admin (tijdelijke
// basis-layout; Claude Design werkt het uiterlijk verder af).
export function SidebarLayout({
  title,
  nav,
  children,
}: {
  title: string;
  nav: NavItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <aside className="hidden w-64 flex-col bg-navy-800 p-5 text-white md:flex">
        <Link href="/" className="mb-8 flex items-center gap-2 font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-md)] bg-primary-500">
            <Droplets className="h-5 w-5" />
          </span>
          {brand.shortName}
        </Link>
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/40">{title}</div>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[var(--radius-md)] px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </div>
    </div>
  );
}

export function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
    </div>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-dashed border-neutral-300 bg-white p-10 text-center text-neutral-500">
      {children}
    </div>
  );
}
