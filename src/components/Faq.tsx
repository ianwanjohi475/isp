"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export const faqs = [
  {
    q: "How much are the hotspot packages?",
    a: "1 Hour (6 Mbps) — KSh 10 · 3 Hours (8 Mbps) — KSh 20 · 12 Hours (8 Mbps) — KSh 35 · 24 Hours (10 Mbps) — KSh 50.",
  },
  {
    q: "How much are the monthly packages?",
    a: "8 Mbps — KSh 1,500 per month · 10 Mbps — KSh 2,000 per month · 15 Mbps — KSh 2,500 per month.",
  },
  {
    q: "How much is TV Binding?",
    a: "TV Binding is KSh 499 per month at 8 Mbps.",
  },
  {
    q: "Where does SNET Networks provide internet?",
    a: "We bring affordable and reliable Wi-Fi closer to people in rural areas, markets, entertainment joints and education centres — one hotspot at a time.",
  },
  {
    q: "How do I get connected or ask a question?",
    a: "Call or WhatsApp us on 0748 349372, or email snetnetworktelecoms@gmail.com.",
  },
];

export function Faq({ items = faqs }: { items?: typeof faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="rounded-md border border-line bg-white">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line last:border-b-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className={`flex w-full items-center gap-4 px-6 py-5 text-left text-[17px] font-medium transition ${
                isOpen ? "text-primary-500" : "text-navy-900"
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                  isOpen ? "bg-primary-500 text-white" : "bg-soft text-navy-900"
                }`}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
              {f.q}
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="border-t border-line px-6 py-5">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
