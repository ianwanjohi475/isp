import type { Metadata } from "next";
import { BundleCard, ColorPlanCard } from "@/components/Cards";
import { Breadcrumb, CtaBand, SectionTitle } from "@/components/Ui";
import { TvScene } from "@/components/Scenes";
import { Visual } from "@/components/Visual";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { hotspotPlans, ksh, monthlyPlans, planMessage, tvPlan, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description: "SNET hotspot from KSh 10 per hour, monthly internet from KSh 1,500 and TV Binding at KSh 499 per month.",
};

export default function PackagesPage() {
  return (
    <>
      <Breadcrumb title="Packages" current="Packages" />

      <section id="hotspot" className="section-space scroll-mt-24">
        <div className="container-x">
          <Reveal>
            <SectionTitle sub="Hotspot services" title="Let's Discover Our Hotspot Packages" center>
              <p>Choose a hotspot package from 1 Hour to 24 Hours.</p>
            </SectionTitle>
          </Reveal>
          <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {hotspotPlans.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <BundleCard plan={p} featured={p.id === "hs-24h"} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="monthly" className="section-space scroll-mt-24 bg-soft">
        <div className="container-x">
          <Reveal>
            <SectionTitle sub="Monthly services" title="Monthly Packages" center>
              <p>8 Mbps, 10 Mbps and 15 Mbps — paid per month.</p>
            </SectionTitle>
          </Reveal>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {monthlyPlans.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <ColorPlanCard plan={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TV offer band */}
      <section id="tv" className="relative scroll-mt-24 overflow-hidden bg-navy-900">
        <div className="lines-bg absolute inset-0" />
        <div className="container-x relative grid items-center gap-12 py-20 lg:grid-cols-[1fr_auto_1fr] lg:py-24">
          <Reveal>
            <span className="sub-title text-sky-brand">TV binding services</span>
            <h2 className="text-[32px] leading-tight text-white sm:text-[44px]">TV Binding</h2>
            <p className="mt-4 text-xl text-sky-brand">8 Mbps · KSh 499 per month</p>
            <ul className="mt-6 space-y-2 text-slate-300">
              <li>— Speed: {tvPlan.speed} Mbps</li>
              <li>— Price: {ksh(tvPlan.price)} per month</li>
            </ul>
            <a href={whatsappLink(planMessage(tvPlan, "TV"))} target="_blank" rel="noopener noreferrer" className="btn-primary mt-9 hover:bg-white hover:text-navy-900">
              Bind my TV
            </a>
          </Reveal>
          <Reveal delay={100} className="mx-auto">
            <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full bg-primary-500 text-white ring-[14px] ring-primary-500/25">
              <span className="text-sm font-medium uppercase">Only</span>
              <span className="text-4xl font-semibold">{ksh(tvPlan.price)}</span>
              <span className="text-sm font-medium uppercase">Per month</span>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <Visual slot="tv" alt="Smart TV" className="aspect-[4/3] rounded-md shadow-2xl">
              <TvScene />
            </Visual>
          </Reveal>
        </div>
      </section>

      <section className="section-space">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <SectionTitle sub="Good to know" title="Package Questions">
              <p>Still unsure? Call us on 0748 349372.</p>
            </SectionTitle>
          </Reveal>
          <Reveal delay={120}>
            <Faq />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
