import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coins, Eye, Gauge, Headset, House, PackageCheck, PhoneCall, Rocket, ShieldCheck, Target, Tv, Wifi, Zap } from "@/components/icons";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
import { Hl, SectionTitle } from "./Ui";
import { Tabs } from "./Tabs";
import { hotspotPlans, ksh, monthlyPlans, photos, site, tvPlan } from "@/lib/site";

/* ---------- About intro ---------- */
export function AboutIntro() {
  return (
    <section className="section-space relative overflow-hidden">
      <div className="dots-bg absolute -left-10 top-20 h-64 w-64 opacity-70" />
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative grid grid-cols-[1.25fr_1fr] gap-4 sm:gap-5">
          <Photo src={photos.village} alt="Village connected by SNET Networks" className="row-span-2 min-h-[380px] rounded-3xl sm:min-h-[520px]" sizes="(min-width:1024px) 30vw, 60vw" />
          <Photo src={photos.cafeHotspot} alt="Customer using SNET hotspot at a market café" className="aspect-square rounded-3xl" sizes="25vw" imgClassName="object-[60%_center]" />
          <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 p-5 text-white sm:p-7">
            <Wifi className="absolute -right-4 -top-4 h-24 w-24 text-white/10" />
            <p className="font-display text-4xl font-extrabold sm:text-5xl">
              <CountUp to={3} />
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-white/90">Services: Hotspot, Monthly &amp; TV Binding</p>
          </div>
          <div className="absolute -bottom-6 left-6 hidden animate-float items-center gap-3 rounded-2xl bg-white p-4 pr-6 shadow-2xl sm:flex">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
              <span className="absolute inset-0 animate-ping-slow rounded-full bg-emerald-500" />
              <Wifi className="relative h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-lg font-bold text-navy-900">Fast, Stable</span>
              <span className="text-sm text-body">&amp; Reliable Network</span>
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SectionTitle sub="About SNET Networks" title={<>Bringing The World Closer To Our <Hl>Communities</Hl></>}>
            <p>
              In SNET Networks, we believe everyone deserves access to the internet, no matter where they live. That&apos;s why we
              bring affordable and reliable Wi-Fi closer to people in rural areas, markets, entertainment joints and education
              centres, helping communities stay connected to the world.
            </p>
          </SectionTitle>
          <Tabs
            className="mt-8"
            tabs={[
              {
                id: "mission",
                label: "Our Mission",
                icon: <Target className="h-4 w-4" />,
                content: (
                  <p className="mt-5 rounded-2xl border-l-4 border-primary-500 bg-soft p-5 text-navy-900">
                    To provide fast, reliable, and affordable internet connectivity that keeps people connected anytime, anywhere.
                  </p>
                ),
              },
              {
                id: "vision",
                label: "Our Vision",
                icon: <Eye className="h-4 w-4" />,
                content: (
                  <p className="mt-5 rounded-2xl border-l-4 border-sky-brand bg-soft p-5 text-navy-900">
                    To become a leading hotspot networking provider, bridging the digital divide through accessible and seamless
                    connectivity.
                  </p>
                ),
              },
            ]}
          />
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link href="/about" className="btn-primary">
              More about us <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${site.phoneIntl}`} className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-100 text-primary-500">
                <PhoneCall className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm">Call us</span>
                <span className="block font-display font-bold text-navy-900">{site.phone}</span>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Services with photo reveal on hover ---------- */
const serviceCards = [
  { n: "01", icon: Wifi, title: "Hotspot Services", text: "1 Hour to 24 Hours of hotspot internet at 6 to 10 Mbps.", price: `From ${ksh(hotspotPlans[0].price)}`, img: photos.marketPhone, href: "/services#hotspot" },
  { n: "02", icon: House, title: "Monthly Services", text: "Monthly internet packages at 8 Mbps, 10 Mbps and 15 Mbps.", price: `From ${ksh(monthlyPlans[0].price)}`, img: photos.family, href: "/services#monthly" },
  { n: "03", icon: Tv, title: "TV Binding Services", text: "TV Binding at 8 Mbps, paid once a month.", price: `${ksh(tvPlan.price)} / month`, img: photos.tvMatch, href: "/services#tv" },
];

export function ServicesShowcase() {
  return (
    <section className="section-space relative overflow-hidden bg-soft">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <SectionTitle sub="What we offer" title={<>Find Perfect Network <Hl>Solutions</Hl></>} />
          </Reveal>
          <Reveal delay={100}>
            <Link href="/services" className="btn-outline">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {serviceCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 110}>
                <Link href={c.href} className="card-fx group relative block h-full overflow-hidden rounded-3xl bg-white p-9 shadow-[0_20px_50px_-30px_rgba(11,27,63,0.35)]">
                  <Image src={c.img} alt="" fill placeholder="blur" sizes="33vw" className="zoom -z-10 object-cover opacity-0 transition duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950/60 opacity-0 transition duration-700 group-hover:opacity-100" />
                  <span className="num-outline absolute right-7 top-5 font-display text-7xl font-extrabold transition group-hover:[-webkit-text-stroke-color:rgb(255_255_255/0.3)]">{c.n}</span>
                  <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-primary-50 text-primary-500 transition duration-500 group-hover:bg-primary-500 group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="mt-8 text-2xl transition group-hover:text-white">{c.title}</h3>
                  <p className="mt-3 transition group-hover:text-slate-200">{c.text}</p>
                  <div className="mt-8 flex items-center justify-between border-t border-line pt-6 transition group-hover:border-white/15">
                    <span className="font-display text-xl font-extrabold text-primary-500 group-hover:text-sky-brand">{c.price}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-500 transition group-hover:bg-white group-hover:text-navy-900">
                      <ArrowRight className="h-5 w-5 -rotate-45 transition group-hover:rotate-0" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats band over photo ---------- */
export function StatsBand() {
  const stats = [
    { icon: Wifi, n: hotspotPlans.length, s: "", l: "Hotspot packages" },
    { icon: House, n: monthlyPlans.length, s: "", l: "Monthly packages" },
    { icon: Gauge, n: 15, s: " Mbps", l: "Top speed" },
    { icon: Coins, n: 10, s: "", p: "KSh ", l: "Starting price" },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-20">
      <Image src={photos.village} alt="" fill placeholder="blur" sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-700/95 via-navy-950/90 to-primary-700/95" />
      <div className="container-x grid grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.l} delay={i * 90} className={`flex flex-col items-center text-center ${i ? "lg:border-l lg:border-white/15" : ""}`}>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-sky-brand ring-1 ring-white/20">
                <Icon className="h-7 w-7" />
              </span>
              <p className="mt-5 font-display text-4xl font-extrabold text-white sm:text-5xl">
                {s.p}
                <CountUp to={s.n} />
                {s.s}
              </p>
              <p className="mt-2 text-slate-300">{s.l}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Why choose us ---------- */
const reasons = [
  { icon: Zap, title: "Fast", text: "Speeds from 6 Mbps up to 15 Mbps." },
  { icon: ShieldCheck, title: "Stable", text: "A network built to keep you connected." },
  { icon: Wifi, title: "Reliable", text: "Wi-Fi in markets, schools and rural areas." },
  { icon: Coins, title: "Affordable", text: "Hotspot packages from only KSh 10." },
];

export function WhyChoose() {
  return (
    <section className="section-space relative overflow-hidden">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <SectionTitle sub="Why choose us" title={<>Fast, Stable &amp; <Hl>Reliable</Hl> Network</>}>
            <p>
              Our goal is simple: to make internet access convenient, affordable, and available to more people, one hotspot at a
              time.
            </p>
          </SectionTitle>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="card-fx top-line group flex gap-4 overflow-hidden rounded-2xl border border-line bg-white p-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/25 transition group-hover:rotate-6">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold text-navy-900">{r.title}</span>
                    <span className="mt-1 block text-sm">{r.text}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={120} className="relative pb-10 pl-6 sm:pl-12">
          <div className="absolute left-0 top-10 h-[85%] w-[85%] rounded-3xl bg-gradient-to-br from-primary-500 to-sky-brand" />
          <Photo src={photos.antenna} alt="SNET outdoor Wi-Fi antenna" className="aspect-[4/4.2] rounded-3xl shadow-2xl" />
          <div className="absolute -bottom-2 right-4 w-[min(320px,80%)] animate-float rounded-2xl bg-white p-6 shadow-2xl">
            <p className="font-display font-bold text-navy-900">Package speeds</p>
            <div className="mt-4 space-y-4">
              {[
                ["Hotspot", 10],
                ["Monthly", 15],
                ["TV Binding", 8],
              ].map(([l, v]) => (
                <div key={l as string}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-navy-900">{l}</span>
                    <span className="font-semibold text-primary-500">up to {v} Mbps</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-primary-50">
                    <div className="bar h-full rounded-full bg-gradient-to-r from-primary-500 to-sky-brand" style={{ width: `${((v as number) / 15) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- How to get connected ---------- */
const steps = [
  { icon: PackageCheck, title: "Choose a package", text: "Hotspot, Monthly or TV Binding — pick what suits you." },
  { icon: PhoneCall, title: "Contact SNET", text: `Call or WhatsApp ${site.phone}.` },
  { icon: Headset, title: "Get connected", text: "We get you on the SNET network." },
  { icon: Rocket, title: "Enjoy the internet", text: "Fast, stable and reliable connectivity." },
];

export function Process() {
  return (
    <section className="section-space mesh-bg relative overflow-hidden">
      <div className="container-x">
        <Reveal>
          <SectionTitle sub="How it works" title={<>Get Connected In <Hl>4 Easy Steps</Hl></>} center />
        </Reveal>
        <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <svg className="pointer-events-none absolute left-[12%] right-[12%] top-12 hidden h-8 w-[76%] lg:block" viewBox="0 0 800 30" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 15 Q 100 -10 200 15 T 400 15 T 600 15 T 800 15" fill="none" stroke="#1f62ec" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 8" />
          </svg>
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="li" key={s.title} delay={i * 120} className="group relative text-center">
                <span className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-primary-500 shadow-[0_15px_40px_-10px_rgba(31,98,236,0.35)] ring-8 ring-white/60 transition duration-500 group-hover:-translate-y-2 group-hover:bg-primary-500 group-hover:text-white">
                  <Icon className="h-9 w-9" />
                  <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-bold text-white ring-4 ring-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-7 text-xl">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-60">{s.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
