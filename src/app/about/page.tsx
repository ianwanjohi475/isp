import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Eye, Target, Zap } from "lucide-react";
import { Breadcrumb, CtaBand, SectionTitle } from "@/components/Ui";
import { CommunityScene, HotspotScene } from "@/components/Scenes";
import { Visual } from "@/components/Visual";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { Faq } from "@/components/Faq";
import { ServiceBoxes } from "@/components/ServiceBoxes";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SNET Networks brings affordable, reliable Wi-Fi to rural areas, markets, entertainment joints and education centres.",
};

const reach = ["Rural areas", "Markets", "Entertainment joints", "Education centres", "Homes & families", "Small businesses"];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb title="About Us" current="About" />

      <section className="section-space">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative pb-10 pr-10">
            <Visual slot="about" alt="SNET Networks in the community" className="aspect-[4/3.6] rounded-md shadow-[0_30px_60px_rgba(11,27,63,0.15)]">
              <CommunityScene />
            </Visual>
            <div className="absolute bottom-0 right-0 w-[42%] rounded-md border-8 border-white shadow-xl">
              <Visual slot="hotspot" alt="Connecting to SNET hotspot" className="aspect-square">
                <HotspotScene />
              </Visual>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle sub="About SNET Networks" title="Bringing The World Closer To Our Communities">
              <p>
                In SNET Networks, we believe everyone deserves access to the internet, no matter where they live. That&apos;s why
                we bring affordable and reliable Wi-Fi closer to people in rural areas, markets, entertainment joints and
                education centres, helping communities stay connected to the world.
              </p>
              <p className="mt-4">
                Through our growing network of hotspots, we make it easier for people to learn, communicate, do business, and
                enjoy the opportunities that come with being online. Our goal is simple: to make internet access convenient,
                affordable, and available to more people, one hotspot at a time.
              </p>
            </SectionTitle>
            <ul className="mt-8 grid gap-3 text-navy-900 sm:grid-cols-2">
              {reach.map((r) => (
                <li key={r} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary-500" /> {r}
                </li>
              ))}
            </ul>
            <Link href="/packages" className="btn-outline mt-10">Get started</Link>
          </Reveal>
        </div>

        <div className="container-x mt-24 grid grid-cols-2 gap-8 border-t border-line pt-16 text-center lg:grid-cols-4">
          {[
            { n: 3, s: "", l: "Service types" },
            { n: 15, s: " Mbps", l: "Top speed" },
            { n: 24, s: " Hrs", l: "Longest hotspot pass" },
            { n: 10, s: "", l: "KSh starting price" },
          ].map((c) => (
            <div key={c.l}>
              <p className="text-5xl font-medium text-primary-500">
                <CountUp to={c.n} />
                {c.s}
              </p>
              <p className="mt-2 text-navy-900">{c.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section id="mission" className="section-space scroll-mt-24 bg-soft">
        <div className="container-x">
          <Reveal>
            <SectionTitle sub="What drives us" title="Our Mission & Vision" center />
          </Reveal>
          <div className="mt-14 grid gap-7 lg:grid-cols-2">
            <Reveal>
              <article className="group h-full rounded-md bg-white p-10 shadow-sm transition hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(11,27,63,0.12)] sm:p-12">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-500 text-white">
                  <Target className="h-9 w-9" strokeWidth={1.5} />
                </span>
                <h3 className="mt-8 text-3xl">Our Mission</h3>
                <p className="mt-4 text-lg">
                  To provide fast, reliable, and affordable internet connectivity that keeps people connected anytime, anywhere.
                </p>
              </article>
            </Reveal>
            <Reveal delay={120}>
              <article className="group h-full rounded-md bg-navy-900 p-10 text-white transition hover:-translate-y-1.5 sm:p-12">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-brand text-navy-900">
                  <Eye className="h-9 w-9" strokeWidth={1.5} />
                </span>
                <h3 className="mt-8 text-3xl text-white">Our Vision</h3>
                <p className="mt-4 text-lg text-slate-300">
                  To become a leading hotspot networking provider, bridging the digital divide through accessible and seamless
                  connectivity.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />

      <section className="section-space">
        <div className="container-x">
          <Reveal>
            <SectionTitle sub="What we offer" title="Fast. Stable. Reliable." center />
          </Reveal>
          <div className="mt-14">
            <ServiceBoxes />
          </div>
        </div>
      </section>

      <section className="section-space bg-soft">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <SectionTitle sub="FAQ" title="Frequently Asked Questions">
              <p>Can&apos;t find your answer? Call or WhatsApp us — we&apos;re happy to help.</p>
            </SectionTitle>
            <div className="mt-8 flex items-center gap-4 rounded-md bg-primary-500 p-6 text-white">
              <Zap className="h-10 w-10" strokeWidth={1.5} />
              <p className="text-lg font-medium">Fast · Stable · Reliable Network</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Faq />
          </Reveal>
        </div>
      </section>
    </>
  );
}
