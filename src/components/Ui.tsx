import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, PhoneCall, Wifi } from "lucide-react";
import { photos, site } from "@/lib/site";
import { Reveal } from "./Reveal";

/** Highlighted heading word with a hand-drawn underline that draws in on reveal. */
export function Hl({ children }: { children: ReactNode }) {
  return (
    <span className="hl">
      {children}
      <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
        <path d="M2 9 C 50 2, 120 2, 198 7" fill="none" stroke="#1fb5ef" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function SectionTitle({
  sub,
  title,
  children,
  center = false,
  light = false,
  className = "",
}: {
  sub?: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : ""} ${className}`}>
      {sub && (
        <span className={`mb-4 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] ${light ? "bg-white/10 text-sky-brand ring-1 ring-white/15" : "bg-primary-50 text-primary-500 ring-1 ring-primary-100"}`}>
          <Wifi className="h-3.5 w-3.5" strokeWidth={2.5} />
          {sub}
        </span>
      )}
      <h2 className={`text-[32px] leading-[1.15] sm:text-[46px] ${light ? "text-white" : ""}`}>{title}</h2>
      {children && <div className={`mt-5 text-[16px] ${light ? "text-slate-300" : ""}`}>{children}</div>}
    </div>
  );
}

/** Page banner with photo + breadcrumb, like the template's inner pages. */
export function Breadcrumb({ title, current, image }: { title: string; current: string; image: StaticImageData }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950">
      <Image src={image} alt="" fill priority placeholder="blur" sizes="100vw" className="-z-10 animate-kenburns object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/40" />
      <div className="container-x relative py-24 lg:py-32">
        <h1 className="animate-fade-up text-[42px] font-semibold leading-tight text-white sm:text-6xl">{title}</h1>
        <nav aria-label="Breadcrumb" className="animate-fade-up mt-5 inline-flex items-center gap-2 rounded-full glass px-5 py-2 text-sm font-medium uppercase [animation-delay:150ms]">
          <Link href="/" className="text-sky-brand hover:text-white">Home</Link>
          <ChevronRight className="h-4 w-4 text-white/70" />
          <span className="text-white">{current}</span>
        </nav>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-24 lg:py-32">
      <Image src={photos.antenna} alt="" fill placeholder="blur" sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-primary-700/85 to-navy-950/90" />
      <div className="container-x relative text-center">
        <Reveal>
          <span className="sub-title text-sky-brand">{site.mantra}</span>
          <h2 className="mx-auto max-w-3xl text-[32px] font-semibold leading-tight text-white sm:text-5xl">
            Need Fast, Stable &amp; Reliable Internet? Choose SNET Networks
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/packages" className="btn-primary hover:bg-white hover:text-navy-900">View our packages</Link>
            <span className="font-medium uppercase text-white">or</span>
            <a href={`tel:${site.phoneIntl}`} className="btn-light">
              <PhoneCall className="h-4 w-4" /> {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
