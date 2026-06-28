"use client";

import { useEffect, useState } from "react";

/**
 * Probe whether an image asset actually exists, the SSR-safe way.
 *
 * Rendering <img onError> in a statically-exported page misses the error
 * event: the browser requests (and 404s) the image before React hydrates and
 * attaches the handler, leaving a broken-image icon. Instead we start with the
 * fallback and asynchronously upgrade to the photo only once it has loaded.
 *
 * Returns `true` only after the image successfully loads.
 */
export function useImageExists(src: string): boolean {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.onload = () => active && setExists(true);
    img.onerror = () => active && setExists(false);
    img.src = src;
    return () => {
      active = false;
    };
  }, [src]);

  return exists;
}
