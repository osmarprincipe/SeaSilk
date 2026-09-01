"use client";

interface NewsletterFormProps {
  id: string;
  align?: "start" | "center";
  className?: string;
}

export function NewsletterForm({ id, align = "start", className }: NewsletterFormProps) {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className={[
        "flex items-center gap-3 border-b pb-2.5",
        align === "center" ? "text-center" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        required
        placeholder="Email address"
        className={[
          "w-full bg-transparent text-sm placeholder:opacity-60 focus:outline-none",
          align === "center" ? "text-center" : "",
        ].join(" ")}
      />
      <button
        type="submit"
        className="shrink-0 text-xs font-medium tracking-[0.14em] uppercase transition-opacity duration-200 hover:opacity-70"
      >
        Join
      </button>
    </form>
  );
}
