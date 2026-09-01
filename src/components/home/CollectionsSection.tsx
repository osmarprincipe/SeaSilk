import { collections } from "@/lib/data/collections";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CollectionCard } from "@/components/home/CollectionCard";

export function CollectionsSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Collections"
            title="Three Ways to Wear It"
            description="Choose the method that fits your look, lifestyle, and routine."
            align="center"
            ornament
            className="mx-auto max-w-xl"
          />
        </Reveal>

        <div className="hover-reveal-group mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </Container>
    </section>
  );
}
