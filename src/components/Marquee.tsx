import { Asterisk } from "lucide-react";

const items = ["Hotspot Services", "Monthly Services", "TV Binding Services", "Fast", "Stable", "Reliable Network", "From KSh 10", "Up To 15 Mbps"];

export function Marquee({ className = "" }: { className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-500 to-sky-brand py-5 ${className}`}>
      <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
            {t}
            <Asterisk className="h-6 w-6 text-white/70" strokeWidth={3} />
          </span>
        ))}
      </div>
    </div>
  );
}
