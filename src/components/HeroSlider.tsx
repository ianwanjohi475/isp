"use client";

import dynamic from "next/dynamic";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, PhoneCall, Wifi } from "@/components/icons";
import { site } from "@/lib/site";

/** The 3D engine is its own chunk and loads after the text is on screen. */
const SignalPortrait = dynamic(() => import("./three/SignalPortrait"), { ssr: false });

export type Slide = {
  /** full photo, used as the fallback when 3D is unavailable */
  image: StaticImageData;
  /** small texture the particles are built from */
  particles: StaticImageData;
  /** horizontal position of the subject in the photo, 0–1 */
  focus?: number;
  alt: string;
  tag: string;
  title: string;
  text: string;
  price: string;
  per: string;
  href: string;
};

const DURATION = 9000;

/** Split a title so the last two words can be highlighted. */
const words = (t: string) => t.split(" ");
const head = (t: string) => words(t).slice(0, -2).join(" ");
const tail = (t: string) => words(t).slice(-2).join(" ");

function Bracket({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute h-7 w-7 border-sky-brand/70 ${className}`} />;
}

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
      {/* deep-space backdrop */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(90%_70%_at_75%_35%,#12307a_0%,#081433_45%,#040b1f_100%)]" />
      <div className="grid-floor absolute inset-x-[-20%] bottom-0 -z-20 hidden h-[46%] lg:block" />

      {/* THE LIVING SIGNAL — particle hologram of the people in the photos */}
      <SignalPortrait
        className="absolute inset-0 -z-10"
        index={i}
        scenes={slides.map((sl) => ({ src: sl.particles.src, focus: sl.focus }))}
        fallback={
          <div className="absolute inset-0">
            <Image src={s.image} alt={s.alt} fill sizes="100vw" placeholder="blur" className="object-cover opacity-60" />
          </div>
        }
      />

      {/* legibility veils */}
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-navy-950 via-navy-950/55 to-transparent lg:block lg:w-[58%]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[62%] bg-gradient-to-t from-navy-950 via-navy-950/85 to-transparent lg:hidden" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy-950/80 to-transparent" />

      {/* HUD frame around the hologram (desktop) */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[19%] right-[4%] top-[17%] hidden w-[50%] lg:block">
        <Bracket className="left-0 top-0 border-l-2 border-t-2" />
        <Bracket className="right-0 top-0 border-r-2 border-t-2" />
        <Bracket className="bottom-0 left-0 border-b-2 border-l-2" />
        <Bracket className="bottom-0 right-0 border-b-2 border-r-2" />
        <span className="absolute right-10 top-0 flex -translate-y-1/2 items-center gap-2 rounded-full bg-navy-950/70 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-sky-brand ring-1 ring-sky-brand/40 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Live signal
        </span>
        <span key={i} className="animate-fade-up absolute bottom-0 left-10 translate-y-1/2 rounded-full bg-navy-950/70 px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white ring-1 ring-white/20 backdrop-blur">
          0{i + 1} · {s.tag}
        </span>
      </div>

      <div className="container-x flex min-h-[820px] flex-col justify-end pb-48 pt-[330px] sm:min-h-[860px] lg:min-h-[860px] lg:justify-center lg:pb-44 lg:pt-44">
        <div key={i} className="max-w-xl lg:max-w-[46%]">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white">
            <Wifi className="h-3.5 w-3.5 text-sky-brand" /> {s.tag}
          </p>
          <h1 className="animate-fade-up mt-5 text-[36px] font-extrabold leading-[1.06] text-white [animation-delay:120ms] [text-shadow:0_2px_24px_rgb(4_11_31/0.6)] sm:text-6xl xl:text-[70px]">
            {head(s.title)} <span className="bg-gradient-to-r from-sky-brand to-primary-300 bg-clip-text text-transparent">{tail(s.title)}</span>
          </h1>
          <p className="animate-fade-up mt-5 max-w-lg text-base text-slate-200 [animation-delay:240ms] sm:mt-6 sm:text-lg">{s.text}</p>
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
