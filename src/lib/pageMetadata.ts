import type { Metadata } from "next";

export function pageMetadata(
  title: string,
  description: string,
  privatePage = false,
): Metadata {
  return {
    title: `${title} — SeaSilk`,
    description,
    openGraph: {
      title: `${title} — SeaSilk`,
      description,
      siteName: "SeaSilk",
      type: "website",
    },
    ...(privatePage ? { robots: { index: false, follow: false } } : {}),
  };
}
