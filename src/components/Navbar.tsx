"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site, whatsappLink } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-ink-950/90 shadow-lg shadow-black/20 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-18 items-center justify-between py-3">
        <Link href="/" aria-label="SNET Networks home">
          <Logo light />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-white/10 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={`tel:${site.phoneIntl}`} className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white">
            <Phone className="h-4 w-4 text-signal-400" />
            {site.phone}
          </a>
          <a
            href={whatsappLink("Hi SNET Networks 👋, I'd like to get connected.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-400"
          >
            Get connected
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-base font-medium ${
                  pathname === item.href ? "bg-white/10 text-white" : "text-slate-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappLink("Hi SNET Networks 👋, I'd like to get connected.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-xl bg-brand-500 px-4 py-3 text-center font-semibold text-white"
            >
              Get connected
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
