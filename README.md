# SeaSilk — Premium Hair Extensions (v1)

A premium human hair extensions e-commerce site, built as a foundation for future e-commerce, CMS, and backend phases. Next.js (App Router) + TypeScript + Tailwind CSS v4.

See [`BRAND_DESIGN_SYSTEM.md`](./BRAND_DESIGN_SYSTEM.md) for the full visual identity — palette, typography, spacing, component conventions, and photography direction.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/` — routes, root layout, global styles/design tokens (`globals.css`).
- `src/components/layout/` — announcement bar, header, mobile nav, footer.
- `src/components/home/` — homepage sections (hero, collections, product grid, editorial, about, newsletter).
- `src/components/ui/` — shared primitives (container, button, section heading, reveal-on-scroll, newsletter form).
- `src/components/icons/` — hand-drawn inline SVG icon set.
- `src/lib/types.ts` — `Product` / `Collection` / `ImageAsset` types, shaped to match a future real backend.
- `src/lib/data/` — mock product and collection data.
- `src/lib/images.ts` — all placeholder photography references in one place, for easy swapping later.

## Status

This is an intentionally simple v1 foundation (homepage only, mock data, no cart/checkout/accounts/CMS). See the architecture notes at the bottom of `BRAND_DESIGN_SYSTEM.md` for what's next.

## Deploy

Designed for [Vercel](https://vercel.com/new). No environment variables are required for this phase.
