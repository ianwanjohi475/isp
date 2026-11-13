"use client";

/**
 * "The Living Signal" — a hologram made of light particles that assembles into the
 * people in SNET's photos. Each particle samples the photo for its colour and uses
 * brightness for depth, so the picture becomes a 3D relief. It breathes, ripples
 * away from the cursor, and dissolves into signal dust before re-forming as the next scene.
 *
 * One draw call, all motion on the GPU.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  LinearFilter,
  NoColorSpace,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";

const PLANE_W = 3;
const PLANE_H = 2;
const FOV = 30;
const TAN = Math.tan((FOV / 2) * (Math.PI / 180));

const vert = /* glsl */ `
  attribute vec2 aUv;
  attribute float aSeed;
  uniform sampler2D uTexA;
  uniform sampler2D uTexB;
  uniform float uMix;
  uniform float uIntro;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseF;
  uniform float uPx;
  uniform float uRef;
  uniform float uDepth;
  uniform vec2 uOffA;
  uniform vec2 uOffB;
  uniform vec4 uFade; // x: left fade end, y: bottom fade end, z: top fade end
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // staggered morph: every particle switches at its own moment
    float m = smoothstep(0.0, 1.0, clamp(uMix * 1.55 - aSeed * 0.55, 0.0, 1.0));
    float intro = smoothstep(0.0, 1.0, clamp(uIntro * 1.6 - aSeed * 0.6, 0.0, 1.0));

    vec3 col = mix(texture2D(uTexA, aUv).rgb, texture2D(uTexB, aUv).rgb, m);
    float lum = dot(col, vec3(0.299, 0.587, 0.114));

    vec3 p = vec3((aUv.x - 0.5) * ${PLANE_W.toFixed(1)}, (aUv.y - 0.5) * ${PLANE_H.toFixed(1)}, (min(lum, 0.8) - 0.4) * uDepth);

    // breathing
    p.z += sin(uTime * 0.9 + p.x * 2.3 + p.y * 1.9) * 0.03 + sin(uTime * 0.5 + p.y * 4.0) * 0.015;

    // dissolve into signal dust between scenes / on first load
    vec3 rnd = vec3(sin(aSeed * 917.3), cos(aSeed * 373.1), sin(aSeed * 571.7 + 1.3));
    float sc = sin(3.14159 * m) + (1.0 - intro) * 1.4;
    float ang = sc * 1.1 * (aSeed - 0.5);
    p.xy = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p.xy;
    p += rnd * sc * vec3(0.85, 0.6, 1.7);

    // edges crumble into drifting particles
    float edge = smoothstep(0.0, 0.14, min(min(aUv.x, 1.0 - aUv.x), min(aUv.y, 1.0 - aUv.y)));
    p += rnd * (1.0 - edge) * 0.22 * (0.6 + 0.4 * sin(uTime * 0.8 + aSeed * 20.0));

    // cursor: particles lift toward the viewer and part around the pointer
    vec2 d = p.xy - uMouse;
    float f = exp(-dot(d, d) * 5.5) * uMouseF;
    p.z += f * 0.55;
    p.xy += d * f * 0.4;

    p.xy += mix(uOffA, uOffB, m);

    // a band of light sweeps across, like a signal scan
    float scan = smoothstep(0.07, 0.0, abs(fract(uTime * 0.11) * 1.5 - 0.25 - aUv.x));

    // colour grade toward SNET blue, keep skin tones alive
    vec3 graded = mix(col, vec3(lum) * vec3(0.38, 0.62, 1.3), 0.26) * 1.14;
    vColor = min(graded, vec3(0.92)) * (1.0 + f * 0.9 + scan * 0.7) + vec3(0.1, 0.45, 0.9) * (scan * 0.18 + sc * 0.25);

    float a = edge * (0.3 + 0.7 * edge);
    a *= smoothstep(0.0, uFade.x, aUv.x) * smoothstep(0.0, uFade.y, aUv.y) * smoothstep(0.0, uFade.z, 1.0 - aUv.y);
    vAlpha = a * (0.25 + 0.75 * intro) * (1.0 - 0.3 * sin(3.14159 * m));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uPx * (0.82 + min(lum, 0.75) * 0.36 + f * 1.1) * (uRef / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const frag = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.22, d) * vAlpha);
  }
`;

export type PortraitScene = {
  /** URL of the particle texture */
  src: string;
  /** horizontal position of the main subject, 0–1 (used to keep it in frame on phones) */
  focus?: number;
};

type Props = {
  scenes: PortraitScene[];
  index: number;
  className?: string;
  fallback?: ReactNode;
};

export default function SignalPortrait({ scenes, index, className = "", fallback = null }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const api = useRef<{ go: (i: number) => void } | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vw = window.innerWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, vw < 768 ? 1.5 : 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.cssText = "width:100%;height:100%;display:block;";
    canvas.setAttribute("aria-hidden", "true");
    el.appendChild(canvas);

    const scene = new Scene();
    const camera = new PerspectiveCamera(FOV, 1, 0.1, 60);

    /* particle grid: density scales with the device */
    const cols = vw < 768 ? 156 : vw < 1280 ? 222 : 288;
    const rows = Math.round((cols * PLANE_H) / PLANE_W);
    const n = cols * rows;
    const uv = new Float32Array(n * 2);
    const seed = new Float32Array(n);
    for (let y = 0, i = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++, i++) {
        uv[i * 2] = (x + 0.5) / cols;
        uv[i * 2 + 1] = (y + 0.5) / rows;
        seed[i] = Math.random();
      }
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(new Float32Array(n * 3), 3));
    geo.setAttribute("aUv", new BufferAttribute(uv, 2));
    geo.setAttribute("aSeed", new BufferAttribute(seed, 1));

    const blank = new Texture();
    const mat = new ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uTexA: { value: blank },
        uTexB: { value: blank },
        uMix: { value: 0 },
        uIntro: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: new Vector2(99, 99) },
        uMouseF: { value: 0 },
        uPx: { value: 4 },
        uRef: { value: 5 },
        uDepth: { value: 0.55 },
        uOffA: { value: new Vector2() },
        uOffB: { value: new Vector2() },
        uFade: { value: [0.3, 0.001, 0.001, 0] },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const points = new Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);
    const U = mat.uniforms;

    /* layout: where the hologram sits, per screen shape */
    let dist = 5;
    let centre = new Vector2();
    let mobile = false;
    const offsetFor = (i: number) => {
      if (!mobile) return centre.clone();
      const viewW = 2 * TAN * dist * camera.aspect;
      const maxShift = Math.max(0, (PLANE_W - viewW) / 2);
      const s = (0.5 - (scenes[i]?.focus ?? 0.5)) * PLANE_W;
      return new Vector2(Math.max(-maxShift, Math.min(maxShift, s)), centre.y);
    };
    let shown = 0; // scene currently in uTexA
    let next = 0; // scene in uTexB while morphing
    const layout = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      mobile = camera.aspect < 0.9;
      const fill = mobile ? 0.44 : 0.8; // share of the view height the picture fills
      dist = PLANE_H / fill / (2 * TAN);
      const viewH = 2 * TAN * dist;
      const viewW = viewH * camera.aspect;
      centre = mobile
        ? new Vector2(0, viewH / 2 - PLANE_H / 2 - viewH * 0.085)
        : new Vector2(Math.max(0.2, viewW / 2 - PLANE_W / 2 + viewW * 0.02), -viewH * 0.035);
      camera.updateProjectionMatrix();
      U.uRef.value = dist;
      U.uPx.value = (PLANE_H / rows) * (h / viewH) * dpr * 1.02;
      U.uDepth.value = mobile ? 0.34 : 0.46;
      U.uFade.value = mobile ? [0.001, 0.3, 0.14, 0] : [0.34, 0.08, 0.16, 0];
      U.uOffA.value.copy(offsetFor(shown));
      U.uOffB.value.copy(offsetFor(next));
    };

    /* textures */
    const loader = new TextureLoader();
    const textures: (Texture | null)[] = scenes.map(() => null);
    const load = (i: number) =>
      new Promise<Texture>((res, rej) => {
        if (textures[i]) return res(textures[i]!);
        loader.load(
          scenes[i].src,
          (t) => {
            t.colorSpace = NoColorSpace;
            t.minFilter = LinearFilter;
            t.magFilter = LinearFilter;
            t.generateMipmaps = false;
            textures[i] = t;
            res(t);
          },
          undefined,
          rej,
        );
      });

    /* morphing */
    let mixFrom = 0;
    let mixStart = 0;
    let morphing = false;
    let queued: number | null = null;
    const MORPH = 1900;
    const go = (i: number) => {
      if (i === shown && !morphing) return;
      if (morphing) {
        queued = i;
        return;
      }
      load(i)
        .then((t) => {
          next = i;
          U.uTexB.value = t;
          U.uOffB.value.copy(offsetFor(i));
          if (reduce) {
            finish();
            draw(performance.now());
            return;
          }
          morphing = true;
          mixFrom = 0;
          mixStart = performance.now();
        })
        .catch(() => {});
    };
    const finish = () => {
      shown = next;
      U.uTexA.value = U.uTexB.value;
      U.uOffA.value.copy(U.uOffB.value);
      U.uMix.value = 0;
      morphing = false;
      if (queued !== null && queued !== shown) {
        const q = queued;
        queued = null;
        go(q);
      } else queued = null;
    };
    api.current = { go };

    /* pointer */
    const target = new Vector2();
    const cur = new Vector2();
    const mouse = new Vector2(99, 99);
    let mouseF = 0;
    let mouseFT = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      target.set(nx, ny);
      // pointer → point on the picture plane (z = 0), in the plane's own space
      const viewH = 2 * TAN * dist;
      mouse.set(camera.position.x + (nx * viewH * camera.aspect) / 2 - U.uOffA.value.x, camera.position.y + (ny * viewH) / 2 - U.uOffA.value.y);
      mouseFT = ny > -1.1 && ny < 1.1 ? 1 : 0;
    };
    const onLeave = () => (mouseFT = 0);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }

    /* loop */
    let raf = 0;
    let running = false;
    let visible = false;
    let introStart = 0;
    let started = false;
    const draw = (now: number) => {
      const t = now / 1000;
      U.uTime.value = t;
      if (started) U.uIntro.value = reduce ? 1 : Math.min(1, (now - introStart) / 2600);
      if (morphing) {
        const k = Math.min(1, (now - mixStart) / MORPH);
        U.uMix.value = mixFrom + (1 - mixFrom) * k;
        if (k >= 1) finish();
      }
      cur.lerp(target, 0.05);
      mouseF += (mouseFT - mouseF) * 0.08;
      U.uMouse.value.copy(mouse);
      U.uMouseF.value = mouseF;
      // slow orbit + parallax: this is what makes the depth readable
      const sway = reduce ? 0 : Math.sin(t * 0.35) * 0.22;
      camera.position.set((cur.x * 0.55 + sway) * (mobile ? 0.5 : 1), cur.y * 0.3 + Math.sin(t * 0.27) * 0.06, dist);
      camera.lookAt(camera.position.x * 0.35, camera.position.y * 0.35, 0);
      renderer.render(scene, camera);
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

    layout();
    const ro = new ResizeObserver(() => {
      layout();
      if (!running) draw(performance.now());
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    // first scene, then warm the others in the background
    let dead = false;
    load(0)
      .then((t) => {
        if (dead) return;
        U.uTexA.value = t;
        U.uTexB.value = t;
        started = true;
        introStart = performance.now();
        draw(introStart);
        setReady(true);
        scenes.forEach((_, i) => i && setTimeout(() => load(i).catch(() => {}), 1200 * i));
      })
      .catch(() => setFailed(true));

    return () => {
      dead = true;
      api.current = null;
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("webglcontextlost", onLost);
      textures.forEach((t) => t?.dispose());
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      canvas.remove();
    };
    // scenes are static for the lifetime of the hero
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    api.current?.go(index);
  }, [index, ready]);

  if (failed) return <div className={className}>{fallback}</div>;
  return <div ref={wrap} className={`${className} transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} />;
}
