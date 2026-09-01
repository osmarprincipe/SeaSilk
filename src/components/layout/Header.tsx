"use client";

import Link from "next/link";
import { useState } from "react";
import { BagIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/icons";
import { MobileNav } from "@/components/layout/MobileNav";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-ivory">
      <div className="mx-auto grid h-18 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:h-20 lg:px-12 xl:px-16">
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="p-1 text-espresso lg:hidden"
          >
            <MenuIcon className="size-6" />
          </button>
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-[0.14em] text-text uppercase transition-colors duration-200 hover:text-text-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href="/"
          className="font-display justify-self-center text-xl tracking-[0.14em] text-text sm:text-2xl"
        >
          SEASILK
        </Link>

        <div className="flex items-center justify-end gap-5 text-espresso">
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Toggle search"
            aria-expanded={searchOpen}
            className="p-1"
          >
            <SearchIcon className="size-[19px]" />
          </button>
          <Link href="/account" aria-label="Account" className="hidden p-1 lg:inline-flex">
            <UserIcon className="size-[19px]" />
          </Link>
          <Link href="/cart" aria-label="Cart" className="p-1">
            <BagIcon className="size-[19px]" />
          </Link>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-sand bg-ivory transition-[max-height] duration-300 ease-out ${
          searchOpen ? "max-h-20" : "max-h-0 border-t-0"
        }`}
      >
        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto flex max-w-[1440px] items-center gap-3 px-5 py-4 sm:px-8 lg:px-12 xl:px-16"
        >
          <SearchIcon className="size-[18px] shrink-0 text-text-muted" />
          <input
            type="search"
            placeholder="Search products"
            aria-label="Search products"
            className="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
          />
        </form>
      </div>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
