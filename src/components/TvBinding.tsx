import { Check } from "lucide-react";
import { ksh, planMessage, whatsappLink, type Plan } from "@/lib/site";
import { TvArt } from "./Illustrations";

export function TvBinding({ plan }: { plan: Plan }) {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-10 overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-white shadow-2xl shadow-ink-900/30 sm:p-12 lg:grid-cols-2">
      <div>
        <span className="rounded-full bg-signal-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-signal-300">
          TV Binding
        </span>
        <h3 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
          Your Smart TV, <span className="text-gradient">always online.</span>
        </h3>
        <p className="mt-4 text-slate-300">{plan.blurb} We bind a dedicated {plan.speed} Mbps connection straight to your TV.</p>
        <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-400" strokeWidth={3} />
              <span className="text-slate-200">{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <p className="flex items-baseline gap-1.5">
            <span className="font-display text-4xl font-extrabold">{ksh(plan.price)}</span>
            <span className="text-slate-400">/ month</span>
          </p>
          <a
            href={whatsappLink(planMessage(plan, "TV"))}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold transition hover:bg-brand-400"
          >
            Bind my TV
          </a>
        </div>
      </div>
      <TvArt className="mx-auto w-full max-w-md" />
    </div>
  );
}
