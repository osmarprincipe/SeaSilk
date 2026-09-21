import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Catalog } from "@/components/store/Catalog";
import { collections } from "@/lib/data/collections";
import { storeProducts as products } from "@/lib/data/storefront";
import { pageMetadata } from "@/lib/pageMetadata";
export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  return collection
    ? pageMetadata(collection.name, collection.description)
    : {};
}
export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = collections.find((c) => c.slug === slug);
  if (!c) notFound();
  return (
    <Container className="pb-24 pt-8">
      <nav aria-label="Breadcrumb" className="text-xs text-text-muted">
        <Link href="/shop">Shop</Link>
        <span className="mx-3" aria-hidden="true">
          /
        </span>
        <span aria-current="page">{c.name}</span>
      </nav>
      <div className="my-10 grid overflow-hidden rounded-2xl bg-cream md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <p className="text-xs tracking-[0.2em] uppercase text-text-muted">
            The method edit
          </p>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl">
            {c.name}
          </h1>
          <p className="mt-6 max-w-sm text-[15px] leading-7 text-text-muted">
            {c.description}
          </p>
          <Link
            href="/collections"
            className="mt-8 self-start py-3 text-xs tracking-widest uppercase underline underline-offset-4"
          >
            Compare the collections →
          </Link>
        </div>
        <div className="relative aspect-[4/3] md:aspect-square md:max-h-[470px]">
          <Image
            src={c.image.src}
            alt={c.image.alt}
            fill
            sizes="(min-width: 768px) 48vw, 90vw"
            preload
            className="object-cover"
          />
        </div>
      </div>
      <Catalog
        products={products.filter((p) => p.category === slug)}
        showMethods={false}
      />
    </Container>
  );
}
