import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/store/PageIntro";
import { Button } from "@/components/ui/Button";
import { faqs } from "@/lib/data/information";
import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "Frequently asked questions",
  "A little guidance on SeaSilk methods, shades and shopping.",
);
export default function FAQPage() {
  return (
    <Container className="pb-24">
      <PageIntro
        eyebrow="A little guidance"
        title="Good questions. Thoughtful answers."
        description="From finding your method to exploring shades, start here."
      />
      <div className="mx-auto max-w-3xl border-t border-sand">
        {faqs.map((faq) => (
          <details key={faq.question} className="border-b border-sand py-6">
            <summary className="cursor-pointer pr-4 font-display text-xl leading-relaxed sm:text-2xl">
              {faq.question}
            </summary>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-text-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
      <div className="mt-14 text-center">
        <p className="mb-6 font-display text-2xl">Still finding your way?</p>
        <Button href="/contact" variant="secondary">
          Visit customer care
        </Button>
      </div>
    </Container>
  );
}
