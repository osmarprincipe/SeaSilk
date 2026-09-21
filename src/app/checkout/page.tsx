import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/store/PageIntro";
import { ShoppingBag } from "@/components/store/ShoppingBag";
import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "Review your selection",
  "Preview your SeaSilk bag. Online purchasing is coming soon.",
  true,
);
export default function CheckoutPage() {
  return (
    <Container className="pb-24">
      <PageIntro
        eyebrow="Your selection"
        title="Considered, down to the detail."
        description="Review your favourites. Online purchasing will be available soon."
      />
      <ShoppingBag review />
    </Container>
  );
}
