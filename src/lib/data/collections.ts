import { collectionImages } from "@/lib/images";
import type { Collection } from "@/lib/types";

export const collections: Collection[] = [
  {
    id: "col-genius-weft",
    slug: "genius-weft",
    name: "Genius Weft",
    description: "Seamless, hand-tied wefts for a flawless, undetectable blend.",
    href: "/collections/genius-weft",
    image: collectionImages["genius-weft"],
  },
  {
    id: "col-tape-ins",
    slug: "tape-ins",
    name: "Tape-Ins",
    description: "Fast-applying and reusable, for effortless everyday length.",
    href: "/collections/tape-ins",
    image: collectionImages["tape-ins"],
  },
  {
    id: "col-clip-ins",
    slug: "clip-ins",
    name: "Clip-Ins",
    description: "No-commitment length and volume, in minutes.",
    href: "/collections/clip-ins",
    image: collectionImages["clip-ins"],
  },
];
