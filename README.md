# SNET Networks — Website

Fast · Stable · Reliable Network.

Marketing site for SNET Networks built with **Next.js 16 (App Router)**, **TypeScript** and **Tailwind CSS 4**.
Layout and section structure are inspired by the Netfix ISP template (top info bar, hero slider with price,
photo plan cards with speed tags, features with counters, services, special offer, CTA band, TV section,
FAQ + coverage map, breadcrumb page headers). All photography and the logo are SNET-owned images — no template images or code.

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

## 3D

- **The Living Signal** (`src/components/three/SignalPortrait.tsx`): the hero hologram. ~46,000 light
  particles (15,000 on phones) sample the hero photos for colour and depth, react to the cursor, and
  dissolve/re-form between slides. One draw call; all motion runs on the GPU.
- **Coverage globe** (`src/components/three/Globe.tsx`): dotted 3D Earth facing Africa with beacons.
- **Tilt cards** (`src/components/Tilt.tsx`), CSS 3D orbit rings and perspective scroll reveals.

Performance: three.js loads as a separate chunk after the text is visible; scenes pause when off-screen
or the tab is hidden; resolution is capped; reduced-motion users get a still frame; if WebGL is
unavailable the hero falls back to the photo. Hero particle textures live in `src/assets/particles/`.

## Photos & logo

- Photos live in `src/assets/photos/` (listed in `src/assets/photos/index.ts`).
  To change one, replace the `.jpg` with a new file of the same name.
- Logo: `public/logo.png` (light backgrounds) and `public/logo-white.png` (dark backgrounds).
  Browser icon: `src/app/icon.png`.
- `IMAGE-PROMPTS.md` has ChatGPT prompts for generating more images.

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
