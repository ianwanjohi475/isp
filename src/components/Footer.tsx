import Link from "next/link";
import { Mail, MessageCircle, Phone, PhoneCall } from "lucide-react";
import { Logo } from "./Logo";
import { hotspotPlans, ksh, monthlyPlans, nav, site, tvPlan, whatsappLink } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-soft">
      <div className="container-x grid lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
        <div className="border-line py-16 lg:border-r lg:pr-12">
          <Logo />
          <div className="mt-8 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white">
              <PhoneCall className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm">Call us</p>
              <a href={`tel:${site.phoneIntl}`} className="text-xl font-semibold text-navy-900 hover:text-primary-500">
                {site.phone}
              </a>
            </div>
          </div>
          <h4 className="mt-8 text-lg">Contact info</h4>
          <a href={`mailto:${site.email}`} className="mt-1 block break-all hover:text-primary-500">
            {site.email}
          </a>
          <div className="mt-6 flex gap-3">
            <a
              href={whatsappLink("Hi SNET Networks 👋")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow-sm transition hover:bg-primary-500 hover:text-white"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow-sm transition hover:bg-primary-500 hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={`tel:${site.phoneIntl}`}
              aria-label="Phone"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy-900 shadow-sm transition hover:bg-primary-500 hover:text-white"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="border-line py-16 lg:border-r lg:px-12">
          <h4 className="text-lg uppercase">Our services</h4>
          <ul className="mt-6 space-y-3">
            <li><Link href="/services#hotspot" className="hover:text-primary-500">Hotspot Services</Link></li>
            <li><Link href="/services#monthly" className="hover:text-primary-500">Monthly Services</Link></li>
            <li><Link href="/services#tv" className="hover:text-primary-500">TV Binding Services</Link></li>
            <li><Link href="/contact" className="hover:text-primary-500">Contact Us</Link></li>
          </ul>
        </div>

        <div className="border-line py-16 lg:border-r lg:px-12">
          <h4 className="text-lg uppercase">About company</h4>
          <ul className="mt-6 space-y-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-primary-500">{n.label === "Home" ? "Home" : n.label === "About" ? "About Company" : n.label}</Link>
              </li>
            ))}
            <li><Link href="/about#mission" className="hover:text-primary-500">Mission & Vision</Link></li>
          </ul>
        </div>

        <div className="py-16 lg:pl-12">
          <h4 className="text-lg uppercase">Price list</h4>
          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <span className="block">Hotspot</span>
              <span className="font-medium text-navy-900">From {ksh(hotspotPlans[0].price)} / hour</span>
            </li>
            <li>
              <span className="block">Monthly internet</span>
              <span className="font-medium text-navy-900">From {ksh(monthlyPlans[0].price)} / month</span>
            </li>
            <li>
              <span className="block">TV Binding</span>
              <span className="font-medium text-primary-500">{ksh(tvPlan.price)} / month</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-navy-900 text-sm text-slate-300">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p>© {year} SNET Networks. All rights reserved.</p>
          <p>{site.mantra}</p>
        </div>
      </div>
    </footer>
  );
}
