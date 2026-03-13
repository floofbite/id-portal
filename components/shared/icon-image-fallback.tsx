"use client";

import { type ReactNode, useMemo, useState } from "react";

interface IconImageFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallback: ReactNode;
}

export function IconImageFallback({ src, alt, className, fallback }: IconImageFallbackProps) {
  const [failed, setFailed] = useState(false);

  const imageClassName = useMemo(() => className ?? "h-6 w-6 object-contain", [className]);

  if (failed) {
    return <>{fallback}</>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={imageClassName}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
