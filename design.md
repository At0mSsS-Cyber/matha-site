# Matha Computers & CCTV — Design System Reference
> dark futuristic SaaS with neon accents and glassmorphism

**Theme:** dark

Matha Computers uses a dark, futuristic visual language: deep space-black backgrounds, electric-cyan and cobalt-blue highlights, and a warm orange accent that surfaces only in CTAs and gradient tails. The pairing of a geometric display typeface (Orbitron) with a precise grotesque (Exo 2) gives each screen the cadence of a premium tech brand rather than a local shop. Glassmorphism cards float against the dark canvas with gradient borders that glow on hover. The Three.js hero network, scroll-draw neon SVG line, and cursor spotlight are purely ambient — no 3D product models or heavy animation. The WhatsApp-green CTA is the only warm-green in the system; it fills primary action buttons and the floating WhatsApp badge. The overall feeling is high-end surveillance technology, not amateur retail.

---

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Space Black | `#0B0F19` | `--bg` | Page background — the dominant dark that everything sits on |
| Deep Navy | `#0E1424` | `--bg-2` | Secondary section background, alternate bands |
| Card Dark | `#121a2e` | `--bg-3` | Card fill, studio media panels, input backgrounds |
| Bento Dark | `#0d1523` | `--bento-dark` | Dark bento product card surface |
| Bento Mid | `#121d33` | `--bento-mid` | Mid-tone bento product card surface (alternates with dark) |
| Electric Blue | `#2D6BFF` | `--blue` | Secondary accent — gradient pairs, icon fills, stat highlights |
| Cyan Glow | `#00E5FF` | `--cyan` | Primary accent — links, focus rings, neon highlights, kicker text |
| Orange Accent | `#FF7A18` | `--orange` | Gradient tail, footer ambient glow, secondary CTA emphasis |
| Light Text | `#E8EEF7` | `--text` | Primary text — warm near-white for body copy and headings |
| Muted Text | `#93A2BC` | `--muted` | Secondary text, placeholders, captions, descriptions |
| Line | `rgba(255,255,255,0.09)` | `--line` | Borders, dividers, subtle card outlines |
| Glass | `rgba(255,255,255,0.045)` | `--glass` | Glassmorphism card fill — near-invisible white tint |
| Glass Strong | `rgba(255,255,255,0.07)` | `--glass-strong` | Hovered or elevated glass surfaces |
| WhatsApp Green | `#25D366` | `--wa` | Primary CTA fill — the ONLY green in the system; reserved for WhatsApp actions |
| Gold | `#FFB23E` | `--gold` | Star rating icons |
| Cyan Grad | `linear-gradient(120deg, #00E5FF, #2D6BFF)` | `--grad` | Cyan-to-blue gradient — headings, icon tiles, stat numbers |
| Orange Grad | `linear-gradient(120deg, #FFB347, #FF7A18)` | `--grad-orange` | Orange gradient — step numbers, secondary gradient headings |

---

## Tokens — Typography

### Orbitron — Display & UI serif-geometric for all headings and brand marks
Used for all `h1`–`h3`, the brand wordmark, stat counters, step numbers, and kicker badges. Orbitron's wide monospaced feel creates the futuristic identity. Never used for body copy or long paragraphs. Google Fonts CDN.

- **Weights:** 500, 600, 700, 800
- **Sizes:** 0.6rem (kicker/badge), 1.0–1.2rem (h3/card title), 1.8–2.9rem (section h2), 2.3–4.4rem (h1 hero)
- **Line height:** 1.08 (display), 1.15 (section), 1.2 (card)
- **Letter spacing:** 0.5px default; `−1.5px` for `.bento-title`; `2–3px` for small badges/kickers

### Exo 2 — Body, UI, and form grotesque
Handles all body copy, navigation links, buttons, descriptions, form labels, and metadata. The 300–500 weights dominate body text; 600–700 reserved for button labels and card titles. Google Fonts CDN.

- **Weights:** 300, 400, 500, 600, 700
- **Sizes:** 0.72–0.88rem (small/caption), 0.92–1.05rem (body), 1.02rem (button), 1.22rem (lead)
- **Line height:** 1.60–1.65 (body), 1.05 (hero lead)
- **Letter spacing:** 0.01em body; `−1.5px` for `.bento-title` override

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| badge / kicker | 0.58–0.72rem | 1.2 | 1.5–3px | — |
| caption / chip | 0.72–0.88rem | 1.3 | 0.4–0.5px | — |
| body | 0.92–1.05rem | 1.65 | 0.01em | `--text` |
| card-title | 1.15–1.55rem | 1.15 | 0.3px | `--text` |
| section-sub | 1.05–1.2rem | 1.6 | 0 | `--muted` |
| section-h2 | 1.8–2.9rem | 1.15 | 0.5px | `--text` |
| bento-title | 2.6–4.2rem | 1.05 | −1.5px | `#f0f4ff` |
| hero-h1 | 2.3–4.4rem | 1.08 | 0.5px | `--text` |

---

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** spacious (generous whitespace, section padding 50–90px)

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| xs | 4px | `--spacing-4` |
| sm | 8px | `--spacing-8` |
| md | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 36 | 36px | `--spacing-36` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 90 | 90px | `--spacing-90` (section padding) |

### Border Radius

| Element | Value | Token |
|---------|-------|-------|
| glass cards / service cards | 18px | `--radius` |
| bento product cards | 24px | — |
| buttons | 12px | — |
| icon tiles | 13–14px | — |
| chips / tags / badges | 999px (pill) | — |
| inputs | 10px | — |
| navbar | 16px | — |
| map / media embeds | 14px | — |

### Layout

- **Page max-width:** 1180px (`--maxw`)
- **Section padding:** 90px vertical, 20px horizontal
- **Tight section padding:** 50px vertical
- **Card padding:** 28–36px
- **Bento gap:** 20px
- **Standard grid gap:** 20–24px
- **Navbar:** fixed, floating pill, top 14px, `calc(100% - 28px)` wide

---

## Elevation System

Four levels of depth — all use `rgba(0,0,0,n)` box-shadow, no colour tints:

| Level | Token | Value | Usage |
|-------|-------|-------|-------|
| 1 | `--elevation-1` | `0 1px 3px rgba(0,0,0,.30)` | Resting card |
| 2 | `--elevation-2` | `0 6px 16px rgba(0,0,0,.35)` | Lifted chip, tab |
| 3 | `--elevation-3` | `0 16px 36px rgba(0,0,0,.45)` | Card hover |
| 4 | `--elevation-4` | `0 26px 60px rgba(0,0,0,.55)` | Deep hover, modal |

Bento cards use a custom hover shadow: `0 28px 60px rgba(0,0,0,.55)`.

---

## Components

### Glassmorphism Card (`.glass`)
**Role:** General service, feature, testimonial, and step cards

`background: rgba(255,255,255,0.045)` with `backdrop-filter: blur(16px) saturate(140%)` and a `1px solid rgba(255,255,255,0.09)` border. The gradient border is created with a CSS `::before` pseudo-element using `mask-composite: exclude` to render only a 1px gradient edge (`cyan → transparent → orange`), avoiding any actual background fill. On hover, `opacity` of the `::before` rises to `1` and card lifts `translateY(-6px)`.

### Bento Product Card (`.bento-card`)
**Role:** CCTV product showcase in asymmetric grid

Solid dark surface (`.bc-dark: #0d1523` or `.bc-mid: #121d33`), `24px radius`, `1px solid rgba(255,255,255,0.07)` border, and a `::before` top-edge highlight (1px gradient line, transparent → `rgba(255,255,255,0.13)` → transparent). Three layout variants:
- **`#bc-bullet` (large, 2-row):** absolute-positioned floating camera SVG at `right: -16px; bottom: -8px`, text max-width 260px top-left.
- **`.bento-card--row` (wide, side-by-side):** `flex-direction: row`, text `flex: 1`, image `flex: 0 0 210px`. Collapses to column at ≤ 980px.
- **`.bento-card--stack` (compact, stacked):** `flex-direction: column`, 130px image zone at top, text below.

### Kicker Badge (`.kicker`)
**Role:** Section eyebrow label

Orbitron 0.72rem, 3px letter-spacing, uppercase, `color: var(--cyan)`, `1px solid rgba(0,229,255,0.3)`, `background: rgba(0,229,255,0.06)`, pill shape. Used above every section `h2`.

### Bento Badge (`.bento-badge`)
**Role:** Product card type label

Orbitron 0.55rem, 2px letter-spacing, uppercase, `color: rgba(170,200,240,0.75)`, `1px solid rgba(170,200,240,0.18)`, pill shape. Always `white-space: nowrap`. Sits above the card title.

### Gradient Text (`.grad-text`)
**Role:** Accent word(s) inside headings

`background: var(--grad)` (cyan→blue) with `background-clip: text; color: transparent`. Variant `.grad-text--orange` uses `--grad-orange`. Applied to key words in h1/h2 only — never to body text.

### Primary CTA Button (`.btn--wa`)
**Role:** Main WhatsApp action

`background: linear-gradient(120deg, #2bd66f, #1fae57)`, `color: #04130a` (near-black — not white), `box-shadow: 0 8px 24px rgba(37,211,102,0.28)`. On hover: `translateY(-2px)` + stronger shadow. Used for "Get a Free Quote", "Send via WhatsApp", "Enquire on WhatsApp" — the single primary action in every section.

### Ghost Button (`.btn--ghost`)
**Role:** Secondary action beside the primary CTA

`background: var(--glass)`, `border: 1px solid var(--line)`, `color: var(--text)`. On hover: `border-color: rgba(0,229,255,0.5)` + cyan glow. Used for "Call" and other non-WhatsApp actions.

### Bento Enquire Link (`.bento-link`)
**Role:** Subtle in-card CTA for non-flagship products

Inline text link with an arrow icon. `color: rgba(130,175,230,0.75)`, transitions to `var(--cyan)` on hover with gap expansion. Used on dome, turret, NVR, and wide product cards — only the Bullet Camera card gets a full WhatsApp button.

### Navigation Bar (`.nav`)
**Role:** Sticky floating pill header

Fixed, centered, `max-width: var(--maxw)`, `border-radius: 16px`, dark glass background (`rgba(11,15,25,0.55)`) with `backdrop-filter: blur(18px)`. On scroll, becomes `rgba(11,15,25,0.82)` with a subtle cyan border glow. Mobile: hamburger toggles a `[hidden]` dropdown.

### Scroll-Draw Neon Line (`#coverage .scroll-draw`)
**Role:** Animated SVG path that draws as the user scrolls

300vh pinned section. An SVG `<path>` with `stroke-dashoffset` driven by `scroll progress` in a continuous `requestAnimationFrame` loop (IntersectionObserver starts/stops the loop when the section enters/leaves the viewport). A glowing `<circle>` dot follows the path tip via `getPointAtLength()`. Gradient stroke: cyan → blue → orange via `linearGradient`. Content (headline + CTA) is centered above the SVG at `z-index: 1`. At 220vh on mobile.

### Animated Counter (`.stat__num`)
**Role:** Impact statistics

Orbitron, `clamp(1.9rem, 4vw, 3rem)`, gradient text (cyan→blue). On IntersectionObserver trigger, runs an `easeOutCubic` counter from 0 to `data-count` over 1600ms.

### WhatsApp Lead Form (`#leadForm`)
**Role:** Contact → WhatsApp conversion

On submit, builds a `wa.me` URL with `encodeURIComponent(lines.join('\n'))` to safely embed name, phone, service, and message. The entire message is encoded once — never build the URL with raw `&` (the business name "Matha Computers & CCTV" would truncate the text parameter). Uses `form.elements.namedItem()` to access inputs, not `form.name`.

### Cursor Glow (`.cursor-glow`)
**Role:** Ambient desktop decoration

Fixed `480px × 480px` radial gradient (`rgba(0,229,255,0.10) → transparent`), `mix-blend-mode: screen`, follows cursor with `0.12` easing. Hidden on touch devices (`pointer: coarse`) and when `prefers-reduced-motion` is set.

### Three.js Hero Network (`js/scene.js`)
**Role:** Animated particle network behind the hero

78 nodes (46 on mobile), distance-faded links, cyan + ~14% orange accent nodes. Mouse parallax on camera position (`x ±6`, `y ±4`) with 0.05 easing. Lazy-init on first IntersectionObserver trigger; pauses when hero leaves viewport. Loaded via ES-module importmap: `import('three')` from CDN.

---

## Do's and Don'ts

### Do
- Use `var(--cyan)` (#00E5FF) as the primary accent — focus rings, link highlights, kicker text, glow effects
- Fill primary action buttons with WhatsApp green gradient only — no cyan, no blue filled buttons
- Use `.grad-text` (cyan→blue) for 1–3 accent words inside `h1`/`h2` headings — never for body text
- Apply `backdrop-filter: blur(16px)` with `background: var(--glass)` on glassmorphism cards
- Use the CSS `mask-composite: exclude` technique for gradient borders — no raw `box-shadow` colour rings
- Set `white-space: nowrap` on bento badges and spec chips to prevent word-break wrapping
- Encode the entire WhatsApp message once with `encodeURIComponent()` — never concatenate raw `&` into the URL
- Run the scroll-draw neon line as a continuous `rAF` loop that re-reads `getBoundingClientRect` every frame — event-driven start/stop freezes
- Respect `prefers-reduced-motion`: skip all animations, show final state immediately

### Don't
- Don't reintroduce the 3D tilt effect on product cards (removed — felt amateur)
- Don't reintroduce the scroll-driven Three.js CCTV model (`js/cctv.js` / `#showcase`) — removed at user request
- Don't use pure white or bright backgrounds inside any section — the entire canvas is dark (#0B0F19)
- Don't add `box-shadow` colour glows in place of the gradient border technique — it looks cheap
- Don't use `form.name` to read form inputs — it returns the form's own IDL property; use `form.elements.namedItem('name')`
- Don't use a start/stop `rAF` on scroll events for the draw-line — it freezes when scroll events don't fire continuously
- Don't break `backdrop-filter` by setting `overflow: hidden` on a parent without testing — filters require a stacking context
- Don't use emoji or text symbols (★, ✓, →) as UI icons — use inline SVG only
- Don't add comments that describe what code does; add comments only for non-obvious WHY (hidden constraints, workarounds)

---

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Space | `#0B0F19` | Page canvas — full-bleed background |
| 1 | Deep Navy | `#0E1424` | Alternate section bands |
| 2 | Glass | `rgba(255,255,255,0.045)` | Glassmorphism card fill |
| 3 | Bento Dark | `#0d1523` | Bento product card (dark variant) |
| 4 | Bento Mid | `#121d33` | Bento product card (mid variant) |
| 5 | Elevated | `rgba(255,255,255,0.07)` | Hovered glass card |

Ambient page gradients (fixed, `z-index: -2`) add blue at top-left, cyan at top-right, and orange at bottom-right — visible only through transparent glass cards.

---

## Imagery

Product images are transparent SVGs (`assets/products/{bullet,dome,turret,ptz,wifi,nvr}.svg`, `400×300 viewBox`). All six use `object-fit: contain` with `padding: 24px 30px` on dark studio panels. SVGs were chosen because real product photos (JPG) and even "transparent" PNGs from retailers all had opaque white backgrounds that showed as white boxes on the dark cards. If replacing with real photos, use Pillow flood-fill bg-removal (available on this machine). The bento large card places the bullet camera SVG with `position: absolute; right: -16px; bottom: -8px` for an editorial "camera at the corner" effect. No 3D renders, no illustrations in hero.

---

## Layout

**Page model:** `max-width: 1180px` centered, but hero is full-bleed. Navbar: fixed floating pill `calc(100% - 28px)` wide, 14px from top.

**Section rhythm:** Sections alternate glass cards on `--bg` canvas. Standard padding `90px 20px`, tight sections `50px 20px`. Section heads are center-aligned, `max-width: 760px`, with kicker → h2 → sub hierarchy.

**Products bento grid:**
```
Desktop (3-col):   Bullet | PTZ     PTZ
                   Bullet | Dome  | Turret
                   WiFi   | WiFi  | NVR

Tablet (2-col):    Bullet | PTZ
                   Dome   | Turret
                   WiFi   | NVR

Mobile (1-col):    Bullet → PTZ → Dome → Turret → WiFi → NVR
```

**Responsive breakpoints:** `@media (max-width: 980px)` → 2-col; `@media (max-width: 720px)` → 1-col, hamburger menu.

---

## Quick Start CSS

```css
:root {
  /* ── Dark Canvas ── */
  --bg:             #0B0F19;
  --bg-2:           #0E1424;
  --bg-3:           #121a2e;
  --bento-dark:     #0d1523;
  --bento-mid:      #121d33;

  /* ── Accents ── */
  --blue:           #2D6BFF;
  --cyan:           #00E5FF;
  --orange:         #FF7A18;
  --wa:             #25D366;
  --gold:           #FFB23E;

  /* ── Text ── */
  --text:           #E8EEF7;
  --muted:          #93A2BC;

  /* ── Surfaces / Borders ── */
  --line:           rgba(255, 255, 255, 0.09);
  --glass:          rgba(255, 255, 255, 0.045);
  --glass-strong:   rgba(255, 255, 255, 0.07);

  /* ── Gradients ── */
  --grad:           linear-gradient(120deg, #00E5FF, #2D6BFF);
  --grad-orange:    linear-gradient(120deg, #FFB347, #FF7A18);

  /* ── Glows ── */
  --glow-cyan:      0 0 24px rgba(0, 229, 255, 0.35);
  --glow-orange:    0 0 24px rgba(255, 122, 24, 0.35);

  /* ── Elevation ── */
  --elevation-1:    0 1px  3px  rgba(0, 0, 0, 0.30);
  --elevation-2:    0 6px  16px rgba(0, 0, 0, 0.35);
  --elevation-3:    0 16px 36px rgba(0, 0, 0, 0.45);
  --elevation-4:    0 26px 60px rgba(0, 0, 0, 0.55);

  /* ── Typography ── */
  --font-display:   'Orbitron', sans-serif;
  --font-body:      'Exo 2', system-ui, sans-serif;

  /* ── Radius ── */
  --radius:         18px;   /* glass cards */
  --radius-bento:   24px;   /* bento product cards */

  /* ── Layout ── */
  --maxw:           1180px;
  --ease:           cubic-bezier(0.22, 1, 0.36, 1);
}
```

### Google Fonts import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&family=Orbitron:wght@500;600;700;800&display=swap" rel="stylesheet" />
```

### Three.js importmap (CDN, no build step)

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"
  }
}
</script>
```

### Glassmorphism card pattern

```css
.glass {
  background: var(--glass);
  backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}
/* Gradient border via mask — no background fill */
.glass::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(0,229,255,0.5), transparent 40%, transparent 60%, rgba(255,122,24,0.4));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.6;
  pointer-events: none;
}
```

### Gradient text

```css
.grad-text {
  background: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

### WhatsApp CTA button

```css
.btn--wa {
  background: linear-gradient(120deg, #2bd66f, #1fae57);
  color: #04130a;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.28);
}
.btn--wa:hover {
  box-shadow: 0 10px 30px rgba(37, 211, 102, 0.45);
  transform: translateY(-2px);
}
```

### Bento product card shell

```css
.bento-card {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  overflow: hidden;
  position: relative;
  transition: border-color 0.35s var(--ease), transform 0.4s var(--ease), box-shadow 0.4s;
}
.bento-card::before {          /* top-edge highlight */
  content: "";
  position: absolute;
  top: 0; left: 20px; right: 20px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent);
  pointer-events: none; z-index: 1;
}
.bento-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
  box-shadow: 0 28px 60px rgba(0, 0, 0, 0.55);
}
.bc-dark { background: #0d1523; }
.bc-mid  { background: #121d33; }
```

---

## File Structure

```
matha-computers/
├── index.html          — markup, SEO meta, JSON-LD LocalBusiness schema, importmap
├── css/styles.css      — all styles (bump ?v=N query param after each edit for cache-bust)
├── js/
│   ├── main.js         — nav, reveal, counters, cursor glow, WhatsApp form, scroll-draw
│   └── scene.js        — Three.js hero network (ES module, lazy-init)
├── assets/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── og-image.svg    — export to 1200×630 PNG before going live
│   └── products/
│       ├── bullet.svg  — wall-mount bullet camera (400×300, transparent)
│       ├── dome.svg    — ceiling dome camera
│       ├── turret.svg  — eyeball turret with IR ring
│       ├── ptz.svg     — speed dome PTZ
│       ├── wifi.svg    — cube cam with antenna
│       └── nvr.svg     — isometric NVR recorder
├── robots.txt
├── sitemap.xml         — update domain before go-live
└── site.webmanifest
```

## Go-Live Checklist

1. Replace `https://www.mathacomputers.in/` in `index.html` (canonical, OG, JSON-LD), `sitemap.xml`, `robots.txt`
2. Confirm WhatsApp number `919886795838` in `index.html` links and `js/main.js → WHATSAPP_NUMBER`
3. Export `assets/og-image.svg` to `og-image.png` (1200×630) and update the `og:image` meta tag
4. Replace placeholder stat numbers (`data-count` attributes in `#stats`)
5. Update the Google Maps embed `src` with an exact pin for the shop location
6. Confirm email `info@mathacomputers.in` in the contact form footer link
