import type { StaticImageData } from "next/image";

export type ProductCategory = "genius-weft" | "tape-ins" | "clip-ins";

export interface ImageAsset {
  /** A remote URL, or a statically-imported local image (auto width/height + blur placeholder). */
  src: string | StaticImageData;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shade: string;
  price: number;
  compareAtPrice?: number;
  image: ImageAsset;
  tags?: Array<"new" | "featured" | "best-seller">;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  href: string;
  image: ImageAsset;
}
