"use client";
import { useState } from "react";
import Link from "next/link";
import { addToCart } from "@/lib/cart";

export function ProductPurchase({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  return (
    <div className="mt-8">
      <div className="flex gap-3">
        <div className="flex shrink-0 items-center rounded border border-sand">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => q - 1)}
            className="size-12 disabled:opacity-30"
          >
            −
          </button>
          <span
            className="min-w-5 text-center text-sm"
            aria-label={`Quantity ${quantity}`}
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={quantity >= 99}
            onClick={() => setQuantity((q) => q + 1)}
            className="size-12 disabled:opacity-30"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            addToCart(productId, quantity);
            setAdded(true);
          }}
          className="min-h-12 flex-1 rounded bg-espresso px-4 text-xs font-medium tracking-[0.14em] text-ivory uppercase transition-colors hover:bg-brown"
        >
          Add to bag →
        </button>
      </div>
      <div role="status" className="mt-4 text-sm text-text-muted">
        {added ? (
          <span>
            Added to your bag.{" "}
            <Link
              href="/cart"
              className="font-medium text-espresso underline underline-offset-4"
            >
              View bag →
            </Link>
          </span>
        ) : (
          "Preview collection · purchases are not available yet."
        )}
      </div>
    </div>
  );
}
