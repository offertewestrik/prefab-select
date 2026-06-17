"use client";

import * as React from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders a real photo from /public when it exists, otherwise a branded,
 * clearly-labelled placeholder. Drop the real installation photos into
 * /public using the `src` filename to replace the placeholder automatically.
 */
export function PhotoSlot({
  src,
  alt,
  label,
  className,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
}) {
  const [failed, setFailed] = React.useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-aqua-soft/40 via-mist to-white ring-1 ring-white/70",
        className,
      )}
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-navy/50">
          <ImageIcon className="h-8 w-8" />
          <span className="px-6 text-xs font-medium">
            {label ?? "صورة من المنشأة"}
          </span>
          <span className="px-6 text-[10px] text-navy/35">
            Add /public/{src.replace(/^\//, "")}
          </span>
        </div>
      )}
    </div>
  );
}
