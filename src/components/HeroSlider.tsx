"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Gauge, PhoneCall, Wifi } from "@/components/icons";
import { site } from "@/lib/site";

export type Slide = {
  image: StaticImageData;
  /** CSS object-position that keeps the subject in the portrait crop */
  focus?: string;
  alt: string;
  tag: string;
  title: string;
  text: string;
  price: string;
  per: string;
  speed: string;
  href: string;
};

const DURATION = 7000;

/** Split a title so the last two words can be highlighted. */
const words = (t: string) => t.split(" ");
const head = (t: string) => words(t).slice(0, -2).join(" ");
const tail = (t: string) => words(t).slice(-2).join(" ");

const stats = [
  { v: "15 Mbps", l: "Top speed" },
  { v: "KSh 10", l: "Starting price" },
  { v: "3", l: "Services" },
];

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement>(null);
  const raf = useRef(0);
  const n = slides.length;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, n]);

  const go = (d: number) => setI((v) => (v + d + n) % n);
  const s = slides[i];

  /* ---- manual control: drag / swipe the front card, arrow keys ---- */
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const drag = useRef({ on: false, id: -1, x0: 0, dx: 0, t0: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [hint, setHint] = useState(true);

  const paint = (dx: number) => {
    const el = cards.current[i];
    if (!el) return;
    if (dx === 0) {
      el.style.transition = "";
      el.style.transform = "";
      return;
    }
    el.style.transition = "none";
    el.style.transform = `translate3d(${dx}px, ${Math.abs(dx) * -0.06}px, 40px) rotateZ(${dx * 0.035}deg) rotateY(${dx * 0.05}deg)`;
  };
  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { on: true, id: e.pointerId, x0: e.clientX, dx: 0, t0: performance.now(), moved: false };
  };
  const onDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.on || e.pointerId !== d.id) return;
    d.dx = e.clientX - d.x0;
    if (!d.moved && Math.abs(d.dx) > 6) {
      d.moved = true;
      setDragging(true);
      setPaused(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (d.moved) paint(d.dx);
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.on || e.pointerId !== d.id) return;
    d.on = false;
    if (!d.moved) return;
    const speed = Math.abs(d.dx) / Math.max(1, performance.now() - d.t0); // px per ms
    const far = Math.abs(d.dx) > 80 || (speed > 0.45 && Math.abs(d.dx) > 24);
    paint(0); // hand the card back to the CSS deck positions, which animate it
    setDragging(false);
    setPaused(false);
    if (far) {
      setHint(false);
      go(d.dx < 0 ? 1 : -1);
    }
  };
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else return;
    e.preventDefault();
    setHint(false);
  };

  // mouse parallax: the deck leans a few degrees, chips drift at their own depth
  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = root.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    });
  };
  const onLeave = () => {
    setPaused(false);
    root.current?.style.setProperty("--px", "0");
    root.current?.style.setProperty("--py", "0");
  };

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-navy-950"
      onMouseEnter={() => setPaused(true)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-roledescription="carousel"
    >
      {/* backdrop: deep navy with slow aurora light */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#040b1f_0%,#081433_45%,#0b1f55_100%)]" />
      <div className="aurora -left-[10%] top-[8%] -z-10 h-[420px] w-[420px] bg-primary-600" />
      <div className="aurora right-[2%] top-[18%] -z-10 h-[520px] w-[520px] bg-primary-500 [animation-delay:-6s]" />
      <div className="aurora bottom-[-12%] right-[28%] -z-10 h-[360px] w-[360px] bg-sky-brand/70 [animation-delay:-11s]" />
      <svg aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-56 w-full text-white/[0.07]" viewBox="0 0 1440 220" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M0 150 C 240 60, 420 220, 720 130 S 1200 40, 1440 120" />
        <path d="M0 180 C 260 100, 460 240, 760 160 S 1220 80, 1440 150" />
        <path d="M0 120 C 220 30, 400 190, 700 100 S 1180 10, 1440 90" />
      </svg>

      <div className="container-x grid items-center gap-10 pb-48 pt-28 md:pt-40 lg:min-h-[880px] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-44 lg:pt-44">
        {/* copy */}
        <div key={i} className="order-2 lg:order-1">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white">
            <Wifi className="h-3.5 w-3.5 text-sky-brand" /> {s.tag}
          </p>
          <h1 className="animate-fade-up mt-5 text-[38px] font-extrabold leading-[1.06] text-white [animation-delay:100ms] sm:text-6xl xl:text-[68px]">
            {head(s.title)} <span className="bg-gradient-to-r from-sky-brand to-primary-300 bg-clip-text text-transparent">{tail(s.title)}</span>
          </h1>
          <p className="animate-fade-up mt-5 max-w-lg text-base text-slate-300 [animation-delay:200ms] sm:text-lg">{s.text}</p>
          <div className="animate-fade-up mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:300ms]">
            <p className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-extrabold text-white sm:text-6xl">{s.price}</span>
              <span className="text-slate-400">/{s.per}</span>
            </p>
          </div>
          <div className="animate-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:400ms] sm:gap-4">
            <Link href={s.href} className="btn-primary px-6 hover:bg-white hover:text-navy-900 sm:px-8">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/packages" className="btn-light px-6 sm:px-8">All packages</Link>
          </div>
          <dl className="animate-fade-up mt-10 hidden max-w-md grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-7 [animation-delay:500ms] sm:grid">
            {stats.map((st, k) => (
              <div key={st.l} className={k ? "pl-6" : ""}>
                <dt className="sr-only">{st.l}</dt>
                <dd className="font-display text-2xl font-extrabold text-white">{st.v}</dd>
                <dd className="mt-0.5 text-sm text-slate-400">{st.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* photo deck */}
        <div className="deck order-1 mx-auto w-full max-w-[400px] px-6 sm:max-w-[460px] lg:order-2 lg:max-w-[470px] lg:px-0">
          <div
            className={`deck-stage relative aspect-[4/4.6] touch-pan-y select-none outline-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            onPointerDown={onDown}
            onPointerMove={onDrag}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={onKey}
            tabIndex={0}
            role="group"
            aria-label="Service photos. Drag, swipe or use the arrow keys to change."
          >
            {slides.map((sl, idx) => {
              const pos = (idx - i + n) % n;
              return (
                <button
                  key={idx}
                  type="button"
                  data-pos={pos}
                  ref={(el) => {
                    cards.current[idx] = el;
                  }}
                  draggable={false}
                  onClick={() => {
                    if (drag.current.moved) return; // that was a drag, not a click
                    if (pos !== 0) {
                      setI(idx);
                      setHint(false);
                    }
                  }}
                  tabIndex={pos === 0 ? -1 : 0}
                  aria-label={pos === 0 ? sl.alt : `Show ${sl.tag}`}
                  className="deck-card cursor-[inherit] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/15"
                >
                  <Image
                    src={sl.image}
                    alt={pos === 0 ? sl.alt : ""}
                    fill
                    priority={idx === 0}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 520px, 90vw"
                    draggable={false}
                    className="pointer-events-none object-cover"
                    style={{ objectPosition: sl.focus ?? "center" }}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
                  <span className="absolute inset-x-6 bottom-6 flex items-end justify-between text-left">
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-[0.18em] text-sky-brand">{sl.tag}</span>
                      <span className="mt-1 block font-display text-2xl font-extrabold text-white">
                        {sl.price}
                        <span className="text-sm font-medium text-slate-300"> /{sl.per}</span>
                      </span>
                    </span>
                    <span className="font-display text-sm font-bold text-white/70">
                      0{idx + 1}
                      <span className="text-white/40"> / 0{n}</span>
                    </span>
                  </span>
                </button>
              );
            })}

            {/* floating glass chips at their own depth */}
            <div className="deck-float pointer-events-none absolute -left-5 top-10 z-40 sm:-left-12" style={{ "--d": -18 } as React.CSSProperties}>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-navy-900/95 px-4 py-3 shadow-2xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white">
                  <Gauge className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-sky-brand">Speed</span>
                  <span className="block font-display text-lg font-extrabold leading-tight text-white">{s.speed}</span>
                </span>
              </div>
            </div>
            <div className="deck-float pointer-events-none absolute -right-4 bottom-28 z-40 sm:-right-10" style={{ "--d": 22 } as React.CSSProperties}>
              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-2xl">
                <span className="bars flex h-7 items-end gap-[3px] text-primary-500">
                  <span className="h-2" />
                  <span className="h-3.5" />
                  <span className="h-5" />
                  <span className="h-7" />
                </span>
                <span>
                  <span className="block font-display text-sm font-extrabold leading-tight text-navy-900">Fast · Stable</span>
                  <span className="block text-xs text-body">Reliable Network</span>
                </span>
              </div>
            </div>

            {/* rotating seal */}
            <div className="deck-float pointer-events-none absolute -right-6 -top-8 z-40 hidden h-28 w-28 sm:block lg:-right-10 lg:-top-10 lg:h-32 lg:w-32" style={{ "--d": 12 } as React.CSSProperties}>
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary-500 shadow-2xl shadow-primary-900/50">
                <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow" aria-hidden="true">
                  <defs>
                    <path id="seal" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
                  </defs>
                  <text fill="#fff" fontSize="9" fontWeight="700" fontFamily="var(--font-display)">
                    <textPath href="#seal" textLength="226" lengthAdjust="spacing">FAST • STABLE • RELIABLE • NETWORK •</textPath>
                  </text>
                </svg>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary-500">
                  <Wifi className="h-6 w-6" />
                </span>
              </div>
            </div>
          </div>
          <p
            aria-hidden="true"
            className={`mt-7 flex items-center justify-center gap-2 lg:justify-start lg:pl-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition-opacity duration-500 ${hint ? "opacity-100" : "opacity-0"}`}
          >
            <ChevronLeft className="h-3.5 w-3.5 animate-pulse" /> Drag or swipe <ChevronRight className="h-3.5 w-3.5 animate-pulse" />
          </p>
        </div>
      </div>

      {/* controls + customer service */}
      <div className="absolute inset-x-0 bottom-28 sm:bottom-32">
        <div className="container-x flex items-end justify-between gap-6">
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
