import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { site } from "@/lib/site";

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
      {sub && <span className={`sub-title ${light ? "text-sky-brand" : ""}`}>{sub}</span>}
      <h2 className={`text-[32px] leading-[1.15] sm:text-[44px] ${light ? "text-white" : ""}`}>{title}</h2>
      {children && <div className={`mt-5 ${light ? "text-slate-300" : ""}`}>{children}</div>}
    </div>
  );
}

/** Light page banner with breadcrumb, like the template's inner pages. */
export function Breadcrumb({ title, current }: { title: string; current: string }) {
  return (
    <section className="relative overflow-hidden bg-soft">
      <div className="dots-bg absolute inset-y-0 right-0 w-1/2 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" />
      <svg className="absolute -right-24 top-1/2 hidden h-[460px] -translate-y-1/2 text-primary-500/10 md:block" viewBox="0 0 200 200" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round">
          <path d="M30 110 A 70 70 0 0 1 170 110" />
          <path d="M60 130 A 40 40 0 0 1 140 130" />
        </g>
        <circle cx="100" cy="150" r="12" fill="currentColor" />
      </svg>
      <div className="container-x relative py-20 lg:py-28">
        <h1 className="text-[42px] leading-tight sm:text-6xl">{title}</h1>
        <nav aria-label="Breadcrumb" className="mt-4 flex items-center gap-2 text-sm font-medium uppercase">
          <Link href="/" className="text-primary-500 hover:text-navy-900">Home</Link>
          <ChevronRight className="h-4 w-4 text-navy-900" />
          <span className="text-navy-900">{current}</span>
        </nav>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 lg:py-32">
      <div className="lines-bg absolute inset-0" />
      <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border-[40px] border-primary-500/10" />
      <div className="absolute -bottom-24 -right-10 h-96 w-96 rounded-full border-[50px] border-sky-brand/10" />
      <div className="container-x relative text-center">
        <h2 className="mx-auto max-w-3xl text-[32px] leading-tight text-white sm:text-5xl">
          Need Fast &amp; Reliable Internet? Choose SNET &amp; The Real Network
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/packages" className="btn-primary hover:bg-white hover:text-navy-900">View our packages</Link>
          <span className="font-medium uppercase text-white">or</span>
          <a href={`tel:${site.phoneIntl}`} className="btn-light">{site.phone}</a>
        </div>
      </div>
    </section>
  );
}
