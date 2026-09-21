import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/store/PageIntro";
import { Catalog } from "@/components/store/Catalog";
import { storeProducts as products } from "@/lib/data/storefront";
import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "Search",
  "Find your SeaSilk shade and extension method.",
  true,
);
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  return (
    <Container className="pb-24">
      <PageIntro
        eyebrow="Search"
        title="Find your perfect match."
        description="Explore by shade, product name or extension method."
      />
      <Catalog key={query} products={products} initialQuery={query} />
    </Container>
  );
}
