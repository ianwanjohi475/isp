"use client";

import { useState, type ReactNode } from "react";

export type Tab = { id: string; label: string; icon?: ReactNode; content: ReactNode };

export function Tabs({ tabs, className = "", center = false, dark = false }: { tabs: Tab[]; className?: string; center?: boolean; dark?: boolean }) {
  const [active, setActive] = useState(tabs[0].id);
  return (
    <div className={className}>
      <div role="tablist" className={`flex flex-wrap gap-2 ${center ? "justify-center" : ""}`}>
        {tabs.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-3 font-display text-sm font-bold uppercase tracking-wide transition sm:px-7 ${
                on
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                  : dark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-white text-navy-900 ring-1 ring-line hover:ring-primary-300"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={t.id !== active} className="animate-fade-up [animation-duration:0.6s]">
          {t.content}
        </div>
      ))}
    </div>
  );
}
