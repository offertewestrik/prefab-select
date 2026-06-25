import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@repo/ui";

export default function OnboardingDone() {
  return (
    <div className="text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-success-500" />
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900">Aanmelding ingediend!</h1>
      <p className="mt-3 text-neutral-500">
        Bedankt voor je aanmelding. We controleren je gegevens en keuren je profiel
        zo snel mogelijk goed. Zodra je bent goedgekeurd ontvang je leads uit jouw werkgebied.
      </p>
      <div className="mt-8">
        <Link href="/dashboard"><Button>Naar mijn dashboard</Button></Link>
      </div>
    </div>
  );
}
