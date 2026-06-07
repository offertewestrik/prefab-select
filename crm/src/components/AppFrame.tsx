"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCrm } from "@/lib/store";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

/**
 * Bepaalt de layout. Het klantportaal (/portaal/...) krijgt géén CRM-menu;
 * alle andere pagina's krijgen de sidebar + topbar.
 */
export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hydrate = useCrm((s) => s.hydrate);

  // Laad de echte data uit Supabase zodra de app start.
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const isPortaal = pathname?.startsWith("/portaal");

  if (isPortaal) return <>{children}</>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <Topbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
