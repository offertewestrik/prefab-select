import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@repo/ui";

export default function CreditsCancel() {
  return (
    <div className="mx-auto max-w-lg py-12 text-center">
      <XCircle className="mx-auto h-14 w-14 text-neutral-400" />
      <h1 className="mt-6 text-3xl font-bold text-neutral-900">Betaling geannuleerd</h1>
      <p className="mt-3 text-neutral-500">Er zijn geen credits in rekening gebracht. Je kunt het opnieuw proberen.</p>
      <div className="mt-8">
        <Link href="/dashboard/credits"><Button variant="outline">Terug naar credits</Button></Link>
      </div>
    </div>
  );
}
