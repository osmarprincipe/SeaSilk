import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/store/PageIntro";
import { ContactForm } from "@/components/store/ContactForm";
import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "Contact",
  "Find guidance on SeaSilk shades, methods and customer care.",
);
export default function ContactPage() {
  return (
    <Container className="pb-24">
      <PageIntro
        eyebrow="Customer care"
        title="Let’s talk hair."
        description="A colour question, a new routine, a little guidance. Start with what’s on your mind."
      />
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:pt-8">
          <h2 className="font-display text-3xl">
            A considered choice starts
            <br className="hidden sm:block" /> with a conversation.
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-8 text-text-muted">
            While we prepare to open customer support, explore our guides to
            methods, shades and shopping.
          </p>
          <div className="mt-8 max-w-sm">
            {[
              { href: "/faq", label: "Methods & shade questions" },
              { href: "/shipping", label: "Delivery information" },
              { href: "/returns", label: "Returns & exchanges" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex justify-between border-b border-sand py-5 text-sm"
              >
                {link.label}
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </Container>
  );
}
