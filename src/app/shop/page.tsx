import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/store/PageIntro";
import { Catalog } from "@/components/store/Catalog";
import { storeProducts as products } from "@/lib/data/storefront";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata(
  "Shop all extensions",
  "Explore SeaSilk Genius Weft, Tape-In and Clip-In extensions. Find your method and shade.",
);
export default function ShopPage() {
  return (
    <Container className="pb-20 sm:pb-28">
      <PageIntro
        eyebrow="The collection"
        title="Beautiful hair. Your way."
        description="From a little extra volume to a whole new length. Discover the method and shade that feel like you."
      />
      <Catalog products={products} />
    </Container>
  );
}
