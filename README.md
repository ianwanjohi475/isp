# SNET Networks — Website

Fast · Stable · Reliable Network.

Marketing site for SNET Networks built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS 4**.
Layout and section structure are inspired by the Netfix ISP template (top info bar, hero slider with price,
photo plan cards with speed tags, features with counters, services, special offer, CTA band, TV section,
FAQ + coverage map, breadcrumb page headers). All artwork is original SVG — no template images or code.

## Pages

| Route        | Content                                                     |
| ------------ | ----------------------------------------------------------- |
| `/`          | Hero slider, value plans, features, services, offer, TV, FAQ + coverage |
| `/about`     | About us, counters, mission & vision, services, FAQ         |
| `/services`  | Hotspot, monthly and TV binding services + how it works     |
| `/packages`  | Hotspot bundles, monthly plans, TV binding offer            |
| `/contact`   | Call / WhatsApp / email cards, contact form, map            |

Every "Buy / Get connected" button and the contact form open **WhatsApp** with a pre-filled message to 0748 349 372.

## Editing content

Everything (prices, speeds, phone, email, map location) lives in **`src/lib/site.ts`**.

- Change `mapQuery` to your town / office (e.g. `"Kitengela Market, Kenya"`) to update all maps.
- Change `url` to your real domain for SEO.

## Photos

See **`PHOTO-PROMPTS.md`** for a ChatGPT prompt for every picture on the site.
Save each generated image into `public/photos/` with the exact file name from that list
(e.g. `public/photos/hero-hotspot.jpg`) and redeploy — the site uses it automatically.
Until a photo exists, a drawn illustration is shown in its place.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — no configuration needed.

## Brand files

- `public/snet-logo.svg` — full logo (mark + wordmark)
- `public/logo-mark.svg` — square icon (good for WhatsApp/social profile pictures)
