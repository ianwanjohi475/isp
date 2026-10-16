import type { Metadata } from "next";
import { Mail, MessageCircle, PhoneCall } from "lucide-react";
import { Breadcrumb, SectionTitle } from "@/components/Ui";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call SNET Networks on ${site.phone} or email ${site.email} to get connected.`,
};

const cards = [
  { icon: PhoneCall, title: "Call Us", value: site.phone, href: `tel:${site.phoneIntl}`, note: "Call SNET Networks" },
  { icon: MessageCircle, title: "WhatsApp", value: site.phone, href: whatsappLink("Hi SNET Networks 👋"), note: "Chat with us on WhatsApp" },
  { icon: Mail, title: "Email Us", value: site.email, href: `mailto:${site.email}`, note: "Send us an email" },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb title="Contact Us" current="Contact" />

      <section className="section-space">
        <div className="container-x">
          <div className="grid gap-7 md:grid-cols-3">
            {cards.map((c, i) => {
              const Icon = c.icon;
              const external = c.href.startsWith("http");
              return (
                <Reveal key={c.title} delay={i * 90}>
                  <a
                    href={c.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group block h-full rounded-md border border-line bg-white p-9 text-center transition duration-300 hover:-translate-y-1.5 hover:border-primary-500 hover:shadow-[0_20px_50px_rgba(11,27,63,0.1)]"
                  >
                    <span className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary-50 text-primary-500 transition group-hover:bg-primary-500 group-hover:text-white">
                      <Icon className="h-8 w-8" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-6 text-2xl">{c.title}</h3>
                    <p className="mt-1 text-sm">{c.note}</p>
                    <p className="mt-3 break-all text-lg font-medium text-primary-500">{c.value}</p>
                  </a>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionTitle sub="Get in touch" title="Send Us A Message">
                <p>Tell us which package you need — Hotspot, Monthly or TV Binding.</p>
              </SectionTitle>
              <div className="mt-10">
                <ContactForm />
              </div>
            </Reveal>
            <Reveal delay={120} className="scroll-mt-24" >
              <div id="map" className="h-full min-h-[460px] scroll-mt-28">
                <MapEmbed className="h-full" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
