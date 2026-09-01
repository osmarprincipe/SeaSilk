import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  /** "refined" opts into the rounded, Collections-aligned presentation. */
  variant?: "classic" | "refined";
  /** Override the next/image `sizes` hint (e.g. for fixed-width marquee cards). */
  imageSizes?: string;
  /** Set to -1 to exclude visually-duplicated marquee copies from tab order. */
  tabIndex?: number;
}

export function ProductCard({
  product,
  variant = "classic",
  imageSizes,
  tabIndex,
}: ProductCardProps) {
  const isRefined = variant === "refined";

  return (
    <Link href={`/products/${product.slug}`} className="group block" tabIndex={tabIndex}>
      <div
        className={[
          "relative aspect-[4/5] overflow-hidden bg-stone transition-shadow duration-500 ease-out",
          isRefined
            ? "rounded-2xl hover:shadow-[0_14px_28px_-18px_rgba(32,24,18,0.24)]"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes={imageSizes ?? "(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 90vw"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {product.tags?.includes("new") ? (
          <span
            className={[
              "absolute top-3 left-3 bg-blush px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-espresso uppercase",
              isRefined ? "rounded-full" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            New
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-medium text-text">{product.name}</h3>
        <p className="mt-1 text-sm text-text-muted">{product.shade}</p>
        <p className="mt-1.5 flex items-baseline gap-2 text-sm text-text">
          <span>{formatPrice(product.price)}</span>
          {product.compareAtPrice ? (
            <span className="text-text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
