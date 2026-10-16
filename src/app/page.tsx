import Link from "next/link";
import { ArrowRight, CheckCircle2, Gauge, House, PhoneCall, Tv, Wifi, Zap } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { PhotoPlanCard } from "@/components/Cards";
import { Marquee } from "@/components/Marquee";
import { PricingTabs } from "@/components/PricingTabs";
import { AboutIntro, Process, StatsBand, WhyChoose } from "@/components/HomeSections";
import { CoverageMap } from "@/components/CoverageMap";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Hl, SectionTitle, CtaBand } from "@/components/Ui";
import { Faq } from "@/components/Faq";
import { hotspotPlans, ksh, monthlyPlans, photos, planMessage, site, tvPlan, whatsappLink } from "@/lib/site";

const quick = [
  { icon: Wifi, label: "Hotspot Services", value: `From ${ksh(10)}`, note: "1 Hour · 6 Mbps", href: "/packages#hotspot" },
  { icon: House, label: "Monthly Services", value: `From ${ksh(1500)}`, note: "8, 10 & 15 Mbps", href: "/packages#monthly" },
  { icon: Tv, label: "TV Binding", value: `${ksh(499)}/mo`, note: "8 Mbps", href: "/packages#tv" },
  { icon: PhoneCall, label: "Call us", value: site.phone, note: "Get connected today", href: `tel:${site.phoneIntl}` },
];

export default function Home() {
  return (
    <>
      <HeroSlider
        slides={[
          {
            image: photos.cafeHotspot,
            alt: "Customer browsing on SNET hotspot Wi-Fi at a market café",
            tag: "Hotspot Services",
            title: "Journey With Fast & Stable Internet",
            text: "Hotspot Wi-Fi from 1 Hour to 24 Hours with speeds up to 10 Mbps — right where you are.",
            price: "KSh 10",
            per: "1 Hour",
            href: "/packages#hotspot",
            position: "70% center",
          },
          {
            image: photos.village,
            alt: "Village connected by SNET Networks at golden hour",
            tag: "Monthly Services",
            title: "Bringing The World Closer To Our Communities",
            text: "Monthly internet at 8 Mbps, 10 Mbps and 15 Mbps for homes and businesses.",
            price: "KSh 1,500",
            per: "Month",
            href: "/packages#monthly",
          },
          {
            image: photos.antenna,
            alt: "SNET wireless antenna over a city market",
            tag: "TV Binding Services",
            title: "Fast, Stable, Reliable Network",
            text: "TV Binding at 8 Mbps — stream on your TV for one monthly price.",
            price: "KSh 499",
            per: "Month",
            href: "/packages#tv",
            position: "35% center",
          },
        ]}
      />

      {/* QUICK WIDGETS overlapping hero */}
      <section className="relative z-10 -mt-20 sm:-mt-24">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quick.map((q, i) => {
            const Icon = q.icon;
            return (
              <Reveal key={q.label} delay={i * 90}>
                <Link
                  href={q.href}
                  className="card-fx top-line group flex h-full items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_20px_50px_-15px_rgba(11,27,63,0.25)] sm:p-6"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30 transition duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-body">{q.label}</span>
                    <span className="block truncate text-xl font-semibold text-navy-900">{q.value}</span>
                    <span className="block text-sm text-primary-500">{q.note}</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <AboutIntro />

      <Marquee />

      {/* PLANS */}
      <section className="section-space mesh-bg">
        <div className="container-x">
          <Reveal>
            <SectionTitle sub="Our services" title={<>Discover Our Best <Hl>Value Plans</Hl></>} center />
          </Reveal>
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <PhotoPlanCard
                image={photos.marketPhone}
                title={<>Hotspot <br />Services</>}
                speed="6-10"
                features={["1 Hour · 6 Mbps · KSh 10", "3 Hours · 8 Mbps · KSh 20", "12 Hours · 8 Mbps · KSh 35", "24 Hours · 10 Mbps · KSh 50"]}
                price={10}
                per="Hour"
                href="/packages#hotspot"
              />
            </Reveal>
            <Reveal delay={120}>
              <PhotoPlanCard
                image={photos.family}
                title={<>Monthly <br />Services</>}
                speed="8-15"
                features={["8 Mbps · KSh 1,500 / month", "10 Mbps · KSh 2,000 / month", "15 Mbps · KSh 2,500 / month"]}
                price={1500}
                per="Month"
                href="/packages#monthly"
              />
            </Reveal>
            <Reveal delay={240} className="md:col-span-2 lg:col-span-1">
              <PhotoPlanCard
                image={photos.tvMatch}
                title={<>TV Binding <br />Services</>}
                speed="8"
                features={["TV Binding", "8 Mbps speed", "KSh 499 per month"]}
                price={499}
                per="Month"
                href="/packages#tv"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section-space relative overflow-hidden">
        <div className="dots-bg absolute right-0 top-10 h-72 w-72 opacity-60" />
        <div className="container-x relative">
          <Reveal>
            <SectionTitle sub="Pricing plans" title={<>Choose Your <Hl>Perfect</Hl> Package</>} center>
              <p>Hotspot from KSh 10, Monthly from KSh 1,500 and TV Binding at KSh 499 per month.</p>
            </SectionTitle>
          </Reveal>
          <Reveal className="mt-10">
            <PricingTabs />
          </Reveal>
        </div>
      </section>

      <StatsBand />

      <WhyChoose />

      {/* SPECIAL OFFER */}
      <section className="section-space overflow-hidden">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-5 animate-spin-slow rounded-full border-2 border-dashed border-primary-300" />
            <Photo src={photos.phoneGolden} alt="Smartphone connected to SNET Wi-Fi" className="aspect-square rounded-full shadow-[0_30px_60px_-15px_rgba(11,27,63,0.4)]" imgClassName="object-[30%_center]" />
            <div className="absolute -left-1 top-[22%] flex h-36 w-36 animate-float flex-col items-center justify-center rounded-full bg-primary-500 text-center text-white shadow-xl ring-8 ring-white sm:h-44 sm:w-44">
              <span className="text-xs font-semibold uppercase sm:text-sm">Up to</span>
              <span className="text-4xl font-semibold leading-tight sm:text-5xl">10</span>
              <span className="text-xs font-semibold uppercase sm:text-sm">Mbps</span>
            </div>
            <div className="absolute left-[24%] -top-2 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-navy-900 text-center text-sm font-semibold uppercase leading-tight text-white ring-8 ring-white sm:h-28 sm:w-28">
              Special
              <br />
              offer
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle sub="Special offer" title={<>24 Hours Of Internet For Only <Hl>KSh 50</Hl></>}>
              <p>
                Our 24 Hours hotspot package gives you 10 Mbps internet for a full day at only KSh 50. Other hotspot packages start
                from KSh 10 for 1 Hour.
              </p>
            </SectionTitle>
            <div className="mt-8 flex flex-wrap items-center gap-8">
              <p className="flex items-start gap-1">
                <span className="mt-2 text-lg font-medium text-navy-900">KSh</span>
                <span className="text-7xl font-semibold leading-none text-primary-500">50</span>
                <span className="self-end text-body">/24 Hours</span>
              </p>
              <Link href="/packages#hotspot" className="group inline-flex items-center gap-2 font-semibold text-navy-900 hover:text-primary-500">
                See all hotspot packages <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
            <a href={whatsappLink(planMessage(hotspotPlans[3], "hotspot"))} target="_blank" rel="noopener noreferrer" className="btn-outline mt-10">
              Get started
            </a>
          </Reveal>
        </div>
      </section>

      <CtaBand />

      <Process />

      {/* TV */}
      <section className="section-space overflow-hidden">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="relative">
            <Photo src={photos.tvMatch} alt="Friends watching football on a TV with SNET TV Binding" className="aspect-[4/3] rounded-2xl shadow-[0_30px_60px_-20px_rgba(11,27,63,0.45)]" />
            <div className="absolute -bottom-6 right-6 flex animate-float items-center gap-4 rounded-2xl bg-white p-4 pr-6 shadow-2xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-sky-brand">
                <Tv className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-body">TV Binding</span>
                <span className="block text-xl font-semibold text-navy-900">{ksh(tvPlan.price)} / month</span>
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <SectionTitle sub="TV binding services" title={<>Enjoy Sports, Movies, TV Shows &amp; <Hl>More</Hl></>}>
              <p>Get TV Binding from SNET Networks at 8 Mbps for only KSh 499 per month.</p>
            </SectionTitle>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-line p-5">
                <Gauge className="h-7 w-7 text-primary-500" />
                <p className="mt-3 text-2xl font-semibold text-navy-900">8 Mbps</p>
                <p className="text-sm">Speed</p>
              </div>
              <div className="rounded-2xl border border-line p-5">
                <Tv className="h-7 w-7 text-primary-500" />
                <p className="mt-3 text-2xl font-semibold text-navy-900">{ksh(tvPlan.price)}</p>
                <p className="text-sm">Per month</p>
              </div>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-8">
              <div className="relative rounded-xl border-2 border-primary-500 px-6 pb-3 pt-5">
                <span className="absolute -top-3 left-5 bg-white px-2 text-sm text-navy-900">Only</span>
                <span className="text-5xl font-semibold text-primary-500">{ksh(tvPlan.price)}</span>
                <span className="text-sm text-navy-900">/Mon</span>
              </div>
              <a href={whatsappLink(planMessage(tvPlan, "TV Binding"))} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Get TV Binding
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ + MAP */}
      <section className="section-space bg-soft">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionTitle sub="FAQ" title={<>Frequently Asked <Hl>Questions</Hl></>} className="mb-10" />
            <Faq />
          </Reveal>
          <Reveal delay={120} className="lg:pt-24">
            <div className="rounded-3xl bg-white p-8 shadow-[0_20px_50px_-20px_rgba(11,27,63,0.2)] sm:p-10">
              <h3 className="text-3xl font-semibold">Our Growing Hotspot Network</h3>
              <p className="mt-3">
                Bringing the world closer to our communities — in rural areas, markets, entertainment joints and education centres,
                one hotspot at a time.
              </p>
              <CoverageMap className="mx-auto mt-6 w-full max-w-[380px]" />
              <div className="mt-4 text-center">
                <Link href="/contact#map" className="btn bg-[#16b26b] text-white hover:bg-navy-900">
                  <CheckCircle2 className="h-4 w-4" /> Check your network coverage
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
