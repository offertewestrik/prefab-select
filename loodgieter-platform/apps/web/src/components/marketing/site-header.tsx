import Link from "next/link";
import { Droplets, Phone } from "lucide-react";
import { brand } from "@repo/core";
import { Button } from "@repo/ui";

const nav = [
  { label: "Diensten", href: "/diensten" },
  { label: "Vakmannen", href: "/vakmannen" },
  { label: "Hoe het werkt", href: "/#hoe-het-werkt" },
  { label: "Keurmerken", href: "/keurmerken" },
  { label: "Reviews", href: "/reviews" },
  { label: "Voor vakmannen", href: "/voor-vakmannen" },
  { label: "Over ons", href: "/over-ons" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-(--container-max) items-center justify-between gap-6 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold text-neutral-900">
          <span className="grid h-8 w-8 place-items-center rounded-[var(--radius-md)] bg-primary-500 text-white">
            <Droplets className="h-5 w-5" />
          </span>
          <span className="text-lg">{brand.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={brand.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap text-sm font-medium text-neutral-900 xl:flex"
          >
            <Phone className="h-4 w-4 text-primary-600" />
            {brand.phone}
          </a>
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Inloggen
            </Button>
          </Link>
          <Link href="/aanvraag">
            <Button size="sm">Gratis aanvraag</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
