"use client";

import { Download, ExternalLink, Printer } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QRCode } from "@/components/QRCode";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { brand, SITE_URL } from "@/lib/site";

/**
 * Internal helper page for staff: shows the table QR code that opens the live
 * menu, plus how to download and print it. Not indexed by search engines.
 */
export function QRAdmin() {
  const { pick } = useLang();
  const menuUrl = `${SITE_URL.replace(/\/$/, "")}/menu`;
  const downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&margin=20&data=${encodeURIComponent(
    menuUrl,
  )}`;

  const steps = pick(
    [
      "Download the QR image below (high resolution, 1000×1000).",
      "Add the La Vigor logo and “Scan for menu” text in any design tool.",
      "Print on table cards, stickers or a counter stand.",
      "Test it: scan with a phone camera — it should open the menu instantly.",
    ],
    [
      "نزّل صورة رمز QR أدناه (دقة عالية 1000×1000).",
      "أضف شعار لا فيغور وعبارة «امسح لعرض المنيو» بأي برنامج تصميم.",
      "اطبعه على بطاقات الطاولة أو ملصقات أو حامل على الكاونتر.",
      "جرّبه: امسحه بكاميرا الهاتف — يجب أن يفتح المنيو فوراً.",
    ],
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="mb-8 flex items-center justify-between">
            <span className="rounded-full bg-espresso/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-coffee/60">
              {pick("Staff / Admin", "للموظفين")}
            </span>
            <LanguageSwitcher />
          </div>

          <h1 className="font-display text-3xl font-extrabold text-espresso sm:text-4xl">
            {pick("Table QR Menu", "رمز QR للمنيو")}
          </h1>
          <p className="mt-3 max-w-xl text-coffee/75">
            {pick(
              `This QR code opens the live ${brand.name} menu so guests can browse and order from their table.`,
              `يفتح رمز QR منيو ${brand.name} المباشر ليتمكن الضيوف من التصفّح والطلب من طاولتهم.`,
            )}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="flex flex-col items-center gap-5 rounded-3xl bg-white p-8 ring-1 ring-espresso/5">
              <QRCode value={menuUrl} size={240} className="shadow-none ring-1 ring-espresso/5" />
              <code className="break-all rounded-lg bg-cream px-3 py-1.5 text-center text-xs text-coffee" dir="ltr">
                {menuUrl}
              </code>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-caramel to-caramel-bright px-5 py-3 text-sm font-bold text-choco transition-transform hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" />
                  {pick("Download HD", "تنزيل عالي الدقة")}
                </a>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-2xl border border-espresso/15 px-5 py-3 text-sm font-bold text-espresso transition-colors hover:bg-espresso/5"
                >
                  <Printer className="h-4 w-4" />
                  {pick("Print", "طباعة")}
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 ring-1 ring-espresso/5">
              <h2 className="font-display text-xl font-bold text-espresso">
                {pick("How to set it up", "طريقة الإعداد")}
              </h2>
              <ol className="mt-5 space-y-4">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-caramel/15 text-sm font-bold text-coffee">
                      {i + 1}
                    </span>
                    <span className="text-sm text-coffee/80">{s}</span>
                  </li>
                ))}
              </ol>
              <a
                href={menuUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-caramel hover:text-coffee"
              >
                <ExternalLink className="h-4 w-4" />
                {pick("Preview the menu", "معاينة المنيو")}
              </a>
            </div>
          </div>

          <p className="mt-8 rounded-2xl bg-espresso/5 p-4 text-xs text-coffee/60">
            {pick(
              "Tip: update NEXT_PUBLIC_SITE_URL before launch so the QR points at your final domain (e.g. https://lavigor.com).",
              "ملاحظة: حدّث المتغير NEXT_PUBLIC_SITE_URL قبل الإطلاق ليشير رمز QR إلى نطاقك النهائي (مثل https://lavigor.com).",
            )}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
