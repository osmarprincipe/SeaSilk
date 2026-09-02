import Image from "next/image";
import { shopCtaBannerImage } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Final, image-led "ready to shop?" moment — same full-bleed pattern as
 * `ImmersiveEditorial`, but shorter (this closes the page rather than
 * anchoring a mid-page break) and with a light warm wash instead of a
 * dark scrim, since this photo's left side is already a bright, clean
 * wall rather than a shadowed area.
 */
export function ShopCtaBanner() {
  return (
    <section className="relative flex aspect-[1/1] items-center overflow-hidden bg-cream md:aspect-video lg:aspect-auto lg:h-[560px] lg:max-h-[600px] lg:min-h-[460px]">
      {/*
        Her face sits at roughly 63-75% across this photo, with the clean
        wall from ~0-54%. At the tall 4:5 crop this used to be on mobile,
        only ~43% of the width survives — her face then lands around
        60-87% of the *container* width, squarely under the heading.
        A squarer 1:1 crop (~53% of the width survives) plus pushing the
        text column narrower gives her face a clear ~65%+ margin instead.
        tablet (md): ~native aspect ratio, so the full composition shows
        desktop (lg+): only mild vertical crop at this ratio, so the clean
          left wall stays fully available for the copy
      */}
      <Image
        src={shopCtaBannerImage.src}
        alt={shopCtaBannerImage.alt}
        fill
        sizes="100vw"
        quality={90}
        className="object-cover object-[60%_center] md:object-[54%_28%] lg:object-[38%_18%]"
      />

      {/* Light, warm wash from the left — this photo's left side is
          already bright, so the "overlay" here lifts it slightly for
          guaranteed text contrast rather than darkening anything. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ivory/75 via-ivory/35 via-55% to-transparent sm:from-ivory/60 sm:via-ivory/15 sm:via-40%"
      />

      <Container className="relative">
        <Reveal className="max-w-[210px] sm:max-w-sm lg:max-w-md">
          <p className="mb-4 text-xs font-medium tracking-[0.2em] text-text-muted uppercase">
            Your Perfect Match
          </p>
          <h2 className="font-display text-3xl leading-[1.1] font-normal text-balance text-text sm:text-5xl lg:text-6xl">
            Ready for your best hair yet?
          </h2>
          <p className="mt-5 max-w-[210px] text-[15px] leading-relaxed text-text-muted sm:max-w-sm">
            Find your ideal shade, length and method — thoughtfully designed to blend
            beautifully into your everyday life.
          </p>
          <div className="mt-8 flex flex-col items-start gap-5">
            <Button href="/shop" variant="primary" showArrow>
              Shop the Collection
            </Button>
            <Button href="/best-sellers" variant="link">
              Explore Best Sellers
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
