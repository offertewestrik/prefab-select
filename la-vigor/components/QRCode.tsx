"use client";

import * as React from "react";
import { QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders a scannable QR code for `value`. Uses the free goqr.me image API so
 * the code always reflects the current target URL with no build step. If the
 * image can't load (e.g. offline preview), a labelled placeholder is shown so
 * the layout stays intact — the QR resolves on the live site.
 */
export function QRCode({
  value,
  size = 240,
  className,
}: {
  value: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = React.useState(false);
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(
    value,
  )}`;

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-3xl bg-white p-4 shadow-warm",
        className,
      )}
      style={{ width: size + 32, height: size + 32 }}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`QR code for ${value}`}
          width={size}
          height={size}
          onError={() => setFailed(true)}
          className="h-full w-full rounded-xl"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 text-center text-coffee/50">
          <QrCode className="h-12 w-12" />
          <span className="px-3 text-[11px] font-medium">{value}</span>
        </div>
      )}
    </div>
  );
}
