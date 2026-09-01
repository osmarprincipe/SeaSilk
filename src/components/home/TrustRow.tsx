import { LockIcon, SupportIcon, TruckIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";

const items = [
  { icon: LockIcon, label: "Secure Payment" },
  { icon: TruckIcon, label: "Fast Delivery" },
  { icon: SupportIcon, label: "Dedicated Support" },
];

export function TrustRow() {
  return (
    <section className="border-y border-sand">
      <Container className="grid grid-cols-1 divide-y divide-sand sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-3 py-6">
            <Icon className="size-5 text-text-muted" />
            <span className="text-xs font-medium tracking-[0.14em] text-text-muted uppercase">
              {label}
            </span>
          </div>
        ))}
      </Container>
    </section>
  );
}
