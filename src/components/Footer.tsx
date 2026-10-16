import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-slate-400">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-5 max-w-md text-sm leading-relaxed">
            Affordable, reliable Wi-Fi for rural areas, markets, entertainment joints and education centres —
            bringing the world closer to our communities.
          </p>
          <p className="mt-5 font-display text-sm font-semibold tracking-wide text-signal-300">{site.mantra}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Talk to us</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`tel:${site.phoneIntl}`} className="flex items-center gap-3 hover:text-white">
                <Phone className="h-4 w-4 text-signal-400" /> {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-signal-400" /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-signal-400" /> Hotspots across our coverage areas
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs sm:flex-row">
          <p>© {year} SNET Networks. All rights reserved.</p>
          <p>Fast · Stable · Reliable Network</p>
        </div>
      </div>
    </footer>
  );
}
