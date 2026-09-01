import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { InstagramIcon, TiktokIcon } from "@/components/icons";

const shopLinks = [
  { label: "Genius Weft", href: "/collections/genius-weft" },
  { label: "Tape-Ins", href: "/collections/tape-ins" },
  { label: "Clip-Ins", href: "/collections/clip-ins" },
  { label: "Best Sellers", href: "/best-sellers" },
];

const infoLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "FAQ", href: "/faq" },
];

export function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1.3fr] lg:gap-x-12">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="font-display text-2xl tracking-[0.14em]">
            SEASILK
          </Link>
          <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-footer-muted">
            Premium human hair extensions, designed to blend seamlessly and wear beautifully.
          </p>
        </div>

        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Information" links={infoLinks} />

        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-xs font-medium tracking-[0.18em] uppercase">Newsletter</h3>
          <p className="mt-4 text-sm leading-relaxed text-footer-muted">
            Shade launches, styling tips, and early access.
          </p>
          <NewsletterForm id="footer-email" className="mt-4 border-footer-border" />

          <div className="mt-8 flex items-center gap-4">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:text-footer-muted"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href="https://tiktok.com"
              aria-label="TikTok"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:text-footer-muted"
            >
              <TiktokIcon className="size-5" />
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-footer-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-footer-muted sm:flex-row">
          <p>&copy; {new Date().getFullYear()} SeaSilk. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-footer-text">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-footer-text">
              Terms of Service
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="text-xs font-medium tracking-[0.18em] uppercase">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-footer-muted transition-colors duration-200 hover:text-footer-text"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
