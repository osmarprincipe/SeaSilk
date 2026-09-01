import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/types";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={collection.href}
      className="hover-reveal-card group relative block aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl bg-stone shadow-[0_10px_30px_-18px_rgba(32,24,18,0.28)] hover:shadow-[0_18px_40px_-16px_rgba(32,24,18,0.32)] sm:w-auto sm:shrink"
    >
      <Image
        src={collection.image.src}
        alt={collection.image.alt}
        fill
        sizes="(min-width: 640px) 33vw, 78vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/5 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
        <h3 className="font-display text-2xl text-ivory">{collection.name}</h3>
        <p className="mt-1.5 max-w-[28ch] text-[13px] leading-snug text-ivory/80">
          {collection.description}
        </p>
        <span className="mt-4 inline-block h-px w-8 bg-ivory/70 transition-all duration-300 group-hover:w-14" />
      </div>
    </Link>
  );
}
