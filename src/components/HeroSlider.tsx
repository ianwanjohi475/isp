"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, House, PhoneCall, Tv, Wifi } from "@/components/icons";
import { site } from "@/lib/site";

export type Slide = {
  image: StaticImageData;
  alt: string;
  tag: string;
  title: string;
  text: string;
  price: string;
  per: string;
  href: string;
  position?: string;
  /** focal point used on phones, where the photo is cropped much more */
  mobilePosition?: string;
};

const DURATION = 7000;

const widget = [
  { icon: Wifi, name: "Hotspot · 1 Hour to 24 Hours", price: "From KSh 10", href: "/packages#hotspot" },
  { icon: House, name: "Monthly · 8 to 15 Mbps", price: "From KSh 1,500", href: "/packages#monthly" },
  { icon: Tv, name: "TV Binding · 8 Mbps", price: "KSh 499 / month", href: "/packages#tv" },
];

/** Split a title so the last two words can be highlighted. */
const words = (t: string) => t.split(" ");
const head = (t: string) => words(t).slice(0, -2).join(" ");
const tail = (t: string) => words(t).slice(-2).join(" ");

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % slides.length), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, slides.length]);

  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);
  const s = slides[i];

  return (
    <section
      className="relative isolate overflow-hidden bg-navy-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* background photos */}
      {slides.map((sl, idx) => (
        <div
          key={idx}
          aria-hidden={idx !== i}
          className={`absolute inset-0 -z-10 transition-opacity duration-[1200ms] ${idx === i ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            key={idx === i ? `on-${i}` : `off-${idx}`}
            src={sl.image}
            alt={sl.alt}
            fill
            priority={idx === 0}
            placeholder="blur"
            sizes="100vw"
            className={`object-cover object-[var(--pos-m)] sm:object-[var(--pos)] ${idx === i ? "sm:animate-kenburns" : ""}`}
            style={{ "--pos": sl.position ?? "center", "--pos-m": sl.mobilePosition ?? sl.position ?? "center" } as CSSProperties}
          />
        </div>
      ))}
      {/* phones: lighter, bottom-weighted overlay so the photo stays visible */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/55 via-navy-950/35 to-navy-950/90 sm:hidden" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-950/30 sm:block" />
      <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-navy-950/80 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

      <div className="container-x grid min-h-[600px] items-center gap-12 pb-48 pt-32 sm:min-h-[800px] sm:pb-44 sm:pt-44 lg:min-h-[860px] lg:grid-cols-[1.35fr_1fr]">
        <div key={i} className="max-w-2xl">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white">
            <Wifi className="h-3.5 w-3.5 text-sky-brand" /> {s.tag}
          </p>
          <h1 className="animate-fade-up mt-5 text-[36px] font-extrabold [text-shadow:0_2px_24px_rgb(4_11_31/0.5)] leading-[1.06] text-white [animation-delay:120ms] sm:text-6xl xl:text-[74px]">
            {head(s.title)} <span className="bg-gradient-to-r from-sky-brand to-primary-300 bg-clip-text text-transparent">{tail(s.title)}</span>
          </h1>
          <p className="animate-fade-up mt-5 max-w-lg text-base text-slate-100 [animation-delay:240ms] [text-shadow:0_1px_12px_rgb(4_11_31/0.6)] sm:mt-6 sm:text-lg">{s.text}</p>
          <p className="animate-fade-up mt-7 flex items-baseline gap-2 [animation-delay:360ms]">
            <span className="font-display text-5xl font-extrabold text-white sm:text-6xl">{s.price}</span>
            <span className="text-slate-300">/{s.per}</span>
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:480ms] sm:mt-9 sm:gap-4">
            <Link href={s.href} className="btn-primary px-6 hover:bg-white hover:text-navy-900 sm:px-8">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/packages" className="btn-light px-6 sm:px-8">All packages</Link>
          </div>
        </div>

        {/* glass price widget */}
        <div className="relative hidden justify-self-end lg:block">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 animate-wave rounded-full border-2 border-sky-brand/40" />
            <span className="absolute inset-0 animate-wave rounded-full border-2 border-sky-brand/30 [animation-delay:0.8s]" />
            <span className="absolute inset-0 animate-wave rounded-full border-2 border-sky-brand/20 [animation-delay:1.6s]" />
          </div>
          <div className="glass w-[360px] animate-float rounded-3xl p-7 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-bold text-white">Our Packages</p>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
              </span>
            </div>
            <ul className="mt-5 space-y-3">
              {widget.map((w) => {
                const Icon = w.icon;
                return (
                  <li key={w.name}>
                    <Link href={w.href} className="group flex items-center gap-4 rounded-2xl bg-white/5 p-3.5 ring-1 ring-white/10 transition hover:bg-white/15">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500 text-white transition group-hover:bg-sky-brand">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm text-slate-300">{w.name}</span>
                        <span className="block font-display font-bold text-white">{w.price}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-white/60 transition group-hover:translate-x-1 group-hover:text-white" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* controls + customer service */}
      <div className="absolute inset-x-0 bottom-28 sm:bottom-32">
        <div className="container-x flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="glass flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:bg-primary-500">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next slide" className="glass flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:bg-primary-500">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="ml-2 flex items-center gap-3">
              {slides.map((_, idx) => (
                <button key={idx} type="button" onClick={() => setI(idx)} aria-label={`Go to slide ${idx + 1}`} className="group flex items-center gap-2">
                  <span className={`text-xs font-semibold ${idx === i ? "text-white" : "text-white/50"}`}>0{idx + 1}</span>
                  <span className="relative h-[3px] w-10 overflow-hidden rounded-full bg-white/25 sm:w-14">
                    {idx === i && (
                      <span
                        key={`p-${i}-${paused}`}
                        className="absolute inset-0 origin-left animate-progress bg-sky-brand"
                        style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? "paused" : "running" }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <a href={`tel:${site.phoneIntl}`} className="glass hidden items-center gap-4 rounded-full py-2.5 pl-2.5 pr-8 transition hover:bg-white/20 lg:flex">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-primary-500" />
              <PhoneCall className="relative h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm text-slate-300">Customer Service:</span>
              <span className="block text-lg font-semibold text-white">{site.phone}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
