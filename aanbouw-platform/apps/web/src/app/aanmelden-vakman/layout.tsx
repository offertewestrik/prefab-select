import Link from "next/link";
import { Droplets } from "lucide-react";
import { brand } from "@repo/core";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-neutral-900">
            <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-md)] bg-primary-500 text-white">
              <Droplets className="h-5 w-5" />
            </span>
            {brand.shortName}
          </Link>
          <span className="ml-3 text-sm text-neutral-500">Aanmelden als vakman</span>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
    </div>
  );
}
