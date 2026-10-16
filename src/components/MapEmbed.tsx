import { site } from "@/lib/site";

export function MapEmbed({ className = "" }: { className?: string }) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=${site.mapZoom}&output=embed`;
  return (
    <div className={`overflow-hidden rounded-3xl bg-slate-100 shadow-xl shadow-ink-900/10 ring-1 ring-slate-200 ${className}`}>
      <iframe
        title="SNET Networks coverage map"
        src={src}
        className="h-full min-h-[380px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
