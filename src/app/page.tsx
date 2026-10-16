import Link from "next/link";
import { CheckCircle2, Tv, Wifi, Zap } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { PhotoPlanCard } from "@/components/Cards";
import { CommunityScene, CoverageMap, HomeScene, HotspotScene, TvScene } from "@/components/Scenes";
import { Visual } from "@/components/Visual";
import { Reveal } from "@/components/Reveal";
import { SectionTitle, CtaBand } from "@/components/Ui";
import { ServiceBoxes } from "@/components/ServiceBoxes";
import { CountUp } from "@/components/CountUp";
import { Faq } from "@/components/Faq";
import { ksh, planMessage, site, tvPlan, whatsappLink } from "@/lib/site";

export default function Home() {
  return (
    <>
      <HeroSlider
        slides={[
          {
            title: <>Journey With Fast &amp; Stable Internet</>,
            text: "Hotspot Services + 1 Hour to 24 Hours + Up To 10 Mbps",
            price: "KSh 10",
            per: "Hour",
            href: "/packages",
            visual: <Visual slot="heroHotspot" alt="Customer connecting to SNET hotspot"><HotspotScene /></Visual>,
          },
          {
            title: <>Monthly Internet Packages</>,
            text: "Monthly Services + 8 Mbps, 10 Mbps & 15 Mbps",
            price: "KSh 1,500",
            per: "Month",
            href: "/packages#monthly",
            visual: <Visual slot="heroMonthly" alt="Home internet router and laptop"><HomeScene /></Visual>,
          },
          {
            title: <>TV Binding Services</>,
            text: "TV Binding + 8 Mbps + Per Month",
            price: "KSh 499",
            per: "Month",
            href: "/packages#tv",
            visual: <Visual slot="heroTv" alt="Smart TV streaming"><TvScene /></Visual>,
          },
        ]}
      />

      {/* PLANS */}
      <section className="section-space bg-soft">
        <div className="container-x">
          <Reveal>
            <SectionTitle sub="Our packages" title={<>Discover Our Best <br className="hidden sm:block" />Value Plans</>} center />
          </Reveal>
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <PhotoPlanCard
                visual={<Visual slot="hotspot" alt="SNET hotspot" className="h-full"><HotspotScene /></Visual>}
                title={<>Hotspot <br />Services</>}
                speed="6-10"
                features={["1 Hour · 6 Mbps · KSh 10", "3 Hours · 8 Mbps · KSh 20", "12 Hours · 8 Mbps · KSh 35", "24 Hours · 10 Mbps · KSh 50"]}
                price={10}
                per="Hour"
                href="/packages#hotspot"
              />
            </Reveal>
            <Reveal delay={100}>
              <PhotoPlanCard
                visual={<Visual slot="monthly" alt="Home internet" className="h-full"><HomeScene /></Visual>}
                title={<>Monthly <br />Services</>}
                speed="8-15"
                features={["8 Mbps · KSh 1,500 / month", "10 Mbps · KSh 2,000 / month", "15 Mbps · KSh 2,500 / month"]}
                price={1500}
                per="Month"
                href="/packages#monthly"
              />
            </Reveal>
            <Reveal delay={200}>
              <PhotoPlanCard
                visual={<Visual slot="tv" alt="TV binding" className="h-full"><TvScene /></Visual>}
                title={<>TV Binding <br />Services</>}
                speed="8"
                features={["TV Binding", "8 Mbps", "KSh 499 per month"]}
                price={499}
                per="Month"
                href="/packages#tv"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section-space">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <Visual slot="community" alt="SNET hotspot serving a community" className="aspect-[4/3.6] rounded-md shadow-[0_30px_60px_rgba(11,27,63,0.15)]">
              <CommunityScene />
            </Visual>
            <div className="absolute -bottom-8 right-6 flex items-center gap-4 rounded-md bg-primary-500 px-7 py-5 text-white shadow-xl sm:right-10">
              <Zap className="h-10 w-10" strokeWidth={1.5} />
              <div>
                <p className="text-3xl font-semibold leading-none">Up to 15 Mbps</p>
                <p className="mt-1 text-sm text-white/85">Monthly Services</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle sub={site.mantra} title="Experience The Features Of SNET Networks">
              <p>
                We bring affordable, reliable Wi-Fi closer to people in rural areas, markets, entertainment joints and
                education centres — so everyone can learn, communicate, do business and enjoy being online.
              </p>
            </SectionTitle>
            <div className="mt-9 grid grid-cols-3 gap-6">
              {[
                { n: 24, s: "Hrs", l: "Max hotspot validity" },
                { n: 15, s: "Mbps", l: "Top speed internet" },
                { n: 10, s: "KSh", l: "Lowest package price", prefix: true },
              ].map((c) => (
                <div key={c.l}>
                  <p className="text-[34px] font-medium leading-none text-primary-500">
                    {c.prefix && <span className="text-xl">KSh </span>}
                    <CountUp to={c.n} />
                    {!c.prefix && <span className="text-xl"> {c.s}</span>}
                  </p>
                  <p className="mt-2 text-[15px] text-navy-900">{c.l}</p>
                </div>
              ))}
            </div>
            <ul className="mt-8 grid gap-3 text-navy-900 sm:grid-cols-2">
              {["Fast network", "Stable network", "Reliable network", "Affordable packages"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-primary-500" /> {t}
                </li>
              ))}
            </ul>
            <Link href="/packages" className="btn-primary mt-10">Try hotspot now</Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-space relative overflow-hidden bg-navy-900">
        <div className="lines-bg absolute inset-0" />
        <div className="container-x relative">
          <Reveal>
            <SectionTitle sub="Our services" title={<>Find Perfect Network <br className="hidden sm:block" />Solutions</>} center light />
          </Reveal>
          <div className="mt-14">
            <ServiceBoxes dark />
          </div>
        </div>
      </section>

      {/* SPECIAL OFFER */}
      <section className="section-space overflow-hidden">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-[540px]">
            <Visual slot="offer" alt="Full day hotspot offer" className="aspect-square rounded-full shadow-[0_30px_60px_rgba(11,27,63,0.15)]">
              <HotspotScene />
            </Visual>
            <div className="absolute -left-2 top-[18%] flex h-40 w-40 flex-col items-center justify-center rounded-full bg-primary-500 text-center text-white shadow-xl ring-8 ring-white sm:h-48 sm:w-48">
              <span className="text-sm font-medium uppercase">Up to</span>
              <span className="text-4xl font-semibold leading-tight sm:text-5xl">10</span>
              <span className="text-sm font-medium uppercase">Mbps</span>
            </div>
            <div className="absolute left-[22%] top-0 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-navy-900 text-center text-sm font-medium uppercase leading-tight text-white ring-8 ring-white sm:h-28 sm:w-28">
              Special
              <br />
              offer
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle sub="Full day hotspot" title="24 Hours Of Internet For Only KSh 50">
              <p>
                Our 24 Hours hotspot package gives you 10 Mbps internet for a full day at only KSh 50. Other hotspot packages start from KSh 10 for 1 hour.
              </p>
            </SectionTitle>
            <div className="mt-8 flex flex-wrap items-center gap-10">
              <p className="flex items-start gap-1">
                <span className="mt-2 text-lg text-navy-900">KSh</span>
                <span className="text-7xl font-medium leading-none text-primary-500">50</span>
                <span className="self-end text-body">24 Hours</span>
              </p>
              <Link href="/packages#hotspot" className="font-medium text-navy-900 underline underline-offset-4 hover:text-primary-500">
                See all hotspot packages
              </Link>
            </div>
            <a
              href={whatsappLink("Hi SNET Networks 👋, I'd like the Full Day hotspot package (KSh 50 / 24 hours).")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-10"
            >
              Get started
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand />

      {/* TV */}
      <section className="section-space overflow-hidden">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <Visual slot="tv" alt="Smart TV with TV binding" className="aspect-[4/3] rounded-md shadow-[0_30px_60px_rgba(11,27,63,0.2)]">
              <TvScene />
            </Visual>
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle sub="TV binding" title="Enjoy Sports, Movies, TV Shows & More">
              <p>Get TV Binding from SNET Networks at 8 Mbps for only KSh 499 per month.</p>
            </SectionTitle>
            <p className="mt-7 text-xl text-navy-900">
              TV Binding Services
              <br />
              <span className="text-primary-500">8 Mbps · KSh 499 per month</span>
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-8">
              <div className="relative rounded-md border-2 border-primary-500 px-6 pb-3 pt-5">
                <span className="absolute -top-3 left-5 bg-white px-2 text-sm text-navy-900">Only</span>
                <span className="text-5xl font-medium text-primary-500">{ksh(tvPlan.price)}</span>
                <span className="text-sm text-navy-900">/Mon</span>
              </div>
              <a
                href={whatsappLink(planMessage(tvPlan, "TV"))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold uppercase text-primary-500 underline underline-offset-4"
              >
                <Tv className="h-4 w-4" /> Bind my TV
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ + MAP */}
      <section className="section-space bg-soft">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionTitle sub="FAQ" title="Frequently Asked Questions" className="mb-10" />
            <Faq />
          </Reveal>
          <Reveal delay={120} className="lg:pt-24">
            <h3 className="text-3xl">Our Growing Hotspot Network</h3>
            <p className="mt-3 max-w-md">
              Bringing the world closer to our communities — in rural areas, markets, entertainment joints and education centres, one hotspot at a time.
            </p>
            <CoverageMap className="mx-auto mt-6 w-full max-w-[420px]" />
            <div className="mt-4 text-center">
              <Link href="/contact#map" className="btn bg-[#16b26b] text-white hover:bg-navy-900">
                <Wifi className="h-4 w-4" /> Check your network coverage
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
