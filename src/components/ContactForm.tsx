"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { hotspotPlans, ksh, monthlyPlans, site, tvPlan, whatsappLink } from "@/lib/site";

const options = [
  "General enquiry",
  ...hotspotPlans.map((p) => `Hotspot · ${p.period} · ${p.speed} Mbps · ${ksh(p.price)}`),
  ...monthlyPlans.map((p) => `Monthly · ${p.speed} Mbps · ${ksh(p.price)}`),
  `TV Binding · ${tvPlan.speed} Mbps · ${ksh(tvPlan.price)}`,
];

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-slate-400 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      "Hi SNET Networks 👋",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Location: ${data.get("location") || "-"}`,
      `Interested in: ${data.get("service")}`,
      "",
      String(data.get("message") || ""),
    ];
    window.open(whatsappLink(lines.join("\n").trim()), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-medium text-navy-900">
        Full name
        <input name="name" required autoComplete="name" placeholder="Jane Wanjiku" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-medium text-navy-900">
        Phone number
        <input name="phone" required type="tel" autoComplete="tel" placeholder="07XX XXX XXX" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-medium text-navy-900">
        Location
        <input name="location" placeholder="Town / estate / market" className={field} />
      </label>
      <label className="grid gap-2 text-sm font-medium text-navy-900">
        I&apos;m interested in
        <select name="service" className={field} defaultValue={options[0]}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-navy-900 sm:col-span-2">
        Message
        <textarea name="message" rows={5} placeholder="Tell us how we can help…" className={field} />
      </label>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          Your message opens in WhatsApp so our team can reply instantly. Prefer email?{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-primary-600 underline-offset-2 hover:underline">
            Write to us
          </a>
          .
        </p>
        <button
          type="submit"
          className="btn-primary shrink-0 whitespace-nowrap"
        >
          <Send className="h-4 w-4" /> Send message
        </button>
      </div>
      {sent && (
        <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 sm:col-span-2">
          Thanks! WhatsApp opened with your message — just hit send. If it didn&apos;t open, call us on {site.phone}.
        </p>
      )}
    </form>
  );
}
