import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { photos, type PhotoSlot } from "@/lib/site";

const exts = [".png", ".jpg", ".jpeg", ".webp"];

function findImage(name: string) {
  for (const ext of exts) {
    try {
      if (fs.existsSync(path.join(process.cwd(), "public", "photos", name + ext))) return `/photos/${name}${ext}`;
    } catch {
      return null;
    }
  }
  return null;
}

/** Shows /public/photos/<name>.(png|jpg|webp) for `slot` when it exists, otherwise the drawn graphic. */
export function Visual({ slot, alt, children, className = "" }: { slot: PhotoSlot; alt: string; children: ReactNode; className?: string }) {
  const src = findImage(photos[slot]);
  return (
    <div className={`relative overflow-hidden [&>svg]:h-full [&>svg]:w-full ${className}`}>
      {src ? <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /> : children}
    </div>
  );
}
