"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

/**
 * Fades and lifts content into place once it enters the viewport. Renders
 * fully visible until mounted, so it never depends on JS to be seen.
 */
export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    setPending(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = window.setTimeout(() => setVisible(true), delayMs);
          observer.disconnect();
          return () => window.clearTimeout(timer);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={ref}
      data-reveal
      className={[className, pending ? "reveal-pending" : "", visible ? "is-visible" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
