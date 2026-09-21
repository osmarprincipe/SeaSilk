# SeaSilk — Brand & Design System

This document describes the visual identity built for this project's first version. It is meant to stay in sync with the live implementation (`src/app/globals.css`, `src/components/**`) — when the design changes, update this file in the same change. It's written to be reusable beyond the website: social media, ads, email, packaging, and future AI-assisted design work.

"SeaSilk" is the confirmed brand name (migrated from the earlier placeholder wordmark, "Marlowe", across the whole site). The wordmark lives in `src/components/layout/Header.tsx` and `Footer.tsx`; site metadata is in `src/app/layout.tsx`.

---

## 1. Brand Personality

Quiet luxury, editorial beauty. SeaSilk should feel like a premium salon brand and a fashion-editorial beauty story had a baby — never a bright beauty marketplace, never a generic Shopify template, never a SaaS product.

Five words that should describe every new page: **premium, feminine, elegant, soft, sophisticated.** Confidence comes from restraint — generous whitespace, editorial photography, and a disciplined color and type system — not from decoration, badges, or effects.

## 2. Visual Direction

- Quiet luxury over loud beauty-retail energy.
- Editorial pacing: large photography, short copy, generous breathing room between sections.
- Warm, pastel, nude-driven neutrals — never a cold or clinical palette, never saturated "beauty industry" pink.
- Photography carries most of the visual richness; UI stays understated.
- Dark espresso/charcoal is used deliberately for contrast (type, CTAs, footer) — the site is not "everything beige."

## 3. Primary Reference

**[valourextensions.com](https://valourextensions.com/)** — used as the structural and pacing reference for this v1: simple navigation, large editorial hero, three product-type collections in place of Valour's regional collections, alternating product/editorial sections, short copy, and a substantial-but-simple footer. No copy, imagery, logo, or brand assets were copied — only the structural logic and pacing.

## 4–6. Color Palette

Defined as CSS custom properties in `src/app/globals.css`, exposed to Tailwind via `@theme inline` (so `bg-espresso`, `text-taupe`, `border-sand`, etc. are all available as utilities).

### Primitives

| Token | Hex | Description |
|---|---|---|
| `--color-ivory` | `#FAF6F0` | Primary page background |
| `--color-cream` | `#F3EBE1` | Alternate section background |
| `--color-sand` | `#E6D6C3` | Borders, dividers, subtle fills |
| `--color-blush` | `#DDBEB0` | Sparing accent (tags, small highlights) |
| `--color-stone` | `#B9A793` | Image-placeholder / mid-neutral surfaces |
| `--color-taupe` | `#8C7768` | Decorative/icon use — not for small text |
| `--color-brown` | `#6B4A36` | Secondary warm accent |
| `--color-espresso` | `#3B2A1F` | Primary text, primary CTAs |
| `--color-charcoal` | `#201812` | Footer, deepest contrast, CTA hover |

### Semantic tokens (what components actually consume)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | ivory | Default page background |
| `--color-bg-alt` | cream | Alternating sections (New Arrivals, About, one editorial) |
| `--color-surface` | `#FFFFFF` | Rarely used flat white surface |
| `--color-border` | sand | Hairlines, dividers, trust-row borders |
| `--color-accent` | blush | "New" tag chip background only |
| `--color-text` | espresso | Headings & primary body text |
| `--color-text-muted` | `#6E5B4E` | Secondary copy — deliberately darker than raw taupe to guarantee 4.5:1 contrast on ivory |
| `--color-text-faint` | taupe | Decorative-only, not for text under 18px |
| `--color-cta` / `--color-cta-hover` | espresso / charcoal | Primary button fill and hover state |
| `--color-footer-bg` / `--color-footer-text` | charcoal / ivory | Footer + newsletter band |

### Usage hierarchy

Backgrounds stay light and neutral (ivory/cream) for ~80% of the page. Espresso and charcoal are reserved for: headings and body copy, primary buttons, header/footer text, and the newsletter band. Blush is a single sparing accent (the "New" product tag) — never a background wash or a large surface. This is a deliberate hierarchy, not a monochrome beige site.

**Accessibility:** `--color-text` (espresso) on `--color-bg` (ivory) exceeds 10:1. `--color-text-muted` on ivory exceeds 4.5:1 (AA for body text). `--color-taupe` does **not** meet small-text contrast on light backgrounds and is restricted to icons, dividers, and decorative use.

## 7–9. Typography

**Display / headings:** Playfair Display (400/500/600) — `next/font/google`, CSS var `--font-playfair` → Tailwind `font-display`.
**Body / UI:** Inter (400/500/600) — `next/font/google`, CSS var `--font-inter` → Tailwind `font-sans` (the default body font).

Rationale: a restrained serif for editorial weight without tipping into "wedding invitation" territory, paired with a clean grotesque for legibility in nav, prices, and product data — the same pairing logic used by high-end beauty/editorial e-commerce.

### Scale in use

| Role | Classes | Notes |
|---|---|---|
| Hero H1 | `font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05]` | Weight 400, never bold |
| Section H2 | `font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1]` | Weight 400 |
| Eyebrow / label | `text-xs font-medium tracking-[0.2em] uppercase` | Inter, always uppercase, always tracked |
| Nav / buttons | `text-xs font-medium tracking-[0.14em] uppercase` | Inter |
| Body copy | `text-[15px] sm:text-base leading-relaxed` | Inter, `text-text-muted` |
| Product name / price | `text-sm font-medium` / `text-sm` | Inter |

Headings are never uppercase; labels and buttons always are. That contrast is one of the system's small signature details.

## 10. Spacing Philosophy

Luxury from restraint, not decoration. Major sections use `py-20 sm:py-28`; the container is `max-w-[1440px]` with responsive edge padding (`px-5 sm:px-8 lg:px-12 xl:px-16`). Editorial image/copy sections are pinned to a fixed `lg:h-[640px]` row so image and text share consistent proportions. Product grids use generous gaps (`gap-x-4`/`gap-y-10` mobile, `gap-x-6` desktop) rather than tight packing.

## 11. Buttons

No rounded corners — rectangular, editorial, matches the serif's classical feel rather than a soft "DTC skincare" pill button. Four variants (`src/components/ui/Button.tsx`):

- **Primary** — solid espresso fill, ivory text, hover → charcoal.
- **Secondary** — espresso outline, fills espresso on hover.
- **Inverse** — ivory outline for use over photography (hero), fills ivory on hover.
- **Link** — text + arrow icon, arrow nudges right on hover. Used for in-context "Shop the Collection" links inside editorial sections.

All buttons/links use uppercase, tracked (`0.14em`), 12px labels — never full body-copy sentence case.

## 12. Product Card Style

Photography first, information second (`src/components/home/ProductCard.tsx`):

- Image: `aspect-[4/5]`, `object-cover`, no border, no shadow, no rounding.
- Single subtle interaction: image scales to 1.03 on hover (500ms) — no image-swap, no badges beyond a single small "New" tag when relevant.
- Below the image: product name, shade, price — three short lines, nothing else.
- Collection cards (`CollectionCard.tsx`) use a full-bleed image with a bottom gradient scrim, name + one-line description overlaid, and a hairline underline that widens on hover — the closest thing this system has to a signature motif (see §16).

## 13. Photography Direction

Warm, consistent, editorial. Two photographic modes:

1. **Lifestyle/portrait** — long, healthy hair; warm neutral interiors or salon settings; soft daylight. Used for hero, editorial sections, and About.
2. **Product flat-lay** — hand-tied weft bundles shot on a neutral light backdrop. Used for the three Collection cards, to differentiate "shop by type" from the aspirational lifestyle imagery.

All current images are temporary Unsplash placeholders (`src/lib/images.ts`, Unsplash License) chosen for warm, consistent tone. Every image is read through a typed `ImageAsset { src, alt }` — replacing them with real brand photography later means editing `src/lib/images.ts` only, no component changes.

## 14. Video Direction

Not implemented in v1 by design (see project brief — video hero is an explicit later phase). When introduced, it should replace the hero's static image using the same warm grade and framing, muted/autoplay with a static-image fallback, and respect `prefers-reduced-motion`.

## 15. Iconography

Hand-drawn inline SVGs (`src/components/icons/index.tsx`) — no icon library dependency. Consistent style: 24×24 viewBox, `1.5` stroke, round caps/joins, `currentColor` (inherits surrounding text color). Covers search, account, bag, menu/close, arrow, lock/truck/support (trust row), and Instagram/TikTok. Keep any new icon in this same stroke weight and style.

## 16. Animation Style

Deliberately subtle, per the v1 brief:

- **Reveal-on-scroll** (`src/components/ui/Reveal.tsx`) — IntersectionObserver-based fade + 14px translate-up, 700ms `cubic-bezier(0.4,0,0.2,1)`. Content is server-rendered fully visible; JS opts elements into the hidden starting state, so no-JS visitors (and a `<noscript>` override in `layout.tsx`) always see full content. Respects `prefers-reduced-motion: reduce` via CSS media query.
- **Hover**: image scale (1.0 → 1.03–1.05), button color transitions (200–300ms), link-arrow nudge, hairline-underline widen on collection cards.
- **Mobile menu**: 300ms slide-in panel with backdrop fade.

No parallax, no scroll-jacking, no stagger choreography. This is intentional restraint, not an oversight — richer interaction is a later phase per the project roadmap.

## 17. Mobile Design Principles

Designed mobile-first per breakpoint, not shrunk from desktop:

- **Header**: hamburger + centered logo + search/bag on mobile; nav links only appear at `lg:` (1024px+), where account also becomes visible inline. Search expands as an inline row rather than a separate page.
- **Mobile nav**: full-height right-side slide-in panel (`MobileNav.tsx`) with large serif-adjacent tap targets, account link, and social icons.
- **Collections**: horizontal snap-scroll carousel below `sm:` (each card ~78% viewport width, peeking the next card) instead of vertical stacking — becomes a static 3-column grid at `sm:` and above.
- **Product grids**: 2-column on mobile/tablet, 4-column at `lg:`.
- **Editorial sections**: image stacks above text below `lg:`; the asymmetric left/right split only applies at `lg:` and up.

## 18. Marketing Applications

This palette and type system are meant to extend beyond the site:

- **Instagram/social**: ivory or cream backgrounds, espresso type, Playfair Display for quote/headline graphics, Inter tracked-caps for labels — matches the site instantly.
- **Email**: newsletter band styling (espresso background, ivory centered text) is a ready-made template for campaign headers.
- **Packaging/print**: espresso-on-ivory or ivory-on-espresso as the two primary combinations; blush reserved for a single accent moment (ribbon, sticker, stamp) — never a dominant packaging color.

## 19. Do / Don't

**Do**
- Keep backgrounds light (ivory/cream) and let photography carry visual richness.
- Use espresso/charcoal deliberately for text, CTAs, and footer — for contrast, not decoration.
- Keep buttons rectangular, uppercase, tracked.
- Keep motion subtle and purposeful.
- Write short, plain, confident copy — no unverified product claims (sourcing, "100% Remy," lifespan) until confirmed.

**Don't**
- Don't default to "everything beige" — maintain the light/dark hierarchy.
- Don't use blush (or any accent) as a large background wash.
- Don't round product cards or use drop shadows — this system is edged, not soft/bubbly.
- Don't add scroll-jacking, parallax, or heavy stagger animation in this phase.
- Don't overload the header nav — additional pages belong in the footer or future menus.

## 20. Design Tokens (implementation reference)

Source of truth: `src/app/globals.css` (`:root` + `@theme inline`). Font loading: `src/app/layout.tsx`. Component-level tokens (buttons, cards, sections) live in `src/components/ui/*` and `src/components/home/*` as described above — there is no separate `tailwind.config.ts` (Tailwind v4 CSS-first config).

```css
--color-ivory: #FAF6F0;
--color-cream: #F3EBE1;
--color-sand: #E6D6C3;
--color-blush: #DDBEB0;
--color-stone: #B9A793;
--color-taupe: #8C7768;
--color-brown: #6B4A36;
--color-espresso: #3B2A1F;
--color-charcoal: #201812;

--font-display: "Playfair Display", Georgia, serif;
--font-sans: "Inter", -apple-system, sans-serif;

--container-page: 1440px;
```

---

## Project Architecture Notes (for future contributors)

- **Stack**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.
- **Data layer**: `src/lib/types.ts` defines `Product` / `Collection` / `ImageAsset`. `src/lib/data/products.ts` and `collections.ts` hold mock data matching those types — a future CMS/database integration should produce data in this same shape so components don't need to change.
- **Images**: all placeholder photography is centralized in `src/lib/images.ts`. Swapping to real photography (local files or a real CDN) means editing that one file.
- **Storefront pages**: `/shop`, `/best-sellers`, `/search`, `/collections`, `/collections/[slug]`, `/products/[slug]`, `/about`, `/account`, `/cart`, `/checkout`, `/contact`, `/shipping`, `/returns`, `/faq`, `/privacy`, `/terms`. Unknown routes use the branded not-found page.
- **Inner-page visual language**: reuse all existing palette and font tokens. `PageIntro` uses the established line–diamond motif, centered eyebrow, a responsive 36/48/60px display heading and a restrained 576px description width. Catalogue images retain the homepage's 4:5 ratio and 16px corners; product detail images use `object-contain` to preserve the studio composition. Category filters and shade links use understated rounded pills, while primary actions remain espresso with ivory text. No global style changes are needed.
- **Inner-page layouts**: shop grids use two columns on phones and four on desktop. Product details, collection introductions, story and contact layouts stack on phones and split on larger screens. Customer-care pages share a quiet navigation column and outlined content panel. All new photography reuses existing local assets.
- **Implemented interactions**: method/shade filtering, sorting, header search, product shade navigation, browser-local shopping bag, quantity changes and selection review. Storefront data is selected in `src/lib/data/storefront.ts`; the best-seller edit is mock merchandising, not verified sales data.
- **What's deliberately not built yet**: payments, order creation, live inventory, authentication, contact delivery and CMS. Contact and account pages show honest preview states. Policy copy is explicitly pending business approval. The browser-local bag is a prototype, not a stock reservation or purchase.
