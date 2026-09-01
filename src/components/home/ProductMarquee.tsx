import { ProductCard } from "@/components/home/ProductCard";
import type { Product } from "@/lib/types";

const MARQUEE_IMAGE_SIZES = "(min-width: 1024px) 350px, (min-width: 640px) 315px, 250px";

/**
 * A slow, continuously-looping right-to-left product row (see globals.css
 * for the animation itself). Renders the product list twice for a
 * seamless loop, but only the first copy is accessible — the second is
 * `aria-hidden` and pulled out of tab order. Reduced-motion visitors get
 * `.marquee-static`, the plain grid, instead of the animated track.
 */
export function ProductMarquee({ products }: { products: Product[] }) {
  const trackItems = [...products, ...products];

  return (
    <div className="mt-10 sm:mt-12">
      <div className="marquee-viewport">
        <div className="marquee-track">
          {trackItems.map((product, index) => {
            const isDuplicate = index >= products.length;
            return (
              <div
                key={`${product.id}-${isDuplicate ? "dup" : "orig"}`}
                className="marquee-item"
                aria-hidden={isDuplicate || undefined}
              >
                <ProductCard
                  product={product}
                  variant="refined"
                  imageSizes={MARQUEE_IMAGE_SIZES}
                  tabIndex={isDuplicate ? -1 : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="marquee-static grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="refined" />
        ))}
      </div>
    </div>
  );
}
