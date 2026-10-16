"use client";

import { useState } from "react";
import { Wifi, Home, Tv } from "lucide-react";
import { hotspotPlans, monthlyPlans, tvPlan } from "@/lib/site";
import { PlanCard } from "./PlanCard";
import { TvBinding } from "./TvBinding";

const tabs = [
  { id: "hotspot", label: "Hotspot", icon: Wifi, note: "Pay as you go — no contracts, no installation." },
  { id: "monthly", label: "Monthly", icon: Home, note: "Dedicated home & business internet, billed monthly." },
  { id: "tv", label: "TV Binding", icon: Tv, note: "Stream on your Smart TV for one flat monthly fee." },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function PlansTabs({ initial = "hotspot" }: { initial?: TabId }) {
  const [tab, setTab] = useState<TabId>(initial);
  const active = tabs.find((t) => t.id === tab)!;

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <div role="tablist" aria-label="Package type" className="inline-flex rounded-full bg-slate-100 p-1.5 ring-1 ring-slate-200">
          {tabs.map((t) => {
            const Icon = t.icon;
            const selected = t.id === tab;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition sm:px-6 ${
                  selected ? "bg-ink-900 text-white shadow-md" : "text-slate-600 hover:text-ink-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-slate-500">{active.note}</p>
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-12">
        {tab === "hotspot" && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hotspotPlans.map((p) => (
              <PlanCard key={p.id} plan={p} kind="hotspot" />
            ))}
          </div>
        )}
        {tab === "monthly" && (
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {monthlyPlans.map((p) => (
              <PlanCard key={p.id} plan={p} kind="monthly" />
            ))}
          </div>
        )}
        {tab === "tv" && <TvBinding plan={tvPlan} />}
      </div>
    </div>
  );
}
