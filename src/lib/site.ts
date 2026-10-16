export const site = {
  name: "SNET Networks",
  mantra: "Fast, Stable, Reliable Network",
  url: "https://snetnetworks.co.ke",
  phone: "0748 349372",
  phoneIntl: "+254748349372",
  whatsapp: "254748349372",
  email: "snetnetworktelecoms@gmail.com",
  // Change this to your town / office location to update every map on the site.
  mapQuery: "Kenya",
  mapZoom: 6,
};

export type Plan = {
  id: string;
  /** e.g. "1 Hour", "8 Mbps", "TV Binding" */
  name: string;
  price: number;
  speed: number;
  /** what the price is per: "1 Hour", "Month" ... */
  period: string;
};

/** Hotspot Services */
export const hotspotPlans: Plan[] = [
  { id: "hs-1h", name: "1 Hour", price: 10, speed: 6, period: "1 Hour" },
  { id: "hs-3h", name: "3 Hours", price: 20, speed: 8, period: "3 Hours" },
  { id: "hs-12h", name: "12 Hours", price: 35, speed: 8, period: "12 Hours" },
  { id: "hs-24h", name: "24 Hours", price: 50, speed: 10, period: "24 Hours" },
];

/** Monthly Services */
export const monthlyPlans: Plan[] = [
  { id: "m-8", name: "8 Mbps", price: 1500, speed: 8, period: "Month" },
  { id: "m-10", name: "10 Mbps", price: 2000, speed: 10, period: "Month" },
  { id: "m-15", name: "15 Mbps", price: 2500, speed: 15, period: "Month" },
];

/** TV Binding Services */
export const tvPlan: Plan = { id: "tv-8", name: "TV Binding", price: 499, speed: 8, period: "Month" };

export const ksh = (n: number) => `KSh ${n.toLocaleString("en-KE")}`;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function planMessage(plan: Plan, kind: string) {
  return `Hi SNET Networks 👋, I'd like the ${kind} package: ${plan.name} — ${plan.speed} Mbps for ${ksh(plan.price)} / ${plan.period}.`;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" },
];

/**
 * Graphics. Save each image into /public/photos/ with this file name (.png, .jpg or .webp)
 * and the site uses it automatically on the next build. Until a file exists, the built-in
 * drawn graphic shows. See IMAGE-PROMPTS.md for the prompt to generate each one.
 */
export const photos = {
  heroHotspot: "hero-hotspot",
  heroMonthly: "hero-monthly",
  heroTv: "hero-tv",
  hotspot: "hotspot",
  monthly: "monthly",
  tv: "tv-binding",
  community: "community",
  offer: "offer-24-hours",
} as const;

export type PhotoSlot = keyof typeof photos;
