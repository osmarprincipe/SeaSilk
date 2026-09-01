"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { newArrivalImages } from "@/lib/images";
import { subscribeToNewsletter } from "@/lib/newsletter";
import {
  hasSubscribed,
  isDismissed,
  markDismissed,
  markSubscribed,
} from "@/lib/newsletterPopupStorage";
import { CheckIcon, CloseIcon } from "@/components/icons";

const OPEN_DELAY_MS = 10_000;
const TRANSITION_MS = 300;

const popupImage = newArrivalImages.geniusWeftEspressoBalayage;

type Status = "idle" | "submitting" | "success";

/**
 * Premium newsletter invitation, shown once per ~6-day window (see
 * lib/newsletterPopupStorage), ~10s after landing on the homepage, and
 * never again once the visitor has actually subscribed. Submission goes
 * through lib/newsletter's `subscribeToNewsletter` — replace that
 * function's body with a real provider call later; nothing here needs
 * to change.
 */
export function NewsletterPopup() {
  const [shouldRender, setShouldRender] = useState(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (hasSubscribed() || isDismissed()) return;

    const timer = window.setTimeout(() => {
      setShouldRender(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    }, OPEN_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const close = useCallback(
    (reason: "dismiss" | "success-continue") => {
      setOpen(false);
      if (reason === "dismiss" && status !== "success") {
        markDismissed();
      }
      previouslyFocused.current?.focus();
      window.setTimeout(() => setShouldRender(false), TRANSITION_MS);
    },
    [status],
  );

  // Focus management, Escape-to-close, and a Tab focus trap while open.
  useEffect(() => {
    if (!shouldRender) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    // Prefer the email field itself — this is a signup prompt, so let
    // visitors start typing immediately rather than landing on Close.
    const emailField = dialogRef.current?.querySelector<HTMLElement>("#newsletter-popup-email");
    const firstFocusable = dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector)[0];
    (emailField ?? firstFocusable)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close("dismiss");
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldRender, close]);

  // Move focus to the primary action when the success state appears.
  useEffect(() => {
    if (status === "success") {
      continueButtonRef.current?.focus();
    }
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("submitting");

    const result = await subscribeToNewsletter(email);

    if (result.success) {
      markSubscribed();
      setStatus("success");
    } else {
      setStatus("idle");
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        aria-hidden="true"
        onClick={() => close("dismiss")}
        className={`absolute inset-0 bg-charcoal/50 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-popup-heading"
        className={`relative grid max-h-[90vh] w-full max-w-[880px] grid-cols-1 overflow-y-auto rounded-3xl border border-sand bg-bg shadow-[0_40px_80px_-32px_rgba(59,42,31,0.45)] transition-all duration-300 ease-out motion-reduce:transition-none sm:max-h-none sm:grid-cols-2 sm:overflow-visible ${
          open ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={() => close("dismiss")}
          aria-label="Close newsletter signup"
          className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-bg/80 text-espresso transition-colors duration-200 hover:bg-bg"
        >
          <CloseIcon className="size-[18px]" />
        </button>

        <div className="relative aspect-[16/10] sm:aspect-auto">
          <Image
            src={popupImage.src}
            alt={popupImage.alt}
            fill
            sizes="(min-width: 640px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12">
          {status === "success" ? (
            <div className="text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-sand text-espresso">
                <CheckIcon className="size-5" />
              </span>
              <h2
                id="newsletter-popup-heading"
                className="font-display mt-5 text-3xl font-normal text-text"
              >
                You&rsquo;re In!
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                Thanks for joining the list. You&rsquo;ll be the first to know.
              </p>
              <button
                ref={continueButtonRef}
                type="button"
                onClick={() => close("success-continue")}
                className="mt-7 inline-flex w-full items-center justify-center bg-espresso px-8 py-4 text-xs font-medium tracking-[0.14em] text-ivory uppercase transition-colors duration-300 hover:bg-charcoal sm:w-auto"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xs font-medium tracking-[0.2em] text-text-muted uppercase">
                Be the First to Know
              </p>
              <h2
                id="newsletter-popup-heading"
                className="font-display mt-3 text-3xl font-normal text-text sm:text-4xl"
              >
                Join the List
              </h2>
              <span className="mx-auto mt-4 block h-px w-10 bg-sand" aria-hidden="true" />
              <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
                Get early access to new shades, exclusive releases, and insider offers.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 text-left" noValidate={false}>
                <label htmlFor="newsletter-popup-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-popup-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-sand bg-ivory px-4 py-3.5 text-sm text-text placeholder:text-text-muted/70 focus:border-espresso focus:outline-none"
                />

                {error ? <p className="mt-2 text-xs text-[#9a3e2f]">{error}</p> : null}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-3 flex w-full items-center justify-center rounded-md bg-espresso px-8 py-4 text-xs font-medium tracking-[0.14em] text-ivory uppercase transition-colors duration-300 hover:bg-charcoal disabled:opacity-60"
                >
                  {status === "submitting" ? "Joining…" : "Join the List"}
                </button>
              </form>

              <p className="mt-4 text-[11px] leading-relaxed text-text-muted">
                By signing up, you agree to receive emails from SeaSilk. You can unsubscribe at
                any time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
