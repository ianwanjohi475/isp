"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, Mail, Menu, Phone, PhoneCall, X } from "@/components/icons";
import { Logo } from "./Logo";
import { nav, site, whatsappLink } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const overlay = pathname === "/";

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 160);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const dark = overlay && !stuck && !open; // transparent header over the hero

  return (
    <div className={overlay ? "absolute inset-x-0 top-0 z-50" : "relative z-50"}>
      {/* top info bar */}
      <div className={`hidden text-[13px] md:block ${overlay ? "border-b border-white/10 text-slate-200" : "bg-navy-950 text-slate-300"}`}>
        <div className="container-x flex h-12 items-center justify-between">
          <div className="flex items-center divide-x divide-white/15">
            <a href={`tel:${site.phoneIntl}`} className="flex items-center gap-2 pr-6 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-sky-brand" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 px-6 hover:text-white">
              <Mail className="h-3.5 w-3.5 text-sky-brand" /> {site.email}
            </a>
            <span className="hidden items-center gap-2 px-6 lg:flex">
              <Clock className="h-3.5 w-3.5 text-sky-brand" /> Hotspot packages from KSh 10
            </span>
          </div>
          <p className="font-semibold text-white">
            Fast <span className="text-sky-brand">|</span> Stable <span className="text-sky-brand">|</span> Reliable Network
          </p>
        </div>
      </div>

      <header
        className={`w-full transition-colors duration-300 ${
          stuck
            ? "fixed inset-x-0 top-0 animate-fade-up bg-white/95 shadow-[0_10px_40px_-10px_rgba(11,27,63,0.18)] backdrop-blur-md [animation-duration:0.5s]"
            : dark
              ? "bg-transparent"
              : "bg-white"
        }`}
      >
        <div className="container-x flex h-[84px] items-center justify-between gap-6">
          <Link href="/" aria-label="SNET Networks home" className="shrink-0">
            <Logo light={dark} className="h-11 w-auto sm:h-[52px]" />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative px-4 py-2 font-display text-[15px] font-semibold uppercase tracking-wide transition ${
                    dark ? (active ? "text-white" : "text-white/80 hover:text-white") : active ? "text-primary-500" : "text-navy-900 hover:text-primary-500"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-sky-brand transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 xl:flex">
            <a href={`tel:${site.phoneIntl}`} className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-500 text-white">
                <PhoneCall className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className={`block text-xs ${dark ? "text-slate-300" : "text-body"}`}>Call anytime</span>
                <span className={`block font-display font-bold ${dark ? "text-white" : "text-navy-900"}`}>{site.phone}</span>
              </span>
            </a>
          </div>
          <a
            href={whatsappLink("Hi SNET Networks 👋, I'd like to get connected.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden px-7 py-3.5 lg:inline-flex xl:hidden 2xl:inline-flex"
          >
            Get connected <ArrowRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`rounded-lg p-2 lg:hidden ${dark ? "text-white" : "text-navy-900"}`}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {open && (
          <nav className="max-h-[calc(100vh-84px)] overflow-y-auto border-t border-line bg-white lg:hidden" aria-label="Mobile">
            <div className="container-x flex flex-col py-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b border-line py-3.5 font-display text-sm font-semibold uppercase ${
                    isActive(item.href) ? "text-primary-500" : "text-navy-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a href={`tel:${site.phoneIntl}`} className="btn-primary mt-5">
                <Phone className="h-4 w-4" /> Call {site.phone}
              </a>
            </div>
          </nav>
        )}
      </header>
      {stuck && !overlay && <div className="h-[84px]" aria-hidden="true" />}
    </div>
  );
}
