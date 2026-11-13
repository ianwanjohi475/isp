"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  RingGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { LAND_B64, LAND_COUNT } from "./land";

/* ---------- helpers ---------- */
const DEG = Math.PI / 180;

/** lat/lon → point on a sphere. lon 0 faces the camera (+z), east is to the right (+x). */
function toXYZ(lat: number, lon: number, r = 1) {
  const la = lat * DEG;
  const lo = lon * DEG;
  return new Vector3(r * Math.cos(la) * Math.sin(lo), r * Math.sin(la), r * Math.cos(la) * Math.cos(lo));
}

function decodeLand() {
  const bin = atob(LAND_B64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

const KENYA = { lat: 0.2, lon: 37.9 };
/** Decorative hotspot beacons around the hub. */
const BEACONS = [
  { lat: -1.3, lon: 36.8, s: 1 },
  { lat: 0.5, lon: 35.3, s: 0.7 },
  { lat: -3.9, lon: 39.6, s: 0.7 },
  { lat: 2.6, lon: 37.6, s: 0.6 },
];

const dotsVert = /* glsl */ `
  attribute float aSeed;
  attribute float aHub;
  uniform float uTime;
  uniform float uSize;
  varying float vHub;
  varying float vTw;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vHub = aHub;
    vTw = 0.72 + 0.28 * sin(uTime * 1.6 + aSeed * 40.0);
    // a wave of light travelling outward from the hub
    float wave = smoothstep(0.06, 0.0, abs(fract(uTime * 0.18) * 1.6 - (1.0 - aHub)));
    vHub = max(vHub * vHub * vHub, wave * 0.9);
    gl_PointSize = uSize * (1.0 + vHub * 1.1) * (3.6 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const dotsFrag = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  uniform vec3 uHot;
  varying float vHub;
  varying float vTw;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = length(p);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.18, d);
    vec3 c = mix(uColor, uHot, clamp(vHub, 0.0, 1.0));
    gl_FragColor = vec4(c * vTw * (1.0 + vHub * 0.6), a);
  }
`;

const coreVert = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;
const coreFrag = /* glsl */ `
  precision mediump float;
  varying vec3 vN;
  varying vec3 vV;
  uniform vec3 uInner;
  uniform vec3 uRim;
  void main() {
    float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.6);
    vec3 c = mix(uInner, uRim, f);
    gl_FragColor = vec4(c, 0.96);
  }
`;
const atmoFrag = /* glsl */ `
  precision mediump float;
  varying vec3 vN;
  varying vec3 vV;
  uniform vec3 uRim;
  void main() {
    float f = pow(max(0.62 - dot(vN, vec3(0.0, 0.0, 1.0)), 0.0), 3.2);
    gl_FragColor = vec4(uRim, 1.0) * f * 1.5;
  }
`;

const dustVert = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uSize;
  varying float vA;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vA = 0.35 + 0.65 * abs(sin(uTime * 0.7 + aSeed * 30.0));
    gl_PointSize = uSize * (0.5 + aSeed) * (3.6 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;
const dustFrag = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  varying float vA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, smoothstep(0.5, 0.0, d) * vA * 0.8);
  }
`;

type Props = {
  className?: string;
  /** lighter scene: no orbit rings, fewer particles */
  lite?: boolean;
  /** shown if WebGL is unavailable */
  fallback?: ReactNode;
};

export default function Globe({ className = "", lite = false, fallback = null }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }
    const small = window.matchMedia("(max-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.cssText = "width:100%;height:100%;display:block;";
    canvas.setAttribute("aria-hidden", "true");
    el.appendChild(canvas);

    const scene = new Scene();
    const camera = new PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0, 4.6);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(o: T) => (disposables.push(o), o);

    /* globe group (rotates) */
    const globe = new Group();
    scene.add(globe);

    const blue = new Color("#4f86f7");
    const sky = new Color("#7fe3ff");
    const rim = new Color("#1f62ec");

    // core sphere
    const coreMat = track(
      new ShaderMaterial({
        vertexShader: coreVert,
        fragmentShader: coreFrag,
        uniforms: { uInner: { value: new Color("#06102b") }, uRim: { value: new Color("#17419f") } },
        transparent: true,
      }),
    );
    globe.add(new Mesh(track(new SphereGeometry(1, 64, 48)), coreMat));

    // atmosphere glow
    const atmoMat = track(
      new ShaderMaterial({
        vertexShader: coreVert,
        fragmentShader: atmoFrag,
        uniforms: { uRim: { value: rim } },
        side: BackSide,
        blending: AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    );
    const atmo = new Mesh(track(new SphereGeometry(1.22, 48, 32)), atmoMat);
    scene.add(atmo);

    // land dots
    const land = decodeLand();
    const pos = new Float32Array(LAND_COUNT * 3);
    const seed = new Float32Array(LAND_COUNT);
    const hub = new Float32Array(LAND_COUNT);
    const hubV = toXYZ(KENYA.lat, KENYA.lon);
    for (let i = 0; i < LAND_COUNT; i++) {
      const v = toXYZ(land[i * 2] / 100, land[i * 2 + 1] / 100, 1.006);
      pos.set([v.x, v.y, v.z], i * 3);
      seed[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      // 1 at the hub, falling to 0 about 60° away
      const ang = Math.acos(Math.min(1, v.clone().normalize().dot(hubV)));
      hub[i] = Math.max(0, 1 - ang / 1.05);
    }
    const dotsGeo = track(new BufferGeometry());
    dotsGeo.setAttribute("position", new BufferAttribute(pos, 3));
    dotsGeo.setAttribute("aSeed", new BufferAttribute(seed, 1));
    dotsGeo.setAttribute("aHub", new BufferAttribute(hub, 1));
    const dotsMat = track(
      new ShaderMaterial({
        vertexShader: dotsVert,
        fragmentShader: dotsFrag,
        uniforms: { uTime: { value: 0 }, uSize: { value: 7.5 * dpr }, uColor: { value: blue }, uHot: { value: sky } },
        transparent: true,
        depthWrite: false,
      }),
    );
    globe.add(new Points(dotsGeo, dotsMat));

    // beacons: glowing dot + expanding rings
    const rings: { mesh: Mesh; mat: MeshBasicMaterial; phase: number; s: number }[] = [];
    const ringGeo = track(new RingGeometry(0.9, 1, 48));
    const dotGeo = track(new SphereGeometry(0.014, 12, 12));
    const beaconMat = track(new MeshBasicMaterial({ color: 0xffffff }));
    BEACONS.forEach((b, bi) => {
      const p = toXYZ(b.lat, b.lon, 1.012);
      const dot = new Mesh(dotGeo, beaconMat);
      dot.position.copy(p);
      dot.scale.setScalar(b.s * (bi === 0 ? 1.6 : 1.1));
      globe.add(dot);
      const n = bi === 0 ? 3 : 1;
      for (let k = 0; k < n; k++) {
        const mat = track(
          new MeshBasicMaterial({ color: 0x7fe3ff, transparent: true, opacity: 0, side: DoubleSide, depthWrite: false, blending: AdditiveBlending }),
        );
        const m = new Mesh(ringGeo, mat);
        m.position.copy(p);
        m.lookAt(p.clone().multiplyScalar(2));
        globe.add(m);
        rings.push({ mesh: m, mat, phase: k / n + bi * 0.23, s: b.s });
      }
    });

    /* orbit rings + satellites (do not rotate with the globe) */
    const orbits: { group: Group; sat: Mesh; r: number; speed: number }[] = [];
    if (!lite) {
      const satGeo = track(new SphereGeometry(0.022, 12, 12));
      const satMat = track(new MeshBasicMaterial({ color: 0x7fe3ff }));
      [
        { r: 1.42, rx: 68, rz: 18, speed: 0.38 },
        { r: 1.62, rx: 78, rz: -28, speed: -0.26 },
      ].forEach((o) => {
        const g = new Group();
        g.rotation.set(o.rx * DEG, 0, o.rz * DEG);
        const mat = track(new MeshBasicMaterial({ color: 0x4f86f7, transparent: true, opacity: 0.32 }));
        g.add(new Mesh(track(new TorusGeometry(o.r, 0.0028, 6, 160)), mat));
        const sat = new Mesh(satGeo, satMat);
        g.add(sat);
        scene.add(g);
        orbits.push({ group: g, sat, r: o.r, speed: o.speed });
      });
    }

    /* floating particles */
    const dustN = lite ? 120 : small ? 220 : 420;
    const dpos = new Float32Array(dustN * 3);
    const dseed = new Float32Array(dustN);
    for (let i = 0; i < dustN; i++) {
      const r = 1.45 + Math.random() * 1.6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      dpos.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) * 0.8, r * Math.sin(ph) * Math.sin(th)], i * 3);
      dseed[i] = Math.random();
    }
    const dustGeo = track(new BufferGeometry());
    dustGeo.setAttribute("position", new BufferAttribute(dpos, 3));
    dustGeo.setAttribute("aSeed", new BufferAttribute(dseed, 1));
    const dustMat = track(
      new ShaderMaterial({
        vertexShader: dustVert,
        fragmentShader: dustFrag,
        uniforms: { uTime: { value: 0 }, uSize: { value: 9 * dpr }, uColor: { value: sky } },
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    );
    const dust = new Points(dustGeo, dustMat);
    scene.add(dust);

    /* orientation: Africa centred, Kenya just right of centre */
    const baseY = -24 * DEG;
    const baseX = 6 * DEG;
    globe.rotation.set(baseX, baseY, 0);

    /* pointer parallax */
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

    /* sizing */
    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // keep the whole globe + orbits in view on narrow canvases
      camera.position.z = camera.aspect < 1 ? 4.6 / camera.aspect : 4.6;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    ro.observe(el);

    /* loop */
    let raf = 0;
    let running = false;
    let visible = false;
    let first = true;
    const draw = (now: number) => {
      const t = now / 1000;
      dotsMat.uniforms.uTime.value = t;
      dustMat.uniforms.uTime.value = t;

      cur.x += (target.x - cur.x) * 0.045;
      cur.y += (target.y - cur.y) * 0.045;
      globe.rotation.y = baseY + Math.sin(t * 0.16) * 0.28 + cur.x * 0.32;
      globe.rotation.x = baseX + Math.sin(t * 0.11) * 0.05 + cur.y * 0.16;
      dust.rotation.y = t * 0.025 + cur.x * 0.08;
      dust.rotation.x = cur.y * 0.05;

      for (const r of rings) {
        const k = (t * 0.45 + r.phase) % 1;
        r.mesh.scale.setScalar((0.02 + k * 0.16) * r.s);
        r.mat.opacity = (1 - k) * 0.85;
      }
      for (const o of orbits) {
        const a = t * o.speed;
        o.sat.position.set(Math.cos(a) * o.r, Math.sin(a) * o.r, 0);
        o.group.rotation.y = cur.x * 0.15;
      }
      renderer.render(scene, camera);
      if (first) {
        first = false;
        setReady(true);
      }
    };
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const sync = () => (visible && !document.hidden ? start() : stop());

    resize();
    draw(performance.now());

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        sync();
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("webglcontextlost", onLost);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      canvas.remove();
    };
  }, [lite]);

  if (failed) return <div className={className}>{fallback}</div>;
  return <div ref={wrap} className={`${className} transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`} />;
}
