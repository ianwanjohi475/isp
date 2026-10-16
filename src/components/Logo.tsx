type MarkProps = { className?: string; title?: string };

/**
 * SNET mark: an "S" drawn as a single network path between two nodes,
 * with signal waves radiating from the top node.
 */
export function LogoMark({ className = "h-10 w-10", title = "SNET Networks" }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id="snet-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563ff" />
          <stop offset="1" stopColor="#0b2577" />
        </linearGradient>
        <linearGradient id="snet-s" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cfe0ff" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="url(#snet-bg)" />
      <path d="M0 40 Q 32 26 64 40 V46 Q 32 32 0 46 Z" fill="#ffffff" opacity="0.06" />
      {/* the S path */}
      <path
        d="M38 20.5 A 8.5 8.5 0 1 0 29.5 29 H34.5 A 8.5 8.5 0 1 1 26 37.5"
        fill="none"
        stroke="url(#snet-s)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0.5 -1.5)"
      />
      {/* nodes */}
      <circle cx="38.5" cy="19" r="4.2" fill="#38d6f5" stroke="#0b2577" strokeWidth="1.6" />
      <circle cx="26.5" cy="36" r="4.2" fill="#38d6f5" stroke="#0b2577" strokeWidth="1.6" />
      {/* signal waves */}
      <path d="M45 12.5 A 9 9 0 0 1 47.5 21" fill="none" stroke="#38d6f5" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M48.5 8 A 14.5 14.5 0 0 1 52.5 22" fill="none" stroke="#38d6f5" strokeWidth="2.6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-12 w-12 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[28px] font-extrabold tracking-tight ${light ? "text-white" : "text-navy-900"}`}>
          SNET
        </span>
        <span className={`mt-1 text-[0.66rem] font-bold tracking-[0.42em] ${light ? "text-sky-brand" : "text-primary-500"}`}>
          NETWORKS
        </span>
      </span>
    </span>
  );
}
