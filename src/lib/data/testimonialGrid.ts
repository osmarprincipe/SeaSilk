import { testimonialGridImages } from "@/lib/images";
import type { ImageAsset } from "@/lib/types";

/**
 * PLACEHOLDER TESTIMONIAL DATA.
 *
 * These are NOT real customer reviews — they exist only to show the
 * intended visual format (photo, name, short quote) until genuine,
 * permissioned customer testimonials are available. Replace every entry
 * below before this site goes to production.
 */
export interface GridTestimonial {
  id: string;
  name: string;
  quote: string;
  image: ImageAsset;
  /** Card display ratio — varied on purpose for the masonry rhythm, since all source photos share one native ratio. */
  aspectClassName: string;
}

export const testimonialGridEntries: GridTestimonial[] = [
  {
    id: "tg-01",
    name: "Sophie",
    quote: "The colour match is perfect and looks so natural.",
    image: testimonialGridImages.t01,
    aspectClassName: "aspect-[4/5]",
  },
  {
    id: "tg-02",
    name: "Maya",
    quote: "So soft, so light, and easy to wear.",
    image: testimonialGridImages.t02,
    aspectClassName: "aspect-[1/1]",
  },
  {
    id: "tg-03",
    name: "Naomi",
    quote: "The volume looks natural without feeling heavy.",
    image: testimonialGridImages.t03,
    aspectClassName: "aspect-[3/4]",
  },
  {
    id: "tg-04",
    name: "Chloe",
    quote: "The texture blends beautifully with my own hair.",
    image: testimonialGridImages.t04,
    aspectClassName: "aspect-[4/5]",
  },
  {
    id: "tg-05",
    name: "Amelia",
    quote: "I love how easy they are to style.",
    image: testimonialGridImages.t05,
    aspectClassName: "aspect-[1/1]",
  },
  {
    id: "tg-06",
    name: "Isla",
    quote: "Exactly the length I wanted without looking obvious.",
    image: testimonialGridImages.t06,
    aspectClassName: "aspect-[3/4]",
  },
  {
    id: "tg-07",
    name: "Nina",
    quote: "They move and feel like my own hair.",
    image: testimonialGridImages.t07,
    aspectClassName: "aspect-[4/5]",
  },
  {
    id: "tg-08",
    name: "Layla",
    quote: "The finish looks incredibly natural in person.",
    image: testimonialGridImages.t08,
    aspectClassName: "aspect-[1/1]",
  },
  {
    id: "tg-09",
    name: "Olivia",
    quote: "Really soft and comfortable to wear all day.",
    image: testimonialGridImages.t09,
    aspectClassName: "aspect-[3/4]",
  },
  {
    id: "tg-10",
    name: "Ava",
    quote: "The blend surprised me — it looks seamless.",
    image: testimonialGridImages.t10,
    aspectClassName: "aspect-[4/5]",
  },
];
