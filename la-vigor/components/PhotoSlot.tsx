"use client";

import * as React from "react";
import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Renders a real photo from /public when present, otherwise a branded,
 * clearly-labelled placeholder so the layout never shows a broken image.
 * Drop the real photo at the given `src` path to replace it automatically.
 *
 * See /public/PHOTOS.md for where each photo goes.
 */
export function PhotoSlot({
  src,
  alt,
  label,
  className,
  imgClassName,
  children,
}: {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}) {
  const [failed, setFailed] = React.useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-beige via-cream-soft to-sand/60",
        className,
      )}
    >
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            imgClassName,
          )}
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center text-coffee/55">
          <Coffee className="h-7 w-7" />
          <span className="text-xs font-semibold">{label ?? alt}</span>
          <span className="text-[10px] text-coffee/40">
            Add {src.replace(/^https?:\/\/[^/]+/, "")}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
