import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/home/ProductCard";
import { ProductMarquee } from "@/components/home/ProductMarquee";
import type { Product } from "@/lib/types";

interface ProductSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref?: string;
  tone?: "bg" | "bg-alt";
  /** "centered" opts into the Collections-aligned heading + card presentation. */
  headingStyle?: "default" | "centered";
  /** "marquee" replaces the static grid with a slow, seamless auto-scrolling row. */
  layout?: "grid" | "marquee";
}

export function ProductSection({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  tone = "bg",
  headingStyle = "default",
  layout = "grid",
}: ProductSectionProps) {
  const isCentered = headingStyle === "centered";

  return (
    <section className={`py-20 sm:py-28 ${tone === "bg-alt" ? "bg-bg-alt" : "bg-bg"}`}>
      <Container>
        <Reveal>
          {isCentered ? (
            <div className="mx-auto max-w-xl text-center">
              <SectionHeading
                eyebrow={eyebrow}
                title={title}
                description={description}
                align="center"
                ornament
              />
              {viewAllHref ? (
                <Button href={viewAllHref} variant="link" className="mt-6">
                  View All
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading eyebrow={eyebrow} title={title} description={description} />
              {viewAllHref ? (
                <Button href={viewAllHref} variant="link" className="shrink-0">
                  View All
                </Button>
              ) : null}
            </div>
          )}
        </Reveal>

        {layout === "marquee" ? (
          <ProductMarquee products={products} />
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-12 lg:grid-cols-4 lg:gap-x-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant={isCentered ? "refined" : "classic"}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
