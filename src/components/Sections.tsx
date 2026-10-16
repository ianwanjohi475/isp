import Link from "next/link";
import { ArrowRight, BookOpen, Music2, ShoppingBasket, Trees, Wifi, Smartphone, CreditCard, Rocket } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./PageHeader";

export const venues = [
  { icon: Trees, title: "Rural areas", text: "Bringing affordable Wi-Fi to villages and trading centres that big networks overlook." },
  { icon: ShoppingBasket, title: "Markets", text: "Helping traders take mobile payments, find suppliers and grow their business online." },
  { icon: Music2, title: "Entertainment joints", text: "Fast Wi-Fi for streaming, live matches and music where people come together." },
  { icon: BookOpen, title: "Education centres", text: "Students and teachers can research, attend online classes and learn without limits." },
];

export function Venues() {
  return (
    <section className="dot-bg bg-brand-50/50 py-24">
      <div className="container-x">
        <Reveal>
          <SectionHeading eyebrow="Where we connect" title="Wi-Fi where your community lives">
            From the market stall to the classroom, SNET hotspots keep people online right where they are.
          </SectionHeading>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {venues.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={i * 90}>
                <div className="group h-full rounded-3xl bg-white p-7 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30 transition group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { icon: Wifi, title: "Find SNET Wi-Fi", text: "Open Wi-Fi settings and join the SNET hotspot near you." },
  { icon: Smartphone, title: "Pick a package", text: "Choose from 1 hour up to a full day — from just KSh 10." },
  { icon: CreditCard, title: "Pay on your phone", text: "Pay in seconds with mobile money. No forms, no contracts." },
  { icon: Rocket, title: "You're online", text: "Browse, stream and work at full speed until your time ends." },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="container-x relative">
        <Reveal>
          <SectionHeading eyebrow="How hotspot works" title="Online in under a minute" dark>
            No installation and no paperwork. Just connect, pay and go.
          </SectionHeading>
        </Reveal>
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-brand-500/0 via-signal-400/60 to-brand-500/0 md:block" />
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="li" key={s.title} delay={i * 110} className="relative text-center">
                <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-800 text-signal-300 ring-1 ring-white/10">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-60 text-sm leading-relaxed text-slate-400">{s.text}</p>
              </Reveal>
            );
          })}
        </ol>
        <Reveal className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
          >
            See all packages <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
