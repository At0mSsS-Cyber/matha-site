# Matha Computers & CCTV — Website

A premium, futuristic, **frontend-only** marketing site for Matha Computers & CCTV
(CCTV, desktop & laptop sales & service — Harohalli, Bangalore).

## Highlights

- **Dark futuristic theme** — `#0B0F19` base with electric-blue / cyan-glow / orange accents
- **Glassmorphism** cards, gradient borders, neon highlights, animated grid
- **Three.js** animated network background in the hero (lazy-loaded, auto-pauses off-screen)
- **CCTV Products** gallery (Bullet, Dome, Turret, PTZ, Wi-Fi/IP, NVR) using detailed
  transparent SVG product renders on a dark studio panel, with badges, specs, and a WhatsApp CTA
- **Hand-built card transitions** (no libraries): smooth lift, brightening gradient border,
  a glossy light-sweep, image zoom, and staggered scroll-reveal
- **Scroll-draw statement** (`#coverage`): a pinned section where a neon SVG line "draws"
  itself following scroll progress (stroke-dashoffset + a continuous rAF loop), led by a
  glowing comet dot — recreated in vanilla JS (no framer-motion)
- **Smooth animations** — scroll-reveal, animated counters, mouse-follow glow, hover effects
- **WhatsApp-first lead gen** — the contact form opens WhatsApp with details pre-filled (no backend)
- **SEO ready** — meta + Open Graph + Twitter cards + JSON-LD `LocalBusiness` schema, `sitemap.xml`, `robots.txt`, web manifest
- **Accessible** — skip link, focus states, ARIA labels, `prefers-reduced-motion` respected
- **Responsive** — 375 / 768 / 1024 / 1440px

## Tech

Plain HTML + bespoke CSS + vanilla JS. No build step, no framework.
Three.js is loaded on demand via an ES-module CDN (`importmap`).

## Run locally

It must be served over HTTP (ES modules + the map iframe won't work from `file://`):

```powershell
# from this folder
python -m http.server 8080
# then open http://localhost:8080
```

Any static server works (`npx serve`, VS Code Live Server, etc.).

## Deploy (free, static)

Drag-and-drop or connect the folder to any of:
- **Netlify** / **Vercel** / **Cloudflare Pages** — zero config
- **GitHub Pages** — push and enable Pages

## Before going live — checklist

1. **Domain** — replace `https://www.mathacomputers.in/` in `index.html`
   (canonical, OG/Twitter URLs, JSON-LD), `sitemap.xml`, and `robots.txt`.
2. **Email** — update `info@mathacomputers.in` in `index.html` if different.
3. **WhatsApp number** — primary line is `919886795838` (set in `index.html`
   links and `js/main.js` → `WHATSAPP_NUMBER`).
4. **Map** — the embed points to "Harohalli, Bangalore 560099". For an exact pin,
   replace the iframe `src` in `index.html` with a Google Maps "Embed a map" link
   for your shop's precise location.
5. **OG image** — `assets/og-image.svg` is provided. Some social platforms prefer
   PNG/JPG; export it to `og-image.png` (1200×630) and update the meta tags for
   best previews.
6. **Stats** — counter numbers in `index.html` (`data-count`) are placeholders;
   adjust to real figures.
7. **Product images** — each card now uses a transparent **SVG render**
   (`assets/products/{bullet,dome,turret,ptz,wifi,nvr}.svg`) shown on the dark panel,
   so there's no background box and the style is consistent. To use a real photo instead,
   drop a **transparent PNG** (background actually removed — not just a white-bg JPG) into
   `assets/products/` and point that card's `<img class="prod__img" src="...">` at it.
   (The leftover `.jpg`/`.png` files in that folder are unused and can be deleted.)

## File structure

```
matha-computers/
├── index.html          # markup + SEO meta + JSON-LD
├── css/styles.css       # full futuristic theme
├── js/main.js           # nav, reveal, counters, cursor glow, WhatsApp form, product 3D tilt
├── js/scene.js          # Three.js network background (ES module)
├── assets/
│   ├── logo.svg          # logo mark
│   ├── favicon.svg       # favicon / app icon
│   ├── og-image.svg      # social share image
│   └── products/         # CCTV product photos (.jpg, Pexels) + .svg fallbacks
├── robots.txt
├── sitemap.xml
└── site.webmanifest
```
