# SNET Networks — Website

Fast · Stable · Reliable Network.

Marketing site for SNET Networks built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS 4**.
All artwork (logo, hero, community and TV illustrations) is original, hand-built SVG — no template images.

## Pages

| Route        | Content                                                     |
| ------------ | ----------------------------------------------------------- |
| `/`          | Hero, packages (tabs), how hotspot works, about, map, FAQ   |
| `/about`     | About us, mission, vision, values, where we connect         |
| `/services`  | Hotspot, monthly and TV binding packages                    |
| `/coverage`  | Coverage map + request a hotspot                            |
| `/contact`   | Phone, WhatsApp, email, contact form, map                   |

Every "Buy / Get connected" button and the contact form open **WhatsApp** with a pre-filled message to 0748 349 372.

## Editing content

Everything (prices, speeds, phone, email, map location) lives in **`src/lib/site.ts`**.

- Change `mapQuery` to your town / office (e.g. `"Kitengela Market, Kenya"`) to update all maps.
- Change `url` to your real domain for SEO.

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
