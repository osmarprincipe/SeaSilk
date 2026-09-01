import Image from "next/image";
import { testimonialGridEntries, type GridTestimonial } from "@/lib/data/testimonialGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StarIcon } from "@/components/icons";

/**
 * Image-led testimonial grid — adapted from 21st.dev's Image Testimonial
 * Grid, rebuilt with SeaSilk's own photography and a much softer
 * warm-espresso overlay in place of the original's dark gradient. A true
 * CSS grid (not multi-column) gives a strict 3/2/1-per-row rhythm; each
 * card's own aspect ratio class still supplies mild height variation
 * (via `items-start`) since all ten source photos share one native ratio.
 */
export function ImageTestimonialGrid() {
  return (
    <section className="bg-bg py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Real Results"
            title="Loved in real life."
            description="See how SeaSilk extensions blend beautifully into everyday life."
            align="center"
            ornament
            className="mx-auto max-w-xl"
            descriptionMaxWidthClassName="max-w-lg"
          />
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-12 grid grid-cols-1 items-start gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {testimonialGridEntries.map((entry) => (
              <TestimonialImageCard key={entry.id} entry={entry} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function TestimonialImageCard({ entry }: { entry: GridTestimonial }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-stone ${entry.aspectClassName}`}
    >
      <Image
        src={entry.image.src}
        alt={entry.image.alt}
        fill
        sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 92vw"
        className="object-cover object-[50%_28%] transition-transform duration-500 ease-out motion-reduce:transition-none motion-reduce:group-hover:scale-100 group-hover:scale-[1.015]"
      />

      {/* Top gradient — just enough to lift the avatar + name. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-espresso/45 to-transparent"
      />
      {/* Bottom gradient — carries the quote and rating line. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-espresso/70 via-espresso/25 to-transparent"
      />

      <div className="absolute inset-x-0 top-0 flex items-center gap-2.5 p-4">
        <span className="relative size-8 shrink-0 overflow-hidden rounded-full ring-2 ring-ivory/85 sm:size-9">
          <Image
            src={entry.image.src}
            alt=""
            fill
            sizes="36px"
            className="object-cover object-[50%_22%]"
          />
        </span>
        <p className="text-xs font-medium text-ivory drop-shadow-[0_1px_3px_rgba(32,24,18,0.45)]">
          {entry.name}
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-sm leading-relaxed text-ivory drop-shadow-[0_1px_3px_rgba(32,24,18,0.5)]">
          &ldquo;{entry.quote}&rdquo;
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-ivory/80 drop-shadow-[0_1px_3px_rgba(32,24,18,0.5)]">
          <div className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="size-2.5" />
            ))}
          </div>
          <span className="text-[10px] font-medium tracking-[0.1em] uppercase">
            5.0 Verified Review
          </span>
        </div>
      </div>
    </div>
  );
}
