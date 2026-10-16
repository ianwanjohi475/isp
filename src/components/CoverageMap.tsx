type SceneProps = { className?: string };

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
