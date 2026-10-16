"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Clock, Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site, whatsappLink } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* top info bar */}
      <div className="hidden bg-navy-950 text-[13px] text-slate-300 md:block">
        <div className="container-x flex h-12 items-center justify-between">
          <div className="flex items-center divide-x divide-white/10">
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
          <p className="font-medium text-white">
            Fast <span className="text-sky-brand">|</span> Stable <span className="text-sky-brand">|</span> Reliable Network
          </p>
        </div>
      </div>

      <header
        className={`z-50 w-full bg-white transition-shadow duration-300 ${
          stuck ? "fixed inset-x-0 top-0 animate-fade-up shadow-[0_10px_30px_rgba(11,27,63,0.08)] [animation-duration:0.5s]" : "relative"
        }`}
      >
        <div className="container-x flex h-[84px] items-center justify-between">
          <Link href="/" aria-label="SNET Networks home">
            <Logo className="h-11 w-auto sm:h-12" />
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-[15px] font-medium uppercase transition hover:text-primary-500 ${
                  isActive(item.href) ? "text-primary-500" : "text-navy-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={whatsappLink("Hi SNET Networks 👋, I'd like to get connected.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline px-7 py-3"
            >
              Get connected
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-navy-900 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-line bg-white lg:hidden" aria-label="Mobile">
            <div className="container-x flex flex-col py-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b border-line py-3.5 text-sm font-medium uppercase ${
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
      {stuck && <div className="h-[84px]" aria-hidden="true" />}
    </>
  );
}
