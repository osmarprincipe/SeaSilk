"use client";

import { useCallback, useEffect, useRef } from "react";
import { ProductCard } from "@/components/home/ProductCard";
import type { Product } from "@/lib/types";

const MARQUEE_IMAGE_SIZES = "(min-width: 1024px) 350px, (min-width: 640px) 315px, 250px";
// Same pace as the previous CSS animation: one full loop (through one
// copy's width) every 145s, whatever that width happens to be at the
// current breakpoint.
const LOOP_DURATION_MS = 145_000;
// Pointer movement below this, in px, is treated as a click; above it,
// as a drag (and the resulting click on the link is suppressed).
const DRAG_THRESHOLD_PX = 6;

/**
 * A slow, continuously-looping right-to-left product row — now driven by
 * `requestAnimationFrame` + a directly-applied `transform` instead of a
 * CSS `@keyframes` animation, so it can support click-and-drag (mouse)
 * and swipe (touch) via the Pointer Events API, which covers both input
 * types with one set of handlers. No new dependency: this is vanilla
 * rAF + pointer events + CSS transforms, per the project's existing
 * animation architecture (see globals.css for the small amount of
 * supporting CSS — cursor, touch-action, the reduced-motion swap).
 *
 * Renders the product list twice for the seamless loop; only the first
 * copy is accessible (the second is `aria-hidden`, out of tab order).
 * Reduced-motion visitors get `.marquee-static`, the plain grid, with
 * this entire drag/autoplay track hidden and inert.
 */
export function ProductMarquee({ products }: { products: Product[] }) {
  const trackItems = [...products, ...products];

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Animation state lives in refs, not React state — this updates every
  // frame, and re-rendering React for that would be wasteful and janky.
  const offsetRef = useRef(0); // current translateX in px, always in (-halfWidth, 0]
  const halfWidthRef = useRef(0); // width of one copy of the items
  const speedRef = useRef(0); // px/ms, derived from halfWidth so the loop duration stays fixed
  const lastTimeRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const draggedRef = useRef(false); // did the current/last gesture move enough to count as a drag?
  const activePointerIdRef = useRef<number | null>(null); // for the window-level release safety net below

  const wrap = useCallback((value: number, halfWidth: number) => {
    if (halfWidth <= 0) return value;
    let v = value % halfWidth;
    if (v > 0) v -= halfWidth;
    return v;
  }, []);

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    }
  }, []);

  // Measure the track (and re-measure on resize/breakpoint change) so the
  // loop always covers exactly one copy's width, and so speed adjusts to
  // keep that loop taking the same 145s regardless of viewport.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      const full = track!.scrollWidth;
      halfWidthRef.current = full / 2;
      speedRef.current = halfWidthRef.current / LOOP_DURATION_MS;
      offsetRef.current = wrap(offsetRef.current, halfWidthRef.current);
      applyTransform();
    }

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    return () => resizeObserver.disconnect();
  }, [wrap, applyTransform]);

  // The autoplay loop. Hover never pauses it, and neither does keyboard
  // focus — the only thing that temporarily takes over is an active
  // drag/swipe (isDraggingRef), and it's skipped entirely under
  // prefers-reduced-motion. Autoplay resumes on the very next frame after
  // isDraggingRef goes false, continuing from `offsetRef.current` exactly
  // where the gesture left it — no jump, no reset to start.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motionQuery.matches;
    const handleMotionChange = () => {
      reducedMotionRef.current = motionQuery.matches;
    };
    motionQuery.addEventListener("change", handleMotionChange);

    let rafId: number;

    function tick(time: number) {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!isDraggingRef.current && !reducedMotionRef.current && halfWidthRef.current > 0) {
        offsetRef.current = wrap(
          offsetRef.current - speedRef.current * delta,
          halfWidthRef.current,
        );
        applyTransform();
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [wrap, applyTransform]);

  // Safety net: whatever ends the gesture — a pointerup that lands outside
  // the viewport, the browser revoking capture mid-drag, a cancelled
  // touch — must always clear isDraggingRef so autoplay resumes without
  // requiring an unrelated click elsewhere on the page. The local
  // onPointerUp/onPointerCancel handlers below cover the normal case;
  // these window-level listeners catch anything that manages to end the
  // gesture without one of those firing on the viewport itself.
  useEffect(() => {
    function forceEndDrag() {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      trackRef.current?.classList.remove("is-dragging");
      const id = activePointerIdRef.current;
      if (id != null && viewportRef.current?.hasPointerCapture(id)) {
        viewportRef.current.releasePointerCapture(id);
      }
      activePointerIdRef.current = null;
    }

    window.addEventListener("pointerup", forceEndDrag);
    window.addEventListener("pointercancel", forceEndDrag);
    window.addEventListener("blur", forceEndDrag);
    return () => {
      window.removeEventListener("pointerup", forceEndDrag);
      window.removeEventListener("pointercancel", forceEndDrag);
      window.removeEventListener("blur", forceEndDrag);
    };
  }, []);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    isDraggingRef.current = true;
    draggedRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    const deltaX = event.clientX - dragStartXRef.current;
    if (!draggedRef.current && Math.abs(deltaX) > DRAG_THRESHOLD_PX) {
      // Only now do we know this is a genuine drag, not a click — capture
      // the pointer so the gesture keeps tracking even if it leaves the
      // element's bounds. Capturing unconditionally on pointerdown instead
      // would re-target the eventual native `click` event to this
      // container, which silently breaks the link's own navigation for
      // every ordinary click, not just drags.
      draggedRef.current = true;
      trackRef.current?.classList.add("is-dragging");
      activePointerIdRef.current = event.pointerId;
      viewportRef.current?.setPointerCapture(event.pointerId);
    }
    offsetRef.current = wrap(dragStartOffsetRef.current + deltaX, halfWidthRef.current);
    applyTransform();
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    trackRef.current?.classList.remove("is-dragging");
    if (viewportRef.current?.hasPointerCapture(event.pointerId)) {
      viewportRef.current.releasePointerCapture(event.pointerId);
    }
    activePointerIdRef.current = null;
    // Autoplay resumes on the very next frame from `offsetRef.current` —
    // exactly where the gesture left it, with no jump or reset.
  }

  // Fires (via capture, before the link's own handler) for every click,
  // including the synthetic one browsers dispatch after a pointerup even
  // when that pointerup ended a drag. Only suppress navigation when this
  // gesture actually moved past the drag threshold.
  function handleClickCapture(event: React.MouseEvent<HTMLDivElement>) {
    if (draggedRef.current) {
      event.preventDefault();
      event.stopPropagation();
      draggedRef.current = false;
    }
  }

  return (
    <div className="mt-10 sm:mt-12">
      <div
        ref={viewportRef}
        className="marquee-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onClickCapture={handleClickCapture}
        onDragStart={(event) => event.preventDefault()}
      >
        <div ref={trackRef} className="marquee-track">
          {trackItems.map((product, index) => {
            const isDuplicate = index >= products.length;
            return (
              <div
                key={`${product.id}-${isDuplicate ? "dup" : "orig"}`}
                className="marquee-item"
                aria-hidden={isDuplicate || undefined}
              >
                <ProductCard
                  product={product}
                  variant="refined"
                  imageSizes={MARQUEE_IMAGE_SIZES}
                  tabIndex={isDuplicate ? -1 : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="marquee-static grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} variant="refined" />
        ))}
      </div>
    </div>
  );
}
