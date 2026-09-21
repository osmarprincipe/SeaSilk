import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/home/ProductCard";
import { ProductPurchase } from "@/components/store/ProductPurchase";
import { storeProducts as products } from "@/lib/data/storefront";
import { collections } from "@/lib/data/collections";
import { formatPrice } from "@/lib/format";
import { pageMetadata } from "@/lib/pageMetadata";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return p
    ? pageMetadata(
        `${p.name} — ${p.shade}`,
        `Explore ${p.name} in ${p.shade} from SeaSilk.`,
      )
    : {};
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const collection = collections.find((c) => c.slug === p.category)!;
  const related = products.filter(
    (item) => item.category === p.category && item.id !== p.id,
  );
  return (
    <Container className="pb-24 pt-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap gap-2 text-xs leading-6 text-text-muted"
      >
        <Link href="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <Link href={collection.href}>{collection.name}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{p.shade}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
          <Image
            src={p.image.src}
            alt={p.image.alt}
            fill
            preload
            sizes="(min-width: 1440px) 600px, (min-width: 1024px) 46vw, 90vw"
            className="object-contain"
          />
          {p.tags?.includes("new") && (
            <span className="absolute left-5 top-5 rounded-full bg-blush px-3 py-1 text-[10px] tracking-widest uppercase">
              New
            </span>
          )}
        </div>
        <div className="self-center lg:py-8">
          <p className="text-xs tracking-[0.2em] uppercase text-text-muted">
            The SeaSilk collection
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">{p.name}</h1>
          <p className="mt-3 font-display text-2xl text-text-muted">
            {p.shade}
          </p>
          <p className="mt-6 text-lg">
            {formatPrice(p.price)}{" "}
            {p.compareAtPrice && (
              <span className="ml-2 text-sm text-text-muted line-through">
                {formatPrice(p.compareAtPrice)}
              </span>
            )}
          </p>
          <p className="mt-6 max-w-md text-[15px] leading-7 text-text-muted">
            {collection.description} Explore {p.shade} for a finish that feels
            naturally yours.
          </p>
          <div className="mt-8 border-t border-sand pt-6">
            <p className="text-xs tracking-widest uppercase">
              Explore the shades
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[p, ...related].map((shade) => (
                <Link
                  key={shade.id}
                  href={`/products/${shade.slug}`}
                  aria-current={shade.id === p.id ? "page" : undefined}
                  className={`rounded-full border px-4 py-3 text-xs transition-colors ${shade.id === p.id ? "border-espresso bg-espresso text-ivory" : "border-sand hover:border-taupe"}`}
                >
                  {shade.shade}
                </Link>
              ))}
            </div>
          </div>
          <ProductPurchase key={p.id} productId={p.id} />
          <div className="mt-8 border-t border-sand">
            {[
              {
                title: "The details",
                text: "This is a preview of our collection. Available lengths, weights and fitting specifications will be confirmed before purchasing opens.",
              },
              {
                title: "Finding your match",
                text: "Compare shades in natural daylight and consider the mid-lengths and ends of your own hair. For fitted methods, discuss your preferred result with a hair professional.",
              },
              {
                title: "Delivery & returns",
                text: "Delivery destinations, charges and return terms will be available before checkout launches. Visit our delivery and returns pages for the current status.",
              },
            ].map((detail) => (
              <details key={detail.title} className="border-b border-sand py-5">
                <summary className="cursor-pointer text-sm font-medium">
                  {detail.title}
                </summary>
                <p className="mt-4 text-sm leading-7 text-text-muted">
                  {detail.text}
                </p>
              </details>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-block py-3 text-xs uppercase tracking-widest underline underline-offset-4"
          >
            Need a little guidance? →
          </Link>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-20 border-t border-sand pt-12">
          <h2 className="mb-8 font-display text-3xl">
            A different shade of you.
          </h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.slice(0, 4).map((item) => (
              <ProductCard key={item.id} product={item} variant="refined" />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
