import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pb-20 pt-36 sm:pt-40">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl" />
      <div className="container-x relative text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-signal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-signal-400" />
          {eyebrow}
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {children && <div className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${dark ? "text-signal-300" : "text-brand-600"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-bold sm:text-4xl ${dark ? "text-white" : ""}`}>{title}</h2>
      {children && <div className={`mt-4 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{children}</div>}
    </div>
  );
}
