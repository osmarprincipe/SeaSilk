import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/store/PageIntro";
import { ShoppingBag } from "@/components/store/ShoppingBag";
import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "Your bag",
  "Your SeaSilk selection.",
  true,
);
export default function CartPage() {
  return (
    <Container className="pb-24">
      <PageIntro
        eyebrow="Your bag"
        title="A little more you."
        description="Your selected shades and methods, all in one place."
      />
      <ShoppingBag />
    </Container>
  );
}
