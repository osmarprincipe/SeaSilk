import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/store/PageIntro";
import { Catalog } from "@/components/store/Catalog";
import { bestSellerSelection } from "@/lib/data/storefront";
import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "Best Sellers",
  "Discover the SeaSilk best-seller selection.",
);
export default function BestSellersPage() {
  return (
    <Container className="pb-24">
      <PageIntro
        eyebrow="Best sellers"
        title="The pieces to come back to."
        description="An edit of soft colour and effortless texture. Find a new favourite in our signature methods."
      />
      <Catalog products={bestSellerSelection} />
    </Container>
  );
}
