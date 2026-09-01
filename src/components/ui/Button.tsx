import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

type Variant = "primary" | "secondary" | "inverse" | "link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Adds the same hover-nudging arrow the "link" variant always has. */
  showArrow?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-espresso text-ivory border border-espresso hover:bg-charcoal hover:border-charcoal",
  secondary: "border border-espresso text-espresso hover:bg-espresso hover:text-ivory",
  inverse: "border border-ivory/70 text-ivory hover:bg-ivory hover:text-espresso",
  link: "text-espresso underline-offset-4 hover:underline",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  showArrow = false,
}: ButtonProps) {
  if (variant === "link") {
    return (
      <Link
        href={href}
        className={[
          "group inline-flex items-center gap-2 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300",
          variantClasses.link,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
        <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
      {showArrow ? (
        <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
}
