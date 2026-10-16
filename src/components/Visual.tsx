import Image from "next/image";
import type { ReactNode } from "react";
import { photos } from "@/lib/site";

/** Renders the photo for `slot` if one is configured in site.ts, otherwise the drawn scene. */
export function Visual({ slot, alt, children, className = "" }: { slot: string; alt: string; children: ReactNode; className?: string }) {
  const src = photos[slot];
  return (
    <div className={`relative overflow-hidden [&>svg]:h-full [&>svg]:w-full ${className}`}>
      {src ? <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /> : children}
    </div>
  );
}
