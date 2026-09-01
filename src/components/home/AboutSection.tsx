import Image from "next/image";
import { aboutMainImage, aboutDetailImage } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LeafIcon, SparkleIcon, FeatherIcon } from "@/components/icons";

const valuePoints = [
  {
    icon: LeafIcon,
    title: "Natural Blend",
    text: "Seamless, undetectable results that feel like you.",
  },
  {
    icon: SparkleIcon,
    title: "Refined Finish",
    text: "Thoughtful details for a polished look.",
  },
  {
    icon: FeatherIcon,
    title: "Effortless Wear",
    text: "Lightweight comfort made for real life.",
  },
];

export function AboutSection() {
  return (
    <section className="bg-bg-alt py-20 sm:py-28">
      <Container className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
        <Reveal>
          <span className="mb-6 block h-px w-12 bg-espresso" aria-hidden="true" />
          <p className="mb-4 text-xs font-medium tracking-[0.2em] text-text-muted uppercase">
            Our Approach
          </p>
          <h2 className="font-display max-w-lg text-4xl leading-[1.08] font-normal text-balance text-text sm:text-5xl lg:text-6xl">
            Quiet confidence, by design.
          </h2>
          <p className="mt-5 text-xs font-medium tracking-[0.16em] text-brown uppercase">
            Beautiful hair. Intentional by nature.
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-muted">
            SeaSilk is created for women who want their hair to feel effortless, refined and
            completely their own. Every strand is considered — from colour and texture to
            movement and finish — for a result that blends beautifully into everyday life.
          </p>

          <div className="mt-9 grid grid-cols-3 divide-x divide-sand border-y border-sand py-6">
            {valuePoints.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col items-center gap-3 px-2 text-center">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-taupe/35 text-brown">
                  <Icon className="size-[18px]" />
                </span>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.1em] text-text uppercase">
                    {title}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-snug text-text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/*
            PLACEHOLDER STATISTIC — not a verified figure. Replace "98%"
            and the supporting line with real, sourced customer data
            before this site goes to production.
          */}
          <div className="mt-7 flex items-start gap-5 rounded-2xl border border-sand bg-bg/70 px-6 py-5">
            <span className="font-display shrink-0 text-4xl leading-none text-espresso">98%</span>
            <div>
              <p className="text-sm leading-snug text-text">
                of women say SeaSilk blends seamlessly and feels like their own hair.
              </p>
              <p className="mt-1.5 text-[11px] text-text-muted">*Based on customer feedback.</p>
            </div>
          </div>

          <div className="mt-8">
            <Button href="/about" variant="primary" showArrow>
              Discover Our Story
            </Button>
          </div>
        </Reveal>

        <Reveal delayMs={100} className="relative mx-auto w-full max-w-sm lg:max-w-lg">
          {/* Very subtle decorative ring behind the composition — purely ambient. */}
          <div
            aria-hidden="true"
            className="absolute -top-6 -right-6 -z-10 size-32 rounded-full border border-taupe/25 sm:-top-8 sm:-right-8 sm:size-40"
          />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone">
            <Image
              src={aboutMainImage.src}
              alt={aboutMainImage.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 85vw"
              className="object-cover"
            />
          </div>

          {/* Overlapping detail card — framed with a light border so it reads
              as a distinct, intentionally paired second photograph. */}
          <div className="absolute -bottom-8 -left-6 w-[42%] sm:-bottom-10 sm:-left-10">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border-4 border-ivory bg-stone shadow-[0_16px_40px_-20px_rgba(32,24,18,0.35)]">
              <Image
                src={aboutDetailImage.src}
                alt={aboutDetailImage.alt}
                fill
                sizes="(min-width: 1024px) 17vw, 36vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
