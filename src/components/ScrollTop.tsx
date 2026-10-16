"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollTop() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? window.scrollY / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary-500 shadow-xl transition duration-300 hover:bg-primary-500 hover:text-white ${
        p > 0.05 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r={r} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
        <circle cx="28" cy="28" r={r} fill="none" stroke="#1f62ec" strokeWidth="3" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p)} />
      </svg>
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
