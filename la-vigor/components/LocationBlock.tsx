"use client";

import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { LinkButton } from "@/components/ui/button";
import { contact, hours, location, whatsappLink } from "@/lib/site";

export function LocationBlock() {
  const { t, pick, lang } = useLang();

  return (
    <section id="location" className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading title={t.location.title} subtitle={t.location.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl shadow-[0_30px_70px_-40px_rgba(59,36,23,0.6)] ring-1 ring-espresso/10"
          >
            <iframe
              title="La Vigor on Google Maps"
              src={location.mapsEmbed}
              className="h-[320px] w-full border-0 sm:h-full sm:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <InfoRow icon={MapPin} title={pick("Address", "العنوان")}>
              {pick(location.textEn, location.textAr)}
            </InfoRow>
            <InfoRow icon={Clock} title={t.location.hours}>
              {hours.display} · {pick(hours.everyDayEn, hours.everyDayAr)}
            </InfoRow>
            <InfoRow icon={Phone} title={t.location.callUs}>
              <a href={`tel:${contact.phoneHref}`} className="hover:text-caramel" dir="ltr">
                {contact.phoneDisplay}
              </a>
            </InfoRow>

            <div className="mt-2 flex flex-wrap gap-3">
              <LinkButton
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                <MapPin className="h-4 w-4" />
                {t.location.directions}
              </LinkButton>
              <LinkButton
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
              >
                <MessageCircle className="h-4 w-4" />
                {t.hero.whatsapp}
              </LinkButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-espresso/5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-caramel/15 text-coffee">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-coffee/50">
          {title}
        </div>
        <div className="mt-0.5 font-semibold text-espresso">{children}</div>
      </div>
    </div>
  );
}
