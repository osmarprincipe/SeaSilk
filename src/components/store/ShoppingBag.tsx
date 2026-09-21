"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { storeProducts as products } from "@/lib/data/storefront";
import { useCart, setCartQuantity } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export function ShoppingBag({ review = false }: { review?: boolean }) {
  const cart = useCart();
  const items = cart.flatMap((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0,
  );
  if (!items.length)
    return (
      <div className="rounded-2xl bg-cream px-6 py-16 text-center">
        <p className="font-display text-3xl">Your next favourite is waiting.</p>
        <p className="mb-8 mt-4 text-sm text-text-muted">
          Explore the collection and add a little SeaSilk to your day.
        </p>
        <Button href="/shop" showArrow>
          Explore the collection
        </Button>
      </div>
    );
  return (
    <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
      <div>
        {items.map(({ product: p, quantity }) => (
          <article
            key={p.id}
            className="flex gap-5 border-b border-sand py-6 first:pt-0"
          >
            <Link
              href={`/products/${p.slug}`}
              className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-xl bg-cream sm:w-36"
            >
              <Image
                src={p.image.src}
                alt={p.image.alt}
                fill
                sizes="144px"
                className="object-contain"
              />
            </Link>
            <div className="flex flex-1 flex-col justify-center">
              <Link
                href={`/products/${p.slug}`}
                className="font-display text-xl sm:text-2xl"
              >
                {p.name}
              </Link>
              <p className="mt-1 text-sm text-text-muted">{p.shade}</p>
              <p className="mt-3 text-sm">{formatPrice(p.price * quantity)}</p>
              {review ? (
                <p className="mt-3 text-xs text-text-muted">
                  Quantity: {quantity}
                </p>
              ) : (
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center rounded border border-sand">
                    <button
                      type="button"
                      aria-label={`Decrease ${p.shade} quantity`}
                      disabled={quantity <= 1}
                      className="size-11 disabled:opacity-30"
                      onClick={() => setCartQuantity(p.id, quantity - 1)}
                    >
                      −
                    </button>
                    <span className="min-w-5 text-center text-xs">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${p.shade} quantity`}
                      disabled={quantity >= 99}
                      className="size-11 disabled:opacity-30"
                      onClick={() => setCartQuantity(p.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="min-h-11 text-xs text-text-muted underline underline-offset-4"
                    onClick={() => setCartQuantity(p.id, 0)}
                    aria-label={`Remove ${p.name} ${p.shade}`}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      <aside className="h-fit rounded-2xl border border-sand bg-cream p-6 sm:p-8">
        <h2 className="font-display text-2xl">
          {review ? "Your selection" : "Bag summary"}
        </h2>
        <div className="mt-8 flex justify-between border-b border-sand pb-5 text-sm">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <p className="my-6 text-sm leading-7 text-text-muted">
          {review
            ? "Online purchasing is not open yet. Your selection is saved in this browser; no order has been placed and no payment is taken."
            : "Preview prices. Delivery and taxes will be confirmed when online purchasing opens."}
        </p>
        <Button
          href={review ? "/shop" : "/checkout"}
          className="w-full"
          showArrow
        >
          {review ? "Continue exploring" : "Review your selection"}
        </Button>
        <Link
          href={review ? "/cart" : "/shop"}
          className="mt-4 block py-3 text-center text-xs tracking-widest uppercase underline underline-offset-4"
        >
          {review ? "Edit your bag" : "Continue shopping"}
        </Link>
      </aside>
    </div>
  );
}
