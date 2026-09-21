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

The homepage design is preserved. The store now includes browsable shop, collection, product, search, best-seller, story and customer-care pages.

- `/shop`: method filters, shade search, price/name sorting, existing product cards.
- `/collections` and `/collections/[slug]`: collection overview and method-specific catalogues.
- `/products/[slug]`: the 10 approved studio-series mock products, shade navigation, quantity and add-to-bag. Earlier remote-photo mock records remain unchanged but are excluded from the new storefront via `src/lib/data/storefront.ts`.
- `/cart`: editable browser-local bag, quantities, removal and subtotal.
- `/checkout`: selection review only; no payment, stock reservation or order creation.
- `/about`, `/contact`, `/faq`, `/shipping`, `/returns`, `/privacy`, `/terms`, `/account`: supporting pages with honest preview states where services or policies are not yet available.
- `/search?q=...`: connected to the existing header search.

Shared page components live in `src/components/store`. Product data remains in the existing data files. `src/lib/cart.ts` stores only product IDs and quantities under `seasilk:shopping-bag:v1`, supports cross-tab changes, and falls back to memory when storage is unavailable. No personal or payment information is stored by the new forms.

Contact is a form preview (no message transmission). Accounts are not connected. Policy content in `src/lib/data/information.ts` is explicitly pending approval; replace it before launch. Mock catalogue prices and existing testimonial claims also need validation before production. No commerce backend or CMS has been added.

### Validation

Run `npm run lint` and `npm run build`. If OneDrive locks the normal cache, set `SEASILK_BUILD_DIR=.next-verify` for an isolated build and use the same variable with `npm run start`.

`scripts/check-store.cjs` exercises routes, filters, search, bag persistence, preview forms and responsive widths against a local running server. Point `PLAYWRIGHT_MODULE` at an installed Playwright module; optionally set `TEST_BASE_URL` and `TEST_SCREENSHOTS`. Playwright is not a storefront dependency.

## Deploy

Designed for [Vercel](https://vercel.com/new). No environment variables are required for this phase.
