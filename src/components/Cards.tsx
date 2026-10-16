import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CheckSquare } from "lucide-react";
import { ksh, planMessage, whatsappLink, type Plan } from "@/lib/site";

/** Template-style plan card: picture header, title overlay and a speed tag in the corner. */
export function PhotoPlanCard({
  visual,
  title,
  speed,
  features,
  price,
  per,
  href,
}: {
  visual: ReactNode;
  title: ReactNode;
  speed: string;
  features: string[];
  price: number;
  per: string;
  href: string;
}) {
  return (
    <article className="group overflow-hidden rounded-md border border-line bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(11,27,63,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="h-full w-full transition duration-700 group-hover:scale-105">{visual}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
        <h3 className="absolute bottom-5 left-7 max-w-[55%] text-2xl leading-tight text-white">{title}</h3>
        <div className="absolute bottom-0 right-0 flex min-w-[124px] flex-col items-center justify-center bg-primary-500 px-5 py-4 text-white">
          <span className="text-xl font-medium">{speed}</span>
          <span className="text-xs font-medium uppercase">Mbps</span>
        </div>
      </div>
      <div className="px-7 pb-8 pt-7">
        <ul className="space-y-2.5 text-[15px] text-navy-900">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <CheckSquare className="h-4 w-4 shrink-0 text-primary-500" /> {f}
            </li>
          ))}
        </ul>
        <p className="mt-7 text-sm font-medium uppercase text-navy-900">Start from</p>
        <p className="flex items-baseline gap-1.5">
          <span className="text-[36px] font-medium text-primary-500">{ksh(price)}</span>
          <span className="text-sm font-medium uppercase text-navy-900">/{per}</span>
        </p>
        <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-body transition hover:text-primary-500">
          View plans <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

/** Template "bundle" box used for hotspot packages. */
export function BundleCard({ plan }: { plan: Plan }) {
  const featured = Boolean(plan.badge);
  return (
    <article
      className={`relative flex flex-col rounded-md border bg-white px-8 py-10 text-center transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(11,27,63,0.12)] ${
        featured ? "border-primary-500 shadow-[0_20px_50px_rgba(31,98,236,0.15)]" : "border-line"
      }`}
    >
      {plan.badge && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {plan.badge}
        </span>
      )}
      <h3 className="text-2xl">{plan.period}</h3>
      <p className="mt-1 text-sm font-medium uppercase tracking-wide text-primary-500">{plan.speed} Mbps speed</p>
      <div className="mx-auto my-7 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-primary-50 ring-8 ring-primary-50/50">
        <span className="text-3xl font-semibold text-navy-900">{plan.speed}</span>
        <span className="text-xs font-semibold uppercase text-primary-500">Mbps</span>
      </div>
      <ul className="space-y-2.5 text-navy-900">
        <li>{plan.name} package</li>
        <li>Valid for {plan.period.toLowerCase()}</li>
        <li>1 device</li>
        <li>No contracts</li>
      </ul>
      <p className="mt-7 flex items-baseline justify-center gap-1.5">
        <span className="text-sm">From</span>
        <span className="text-[34px] font-medium text-navy-900">{ksh(plan.price)}</span>
      </p>
      <a
        href={whatsappLink(planMessage(plan, "hotspot"))}
        target="_blank"
        rel="noopener noreferrer"
        className={`${featured ? "btn-primary" : "btn-outline"} mx-auto mt-6 px-7 py-3`}
      >
        Get started
      </a>
    </article>
  );
}

const tones = ["bg-primary-500", "bg-navy-800", "bg-sky-brand"];

/** Template index-2 style coloured price box, used for monthly plans. */
export function ColorPlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <article className={`${tones[index % 3]} group relative overflow-hidden rounded-md p-9 text-white`}>
      <svg className="absolute -right-10 -top-10 h-48 w-48 text-white/10 transition duration-700 group-hover:rotate-12" viewBox="0 0 100 100" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
          <path d="M15 55 A 35 35 0 0 1 85 55" />
          <path d="M30 65 A 20 20 0 0 1 70 65" />
        </g>
        <circle cx="50" cy="78" r="6" fill="currentColor" />
      </svg>
      {plan.badge && (
        <span className="absolute right-6 top-6 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-900">
          {plan.badge}
        </span>
      )}
      <h3 className="text-[28px] text-white">{plan.name}</h3>
      <p className="mt-1 text-white/85">{plan.blurb}</p>
      <div className="mt-8 flex items-start gap-2">
        <span className="mt-2 text-sm font-medium">KSh</span>
        <span className="text-[64px] font-medium leading-none">{plan.price.toLocaleString("en-KE")}</span>
        <span className="mt-2 text-sm font-medium uppercase leading-tight">
          {plan.speed} Mbps
          <br />/month
        </span>
      </div>
      <ul className="mt-7 space-y-2 text-[15px] text-white/90">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5">
            <CheckSquare className="h-4 w-4 shrink-0" /> {f}
          </li>
        ))}
      </ul>
      <a
        href={whatsappLink(planMessage(plan, "monthly"))}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-900 hover:text-white"
      >
        Get connected
      </a>
    </article>
  );
}
