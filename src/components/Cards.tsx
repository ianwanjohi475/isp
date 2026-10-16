import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CheckSquare } from "lucide-react";
import { ksh, planMessage, whatsappLink, type Plan } from "@/lib/site";

/** Template-style plan card: photo header, title overlay and a speed tag in the corner. */
export function PhotoPlanCard({
  image,
  title,
  speed,
  features,
  price,
  per,
  href,
}: {
  image: StaticImageData;
  title: ReactNode;
  speed: string;
  features: string[];
  price: number;
  per: string;
  href: string;
}) {
  return (
    <article className="card-fx group h-full overflow-hidden rounded-2xl border border-line bg-white">
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image src={image} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="zoom object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" />
        <h3 className="absolute bottom-5 left-7 max-w-[55%] text-2xl font-semibold leading-tight text-white">{title}</h3>
        <div className="absolute bottom-0 right-0 flex min-w-[118px] flex-col items-center justify-center rounded-tl-2xl bg-primary-500 px-5 py-4 text-white transition group-hover:bg-sky-brand">
          <span className="text-xl font-semibold">{speed}</span>
          <span className="text-xs font-semibold uppercase">Mbps</span>
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
        <div className="mt-7 flex items-end justify-between gap-4 border-t border-line pt-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-body">Start from</p>
            <p className="flex items-baseline gap-1.5">
              <span className="text-[32px] font-semibold text-primary-500">{ksh(price)}</span>
              <span className="text-sm font-medium uppercase text-navy-900">/{per}</span>
            </p>
          </div>
          <Link
            href={href}
            aria-label="View plans"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-500 transition group-hover:bg-primary-500 group-hover:text-white"
          >
            <ArrowRight className="h-5 w-5 transition group-hover:-rotate-45" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Template "bundle" box used for hotspot packages. */
export function BundleCard({ plan, featured = false }: { plan: Plan; featured?: boolean }) {
  return (
    <article
      className={`card-fx top-line group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white px-8 py-10 text-center ${
        featured ? "border-primary-500 shadow-[0_20px_50px_rgba(31,98,236,0.15)]" : "border-line"
      }`}
    >
      <h3 className="text-2xl">{plan.name}</h3>
      <p className="mt-1 text-sm font-medium uppercase tracking-wide text-primary-500">Hotspot package</p>
      <div className="mx-auto my-7 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-br from-primary-50 to-white ring-8 ring-primary-50/60 transition duration-500 group-hover:scale-110">
        <span className="text-3xl font-semibold text-navy-900">{plan.speed}</span>
        <span className="text-xs font-semibold uppercase text-primary-500">Mbps</span>
      </div>
      <ul className="space-y-2.5 text-navy-900">
        <li>Speed: {plan.speed} Mbps</li>
        <li>Duration: {plan.period}</li>
      </ul>
      <p className="mt-7 text-[34px] font-medium text-navy-900">{ksh(plan.price)}</p>
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
    <article className={`${tones[index % 3]} card-fx group relative h-full overflow-hidden rounded-2xl p-9 text-white`}>
      <svg className="absolute -right-10 -top-10 h-48 w-48 text-white/10 transition duration-700 group-hover:rotate-12" viewBox="0 0 100 100" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
          <path d="M15 55 A 35 35 0 0 1 85 55" />
          <path d="M30 65 A 20 20 0 0 1 70 65" />
        </g>
        <circle cx="50" cy="78" r="6" fill="currentColor" />
      </svg>
      <h3 className="text-[28px] text-white">{plan.name}</h3>
      <p className="mt-1 text-white/85">Monthly Service</p>
      <div className="mt-8 flex items-start gap-2">
        <span className="mt-2 text-sm font-medium">KSh</span>
        <span className="text-[52px] font-medium leading-none sm:text-[64px] md:text-[48px] lg:text-[60px] xl:text-[64px]">{plan.price.toLocaleString("en-KE")}</span>
        <span className="mt-2 text-sm font-medium uppercase leading-tight">
          Per
          <br />
          month
        </span>
      </div>
      <ul className="mt-7 space-y-2 text-[15px] text-white/90">
        <li className="flex items-center gap-2.5"><CheckSquare className="h-4 w-4 shrink-0" /> Speed: {plan.speed} Mbps</li>
        <li className="flex items-center gap-2.5"><CheckSquare className="h-4 w-4 shrink-0" /> Price: {ksh(plan.price)} per month</li>
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
