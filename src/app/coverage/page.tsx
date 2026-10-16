import type { Metadata } from "next";
import { Radio, MessageCircle } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { venues } from "@/components/Sections";
import { CtaBand } from "@/components/CtaBand";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Coverage Map",
  description: "See where SNET Networks hotspots are and request Wi-Fi coverage for your market, school or village.",
};

export default function CoveragePage() {
  return (
    <>
      <PageHeader eyebrow="Coverage" title={<>Find SNET <span className="text-gradient">near you.</span></>}>
        Our hotspot network is growing every month across rural centres, markets, entertainment spots and schools.
      </PageHeader>

      <section className="py-20">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <MapEmbed className="h-[520px]" />
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full flex-col rounded-3xl bg-ink-900 p-8 text-white">
              <Radio className="h-8 w-8 text-signal-300" />
              <h2 className="mt-5 text-2xl font-bold text-white">Want SNET in your area?</h2>
              <p className="mt-3 text-slate-300">
                Tell us your town, market or school. We prioritise new hotspots where communities ask for them.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {venues.map((v) => {
                  const Icon = v.icon;
                  return (
                    <li key={v.title} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-signal-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      {v.title}
                    </li>
                  );
                })}
              </ul>
              <a
                href={whatsappLink("Hi SNET Networks 👋, I'd like to request a hotspot in my area. My location is: ")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 pt-3.5 text-sm font-semibold transition hover:bg-brand-400 max-lg:mt-8"
              >
                <MessageCircle className="h-4 w-4" /> Request coverage
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Checking coverage" title="Three ways to know you're covered">
              Look for the <strong className="text-ink-900">SNET</strong> Wi-Fi name on your phone, check the map above, or
              simply call or WhatsApp us with your location.
            </SectionHeading>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
