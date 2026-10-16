import type { Metadata } from "next";
import { Target, Eye, Zap, ShieldCheck, HeartHandshake, Coins } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { CommunityArt } from "@/components/Illustrations";
import { Reveal } from "@/components/Reveal";
import { Venues } from "@/components/Sections";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SNET Networks brings affordable, reliable Wi-Fi to rural areas, markets, entertainment joints and education centres. Learn about our mission and vision.",
};

const values = [
  { icon: Zap, title: "Fast", text: "Speeds that let you stream, learn and work without waiting." },
  { icon: ShieldCheck, title: "Stable", text: "A network engineered to stay up when you need it most." },
  { icon: HeartHandshake, title: "Reliable", text: "Local people, quick help and a service you can count on." },
  { icon: Coins, title: "Affordable", text: "Packages from KSh 10, so nobody is left offline." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About SNET Networks" title={<>Bringing the world closer to <span className="text-gradient">our communities.</span></>}>
        Affordable, reliable Wi-Fi — one hotspot at a time.
      </PageHeader>

      <section className="py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Who we are" title="Internet access for everyone, everywhere" align="left" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-slate-600">
              <p>
                At <strong className="text-ink-900">SNET Networks</strong>, we believe everyone deserves access to the internet,
                no matter where they live. That&apos;s why we bring affordable and reliable Wi-Fi closer to people in rural
                areas, markets, entertainment joints and education centres, helping communities stay connected to the world.
              </p>
              <p>
                Through our growing network of hotspots, we make it easier for people to learn, communicate, do business, and
                enjoy the opportunities that come with being online. Our goal is simple: to make internet access convenient,
                affordable, and available to more people, one hotspot at a time.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <CommunityArt className="w-full drop-shadow-2xl" />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink-950 py-24">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
        <div className="container-x relative grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="h-full rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800 p-10 text-white shadow-2xl shadow-brand-700/30">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <Target className="h-7 w-7" />
              </span>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-signal-300">Our mission</p>
              <h2 className="mt-3 text-2xl font-bold leading-snug text-white sm:text-3xl">
                To provide fast, reliable, and affordable internet connectivity that keeps people connected anytime, anywhere.
              </h2>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="h-full rounded-[2rem] bg-ink-800 p-10 text-white ring-1 ring-white/10">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-signal-400/15 text-signal-300">
                <Eye className="h-7 w-7" />
              </span>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-signal-300">Our vision</p>
              <h2 className="mt-3 text-2xl font-bold leading-snug text-white sm:text-3xl">
                To become a leading hotspot networking provider, bridging the digital divide through accessible and seamless
                connectivity.
              </h2>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="What we stand for" title="Fast. Stable. Reliable." />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 90}>
                  <div className="h-full rounded-3xl p-7 ring-1 ring-slate-200">
                    <Icon className="h-8 w-8 text-brand-500" />
                    <h3 className="mt-5 text-xl font-semibold">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Venues />
      <CtaBand />
    </>
  );
}
