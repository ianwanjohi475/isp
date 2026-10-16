import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumb, CtaBand, SectionTitle } from "@/components/Ui";
import { HomeScene, HotspotScene, TvScene } from "@/components/Scenes";
import { Visual } from "@/components/Visual";
import { Reveal } from "@/components/Reveal";
import { ServiceBoxes } from "@/components/ServiceBoxes";
import { hotspotPlans, ksh, monthlyPlans, tvPlan } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services",
  description: "SNET Networks Hotspot Services, Monthly Services and TV Binding Services.",
};

const blocks = [
  {
    id: "hotspot",
    sub: "Hotspot services",
    title: "Hotspot Services",
    text: "Affordable hotspot Wi-Fi in rural areas, markets, entertainment joints and education centres. Choose a package from 1 Hour to 24 Hours.",
    points: hotspotPlans.map((p) => `${p.period} · ${p.speed} Mbps — ${ksh(p.price)}`),
    from: `From ${ksh(hotspotPlans[0].price)}`,
    slot: "hotspot" as const,
    scene: <HotspotScene />,
  },
  {
    id: "monthly",
    sub: "Monthly services",
    title: "Monthly Services",
    text: "Monthly internet packages at 8 Mbps, 10 Mbps and 15 Mbps.",
    points: monthlyPlans.map((p) => `${p.speed} Mbps — ${ksh(p.price)} per month`),
    from: `From ${ksh(monthlyPlans[0].price)}`,
    slot: "monthly" as const,
    scene: <HomeScene />,
  },
  {
    id: "tv",
    sub: "TV binding services",
    title: "TV Binding Services",
    text: "TV Binding at 8 Mbps for KSh 499 per month.",
    points: [`TV Binding — ${tvPlan.speed} Mbps`, `${ksh(tvPlan.price)} per month`],
    from: `${ksh(tvPlan.price)} / month`,
    slot: "tv" as const,
    scene: <TvScene />,
  },
];

const priceList = [
  { group: "Hotspot Services", rows: hotspotPlans.map((p) => [p.period, `${p.speed} Mbps`, ksh(p.price)]) },
  { group: "Monthly Services", rows: monthlyPlans.map((p) => ["Per month", `${p.speed} Mbps`, ksh(p.price)]) },
  { group: "TV Binding Services", rows: [["Per month", `${tvPlan.speed} Mbps`, ksh(tvPlan.price)]] },
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumb title="Our Services" current="Services" />

      <section className="section-space">
        <div className="container-x">
          <Reveal>
            <SectionTitle sub="What we do" title="Find Perfect Network Solutions" center>
              <p>Hotspot Services, Monthly Services and TV Binding Services.</p>
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
            <SectionTitle sub="Price list" title="All SNET Packages" center light />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {priceList.map((g, i) => (
              <Reveal key={g.group} delay={i * 100}>
                <div className="h-full rounded-md bg-navy-800 p-8">
                  <h3 className="text-xl text-white">{g.group}</h3>
                  <table className="mt-5 w-full text-left text-[15px]">
                    <thead>
                      <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-sky-brand">
                        <th className="pb-3 font-semibold">Package</th>
                        <th className="pb-3 font-semibold">Speed</th>
                        <th className="pb-3 text-right font-semibold">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.rows.map((r) => (
                        <tr key={r.join()} className="border-b border-white/5 text-slate-200 last:border-0">
                          <td className="py-3">{r[0]}</td>
                          <td className="py-3">{r[1]}</td>
                          <td className="py-3 text-right font-semibold text-white">{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
