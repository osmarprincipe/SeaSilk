import Image from "next/image";
import { theEditImage } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A full-bleed, image-first lifestyle break — deliberately not the
 * split image/text layout `EditorialSection` uses. One photograph fills
 * the section; copy sits directly on top, left-aligned, in the clean
 * area of the frame. Sized as a strong cinematic beat between the
 * product sections above and the trust/newsletter close below: larger
 * than `EditorialSection`'s fixed 640px, but shorter than the Hero.
 */
export function ImmersiveEditorial() {
  return (
    <section className="relative flex aspect-[4/5] items-center overflow-hidden bg-cream md:aspect-video lg:aspect-auto lg:h-[75vh] lg:max-h-[760px] lg:min-h-[560px]">
      {/*
        Single source image, art-directed per breakpoint via object-position:
        - mobile: right-biased crop keeping two of the three women in frame
          (the full width doesn't fit a tall mobile crop)
        - tablet (md): ~native aspect ratio, so the full composition shows
        - desktop (lg+): left-biased, preserving the clean window/wall area
          on the left for the copy to sit in without crossing any face
      */}
      <Image
        src={theEditImage.src}
        alt={theEditImage.alt}
        fill
        sizes="100vw"
        quality={90}
        className="object-cover object-[70%_26%] md:object-[50%_35%] lg:object-[36%_26%] xl:object-[32%_22%]"
      />

      {/* Warm, localized scrim from the left only — never a flat overlay
          across the whole photo. Slightly stronger on mobile, where the
          crop leaves less clean background behind the copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/15 via-35% to-transparent sm:from-charcoal/42 sm:via-charcoal/8 sm:via-40%"
      />

      <Container className="relative">
        <Reveal className="max-w-xs sm:max-w-sm lg:max-w-md">
          <span className="mb-6 block h-px w-12 bg-ivory/70" aria-hidden="true" />
          <p className="mb-4 text-xs font-medium tracking-[0.2em] text-ivory/80 uppercase">
            The Edit
          </p>
          <h2 className="font-display text-4xl leading-[1.1] font-normal text-balance text-ivory sm:text-5xl lg:text-6xl">
            Luxury hair, made to be noticed.
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ivory/85">
            Refined colour, seamless movement, and a finish that feels naturally yours.
          </p>
          <div className="mt-8">
            <Button href="/shop" variant="inverse" showArrow>
              Shop the Collection
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
