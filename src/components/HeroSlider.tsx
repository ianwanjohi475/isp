"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, PhoneCall, Wifi } from "lucide-react";
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
};

const DURATION = 7000;

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
            className={`object-cover ${idx === i ? "animate-kenburns" : ""}`}
            style={{ objectPosition: sl.position ?? "center" }}
          />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/75 to-navy-950/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

      <div className="container-x flex min-h-[640px] flex-col justify-center pb-52 pt-14 sm:pb-40 sm:pt-16 sm:min-h-[700px] lg:min-h-[760px]">
        <div key={i} className="max-w-2xl">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            <Wifi className="h-3.5 w-3.5 text-sky-brand" /> {s.tag}
          </p>
          <h1 className="animate-fade-up mt-6 text-[40px] font-semibold leading-[1.08] text-white [animation-delay:120ms] sm:text-6xl xl:text-[76px]">
            {s.title}
          </h1>
          <p className="animate-fade-up mt-6 max-w-lg text-lg text-slate-200 [animation-delay:240ms]">{s.text}</p>
          <p className="animate-fade-up mt-7 flex items-baseline gap-2 [animation-delay:360ms]">
            <span className="text-5xl font-semibold text-sky-brand sm:text-6xl">{s.price}</span>
            <span className="text-slate-300">/{s.per}</span>
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap gap-4 [animation-delay:480ms]">
            <Link href={s.href} className="btn-primary hover:bg-white hover:text-navy-900">Get started</Link>
            <Link href="/packages" className="btn-light">All packages</Link>
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
          <a href={`tel:${site.phoneIntl}`} className="glass hidden items-center gap-4 rounded-full py-2.5 pl-2.5 pr-8 transition hover:bg-white/20 sm:flex">
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
