const center = { transformBox: "fill-box", transformOrigin: "center" } as const;

/** Hero scene: a hotspot mast broadcasting to devices around it. */
export function HeroArt({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 92, y: 132, kind: "phone" },
    { x: 404, y: 112, kind: "laptop" },
    { x: 420, y: 352, kind: "tv" },
    { x: 80, y: 372, kind: "shop" },
  ] as const;

  return (
    <svg viewBox="0 0 520 520" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="hero-glow" cx="50%" cy="45%" r="50%">
          <stop offset="0" stopColor="#2563ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2563ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7ee8fa" />
          <stop offset="1" stopColor="#2563ff" />
        </linearGradient>
        <linearGradient id="node" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a2e63" />
          <stop offset="1" stopColor="#0e1f4a" />
        </linearGradient>
      </defs>

      <circle cx="260" cy="250" r="250" fill="url(#hero-glow)" />
      {[90, 150, 210].map((r) => (
        <circle key={r} cx="260" cy="250" r={r} fill="none" stroke="#ffffff" strokeOpacity="0.08" />
      ))}
      <g className="animate-spin-slow" style={center}>
        <circle cx="260" cy="250" r="180" fill="none" stroke="#38d6f5" strokeOpacity="0.35" strokeDasharray="2 14" strokeWidth="2" />
      </g>

      {/* pulse rings from the antenna */}
      {[0, 1.2, 2.4].map((d) => (
        <circle
          key={d}
          cx="260"
          cy="196"
          r="70"
          fill="none"
          stroke="#38d6f5"
          strokeWidth="2"
          className="animate-ping-slow"
          style={{ ...center, animationDelay: `${d}s` }}
        />
      ))}

      {/* links to devices */}
      {nodes.map((n) => (
        <line
          key={n.kind}
          x1="260"
          y1="196"
          x2={n.x + 32}
          y2={n.y + 32}
          stroke="#38d6f5"
          strokeOpacity="0.6"
          strokeWidth="1.6"
          strokeDasharray="4 6"
          className="animate-dash"
        />
      ))}

      {/* mast */}
      <g stroke="url(#mast)" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M232 352 L260 204 L288 352" />
        <path d="M241 306 L279 306 M246 276 L274 276 M251 248 L269 248 M241 306 L274 276 M279 306 L246 276 M246 276 L269 248 M274 276 L251 248" strokeWidth="2.5" />
      </g>
      <rect x="220" y="350" width="80" height="8" rx="4" fill="#2563ff" />
      <path d="M240 186 A 28 28 0 0 0 240 206" stroke="#7ee8fa" strokeWidth="4" fill="none" strokeLinecap="round" transform="translate(-6 0)" />
      <path d="M280 186 A 28 28 0 0 1 280 206" stroke="#7ee8fa" strokeWidth="4" fill="none" strokeLinecap="round" transform="translate(6 0)" />
      <path d="M222 176 A 46 46 0 0 0 222 216" stroke="#7ee8fa" strokeOpacity="0.6" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M298 176 A 46 46 0 0 1 298 216" stroke="#7ee8fa" strokeOpacity="0.6" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="260" cy="196" r="11" fill="#ffffff" />
      <circle cx="260" cy="196" r="6" fill="#2563ff" />

      {/* device nodes */}
      {nodes.map((n, i) => (
        <g key={n.kind} transform={`translate(${n.x} ${n.y})`}>
          <g className="animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
            <rect width="64" height="64" rx="18" fill="url(#node)" stroke="#ffffff" strokeOpacity="0.15" />
            <g stroke="#7ee8fa" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {n.kind === "phone" && (
                <>
                  <rect x="23" y="15" width="18" height="34" rx="4" />
                  <path d="M30 43 H34" />
                </>
              )}
              {n.kind === "laptop" && (
                <>
                  <rect x="17" y="19" width="30" height="20" rx="3" />
                  <path d="M12 45 H52" />
                </>
              )}
              {n.kind === "tv" && (
                <>
                  <rect x="14" y="17" width="36" height="24" rx="3" />
                  <path d="M26 48 H38 M32 41 V48" />
                  <path d="M29 24 L37 29 L29 34 Z" fill="#7ee8fa" />
                </>
              )}
              {n.kind === "shop" && (
                <>
                  <path d="M16 27 L20 17 H44 L48 27" />
                  <path d="M16 27 Q20 32 24 27 Q28 32 32 27 Q36 32 40 27 Q44 32 48 27" />
                  <path d="M19 31 V47 H45 V31 M28 47 V38 H36 V47" />
                </>
              )}
            </g>
            <circle cx="56" cy="8" r="5" fill="#22c55e" stroke="#081433" strokeWidth="2" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/** Smart TV with streaming signal. */
export function TvArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="tv-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563ff" />
          <stop offset="0.6" stopColor="#0f3bb8" />
          <stop offset="1" stopColor="#081433" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="140" r="130" fill="#2563ff" opacity="0.15" />
      <rect x="40" y="40" width="320" height="190" rx="16" fill="#040b1f" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="2" />
      <rect x="52" y="52" width="296" height="166" rx="8" fill="url(#tv-screen)" />
      {/* content tiles */}
      <g opacity="0.9">
        <rect x="68" y="150" width="60" height="40" rx="6" fill="#ffffff" fillOpacity="0.12" />
        <rect x="138" y="150" width="60" height="40" rx="6" fill="#ffffff" fillOpacity="0.12" />
        <rect x="208" y="150" width="60" height="40" rx="6" fill="#ffffff" fillOpacity="0.12" />
        <rect x="278" y="150" width="54" height="40" rx="6" fill="#ffffff" fillOpacity="0.12" />
        <rect x="68" y="72" width="120" height="10" rx="5" fill="#ffffff" fillOpacity="0.8" />
        <rect x="68" y="90" width="80" height="8" rx="4" fill="#7ee8fa" fillOpacity="0.8" />
        <rect x="68" y="112" width="58" height="20" rx="10" fill="#ffab1a" />
      </g>
      <circle cx="270" cy="105" r="28" fill="#ffffff" fillOpacity="0.15" />
      <path d="M262 92 L284 105 L262 118 Z" fill="#ffffff" />
      <path d="M170 230 L160 262 H240 L230 230" fill="#0e1f4a" />
      <rect x="140" y="260" width="120" height="8" rx="4" fill="#1a2e63" />
      {/* wifi badge */}
      <g transform="translate(330 22)">
        <circle r="26" fill="#38d6f5" />
        <g fill="none" stroke="#081433" strokeWidth="3.4" strokeLinecap="round">
          <path d="M-12 -3 A 17 17 0 0 1 12 -3" />
          <path d="M-7 3 A 10 10 0 0 1 7 3" />
        </g>
        <circle cy="10" r="3" fill="#081433" />
      </g>
    </svg>
  );
}

/** Community scene: a hotspot serving a school, a market and homes. */
export function CommunityArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 440" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dce8ff" />
          <stop offset="1" stopColor="#eef4ff" />
        </linearGradient>
        <linearGradient id="hill-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d84ff" />
          <stop offset="1" stopColor="#2563ff" />
        </linearGradient>
        <linearGradient id="hill-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#134be6" />
          <stop offset="1" stopColor="#0f3bb8" />
        </linearGradient>
        <clipPath id="frame">
          <rect width="560" height="440" rx="32" />
        </clipPath>
      </defs>
      <g clipPath="url(#frame)">
        <rect width="560" height="440" fill="url(#sky)" />
        <circle cx="450" cy="90" r="40" fill="#ffc24b" />
        <circle cx="450" cy="90" r="58" fill="#ffc24b" opacity="0.2" />
        <path d="M0 290 Q 140 210 300 270 T 560 240 V440 H0 Z" fill="url(#hill-a)" opacity="0.55" />
        <path d="M0 330 Q 180 270 340 320 T 560 300 V440 H0 Z" fill="url(#hill-b)" />

        {/* hotspot pole */}
        <g transform="translate(280 0)">
          <rect x="-4" y="140" width="8" height="190" rx="3" fill="#081433" />
          <rect x="-16" y="128" width="32" height="20" rx="6" fill="#081433" />
          <circle cy="138" r="5" fill="#38d6f5" />
          <g fill="none" stroke="#2563ff" strokeWidth="5" strokeLinecap="round">
            <path d="M-30 112 A 40 40 0 0 1 30 112" />
            <path d="M-52 92 A 70 70 0 0 1 52 92" opacity="0.7" />
            <path d="M-74 72 A 100 100 0 0 1 74 72" opacity="0.4" />
          </g>
        </g>

        {/* school */}
        <g transform="translate(60 262)">
          <rect x="0" y="30" width="130" height="70" fill="#ffffff" />
          <path d="M-10 32 L65 -6 L140 32 Z" fill="#081433" />
          <rect x="52" y="58" width="26" height="42" fill="#2563ff" />
          <rect x="14" y="48" width="22" height="18" rx="2" fill="#7ee8fa" />
          <rect x="94" y="48" width="22" height="18" rx="2" fill="#7ee8fa" />
          <path d="M65 -6 V-40" stroke="#081433" strokeWidth="3" />
          <path d="M65 -40 H90 L84 -32 L90 -24 H65 Z" fill="#ffab1a" />
        </g>

        {/* market stalls */}
        <g transform="translate(350 290)">
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${i * 82} 0)`}>
              <rect x="6" y="30" width="62" height="50" fill="#ffffff" />
              <path d="M0 30 L8 6 H66 L74 30 Z" fill={i ? "#ffab1a" : "#38d6f5"} />
              <path d="M0 30 Q 9 40 18 30 Q 27 40 37 30 Q 46 40 55 30 Q 64 40 74 30" fill={i ? "#ffc24b" : "#7ee8fa"} />
              <rect x="14" y="52" width="46" height="8" rx="2" fill="#dce8ff" />
            </g>
          ))}
        </g>

        {/* people with phones */}
        {[
          [215, 360, "#081433"],
          [338, 372, "#134be6"],
          [250, 380, "#ffab1a"],
        ].map(([x, y, c], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <circle r="9" fill={c as string} />
            <rect x="-10" y="12" width="20" height="34" rx="9" fill={c as string} />
            <rect x="8" y="16" width="7" height="11" rx="2" fill="#38d6f5" />
          </g>
        ))}

        {/* floating badge */}
        <g transform="translate(40 40)">
          <rect width="170" height="58" rx="16" fill="#ffffff" />
          <circle cx="29" cy="29" r="15" fill="#22c55e" opacity="0.15" />
          <circle cx="29" cy="29" r="6" fill="#22c55e" />
          <text x="54" y="25" fontFamily="Inter Variable, sans-serif" fontSize="12" fontWeight="700" fill="#081433">
            SNET Hotspot
          </text>
          <text x="54" y="42" fontFamily="Inter Variable, sans-serif" fontSize="11" fill="#64748b">
            Connected · 10 Mbps
          </text>
        </g>
      </g>
    </svg>
  );
}
