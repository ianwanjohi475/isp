import Link from "next/link";
import { Mail, MessageCircle, Phone, PhoneCall } from "lucide-react";
import { Logo } from "./Logo";
import { FooterSignup } from "./FooterSignup";
import { hotspotPlans, ksh, monthlyPlans, nav, site, tvPlan, whatsappLink } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  const social = [
    { href: whatsappLink("Hi SNET Networks 👋"), label: "WhatsApp", icon: MessageCircle, ext: true },
    { href: `mailto:${site.email}`, label: "Email", icon: Mail },
    { href: `tel:${site.phoneIntl}`, label: "Phone", icon: Phone },
  ];
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-slate-400">
      <div className="lines-bg absolute inset-0" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-500/15 blur-3xl" />
      <div className="container-x relative pt-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-primary-600 to-primary-500 p-8 shadow-2xl shadow-primary-900/40 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <h3 className="text-2xl text-white sm:text-3xl">Ready to get connected?</h3>
            <p className="mt-1 text-white/80">Leave your name and number — we&apos;ll chat on WhatsApp.</p>
          </div>
          <FooterSignup />
        </div>
      </div>
      <div className="container-x relative grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo light className="h-14 w-auto" />
          <p className="mt-6 max-w-sm">
            Bringing affordable and reliable Wi-Fi closer to people in rural areas, markets, entertainment joints and education centres.
          </p>
          <div className="mt-7 flex gap-3">
            {social.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.ext ? "_blank" : undefined}
                  rel={s.ext ? "noopener noreferrer" : undefined}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-primary-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="text-lg uppercase text-white">Our services</h4>
          <ul className="mt-6 space-y-3">
            <li><Link href="/services#hotspot" className="transition hover:pl-1 hover:text-white">Hotspot Services</Link></li>
            <li><Link href="/services#monthly" className="transition hover:pl-1 hover:text-white">Monthly Services</Link></li>
            <li><Link href="/services#tv" className="transition hover:pl-1 hover:text-white">TV Binding Services</Link></li>
            <li><Link href="/packages" className="transition hover:pl-1 hover:text-white">All Packages</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg uppercase text-white">Company</h4>
          <ul className="mt-6 space-y-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition hover:pl-1 hover:text-white">{n.label === "About" ? "About Us" : n.label}</Link>
              </li>
            ))}
            <li><Link href="/about#mission" className="transition hover:pl-1 hover:text-white">Mission &amp; Vision</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg uppercase text-white">Get in touch</h4>
          <a href={`tel:${site.phoneIntl}`} className="mt-6 flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-primary-500">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white">
              <PhoneCall className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm">Call us</span>
              <span className="block text-lg font-semibold text-white">{site.phone}</span>
            </span>
          </a>
          <a href={`mailto:${site.email}`} className="mt-4 block break-all text-sm hover:text-white">{site.email}</a>
          <ul className="mt-5 space-y-1.5 text-sm">
            <li>Hotspot from <span className="font-semibold text-white">{ksh(hotspotPlans[0].price)}</span></li>
            <li>Monthly from <span className="font-semibold text-white">{ksh(monthlyPlans[0].price)}</span></li>
            <li>TV Binding <span className="font-semibold text-sky-brand">{ksh(tvPlan.price)} / month</span></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-sm sm:flex-row">
          <p>© {year} SNET Networks. All rights reserved.</p>
          <p className="text-white">{site.mantra}</p>
        </div>
      </div>
    </footer>
  );
}
