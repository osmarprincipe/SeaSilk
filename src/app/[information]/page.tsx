import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/store/PageIntro";
import { Button } from "@/components/ui/Button";
import { information } from "@/lib/data/information";
import { pageMetadata } from "@/lib/pageMetadata";
function getPage(key: string) {
  return Object.hasOwn(information, key)
    ? information[key as keyof typeof information]
    : null;
}
export function generateStaticParams() {
  return Object.keys(information).map((information) => ({ information }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ information: string }>;
}) {
  const p = getPage((await params).information);
  return p ? pageMetadata(p.eyebrow, p.description, true) : {};
}
export default async function InformationPage({
  params,
}: {
  params: Promise<{ information: string }>;
}) {
  const key = (await params).information;
  const p = getPage(key);
  if (!p) notFound();
  return (
    <Container className="pb-24">
      <PageIntro
        eyebrow={p.eyebrow}
        title={p.title}
        description={p.description}
      />
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <nav
          aria-label="Customer care"
          className="flex flex-wrap gap-2 self-start md:flex-col"
        >
          {Object.entries(information).map(([slug, item]) => (
            <Link
              key={slug}
              href={`/${slug}`}
              aria-current={key === slug ? "page" : undefined}
              className={`rounded px-4 py-3 text-sm ${key === slug ? "bg-cream font-medium" : "text-text-muted hover:bg-cream"}`}
            >
              {item.eyebrow}
            </Link>
          ))}
          <Link href="/faq" className="px-4 py-3 text-sm text-text-muted">
            FAQ
          </Link>
        </nav>
        <div className="rounded-2xl border border-sand p-6 sm:p-10">
          {p.sections.map((section) => (
            <section
              key={section.title}
              className="mb-8 border-b border-sand pb-8 last:mb-0 last:border-0 last:pb-0"
            >
              <h2 className="font-display text-2xl">{section.title}</h2>
              <p className="mt-4 text-sm leading-8 text-text-muted">
                {section.body}
              </p>
            </section>
          ))}
          <Button href="/contact" variant="link" className="mt-10">
            Visit customer care
          </Button>
        </div>
      </div>
    </Container>
  );
}
