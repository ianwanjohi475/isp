import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { photos, type PhotoSlot } from "@/lib/site";

function exists(src: string) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", src));
  } catch {
    return false;
  }
}

/** Shows /public/photos/<file> for `slot` when it exists, otherwise the drawn scene. */
export function Visual({ slot, alt, children, className = "" }: { slot: PhotoSlot; alt: string; children: ReactNode; className?: string }) {
  const src = photos[slot];
  const hasPhoto = exists(src);
  return (
    <div className={`relative overflow-hidden [&>svg]:h-full [&>svg]:w-full ${className}`}>
      {hasPhoto ? <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /> : children}
    </div>
  );
}
