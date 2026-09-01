import Image from "next/image";
import { heroImage } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative flex aspect-[4/5] items-end overflow-hidden bg-cream md:aspect-video lg:aspect-auto lg:h-[85vh] lg:max-h-[800px] lg:min-h-[600px]">
      {/*
        Single source image, art-directed per breakpoint via object-position:
        - mobile: right-biased crop keeping two models' faces/hair in frame
          (the full three-model width doesn't fit a tall mobile crop)
        - tablet (md): ~native aspect ratio, so the full composition shows
        - desktop (lg+): left-biased, preserving the clean wall/fireplace
          area on the left for the copy to sit in without crossing faces

        If a dedicated vertical mobile crop is shot later, add it as
        `heroImageMobile` in `lib/images.ts` and swap the `src` below inside
        a `md:hidden` clone of this <Image>, paired with `hidden md:block`
        on this one — no other changes needed.
      */}
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[78%_28%] md:object-[50%_38%] lg:object-[32%_20%] xl:object-[28%_18%]"
      />

      {/* Mobile/tablet: text sits at the bottom, so the scrim rises from the bottom. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/15 via-35% to-transparent md:hidden"
      />
      {/* Desktop: the left side of the photo is clean background, so the
          scrim washes in from the left instead of darkening the whole frame. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-r from-charcoal/45 via-charcoal/10 via-45% to-transparent md:block"
      />

      <Container className="relative pb-14 sm:pb-16 lg:pb-20">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-medium tracking-[0.2em] text-ivory/80 uppercase">
            New Season
          </p>
          <h1 className="font-display text-5xl leading-[1.05] font-normal text-ivory sm:text-6xl lg:text-7xl">
            Hair, Elevated.
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ivory/85 sm:text-base">
            Premium human hair extensions designed for seamless, natural-looking results.
          </p>
          <div className="mt-8">
            <Button href="/shop" variant="inverse">
              Shop the Collection
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
