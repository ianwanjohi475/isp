"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export const faqs = [
  {
    q: "How do I connect to an SNET hotspot?",
    a: "Turn on Wi-Fi on your phone or laptop and join the SNET network. A page opens where you pick a package and pay — you're online instantly.",
  },
  {
    q: "How much do the hotspot packages cost?",
    a: "From KSh 10 for 1 hour at 6 Mbps, KSh 20 for 3 hours, KSh 35 for 12 hours and KSh 50 for a full 24 hours at 10 Mbps.",
  },
  {
    q: "Can I use one hotspot package on several devices?",
    a: "Each hotspot package works on one device at a time. For several devices at home or work, our monthly packages are better value.",
  },
  {
    q: "How can I get internet for my home or business?",
    a: "Call or WhatsApp us on 0748 349 372 with your location. We confirm coverage, schedule a visit and set everything up for you.",
  },
  {
    q: "When will SNET reach my area?",
    a: "We're growing one hotspot at a time across rural centres, markets, entertainment joints and schools. Tell us where you are and we'll prioritise it.",
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
