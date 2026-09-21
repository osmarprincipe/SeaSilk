import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageIntro } from "@/components/store/PageIntro";
import { aboutMainImage, aboutDetailImage, theEditImage } from "@/lib/images";
import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "Our story",
  "Discover the SeaSilk approach to colour, texture and effortless beauty.",
);
export default function AboutPage() {
  return (
    <>
      <Container>
        <PageIntro
          eyebrow="Our story"
          title="Beautifully, completely you."
          description="We believe the best hair is the hair you feel yourself in."
        />
        <div className="grid items-center gap-12 pb-20 md:grid-cols-2 lg:gap-20">
          <div className="relative pb-10 pl-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src={aboutMainImage.src}
                alt={aboutMainImage.alt}
                fill
                preload
                sizes="(min-width: 768px) 43vw, 82vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 aspect-square w-2/5 overflow-hidden rounded-2xl border-4 border-ivory">
              <Image
                src={aboutDetailImage.src}
                alt={aboutDetailImage.alt}
                fill
                sizes="(min-width: 768px) 20vw, 36vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-text-muted">
              Our approach
            </p>
            <h2 className="mt-5 max-w-md font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
              Quiet confidence,
              <br />
              by design.
            </h2>
            <p className="mt-7 max-w-md text-[15px] leading-8 text-text-muted">
              SeaSilk is created for women who want their hair to feel
              effortless, refined and completely their own. Every strand is
              considered — from colour and texture to movement and finish — for
              a result that blends beautifully into everyday life.
            </p>
            <p className="mt-5 max-w-md text-[15px] leading-8 text-text-muted">
              Our collection brings together three ways to wear extensions.
              Choose the freedom of Clip-Ins, explore Tape-Ins, or discover
              Genius Weft with your stylist. Your routine is the starting point.
            </p>
            <Button href="/collections" variant="link" className="mt-8">
              Find your method
            </Button>
          </div>
        </div>
      </Container>
      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Natural blend",
                text: "Colour and texture that sit comfortably alongside your own. A finish that lets you feel like yourself.",
              },
              {
                title: "Refined finish",
                text: "Attention to the details you see and feel, from the way the hair falls to the movement through the ends.",
              },
              {
                title: "Everyday ease",
                text: "A collection shaped around different routines. Find the method that fits the way you want to wear your hair.",
              },
            ].map((v) => (
              <div key={v.title} className="border-t border-taupe pt-6">
                <h2 className="font-display text-2xl">{v.title}</h2>
                <p className="mt-4 max-w-sm text-sm leading-7 text-text-muted">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Container className="py-20">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[2.2/1]">
          <Image
            src={theEditImage.src}
            alt={theEditImage.alt}
            fill
            sizes="90vw"
            className="object-cover object-right"
          />
        </div>
        <div className="mt-10 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">
            Make room for a little possibility.
          </h2>
          <Button href="/shop" className="mt-7" showArrow>
            Explore the collection
          </Button>
        </div>
      </Container>
    </>
  );
}
