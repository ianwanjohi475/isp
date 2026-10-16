"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, PhoneCall } from "lucide-react";
import { site } from "@/lib/site";

export type Slide = {
  title: ReactNode;
  text: string;
  price: string;
  per: string;
  href: string;
  visual: ReactNode;
};

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);

  return (
    <section
      className="relative overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <div className="dots-bg absolute left-0 top-10 h-64 w-64 opacity-70" />
      <div className="relative grid min-h-[640px] lg:min-h-[720px]">
        {slides.map((s, idx) => {
          const active = idx === i;
          return (
            <div
              key={idx}
              aria-hidden={!active}
              className={`col-start-1 row-start-1 transition-opacity duration-700 ${active ? "z-10 opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <div className="container-x grid h-full items-center gap-10 py-14 lg:grid-cols-2 lg:py-0">
                <div key={active ? `on-${idx}` : `off-${idx}`} className={active ? "animate-fade-up" : ""}>
                  <h1 className="text-[42px] leading-[1.1] sm:text-[64px] xl:text-[72px]">{s.title}</h1>
                  <p className="mt-6 max-w-md text-lg text-navy-900">{s.text}</p>
                  <p className="mt-7 flex items-baseline gap-2">
                    <span className="text-5xl font-medium text-primary-500 sm:text-6xl">{s.price}</span>
                    <span className="text-body">/{s.per}</span>
                  </p>
                  <Link href={s.href} tabIndex={active ? 0 : -1} className="btn-primary mt-9">
                    Get started
                  </Link>
                </div>
                <div className="relative mx-auto w-full max-w-[620px]">
                  <div className="absolute -inset-4 rounded-[48%_52%_45%_55%/55%_45%_55%_45%] bg-primary-50" />
                  <div className="relative overflow-hidden rounded-[46%_54%_42%_58%/52%_44%_56%_48%] shadow-[0_30px_70px_rgba(11,27,63,0.18)]">
                    <div className="aspect-[4/3.4] [&_svg]:h-full [&_svg]:w-full [&>div]:h-full">{s.visual}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="container-x relative z-20 flex flex-col-reverse items-start justify-between gap-6 pb-12 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-navy-900 transition hover:border-primary-500 hover:bg-primary-500 hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide" className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-navy-900 transition hover:border-primary-500 hover:bg-primary-500 hover:text-white">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="ml-3 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary-500" : "w-2.5 bg-line"}`}
              />
            ))}
          </div>
        </div>
        <a
          href={`tel:${site.phoneIntl}`}
          className="flex items-center gap-4 rounded-full border border-line bg-white py-3 pl-3 pr-10 shadow-sm transition hover:border-primary-500"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white">
            <PhoneCall className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm">Customer Service:</span>
            <span className="block text-lg font-medium text-primary-500">{site.phone}</span>
          </span>
        </a>
      </div>
    </section>
  );
}
