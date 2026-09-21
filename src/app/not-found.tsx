import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/store/PageIntro";
import { Button } from "@/components/ui/Button";
export default function NotFound() {
  return (
    <Container className="pb-24 text-center">
      <PageIntro
        eyebrow="Page not found"
        title="Let’s find your way back."
        description="This page may have moved, or the link may be incomplete. Your next favourite is still waiting."
      />
      <Button href="/shop" showArrow>
        Explore the collection
      </Button>
      <div className="mt-6">
        <Button href="/" variant="link">
          Back to SeaSilk
        </Button>
      </div>
    </Container>
  );
}
