"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  CloseIcon,
  InstagramIcon,
  TiktokIcon,
  UserIcon,
} from "@/components/icons";

const links = [
  { label: "Shop", href: "/shop" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "About", href: "/about" },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const focusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? [],
      );
    focusable()[0]?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-charcoal/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ivory shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        ref={panelRef}
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="flex items-center justify-between border-b border-sand px-6 py-5">
          <span className="font-display text-lg tracking-[0.08em]">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-1 text-espresso"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-sand py-4 font-display text-2xl text-text first:pt-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 border-t border-sand px-6 py-6">
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-text-muted uppercase"
          >
            <UserIcon className="size-4" />
            Account
          </Link>
          <div className="flex items-center gap-4 pt-1 text-text-muted">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href="https://tiktok.com"
              aria-label="TikTok"
              target="_blank"
              rel="noreferrer"
            >
              <TiktokIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
