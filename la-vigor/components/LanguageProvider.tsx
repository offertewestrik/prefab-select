"use client";

import * as React from "react";
import { dict, type Dict, type Lang } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Dict;
  /** Pick the value for the current language. */
  pick: <T>(en: T, ar: T) => T;
  dir: "ltr" | "rtl";
};

const LanguageContext = React.createContext<Ctx | null>(null);

const STORAGE_KEY = "lavigor-lang";

/**
 * Holds the active language and keeps <html lang/dir> in sync so the whole
 * document flips between LTR (English, default) and RTL (Arabic).
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("en");

  // Restore the visitor's previous choice on mount.
  React.useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  // Reflect the active language on the document element.
  React.useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = dict[lang].dir;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = React.useMemo<Ctx>(() => {
    const setLang = (l: Lang) => setLangState(l);
    return {
      lang,
      setLang,
      toggle: () => setLangState((p) => (p === "en" ? "ar" : "en")),
      t: dict[lang],
      pick: (en, ar) => (lang === "ar" ? ar : en),
      dir: dict[lang].dir as "ltr" | "rtl",
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
