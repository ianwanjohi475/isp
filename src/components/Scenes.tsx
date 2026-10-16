/* Drawn scenes used wherever the layout expects a photo (600x450 canvas, fills like a cover image). */

type SceneProps = { className?: string };
const svgProps = { viewBox: "0 0 600 450", preserveAspectRatio: "xMidYMid slice", "aria-hidden": true } as const;

export function HotspotScene({ className = "" }: SceneProps) {
  return (
    <svg {...svgProps} className={className}>
      <defs>
        <linearGradient id="hs-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dbe7ff" />
          <stop offset="1" stopColor="#f5f9ff" />
        </linearGradient>
        <linearGradient id="hs-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f62ec" />
          <stop offset="0.45" stopColor="#0e40ad" />
          <stop offset="0.45" stopColor="#ffffff" />
        </linearGradient>
        <filter id="hs-sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#0b1b3f" floodOpacity="0.22" />
        </filter>
      </defs>
      <rect width="600" height="450" fill="url(#hs-bg)" />
      {/* window + market stalls through the window */}
      <rect x="40" y="40" width="250" height="230" rx="10" fill="#ffffff" opacity="0.7" />
      <rect x="54" y="54" width="222" height="202" rx="6" fill="#bfe6fb" />
      <path d="M54 200 Q 120 170 180 196 T 276 186 V256 H54 Z" fill="#7fc8ef" />
      <g transform="translate(70 170)">
        <path d="M0 30 L8 10 H70 L78 30 Z" fill="#1fb5ef" />
        <rect x="6" y="30" width="66" height="40" fill="#ffffff" />
        <path d="M100 30 L108 10 H170 L178 30 Z" fill="#ffab1a" />
        <rect x="106" y="30" width="66" height="40" fill="#ffffff" />
      </g>
      <path d="M165 54 V256 M54 150 H276" stroke="#ffffff" strokeWidth="8" />
      {/* faint wifi waves */}
      <g fill="none" stroke="#1f62ec" strokeLinecap="round" opacity="0.12" strokeWidth="18">
        <path d="M330 160 A 150 150 0 0 1 560 160" />
        <path d="M370 210 A 90 90 0 0 1 520 210" />
      </g>
      {/* table */}
      <rect x="0" y="360" width="600" height="90" fill="#e9c9a1" />
      <rect x="0" y="352" width="600" height="14" fill="#d9b27f" />
      {/* cup */}
      <g transform="translate(110 290)">
        <path d="M0 0 H62 L56 66 H6 Z" fill="#ffffff" />
        <path d="M60 14 Q 84 16 80 36 Q 76 52 58 50" fill="none" stroke="#ffffff" strokeWidth="7" />
        <rect x="-4" y="-6" width="70" height="10" rx="5" fill="#13285a" />
        <path d="M18 -18 Q 24 -30 18 -40 M34 -18 Q 40 -30 34 -40" stroke="#86adff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      {/* phone */}
      <g transform="translate(330 70) rotate(6)" filter="url(#hs-sh)">
        <rect width="170" height="320" rx="26" fill="#0b1b3f" />
        <rect x="9" y="9" width="152" height="302" rx="19" fill="url(#hs-screen)" />
        <rect x="62" y="16" width="46" height="8" rx="4" fill="#0b1b3f" />
        <text x="24" y="58" fill="#ffffff" fontSize="15" fontWeight="800" fontFamily="Inter, sans-serif">SNET Hotspot</text>
        <text x="24" y="78" fill="#b9d0ff" fontSize="10" fontFamily="Inter, sans-serif">Choose your package</text>
        <g fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round">
          <path d="M70 108 A 22 22 0 0 1 100 108" />
          <path d="M60 98 A 36 36 0 0 1 110 98" opacity="0.6" />
        </g>
        <circle cx="85" cy="118" r="5" fill="#ffffff" />
        {[
          ["1 Hour", "KSh 10", false],
          ["3 Hours", "KSh 20", false],
          ["24 Hours", "KSh 50", true],
        ].map(([t, p, on], i) => (
          <g key={i} transform={`translate(20 ${160 + i * 42})`}>
            <rect width="130" height="34" rx="9" fill={on ? "#1f62ec" : "#eef4ff"} />
            <text x="12" y="22" fontSize="11" fontWeight="600" fill={on ? "#fff" : "#0b1b3f"} fontFamily="Inter, sans-serif">{t as string}</text>
            <text x="118" y="22" fontSize="11" fontWeight="800" textAnchor="end" fill={on ? "#fff" : "#1f62ec"} fontFamily="Inter, sans-serif">{p as string}</text>
          </g>
        ))}
        <rect x="20" y="290" width="130" height="8" rx="4" fill="#dbe7ff" />
      </g>
      {/* connected toast */}
      <g transform="translate(390 330)" filter="url(#hs-sh)">
        <rect width="170" height="54" rx="14" fill="#ffffff" />
        <circle cx="27" cy="27" r="13" fill="#22c55e" />
        <path d="M21 27 L25.5 31.5 L33 23" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="50" y="24" fontSize="12" fontWeight="700" fill="#0b1b3f" fontFamily="Inter, sans-serif">Connected</text>
        <text x="50" y="40" fontSize="10" fill="#6b7385" fontFamily="Inter, sans-serif">10 Mbps · 24 Hours</text>
      </g>
    </svg>
  );
}

export function HomeScene({ className = "" }: SceneProps) {
  return (
    <svg {...svgProps} className={className}>
      <defs>
        <linearGradient id="hm-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7efff" />
          <stop offset="1" stopColor="#d6e3fb" />
        </linearGradient>
        <filter id="hm-sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#0b1b3f" floodOpacity="0.2" />
        </filter>
      </defs>
      <rect width="600" height="450" fill="url(#hm-wall)" />
      {/* window with light */}
      <rect x="390" y="40" width="160" height="200" rx="8" fill="#ffffff" />
      <rect x="402" y="52" width="136" height="176" rx="4" fill="#bfe6fb" />
      <circle cx="500" cy="100" r="26" fill="#ffd36b" />
      <path d="M470 52 V228 M402 140 H538" stroke="#ffffff" strokeWidth="6" />
      {/* frame */}
      <rect x="70" y="60" width="120" height="90" rx="6" fill="#ffffff" />
      <rect x="80" y="70" width="100" height="70" rx="3" fill="#1f62ec" opacity="0.85" />
      <path d="M80 140 L118 100 L140 122 L156 108 L180 132 V140 Z" fill="#1fb5ef" />
      {/* floor + console table */}
      <rect x="0" y="380" width="600" height="70" fill="#c5d5f2" />
      <rect x="60" y="300" width="400" height="16" rx="4" fill="#13285a" />
      <rect x="80" y="316" width="12" height="70" fill="#13285a" />
      <rect x="428" y="316" width="12" height="70" fill="#13285a" />
      {/* router */}
      <g transform="translate(110 238)" filter="url(#hm-sh)">
        <path d="M24 8 L14 -46" stroke="#0b1b3f" strokeWidth="7" strokeLinecap="round" />
        <path d="M116 8 L126 -46" stroke="#0b1b3f" strokeWidth="7" strokeLinecap="round" />
        <rect width="140" height="62" rx="14" fill="#ffffff" />
        <rect y="40" width="140" height="22" rx="10" fill="#e8ebf2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={30 + i * 20} cy="22" r="4.5" fill={i < 4 ? "#22c55e" : "#1fb5ef"} />
        ))}
      </g>
      <g fill="none" stroke="#1f62ec" strokeWidth="6" strokeLinecap="round">
        <path d="M150 160 A 40 40 0 0 1 210 160" opacity="0.8" />
        <path d="M130 136 A 70 70 0 0 1 230 136" opacity="0.45" />
      </g>
      {/* laptop */}
      <g transform="translate(270 196)" filter="url(#hm-sh)">
        <rect width="150" height="96" rx="8" fill="#0b1b3f" />
        <rect x="7" y="7" width="136" height="82" rx="4" fill="#1f62ec" />
        <rect x="18" y="20" width="70" height="8" rx="4" fill="#ffffff" />
        <rect x="18" y="34" width="46" height="6" rx="3" fill="#b9d0ff" />
        <rect x="18" y="52" width="50" height="26" rx="4" fill="#ffffff" opacity="0.2" />
        <rect x="74" y="52" width="56" height="26" rx="4" fill="#ffffff" opacity="0.2" />
        <path d="M-14 96 H164 L156 106 H-6 Z" fill="#13285a" />
      </g>
      {/* plant */}
      <g transform="translate(500 250)">
        <path d="M20 40 Q -10 0 4 -40 Q 24 -6 20 40" fill="#22a06b" />
        <path d="M24 40 Q 50 -4 40 -46 Q 18 -4 24 40" fill="#2fbf7f" />
        <path d="M22 40 Q 22 -10 22 -60" stroke="#1b8a5a" strokeWidth="4" />
        <path d="M0 40 H46 L40 92 H6 Z" fill="#ffffff" />
      </g>
      {/* speed badge */}
      <g transform="translate(330 70)" filter="url(#hm-sh)">
        <rect width="150" height="70" rx="16" fill="#ffffff" />
        <text x="18" y="30" fontSize="11" fill="#6b7385" fontFamily="Inter, sans-serif">Monthly</text>
        <text x="18" y="56" fontSize="24" fontWeight="800" fill="#0b1b3f" fontFamily="Inter, sans-serif">10</text>
        <text x="50" y="56" fontSize="13" fontWeight="700" fill="#1f62ec" fontFamily="Inter, sans-serif">Mbps</text>
        <path d="M110 48 A 18 18 0 1 1 134 48" fill="none" stroke="#dbe7ff" strokeWidth="6" strokeLinecap="round" />
        <path d="M110 48 A 18 18 0 0 1 130 22" fill="none" stroke="#1f62ec" strokeWidth="6" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function TvScene({ className = "" }: SceneProps) {
  const tiles = ["#1f62ec", "#ff6b4a", "#7c3aed", "#1fb5ef", "#f59e0b", "#0e40ad", "#22c55e", "#ec4899"];
  return (
    <svg {...svgProps} className={className}>
      <defs>
        <linearGradient id="tv-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#13285a" />
          <stop offset="1" stopColor="#0b1b3f" />
        </linearGradient>
        <radialGradient id="tv-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0" stopColor="#1f62ec" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1f62ec" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="450" fill="url(#tv-wall)" />
      <ellipse cx="300" cy="190" rx="300" ry="190" fill="url(#tv-glow)" />
      {/* tv */}
      <rect x="90" y="56" width="420" height="250" rx="12" fill="#030a1c" />
      <rect x="100" y="66" width="400" height="230" rx="6" fill="#061430" />
      {tiles.map((c, i) => (
        <g key={i} transform={`translate(${112 + (i % 4) * 97} ${150 + Math.floor(i / 4) * 70})`}>
          <rect width="88" height="60" rx="6" fill={c} opacity="0.9" />
          <rect x="8" y="44" width="40" height="6" rx="3" fill="#ffffff" opacity="0.7" />
        </g>
      ))}
      <rect x="112" y="82" width="150" height="12" rx="6" fill="#ffffff" />
      <rect x="112" y="102" width="100" height="8" rx="4" fill="#86adff" />
      <rect x="112" y="120" width="70" height="18" rx="9" fill="#1f62ec" />
      <circle cx="440" cy="106" r="24" fill="#ffffff" opacity="0.15" />
      <path d="M433 94 L452 106 L433 118 Z" fill="#ffffff" />
      {/* console */}
      <rect x="60" y="340" width="480" height="20" rx="4" fill="#e9c9a1" />
      <rect x="70" y="360" width="460" height="60" rx="4" fill="#d9b27f" />
      <rect x="290" y="368" width="2" height="44" fill="#c9a06c" />
      {/* router on console */}
      <g transform="translate(110 306)">
        <path d="M14 10 L8 -14 M66 10 L72 -14" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
        <rect width="80" height="34" rx="8" fill="#ffffff" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={22 + i * 18} cy="17" r="3.5" fill="#22c55e" />
        ))}
      </g>
      {/* binding link */}
      <path d="M190 310 C 240 290, 260 300, 300 300" stroke="#1fb5ef" strokeWidth="3" strokeDasharray="6 7" fill="none" />
      {/* plant */}
      <g transform="translate(470 270)">
        <path d="M20 70 Q -12 20 6 -20 Q 26 20 20 70" fill="#22a06b" />
        <path d="M24 70 Q 54 20 40 -26 Q 16 20 24 70" fill="#2fbf7f" />
        <path d="M2 70 H46 L40 70 Z" fill="#fff" />
      </g>
      {/* badge */}
      <g transform="translate(420 20)">
        <rect width="150" height="44" rx="22" fill="#1fb5ef" />
        <text x="75" y="28" textAnchor="middle" fontSize="13" fontWeight="800" fill="#061430" fontFamily="Inter, sans-serif">
          TV BINDING · 8 Mbps
        </text>
      </g>
    </svg>
  );
}

export function CommunityScene({ className = "" }: SceneProps) {
  return (
    <svg {...svgProps} className={className}>
      <defs>
        <linearGradient id="cm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe0ff" />
          <stop offset="1" stopColor="#eef6ff" />
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill="url(#cm-sky)" />
      <circle cx="500" cy="80" r="38" fill="#ffd36b" />
      <circle cx="500" cy="80" r="58" fill="#ffd36b" opacity="0.25" />
      <path d="M0 270 Q 150 200 320 250 T 600 225 V450 H0 Z" fill="#86adff" />
      <path d="M0 320 Q 200 270 360 310 T 600 290 V450 H0 Z" fill="#1f62ec" />
      <rect y="380" width="600" height="70" fill="#0e40ad" />
      {/* mast */}
      <g transform="translate(300 0)">
        <path d="M-26 330 L0 120 L26 330" stroke="#0b1b3f" strokeWidth="6" fill="none" />
        <path d="M-19 280 L19 280 M-13 230 L13 230 M-8 180 L8 180 M-19 280 L13 230 M19 280 L-13 230 M-13 230 L8 180 M13 230 L-8 180" stroke="#0b1b3f" strokeWidth="3" />
        <circle cy="114" r="9" fill="#1fb5ef" stroke="#0b1b3f" strokeWidth="3" />
        <g fill="none" stroke="#0e40ad" strokeWidth="5" strokeLinecap="round">
          <path d="M-30 92 A 40 40 0 0 1 30 92" />
          <path d="M-54 70 A 72 72 0 0 1 54 70" opacity="0.6" />
          <path d="M-78 48 A 104 104 0 0 1 78 48" opacity="0.3" />
        </g>
      </g>
      {/* school */}
      <g transform="translate(50 268)">
        <rect y="34" width="150" height="80" fill="#ffffff" />
        <path d="M-12 36 L75 -6 L162 36 Z" fill="#0b1b3f" />
        <rect x="60" y="66" width="30" height="48" fill="#1f62ec" />
        <rect x="16" y="52" width="26" height="20" rx="2" fill="#1fb5ef" />
        <rect x="108" y="52" width="26" height="20" rx="2" fill="#1fb5ef" />
        <path d="M75 -6 V-44" stroke="#0b1b3f" strokeWidth="3" />
        <path d="M75 -44 H102 L95 -35 L102 -26 H75 Z" fill="#ffab1a" />
      </g>
      {/* market */}
      <g transform="translate(380 300)">
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(${i * 98} 0)`}>
            <rect x="6" y="30" width="76" height="56" fill="#ffffff" />
            <path d="M0 30 L10 4 H78 L88 30 Z" fill={i ? "#ffab1a" : "#1fb5ef"} />
            <path d="M0 30 Q 11 42 22 30 Q 33 42 44 30 Q 55 42 66 30 Q 77 42 88 30" fill={i ? "#ffd36b" : "#86e0fb"} />
            <rect x="14" y="56" width="60" height="10" rx="2" fill="#dbe7ff" />
          </g>
        ))}
      </g>
      {/* people */}
      {[
        [240, 360, "#0b1b3f", "#ffab1a"],
        [356, 368, "#ffab1a", "#0b1b3f"],
        [214, 380, "#ffffff", "#13285a"],
      ].map(([x, y, shirt, head], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="10" fill={head as string} />
          <rect x="-11" y="13" width="22" height="40" rx="10" fill={shirt as string} />
          <rect x="9" y="18" width="8" height="13" rx="2" fill="#1fb5ef" />
        </g>
      ))}
    </svg>
  );
}

/* --- Dotted Africa coverage map --- */
const africa: [number, number][] = [
  [-17, 21], [-16, 26], [-10, 30], [-6, 35.8], [10, 37], [11, 33], [20, 31], [25, 31.5], [32, 31.3], [34, 28],
  [37, 22], [39, 16], [43, 12.5], [51, 11.8], [51, 10], [48, 5], [42, -1], [40, -5], [39.5, -10], [40.5, -15],
  [35, -22], [33, -26], [30, -31], [25, -34], [20, -34.8], [18, -32], [15, -27], [12, -18], [13.5, -12], [12, -6],
  [9, -1], [9.5, 4], [5, 6], [-2, 5], [-8, 4.5], [-13, 8], [-17, 14],
];
const madagascar: [number, number][] = [[44, -25], [47, -25.5], [50.4, -15.5], [49.3, -12], [44, -17]];

const proj = ([lon, lat]: [number, number]) => [(lon + 20) * 6, (38 - lat) * 6] as const;

function inside(pt: readonly [number, number], poly: readonly (readonly [number, number])[]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

const polys = [africa.map(proj), madagascar.map(proj)];
const dots: [number, number][] = [];
for (let y = 4; y < 440; y += 9) for (let x = 4; x < 440; x += 9) if (polys.some((p) => inside([x, y], p))) dots.push([x, y]);

export function CoverageMap({ className = "" }: SceneProps) {
  const [kx, ky] = proj([37.5, 0.2]);
  const pins: { lon: number; lat: number; c: string }[] = [
    { lon: 36.8, lat: -1.3, c: "#1fb5ef" },
    { lon: 34.8, lat: 0.5, c: "#ffab1a" },
    { lon: 39.6, lat: -4, c: "#22c55e" },
  ];
  return (
    <svg viewBox="0 0 440 440" className={className} aria-hidden="true">
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#b8c2d6" />
      ))}
      <circle cx={kx} cy={ky} r="46" fill="#1f62ec" opacity="0.12" />
      <circle cx={kx} cy={ky} r="30" fill="#1f62ec" opacity="0.18" className="animate-ping-slow" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      {pins.map((p, i) => {
        const [x, y] = proj([p.lon, p.lat]);
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <ellipse cy="2" rx="7" ry="3" fill="#0b1b3f" opacity="0.2" />
            <path d="M0 0 C -14 -16 -14 -34 0 -34 C 14 -34 14 -16 0 0 Z" fill={p.c} />
            <circle cy="-22" r="5" fill="#ffffff" />
          </g>
        );
      })}
    </svg>
  );
}
