import Link from "next/link";

export function PageIntro({
  title,
  eyebrow,
  description,
}: {
  title: string;
  eyebrow: string;
  description: string;
}) {
  return (
    <div className="pb-10 pt-8 text-center sm:pb-14 sm:pt-12">
      <nav aria-label="Breadcrumb" className="mb-10 text-xs text-text-muted">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span aria-hidden="true" className="mx-3">
          /
        </span>
        <span aria-current="page">{eyebrow}</span>
      </nav>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
        {eyebrow}
      </p>
      <div
        aria-hidden="true"
        className="my-5 flex items-center justify-center gap-2.5"
      >
        <span className="h-px w-7 bg-sand" />
        <span className="size-[5px] rotate-45 bg-taupe" />
        <span className="h-px w-7 bg-sand" />
      </div>
      <h1 className="font-display text-4xl leading-[1.12] text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-7 text-text-muted">
        {description}
      </p>
    </div>
  );
}
