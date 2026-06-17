"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * <img> that simply removes itself if the file is missing, revealing the
 * parent container's styled background. Lets us reference local /public media
 * that may not be added yet without showing a broken-image icon.
 */
export function SmartImage({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ""}
      onError={() => setFailed(true)}
      className={cn(className)}
    />
  );
}
