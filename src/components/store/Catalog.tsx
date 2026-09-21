"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/home/ProductCard";
import { collections } from "@/lib/data/collections";
import type { Product } from "@/lib/types";

export function Catalog({
  products,
  initialQuery = "",
  showMethods = true,
}: {
  products: Product[];
  initialQuery?: string;
  showMethods?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [method, setMethod] = useState("all");
  const [sort, setSort] = useState("curated");
  const visible = products.filter(
    (p) =>
      (method === "all" || p.category === method) &&
      `${p.name} ${p.shade}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  if (sort === "low") visible.sort((a, b) => a.price - b.price);
  if (sort === "high") visible.sort((a, b) => b.price - a.price);
  if (sort === "name")
    visible.sort((a, b) =>
      `${a.name} ${a.shade}`.localeCompare(`${b.name} ${b.shade}`),
    );
  return (
    <div>
      {showMethods && (
        <div
          className="mb-8 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter by method"
        >
          {[{ slug: "all", name: "All extensions" }, ...collections].map(
            (c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setMethod(c.slug)}
                aria-pressed={method === c.slug}
                className={`min-h-11 rounded-full border px-5 py-2 text-xs transition-colors ${method === c.slug ? "border-espresso bg-espresso text-ivory" : "border-sand hover:border-taupe"}`}
              >
                {c.name}
              </button>
            ),
          )}
        </div>
      )}
      <div className="mb-8 grid gap-5 border-y border-sand py-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="block max-w-sm text-xs text-text-muted">
          Find your shade
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by method or shade"
            className="mt-2 block min-h-11 w-full border-b border-taupe bg-transparent px-1 text-sm text-espresso"
          />
        </label>
        <label className="text-xs text-text-muted">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="ml-3 min-h-11 rounded border border-sand bg-ivory px-3 text-sm text-espresso"
          >
            <option value="curated">Our selection</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>
      <p className="mb-6 text-xs text-text-muted" role="status">
        {visible.length} {visible.length === 1 ? "piece" : "pieces"} to discover
      </p>
      {visible.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              variant="refined"
              imageSizes="(min-width: 1440px) 310px, (min-width: 1024px) 23vw, 46vw"
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-cream px-6 py-16 text-center">
          <h2 className="font-display text-3xl">A different shade, perhaps?</h2>
          <p className="mt-4 text-sm text-text-muted">
            Try a broader search, or explore the full selection.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setMethod("all");
            }}
            className="mt-6 min-h-11 underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
      <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-sand pt-8 sm:flex-row">
        <p className="font-display text-2xl">
          A little guidance goes a long way.
        </p>
        <Link
          href="/faq"
          className="py-3 text-xs tracking-[0.14em] uppercase underline underline-offset-4"
        >
          Find your method →
        </Link>
      </div>
    </div>
  );
}
