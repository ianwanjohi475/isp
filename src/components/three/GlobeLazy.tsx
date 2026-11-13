"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

/** The 3D engine is a separate chunk that loads after the page is interactive. */
const Globe = dynamic(() => import("./Globe"), { ssr: false });

export function GlobeLazy({ className = "", lite = false, fallback }: { className?: string; lite?: boolean; fallback?: ReactNode }) {
  return (
    <div className={`relative ${className}`}>
      {/* soft glow shown instantly, before (and behind) the 3D scene */}
      <div className="pointer-events-none absolute inset-[14%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(79,134,247,0.45),rgba(31,98,236,0.12)_55%,transparent_72%)] blur-2xl" />
      <Globe className="absolute inset-0" lite={lite} fallback={fallback} />
    </div>
  );
}
