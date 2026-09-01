interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  /** Small line–diamond–line mark between the eyebrow and the heading. */
  ornament?: boolean;
  className?: string;
  /** Override the description's max-width utility (defaults to "max-w-md"). */
  descriptionMaxWidthClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  ornament = false,
  className,
  descriptionMaxWidthClassName = "max-w-md",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <div
      className={[isCenter ? "text-center" : "text-left", className].filter(Boolean).join(" ")}
    >
      {eyebrow ? (
        <p
          className={[
            "text-xs font-medium tracking-[0.2em] uppercase",
            ornament ? "mb-4" : "mb-3",
            isLight ? "text-ivory/70" : "text-text-muted",
          ].join(" ")}
        >
          {eyebrow}
        </p>
      ) : null}
      {ornament ? (
        <div
          aria-hidden="true"
          className={[
            "mb-5 flex items-center gap-2.5",
            isCenter ? "justify-center" : "justify-start",
          ].join(" ")}
        >
          <span className={`h-px w-7 ${isLight ? "bg-ivory/40" : "bg-sand"}`} />
          <span className={`size-[5px] rotate-45 ${isLight ? "bg-ivory/70" : "bg-taupe"}`} />
          <span className={`h-px w-7 ${isLight ? "bg-ivory/40" : "bg-sand"}`} />
        </div>
      ) : null}
      <h2
        className={[
          "font-display text-3xl leading-[1.1] font-normal text-balance sm:text-4xl lg:text-[2.75rem]",
          isLight ? "text-ivory" : "text-text",
        ].join(" ")}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={[
            "mt-4 text-[15px] leading-relaxed",
            descriptionMaxWidthClassName,
            isCenter ? "mx-auto" : "",
            isLight ? "text-ivory/80" : "text-text-muted",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
