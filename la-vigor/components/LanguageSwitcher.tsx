"use client";

import { Languages } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";

/** Toggles the whole site between English (LTR) and Arabic (RTL). */
export function LanguageSwitcher({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const { toggle, t } = useLang();

  return (
    <button
      onClick={toggle}
      aria-label="Switch language / تبديل اللغة"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-all duration-300 hover:-translate-y-0.5",
        tone === "light"
          ? "border-espresso/15 bg-white/70 text-espresso hover:bg-white"
          : "border-cream/25 bg-white/10 text-cream hover:bg-white/20",
        className,
      )}
    >
      <Languages className="h-3.5 w-3.5" />
      {t.common.switchTo}
    </button>
  );
}
