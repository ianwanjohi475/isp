import { ArrowRight, Check, House, Tv, Wifi } from "lucide-react";
import { ksh, planMessage, whatsappLink, type Plan } from "@/lib/site";

const icons = { hotspot: Wifi, monthly: House, tv: Tv };

/** Premium pricing card. `featured` = dark highlighted card with a ribbon. */
export function PriceCard({ plan, kind, featured = false, ribbon }: { plan: Plan; kind: keyof typeof icons; featured?: boolean; ribbon?: string }) {
  const Icon = icons[kind];
  const label = kind === "hotspot" ? "Hotspot package" : kind === "monthly" ? "Monthly package" : "TV Binding";
  const features =
    kind === "hotspot"
      ? [`${plan.speed} Mbps speed`, `Valid for ${plan.period}`, "Hotspot Services"]
      : kind === "monthly"
        ? [`${plan.speed} Mbps speed`, `${ksh(plan.price)} per month`, "Monthly Services"]
        : [`${plan.speed} Mbps speed`, `${ksh(plan.price)} per month`, "TV Binding Services"];
  return (
    <article
      className={`card-fx group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 sm:p-9 ${
        featured
          ? "bg-gradient-to-br from-navy-900 via-navy-800 to-primary-700 text-white shadow-[0_30px_60px_-15px_rgba(31,98,236,0.5)]"
          : "border border-line bg-white"
      }`}
    >
      {ribbon && (
        <span className="absolute right-0 top-7 rounded-l-full bg-sky-brand py-1.5 pl-4 pr-5 text-xs font-bold uppercase tracking-wider text-navy-950">{ribbon}</span>
      )}
      <div className={`absolute -right-14 -top-14 h-40 w-40 rounded-full ${featured ? "bg-white/5" : "bg-primary-50"} transition duration-700 group-hover:scale-150`} />
      <span
        className={`relative flex h-16 w-16 items-center justify-center rounded-2xl transition duration-500 group-hover:rotate-6 ${
          featured ? "bg-white/10 text-sky-brand ring-1 ring-white/15" : "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
        }`}
      >
        <Icon className="h-7 w-7" />
      </span>
      <p className={`relative mt-6 text-xs font-bold uppercase tracking-[0.18em] ${featured ? "text-sky-brand" : "text-primary-500"}`}>{label}</p>
      <h3 className={`relative mt-1 text-2xl ${featured ? "text-white" : ""}`}>{plan.name}</h3>

      <div className={`relative my-7 flex items-end gap-2 border-y py-6 ${featured ? "border-white/10" : "border-line"}`}>
        <span className={`mb-2 font-display text-lg font-bold ${featured ? "text-slate-300" : "text-body"}`}>KSh</span>
        <span className={`font-display text-[56px] font-extrabold leading-none ${featured ? "text-white" : "text-navy-900"}`}>
          {plan.price.toLocaleString("en-KE")}
        </span>
        <span className={`mb-2 text-sm ${featured ? "text-slate-300" : "text-body"}`}>/{plan.period}</span>
      </div>

      <ul className="relative space-y-3.5">
        {features.map((f) => (
          <li key={f} className={`flex items-center gap-3 ${featured ? "text-slate-200" : "text-navy-900"}`}>
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${featured ? "bg-sky-brand text-navy-950" : "bg-primary-50 text-primary-500"}`}>
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={whatsappLink(planMessage(plan, kind === "tv" ? "TV Binding" : kind))}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative mt-9 flex items-center justify-center gap-2 rounded-full py-4 font-display text-sm font-bold uppercase tracking-wider transition ${
          featured ? "bg-white text-navy-900 hover:bg-sky-brand" : "bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white"
        }`}
      >
        {kind === "tv" ? "Get TV Binding" : "Get started"} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </a>
    </article>
  );
}
