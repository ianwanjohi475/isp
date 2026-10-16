export const site = {
  name: "SNET Networks",
  short: "SNET",
  mantra: "Fast. Stable. Reliable.",
  tagline: "Fast, stable & reliable internet — one hotspot at a time.",
  url: "https://snetnetworks.co.ke",
  phone: "0748 349 372",
  phoneIntl: "+254748349372",
  whatsapp: "254748349372",
  email: "snetnetworktelecoms@gmail.com",
  // Change this to your town / office location to update every map on the site.
  mapQuery: "Kenya",
  mapZoom: 6,
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  speed: number;
  period: string;
  blurb: string;
  features: string[];
  badge?: string;
};

export const hotspotPlans: Plan[] = [
  {
    id: "hs-1h",
    name: "Quick Hour",
    price: 10,
    speed: 6,
    period: "1 Hour",
    blurb: "Check messages, pay bills, quick browsing.",
    features: ["6 Mbps speed", "Valid for 1 hour", "1 device"],
  },
  {
    id: "hs-3h",
    name: "Power 3",
    price: 20,
    speed: 8,
    period: "3 Hours",
    blurb: "Classes, video calls and social media.",
    features: ["8 Mbps speed", "Valid for 3 hours", "1 device"],
  },
  {
    id: "hs-12h",
    name: "Half Day",
    price: 35,
    speed: 8,
    period: "12 Hours",
    blurb: "Work, study and stream through the day.",
    features: ["8 Mbps speed", "Valid for 12 hours", "1 device"],
    badge: "Popular",
  },
  {
    id: "hs-24h",
    name: "Full Day",
    price: 50,
    speed: 10,
    period: "24 Hours",
    blurb: "The best value for a full day online.",
    features: ["10 Mbps speed", "Valid for 24 hours", "1 device"],
    badge: "Best value",
  },
];

export const monthlyPlans: Plan[] = [
  {
    id: "m-8",
    name: "Home Basic",
    price: 1500,
    speed: 8,
    period: "Month",
    blurb: "Perfect for small homes and single users.",
    features: ["8 Mbps dedicated line", "Browsing, YouTube & social", "Ideal for 2–4 devices", "Local support"],
  },
  {
    id: "m-10",
    name: "Home Plus",
    price: 2000,
    speed: 10,
    period: "Month",
    blurb: "Smooth HD streaming for the whole family.",
    features: ["10 Mbps dedicated line", "HD streaming & video calls", "Ideal for 4–6 devices", "Priority support"],
    badge: "Most popular",
  },
  {
    id: "m-15",
    name: "Business Pro",
    price: 2500,
    speed: 15,
    period: "Month",
    blurb: "For shops, offices and power users.",
    features: ["15 Mbps dedicated line", "Multiple HD streams", "Ideal for 6+ devices", "Priority support"],
  },
];

export const tvPlan: Plan = {
  id: "tv-8",
  name: "TV Binding",
  price: 499,
  speed: 8,
  period: "Month",
  blurb: "Turn your Smart TV into an entertainment hub.",
  features: ["8 Mbps bound to your TV", "YouTube, Netflix & live streams", "Set up by our technicians", "Billed monthly"],
};

export const ksh = (n: number) => `KSh ${n.toLocaleString("en-KE")}`;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function planMessage(plan: Plan, kind: string) {
  return `Hi SNET Networks 👋, I'd like to get the ${kind} "${plan.name}" package — ${plan.speed} Mbps for ${ksh(plan.price)} / ${plan.period}.`;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Packages" },
  { href: "/coverage", label: "Coverage" },
  { href: "/contact", label: "Contact" },
];
