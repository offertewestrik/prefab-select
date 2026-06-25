"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "@/lib/uploadthing-client";

type Endpoint = "companyLogo" | "companyCover" | "portfolio" | "certificate";

/** Herbruikbare upload-knop. Vernieuwt de pagina na succesvolle upload. */
export function MediaUploader({ endpoint, label }: { endpoint: Endpoint; label: string }) {
  const router = useRouter();
  return (
    <div>
      <div className="mb-1 text-sm font-medium text-neutral-900">{label}</div>
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={() => router.refresh()}
        onUploadError={(e: Error) => alert(`Upload mislukt: ${e.message}`)}
      />
    </div>
  );
}
