import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, CreditCard, Rocket, Smartphone, Wifi } from "lucide-react";
import { Breadcrumb, CtaBand, SectionTitle } from "@/components/Ui";
import { HomeScene, HotspotScene, TvScene } from "@/components/Scenes";
import { Visual } from "@/components/Visual";
import { Reveal } from "@/components/Reveal";
import { ServiceBoxes } from "@/components/ServiceBoxes";
import { hotspotPlans, ksh, monthlyPlans, tvPlan } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Hotspot Wi-Fi, monthly home & business internet and Smart TV binding from SNET Networks.",
};

const blocks = [
  {
    id: "hotspot",
    sub: "Hotspot services",
    title: "Pay As You Go Hotspot Wi-Fi",
    text: "Connect at any SNET hotspot in markets, schools, entertainment joints and rural centres. Pick a package from 1 hour to a full day, pay on your phone and browse — no contracts, no installation.",
    points: hotspotPlans.map((p) => `${p.period} · ${p.speed} Mbps — ${ksh(p.price)}`),
    from: `From ${ksh(hotspotPlans[0].price)}`,
    slot: "hotspot",
    scene: <HotspotScene />,
  },
  {
    id: "monthly",
    sub: "Monthly services",
    title: "Home & Business Internet",
    text: "A dedicated connection for your home, shop or office, billed once a month. Ideal for families, cyber cafés and small businesses that need steady speeds all day.",
    points: monthlyPlans.map((p) => `${p.speed} Mbps — ${ksh(p.price)} / month`),
    from: `From ${ksh(monthlyPlans[0].price)}`,
    slot: "monthly",
    scene: <HomeScene />,
  },
  {
    id: "tv",
    sub: "TV binding services",
    title: "Smart TV Binding",
    text: "We bind a dedicated 8 Mbps connection to your Smart TV so you can enjoy YouTube, movies, series and live sport on the big screen without slowing down your other devices.",
    points: [`${tvPlan.speed} Mbps bound to your TV`, "YouTube, Netflix & live streams", "Set up by our technicians", `${ksh(tvPlan.price)} per month`],
    from: `${ksh(tvPlan.price)} / month`,
    slot: "tv",
    scene: <TvScene />,
  },
];

const steps = [
  { icon: Wifi, title: "Find SNET Wi-Fi", text: "Open Wi-Fi settings and join the SNET hotspot near you." },
  { icon: Smartphone, title: "Pick a package", text: "Choose from 1 hour up to a full day of internet." },
  { icon: CreditCard, title: "Pay on your phone", text: "Pay in seconds — no forms and no contracts." },
  { icon: Rocket, title: "Enjoy browsing", text: "You're online at full speed until your time ends." },
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumb title="Our Services" current="Services" />

      <section className="section-space">
        <div className="container-x">
          <Reveal>
            <SectionTitle sub="What we do" title="Find Perfect Network Solutions" center>
              <p>Three simple ways to get online with SNET — whichever fits your day, your home or your business.</p>
            </SectionTitle>
          </Reveal>
          <div className="mt-14">
            <ServiceBoxes />
          </div>
        </div>
      </section>

      {blocks.map((b, i) => (
        <section key={b.id} id={b.id} className={`section-space scroll-mt-24 ${i % 2 === 0 ? "bg-soft" : ""}`}>
          <div className="container-x grid items-center gap-14 lg:grid-cols-2">
            <Reveal className={i % 2 ? "lg:order-2" : ""}>
              <div className="relative">
                <Visual slot={b.slot} alt={b.title} className="aspect-[4/3] rounded-md shadow-[0_30px_60px_rgba(11,27,63,0.15)]">
                  {b.scene}
                </Visual>
                <span className="absolute -bottom-6 left-8 rounded-md bg-primary-500 px-6 py-4 text-lg font-medium text-white shadow-xl">
                  {b.from}
                </span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <SectionTitle sub={b.sub} title={b.title}>
                <p>{b.text}</p>
              </SectionTitle>
              <ul className="mt-8 space-y-3 text-navy-900">
                {b.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-500" /> {p}
                  </li>
                ))}
              </ul>
              <Link href={`/packages#${b.id}`} className="btn-primary mt-10">View packages</Link>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section-space relative overflow-hidden bg-navy-900">
        <div className="lines-bg absolute inset-0" />
        <div className="container-x relative">
          <Reveal>
            <SectionTitle sub="How hotspot works" title="Online In Under A Minute" center light />
          </Reveal>
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal as="li" key={s.title} delay={i * 100}>
                  <div className="relative h-full rounded-md bg-navy-800 p-8 text-center">
                    <span className="absolute right-5 top-4 text-5xl font-semibold text-white/5">0{i + 1}</span>
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 text-xl text-white">{s.title}</h3>
                    <p className="mt-2 text-slate-300">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
