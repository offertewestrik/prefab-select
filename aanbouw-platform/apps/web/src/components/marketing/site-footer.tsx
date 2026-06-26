import Link from "next/link";
import { brand, regionsSentence } from "@repo/core";
import { urls } from "@repo/seo";
import { getServicesByCategory } from "@/features/catalog/server/queries";

export async function SiteFooter() {
  // Best-effort: toon dienstcategorieën in de footer (interne links).
  let categories: { id: string; name: string; services: { slug: string; name: string }[] }[] = [];
  try {
    categories = await getServicesByCategory();
  } catch {
    categories = [];
  }

  return (
    <footer className="mt-24 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-(--container-max) px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-lg font-bold text-neutral-900">{brand.name}</div>
            <p className="mt-3 text-sm text-neutral-500">
              Vergelijk gratis offertes van gecertificeerde bouwbedrijven en
              bouwbedrijven in {regionsSentence()}.
            </p>
            <a href={brand.phoneHref} className="mt-4 block text-sm font-semibold text-primary-600">
              {brand.phone}
            </a>
          </div>

          {categories.slice(0, 3).map((cat) => (
            <div key={cat.id}>
              <div className="text-sm font-semibold text-neutral-900">{cat.name}</div>
              <ul className="mt-3 space-y-2">
                {cat.services.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={urls.service(s.slug)}
                      className="text-sm text-neutral-500 hover:text-neutral-900"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-neutral-200 pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {brand.name}
          </span>
          <div className="flex gap-5">
            <Link href="/diensten" className="hover:text-neutral-900">Diensten</Link>
            <Link href="/steden" className="hover:text-neutral-900">Steden</Link>
            <Link href="/voor-vakmannen" className="hover:text-neutral-900">Voor vakmannen</Link>
            <Link href="/contact" className="hover:text-neutral-900">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
