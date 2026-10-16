import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call SNET Networks on ${site.phone} or email ${site.email} to get connected.`,
};

const channels = [
  { icon: Phone, label: "Call us", value: site.phone, href: `tel:${site.phoneIntl}` },
  { icon: MessageCircle, label: "WhatsApp", value: site.phone, href: whatsappLink("Hi SNET Networks 👋") },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title={<>Let&apos;s get you <span className="text-gradient">connected.</span></>}>
        Questions about packages, coverage or support? Our team is a call or text away.
      </PageHeader>

      <section className="py-20">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {channels.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.label} delay={i * 80}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-5 rounded-3xl bg-white p-6 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/10 hover:ring-brand-200"
                  >
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-slate-500">{c.label}</span>
                      <span className="block break-all font-display font-semibold text-ink-900 group-hover:text-brand-600">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
            <Reveal delay={260}>
              <div className="flex items-center gap-5 rounded-3xl bg-ink-900 p-6 text-white">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-signal-300">
                  <Clock className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-sm text-slate-400">Hotspot network</span>
                  <span className="block font-display font-semibold">Online around the clock</span>
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-3" delay={120}>
            <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-ink-900/5 ring-1 ring-slate-200 sm:p-10">
              <h2 className="text-2xl font-bold">Send us a message</h2>
              <p className="mb-8 mt-2 text-slate-600">Fill in the form and we&apos;ll get back to you quickly.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <MapEmbed className="h-[420px]" />
        </div>
      </section>
    </>
  );
}
