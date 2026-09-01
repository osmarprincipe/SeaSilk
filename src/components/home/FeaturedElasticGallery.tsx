"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { newArrivals } from "@/lib/data/products";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";

const cards = newArrivals;
const COUNT = cards.length;

/**
 * A straight, upright "elastic gallery": every card stays vertical and
 * shares the same height and rounded corners — only its width (via CSS
 * `flex-grow`, which animates smoothly on its own) changes between the
 * active and inactive state. No rotation, no absolute positioning, no
 * arc. Hover previews a card on hover-capable devices; click/tap commits
 * it, and clicking the already-active card follows the link through.
 * Product data/images are the same ones already used by New Arrivals —
 * nothing new is loaded.
 */
export function FeaturedElasticGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % COUNT) + COUNT) % COUNT);
  }, []);

  // On narrow screens the row scrolls horizontally — when the active card
  // changes, bring it fully into view instead of leaving it clipped at
  // the scroll edge (matters for tap/keyboard nav; hover only fires for
  // cards already visible, so this is a no-op there).
  useEffect(() => {
    cardRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(activeIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(activeIndex - 1);
      }
    },
    [activeIndex, goTo],
  );

  return (
    <section className="bg-bg py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Most Loved"
            title="Featured Products"
            description="Explore the shades and finishes our clients keep coming back to."
            align="center"
            ornament
            className="mx-auto max-w-xl"
            descriptionMaxWidthClassName="max-w-lg"
          />
        </Reveal>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured products, use left and right arrow keys to browse"
          onKeyDown={handleKeyDown}
          className="mt-10 flex h-[280px] items-stretch gap-2 overflow-x-auto sm:mt-12 sm:h-[380px] sm:gap-3 lg:h-[500px] lg:gap-3.5"
        >
          {cards.map((card, index) => {
            const isActive = index === activeIndex;

            return (
              <Link
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                href={`/products/${card.slug}`}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={() => goTo(index)}
                onClick={(event) => {
                  if (!isActive) {
                    event.preventDefault();
                    goTo(index);
                  }
                }}
                className={`group relative h-full shrink-0 overflow-hidden rounded-2xl bg-stone transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isActive
                    ? "min-w-[172px] sm:min-w-[220px] lg:min-w-[260px]"
                    : "min-w-[54px] sm:min-w-[68px] lg:min-w-[80px]"
                }`}
                style={{ flexGrow: isActive ? 12 : 1 }}
              >
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(min-width: 1024px) 640px, (min-width: 640px) 420px, 280px"
                  className="object-cover"
                />

                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <span
                  className={`absolute bottom-4 left-4 flex items-center gap-1.5 text-[11px] font-medium tracking-[0.14em] whitespace-nowrap text-ivory uppercase transition-opacity duration-500 sm:bottom-5 sm:left-5 ${
                    isActive ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
                  }`}
                >
                  Discover More
                  <ArrowRightIcon className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
