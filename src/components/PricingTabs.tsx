import { House, Tv, Wifi } from "@/components/icons";
import { hotspotPlans, ksh, monthlyPlans, tvPlan } from "@/lib/site";
import { PriceCard } from "./PriceCard";
import { Tabs } from "./Tabs";
import { Tilt } from "./Tilt";

export function PricingTabs() {
  return (
    <Tabs
      center
      tabs={[
        {
          id: "hotspot",
          label: "Hotspot",
          icon: <Wifi className="h-4 w-4" />,
          content: (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {hotspotPlans.map((p) => (
                <Tilt key={p.id}><PriceCard plan={p} kind="hotspot" featured={p.id === "hs-24h"} ribbon={p.id === "hs-24h" ? "Full day" : undefined} /></Tilt>
              ))}
            </div>
          ),
        },
        {
          id: "monthly",
          label: "Monthly",
          icon: <House className="h-4 w-4" />,
          content: (
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              {monthlyPlans.map((p) => (
                <Tilt key={p.id}><PriceCard plan={p} kind="monthly" featured={p.id === "m-15"} ribbon={p.id === "m-15" ? "Top speed" : undefined} /></Tilt>
              ))}
            </div>
          ),
        },
        {
          id: "tv",
          label: "TV Binding",
          icon: <Tv className="h-4 w-4" />,
          content: (
            <div className="mx-auto mt-12 grid max-w-4xl items-center gap-8 md:grid-cols-2">
              <Tilt><PriceCard plan={tvPlan} kind="tv" featured /></Tilt>
              <div>
                <h3 className="text-3xl">TV Binding Services</h3>
                <p className="mt-4">
                  Get TV Binding from SNET Networks at {tvPlan.speed} Mbps for only {ksh(tvPlan.price)} per month.
                </p>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}
