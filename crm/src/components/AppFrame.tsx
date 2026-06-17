"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCrm } from "@/lib/store";
import { APP_VERSIE } from "@/lib/versie";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { SyncErrorBanner } from "./SyncErrorBanner";

/**
 * Bepaalt de layout. Het klantportaal (/portaal/...) krijgt géén CRM-menu;
 * alle andere pagina's krijgen de sidebar + topbar.
 */
export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hydrate = useCrm((s) => s.hydrate);

  // Laad de echte data uit Supabase zodra de app start, en ververs daarna
  // automatisch: elke minuut én zodra het venster weer focus/zichtbaar wordt.
  // Zo zie je ook wat collega's intussen hebben toegevoegd (leads, bestanden…).
  useEffect(() => {
    hydrate();
    let laatste = Date.now();

    const ververs = () => {
      if (Date.now() - laatste < 15_000) return; // niet vaker dan elke 15 s
      laatste = Date.now();
      hydrate();
    };
    const opZichtbaar = () => {
      if (document.visibilityState === "visible") ververs();
    };

    window.addEventListener("focus", ververs);
    document.addEventListener("visibilitychange", opZichtbaar);
    const interval = setInterval(ververs, 60_000);
    return () => {
      window.removeEventListener("focus", ververs);
      document.removeEventListener("visibilitychange", opZichtbaar);
      clearInterval(interval);
    };
  }, [hydrate]);

  // Automatische update: draait er op de server een nieuwere versie, dan
  // herlaadt de app zichzelf één keer. Zo blijft niemand op een oude versie
  // hangen (vooral belangrijk voor de geïnstalleerde app op telefoons).
  useEffect(() => {
    let gestopt = false;
    const checkVersie = async () => {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok) return;
        const { versie } = await res.json();
        if (!gestopt && versie && versie !== APP_VERSIE) {
          const sleutel = `ps-herladen-${versie}`;
          if (!sessionStorage.getItem(sleutel)) {
            sessionStorage.setItem(sleutel, "1");
            window.location.reload();
          }
        }
      } catch {
        /* netwerkfout: volgende ronde opnieuw */
      }
    };
    checkVersie();
    const interval = setInterval(checkVersie, 5 * 60_000);
    return () => {
      gestopt = true;
      clearInterval(interval);
    };
  }, []);

  const isKaal = pathname?.startsWith("/portaal") || pathname?.startsWith("/login");

  if (isKaal) return <>{children}</>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-64">
        <Topbar />
        <SyncErrorBanner />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
