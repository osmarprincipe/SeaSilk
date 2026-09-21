import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/store/PageIntro";
import { aboutDetailImage } from "@/lib/images";
import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "Your account",
  "Your personal SeaSilk space, coming soon.",
  true,
);
export default function AccountPage() {
  return (
    <Container className="pb-24">
      <PageIntro
        eyebrow="Your SeaSilk"
        title="A space of your own."
        description="Your favourite shades. Your everyday essentials."
      />
      <div className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl bg-cream md:grid-cols-2">
        <div className="relative aspect-[4/3] md:aspect-[4/5]">
          <Image
            src={aboutDetailImage.src}
            alt={aboutDetailImage.alt}
            fill
            sizes="(min-width: 768px) 420px, 90vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="text-xs uppercase tracking-widest text-text-muted">
            Coming soon
          </p>
          <h2 className="mt-4 font-display text-3xl">Your personal edit.</h2>
          <p className="mt-5 text-sm leading-8 text-text-muted">
            Accounts and order history will be available when our store opens.
            In the meantime, explore the collection and save a selection in your
            shopping bag — no account needed.
          </p>
          <Button href="/shop" className="mt-8" showArrow>
            Explore the collection
          </Button>
          <Button href="/cart" variant="link" className="mt-5 self-start">
            View your bag
          </Button>
        </div>
      </div>
    </Container>
  );
}
