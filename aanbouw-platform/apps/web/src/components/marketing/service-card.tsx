import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urls } from "@repo/seo";
import { priceRange } from "@/lib/format";

export function ServiceCard({
  service,
  citySlug,
}: {
  service: { slug: string; name: string; shortDescription: string; priceFrom?: number | null; priceTo?: number | null; priceUnit?: string | null };
  citySlug?: string;
}) {
  const href = citySlug ? urls.serviceCity(service.slug, citySlug) : urls.service(service.slug);
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-[var(--radius-xl)] border border-neutral-200 bg-white p-5 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
    >
      <h3 className="font-semibold text-neutral-900">{service.name}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{service.shortDescription}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-primary-700">
          {priceRange(service.priceFrom, service.priceTo, service.priceUnit)}
        </span>
        <ArrowRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}
