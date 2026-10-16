import { Check, Gauge, Clock } from "lucide-react";
import { ksh, planMessage, whatsappLink, type Plan } from "@/lib/site";

export function PlanCard({ plan, kind, featured = false }: { plan: Plan; kind: string; featured?: boolean }) {
  const highlight = featured || Boolean(plan.badge);
  return (
    <article
      className={`group relative flex h-full flex-col rounded-3xl p-7 transition duration-300 hover:-translate-y-1 ${
        highlight
          ? "bg-gradient-to-b from-brand-600 to-ink-800 text-white shadow-2xl shadow-brand-600/30 ring-1 ring-brand-400/40"
          : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:shadow-xl hover:shadow-brand-500/10 hover:ring-brand-200"
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 right-6 rounded-full bg-spark-400 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-900 shadow">
          {plan.badge}
        </span>
      )}

      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${highlight ? "text-white" : ""}`}>{plan.name}</h3>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            highlight ? "bg-white/15 text-signal-300" : "bg-brand-50 text-brand-700"
          }`}
        >
          <Clock className="h-3.5 w-3.5" /> {plan.period}
        </span>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className={`font-display text-5xl font-extrabold tracking-tight ${highlight ? "text-white" : "text-ink-900"}`}>
          {plan.speed}
        </span>
        <span className={`mb-1.5 text-lg font-semibold ${highlight ? "text-signal-300" : "text-brand-600"}`}>Mbps</span>
        <Gauge className={`mb-2 ml-auto h-6 w-6 ${highlight ? "text-signal-300" : "text-brand-400"}`} />
      </div>

      <p className={`mt-1 text-sm ${highlight ? "text-slate-300" : "text-slate-500"}`}>{plan.blurb}</p>

      <div className={`my-6 h-px ${highlight ? "bg-white/15" : "bg-slate-100"}`} />

      <ul className="space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className={`mt-0.5 rounded-full p-0.5 ${highlight ? "bg-signal-400/20 text-signal-300" : "bg-brand-50 text-brand-600"}`}>
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <span className={highlight ? "text-slate-200" : ""}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <p className="flex items-baseline gap-1.5">
          <span className={`font-display text-3xl font-bold ${highlight ? "text-white" : "text-ink-900"}`}>{ksh(plan.price)}</span>
          <span className={`text-sm ${highlight ? "text-slate-300" : "text-slate-500"}`}>/ {plan.period.toLowerCase()}</span>
        </p>
        <a
          href={whatsappLink(planMessage(plan, kind))}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 block rounded-full py-3 text-center text-sm font-semibold transition ${
            highlight
              ? "bg-white text-brand-700 hover:bg-signal-300 hover:text-ink-900"
              : "bg-ink-900 text-white hover:bg-brand-500"
          }`}
        >
          {kind === "hotspot" ? "Buy this package" : "Get connected"}
        </a>
      </div>
    </article>
  );
}
