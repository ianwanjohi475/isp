import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I connect to an SNET hotspot?",
    a: "Turn on Wi-Fi on your phone or laptop, join the SNET network, pick a package on the page that opens and pay. You're online instantly.",
  },
  {
    q: "Can I use one hotspot package on several devices?",
    a: "Each hotspot package is for one device at a time. For several devices at home or work, a monthly package is better value.",
  },
  {
    q: "What happens when my hotspot time runs out?",
    a: "You'll simply be disconnected. Buy any package again to continue — there are no contracts or hidden charges.",
  },
  {
    q: "How do I get a monthly or TV Binding connection?",
    a: "Call or WhatsApp us with your location. Our team confirms coverage, schedules a visit and sets everything up for you.",
  },
  {
    q: "Can SNET bring a hotspot to my market, school or business?",
    a: "Yes! We're always growing. Tell us where you are and we'll check how quickly we can bring SNET Wi-Fi to your area.",
  },
];

export function Faq() {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-3xl bg-white ring-1 ring-slate-200">
      {faqs.map((f) => (
        <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-ink-900">
            {f.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-brand-500 transition group-open:rotate-180" />
          </summary>
          <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
