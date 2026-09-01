/**
 * Photography references. Real, local brand photography (like the hero)
 * is imported directly so Next.js can read its true dimensions and
 * generate a blur placeholder. Everything else is temporary Unsplash
 * placeholder photography (Unsplash License: unsplash.com/license),
 * chosen for consistent warm, neutral editorial tone. Every section reads
 * image data through `ImageAsset` objects like these — swapping in real
 * photography later means replacing the values in this file, not
 * touching any component.
 */

import capaPrincipal from "@/assets/hero/capa_principal_3.png";
import geniusWeftImage from "@/assets/collections/genius-weft.png";
import tapeInsImage from "@/assets/collections/tape-ins.png";
import clipInsImage from "@/assets/collections/clip-ins.png";
import geniusWeftEspressoBalayage from "@/assets/new-arrivals/01-genius-weft-espresso-balayage.png";
import geniusWeftChestnutBrunette from "@/assets/new-arrivals/02-genius-weft-chestnut-brunette.png";
import geniusWeftHoneyBlonde from "@/assets/new-arrivals/03-genius-weft-honey-blonde.png";
import geniusWeftNaturalBlack from "@/assets/new-arrivals/04-genius-weft-natural-black.png";
import tapeInAshBlonde from "@/assets/new-arrivals/05-tape-in-ash-blonde.png";
import tapeInMochaBrown from "@/assets/new-arrivals/06-tape-in-mocha-brown.png";
import tapeInGoldenBalayage from "@/assets/new-arrivals/07-tape-in-golden-balayage.png";
import clipInNaturalBlack from "@/assets/new-arrivals/08-clip-in-natural-black.png";
import clipInCaramelBlend from "@/assets/new-arrivals/09-clip-in-caramel-blend.png";
import clipInVanillaBlonde from "@/assets/new-arrivals/10-clip-in-vanilla-blonde.png";
import threeWomenImage from "@/assets/lifestyle/three-women.png";
import aboutGrandeImage from "@/assets/about/grande-portrait.png";
import aboutPequenaImage from "@/assets/about/pequena-detail.png";
import shopCtaBannerSrc from "@/assets/cta/shop-cta-banner.png";
import testimonial01 from "@/assets/social-proof/testimonial-01.png";
import testimonial02 from "@/assets/social-proof/testimonial-02.png";
import testimonial03 from "@/assets/social-proof/testimonial-03.png";
import testimonial04 from "@/assets/social-proof/testimonial-04.png";
import testimonial05 from "@/assets/social-proof/testimonial-05.png";
import testimonial06 from "@/assets/social-proof/testimonial-06.png";
import testimonial07 from "@/assets/social-proof/testimonial-07.png";
import testimonial08 from "@/assets/social-proof/testimonial-08.png";
import testimonial09 from "@/assets/social-proof/testimonial-09.png";
import testimonial10 from "@/assets/social-proof/testimonial-10.png";

function unsplash(id: string, width: number, quality = 80) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const heroImage = {
  src: capaPrincipal,
  alt: "Three women with long, healthy hair in dark brunette, sleek dark, and blonde tones, standing together in a warm, sunlit neutral-toned room",
};

export const shopCtaBannerImage = {
  src: shopCtaBannerSrc,
  alt: "Woman with long, healthy balayage waves, seated in a warm sunlit room with a clean, softly lit wall to her left",
};

export const aboutMainImage = {
  src: aboutGrandeImage,
  alt: "Woman with long, healthy balayage waves, seated in a warm sunlit interior",
};

export const aboutDetailImage = {
  src: aboutPequenaImage,
  alt: "Close detail of the same warm balayage waves, viewed from behind",
};

export const theEditImage = {
  src: threeWomenImage,
  alt: "Three women with long, healthy blonde and brunette hair, sitting together on a sofa in a warm, sunlit living room",
};

/**
 * Testimonial grid portraits — ten candid, warm-toned customer-style
 * photos used both as each card's full-bleed image and (cropped small
 * via CSS) as that same card's avatar.
 */
export const testimonialGridImages = {
  t01: {
    src: testimonial01,
    alt: "Customer with long, warm brunette balayage waves, smiling in a sunlit living room",
  },
  t02: {
    src: testimonial02,
    alt: "Customer with long, sleek dark brunette hair, taking a mirror photo in a neutral bedroom",
  },
  t03: {
    src: testimonial03,
    alt: "Customer with long, dark wavy hair, seated in a warm-toned salon",
  },
  t04: {
    src: testimonial04,
    alt: "Customer with long, warm brunette balayage waves, glancing to the side outdoors",
  },
  t05: {
    src: testimonial05,
    alt: "Customer with long, golden blonde waves, taking a selfie in a warm living room",
  },
  t06: {
    src: testimonial06,
    alt: "Customer with long, dark brunette waves, seated in a warm neutral interior",
  },
  t07: {
    src: testimonial07,
    alt: "Customer with long, balayage waves, taking a mirror photo in a marble bathroom",
  },
  t08: {
    src: testimonial08,
    alt: "Customer with long, dark waves with warm highlights, smiling in a bright interior",
  },
  t09: {
    src: testimonial09,
    alt: "Customer with long, dark wavy hair, smiling in a salon setting",
  },
  t10: {
    src: testimonial10,
    alt: "Customer with long, golden blonde waves, seated in a warm neutral interior",
  },
} as const;

export const collectionImages = {
  "genius-weft": {
    src: geniusWeftImage,
    alt: "A single wavy golden-blonde hair weft laid across natural stone and linen",
  },
  "tape-ins": {
    src: tapeInsImage,
    alt: "A set of brunette balayage tape-in wefts, tape tabs visible, on a warm neutral backdrop",
  },
  "clip-ins": {
    src: clipInsImage,
    alt: "A set of brunette clip-in wefts with clip hardware visible, laid across natural stone",
  },
} as const;

/**
 * New Arrivals marquee photography: one consistent studio series (hair
 * wefts hung from a metal T-bar stand, warm neutral backdrop). All ten
 * share the same native aspect ratio as the product card, so no crop
 * decisions were needed to keep the full product + stand in frame.
 */
export const newArrivalImages = {
  geniusWeftEspressoBalayage: {
    src: geniusWeftEspressoBalayage,
    alt: "Genius Weft hair extension in Espresso Balayage, hanging from a display stand",
  },
  geniusWeftChestnutBrunette: {
    src: geniusWeftChestnutBrunette,
    alt: "Genius Weft hair extension in Chestnut Brunette, hanging from a display stand",
  },
  geniusWeftHoneyBlonde: {
    src: geniusWeftHoneyBlonde,
    alt: "Genius Weft hair extension in Honey Blonde, hanging from a display stand",
  },
  geniusWeftNaturalBlack: {
    src: geniusWeftNaturalBlack,
    alt: "Genius Weft hair extension in Natural Black, hanging from a display stand",
  },
  tapeInAshBlonde: {
    src: tapeInAshBlonde,
    alt: "Tape-In hair extension wefts in Ash Blonde, hanging from a display stand",
  },
  tapeInMochaBrown: {
    src: tapeInMochaBrown,
    alt: "Tape-In hair extension wefts in Mocha Brown, hanging from a display stand",
  },
  tapeInGoldenBalayage: {
    src: tapeInGoldenBalayage,
    alt: "Tape-In hair extension wefts in Golden Balayage, hanging from a display stand",
  },
  clipInNaturalBlack: {
    src: clipInNaturalBlack,
    alt: "Clip-In hair extension wefts in Natural Black, clips visible, on a display stand",
  },
  clipInCaramelBlend: {
    src: clipInCaramelBlend,
    alt: "Clip-In hair extension wefts in Caramel Blend, clips visible, on a display stand",
  },
  clipInVanillaBlonde: {
    src: clipInVanillaBlonde,
    alt: "Clip-In hair extension wefts in Vanilla Blonde, clips visible, on a display stand",
  },
} as const;

export const productImages = {
  warmBrunette: {
    src: unsplash("1637325262485-5cf1abb98c05", 900),
    alt: "Portrait with warm brunette hair against a brown backdrop",
  },
  honeyBlonde: {
    src: unsplash("1618566909269-a09202832ac6", 900),
    alt: "Close texture detail of honey blonde waves",
  },
  softWaves: {
    src: unsplash("1560869713-7d0a29430803", 900),
    alt: "Hair being styled into soft caramel waves",
  },
  espressoWaves: {
    src: unsplash("1637325336128-936d14746e27", 900),
    alt: "Portrait with dark espresso waves against a brown backdrop",
  },
} as const;
