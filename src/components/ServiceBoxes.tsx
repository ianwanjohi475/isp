import Link from "next/link";
import { ArrowRight, House, Tv, Wifi } from "lucide-react";
import { Reveal } from "./Reveal";

export const services = [
  { icon: Wifi, title: "Hotspot Services", href: "/services#hotspot", text: "1 Hour at 6 Mbps for KSh 10, 3 Hours for KSh 20, 12 Hours for KSh 35 and 24 Hours at 10 Mbps for KSh 50." },
  { icon: House, title: "Monthly Services", href: "/services#monthly", text: "8 Mbps for KSh 1,500, 10 Mbps for KSh 2,000 and 15 Mbps for KSh 2,500 per month." },
  { icon: Tv, title: "TV Binding Services", href: "/services#tv", text: "TV Binding at 8 Mbps for KSh 499 per month." },
];

export function ServiceBoxes({ dark = false }: { dark?: boolean }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <Reveal key={s.title} delay={i * 100}>
            <div
              className={`group relative h-full overflow-hidden rounded-md p-9 transition duration-300 hover:-translate-y-1.5 ${
                dark ? "bg-navy-800 text-center hover:bg-primary-500" : "border border-line bg-white hover:border-primary-500 hover:shadow-[0_20px_50px_rgba(11,27,63,0.1)]"
              }`}
            >
              <span
                className={`flex h-[72px] w-[72px] items-center justify-center rounded-full transition duration-300 ${
                  dark ? "mx-auto bg-white/10 text-sky-brand group-hover:bg-white group-hover:text-primary-500" : "bg-primary-50 text-primary-500 group-hover:bg-primary-500 group-hover:text-white"
                }`}
              >
                <Icon className="h-8 w-8" strokeWidth={1.6} />
              </span>
              <h3 className={`mt-7 text-[22px] ${dark ? "text-white" : ""}`}>{s.title}</h3>
              <p className={`mt-3 ${dark ? "text-slate-300 group-hover:text-white/90" : ""}`}>{s.text}</p>
              <Link
                href={s.href}
                className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide ${
                  dark ? "text-sky-brand group-hover:text-white" : "text-primary-500"
                }`}
              >
                Read more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
