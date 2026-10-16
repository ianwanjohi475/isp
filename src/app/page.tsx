import Link from "next/link";
import { ArrowRight, Gauge, ShieldCheck, Wallet, Headphones, Target, Eye, MapPin } from "lucide-react";
import { HeroArt, CommunityArt } from "@/components/Illustrations";
import { PlansTabs } from "@/components/PlansTabs";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/PageHeader";
import { HowItWorks, Venues } from "@/components/Sections";
import { MapEmbed } from "@/components/MapEmbed";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { site, whatsappLink } from "@/lib/site";

const highlights = [
  { icon: Wallet, title: "From KSh 10", text: "Hotspot access that fits any pocket" },
  { icon: Gauge, title: "Up to 15 Mbps", text: "Smooth browsing, calls & streaming" },
  { icon: ShieldCheck, title: "Stable network", text: "Built for consistent, all-day uptime" },
  { icon: Headphones, title: "Local support", text: "Real people, one call or text away" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-950 pt-28 lg:pt-32">
        <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-brand-600/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-signal-500/15 blur-3xl" />

        <div className="container-x relative grid items-center gap-12 pb-20 lg:grid-cols-2 lg:pb-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Hotspots live in your community
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Internet that keeps your <span className="text-gradient">community connected.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              SNET Networks brings <strong className="font-semibold text-white">fast, stable and reliable</strong> Wi-Fi to
              rural areas, markets, entertainment joints and education centres — starting at just KSh 10.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-500/30 transition hover:bg-brand-400"
              >
                View packages <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink("Hi SNET Networks 👋, is there an SNET hotspot near me?")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <MapPin className="h-4 w-4 text-signal-300" /> Find a hotspot near me
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                ["KSh 10", "Hotspot / hour"],
                ["15 Mbps", "Top speed"],
                ["KSh 499", "Smart TV / month"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-2xl font-bold text-white sm:text-3xl">{v}</dd>
                  <dd className="mt-1 text-xs text-slate-400">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <HeroArt className="w-full" />
            <div className="absolute left-0 top-[46%] hidden animate-float rounded-2xl bg-white/95 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur sm:block">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">Full Day</p>
              <p className="font-display text-lg font-bold text-ink-900">
                KSh 50 <span className="text-sm font-medium text-brand-600">· 10 Mbps</span>
              </p>
            </div>
            <div
              className="absolute bottom-6 right-0 hidden animate-float rounded-2xl bg-ink-800/90 px-4 py-3 shadow-2xl ring-1 ring-white/10 backdrop-blur sm:block"
              style={{ animationDelay: "1.5s" }}
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Connected
              </p>
              <p className="mt-0.5 text-xs text-slate-400">Fast · Stable · Reliable</p>
            </div>
          </div>
        </div>

        {/* highlight strip */}
        <div className="relative border-t border-white/10 bg-ink-900/60 backdrop-blur">
          <div className="container-x grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
            {highlights.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.title} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-signal-300 ring-1 ring-brand-400/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{h.title}</p>
                    <p className="text-xs text-slate-400">{h.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-24" id="packages">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Our packages" title="Simple pricing. Serious speed.">
              Pay-as-you-go hotspot access, dedicated monthly connections and Smart TV binding — choose what fits you.
            </SectionHeading>
          </Reveal>
          <div className="mt-12">
            <PlansTabs />
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* ABOUT TEASER */}
      <section className="py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <CommunityArt className="w-full drop-shadow-2xl" />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading eyebrow="About SNET" title="Everyone deserves access to the internet" align="left">
              No matter where they live. We bring affordable, reliable Wi-Fi closer to people — helping communities learn,
              communicate, do business and enjoy everything being online offers.
            </SectionHeading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-brand-50 p-5">
                <Target className="h-6 w-6 text-brand-600" />
                <h3 className="mt-3 font-semibold">Our mission</h3>
                <p className="mt-1.5 text-sm text-slate-600">
                  Fast, reliable and affordable internet that keeps people connected anytime, anywhere.
                </p>
              </div>
              <div className="rounded-2xl bg-ink-900 p-5 text-white">
                <Eye className="h-6 w-6 text-signal-300" />
                <h3 className="mt-3 font-semibold text-white">Our vision</h3>
                <p className="mt-1.5 text-sm text-slate-300">
                  A leading hotspot provider, bridging the digital divide with seamless connectivity.
                </p>
              </div>
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700">
              More about us <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Venues />

      {/* MAP */}
      <section className="py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <SectionHeading eyebrow="Coverage" title="Growing one hotspot at a time" align="left">
              Our network keeps expanding across rural centres, markets and schools. Not sure if we&apos;re near you? Just ask.
            </SectionHeading>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/coverage"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
              >
                Explore coverage <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${site.phoneIntl}`}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-ink-900 ring-1 ring-slate-300 transition hover:ring-brand-400"
              >
                Call {site.phone}
              </a>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-3" delay={120}>
            <MapEmbed className="h-[420px]" />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Questions? We've got answers." />
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
