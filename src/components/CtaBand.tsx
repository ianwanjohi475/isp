import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="container-x py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-700 to-ink-900 px-6 py-14 text-center sm:px-14">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-[28px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full border-[28px] border-signal-400/10" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">Ready to get online with SNET?</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-200">
            Grab a hotspot package in seconds or let us connect your home, business or Smart TV this week.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 transition hover:bg-signal-300 hover:text-ink-900"
            >
              View packages <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${site.phoneIntl}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
