import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { urls } from "@repo/seo";
import { priceRange, priceFromFor } from "@/lib/format";
import { serviceImage as photoForService } from "@/features/catalog/service-image";

export function ServiceCard({
  service,
  citySlug,
}: {
  service: { slug: string; name: string; shortDescription: string; priceFrom?: number | null; priceTo?: number | null; priceUnit?: string | null };
  citySlug?: string;
}) {
  const href = citySlug ? urls.serviceCity(service.slug, citySlug) : urls.service(service.slug);
  const photo = photoForService(service.slug, service.name);
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <Image
          src={photo}
          alt={`${service.name} — vakwerk via Loodgieterplatform.nl`}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold text-neutral-900">{service.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-500">{service.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-primary-700">
            {priceRange(priceFromFor(service.slug, service.priceFrom), service.priceTo, service.priceUnit)}
          </span>
          <ArrowRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
