import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { brand } from "@repo/core";
import { Button } from "@repo/ui";

export const metadata: Metadata = {
  title: "Bedankt voor je aanvraag",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-success-500" />
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900">
        Je aanvraag is verstuurd!
      </h1>
      <p className="mt-3 text-neutral-500">
        Bedankt voor je aanvraag bij {brand.name}. Gecertificeerde vakmannen uit
        jouw regio nemen zo snel mogelijk contact met je op. Je ontvangt een
        bevestiging per e-mail.
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button variant="outline">Terug naar home</Button>
        </Link>
      </div>
    </div>
  );
}
