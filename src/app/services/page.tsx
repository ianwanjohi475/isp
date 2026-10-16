import type { Metadata } from "next";
import { Wifi, Home, Tv } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { PlanCard } from "@/components/PlanCard";
import { TvBinding } from "@/components/TvBinding";
import { Reveal } from "@/components/Reveal";
import { HowItWorks } from "@/components/Sections";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { hotspotPlans, ksh, monthlyPlans, tvPlan } from "@/lib/site";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "SNET hotspot packages from KSh 10 per hour, monthly internet from KSh 1,500 and Smart TV binding at KSh 499 per month.",
};

const jump = [
  { href: "#hotspot", icon: Wifi, label: "Hotspot", from: `from ${ksh(hotspotPlans[0].price)}` },
  { href: "#monthly", icon: Home, label: "Monthly", from: `from ${ksh(monthlyPlans[0].price)}` },
  { href: "#tv", icon: Tv, label: "TV Binding", from: `${ksh(tvPlan.price)} / month` },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Packages & pricing" title={<>Pick your speed. <span className="text-gradient">Pay your way.</span></>}>
        Transparent prices, no contracts, no hidden charges.
      </PageHeader>

      <div className="container-x relative z-10 -mt-10">
        <div className="mx-auto grid max-w-3xl gap-3 rounded-3xl bg-white p-3 shadow-xl shadow-ink-900/10 ring-1 ring-slate-200 sm:grid-cols-3">
          {jump.map((j) => {
            const Icon = j.icon;
            return (
              <a key={j.href} href={j.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-brand-50">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-ink-900">{j.label}</span>
                  <span className="block text-xs text-slate-500">{j.from}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <section id="hotspot" className="scroll-mt-24 py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Hotspot services" title="Pay as you go Wi-Fi">
              Connect to any SNET hotspot and buy only the time you need.
            </SectionHeading>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hotspotPlans.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <PlanCard plan={p} kind="hotspot" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section id="monthly" className="scroll-mt-24 bg-slate-50 py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Monthly services" title="Home & business internet">
              A dedicated connection for your home, shop or office — billed once a month.
            </SectionHeading>
          </Reveal>
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {monthlyPlans.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <PlanCard plan={p} kind="monthly" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="tv" className="scroll-mt-24 py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="TV binding services" title="Stream on the big screen" />
          </Reveal>
          <Reveal className="mt-14">
            <TvBinding plan={tvPlan} />
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Good to know" />
          </Reveal>
          <Reveal className="mt-12">
            <Faq />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
