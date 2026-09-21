import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/store/PageIntro";
import { CollectionCard } from "@/components/home/CollectionCard";
import { collections } from "@/lib/data/collections";
import { pageMetadata } from "@/lib/pageMetadata";
export const metadata = pageMetadata(
  "Collections",
  "Explore Genius Weft, Tape-Ins and Clip-Ins by SeaSilk.",
);
export default function CollectionsPage() {
  return (
    <Container className="pb-24">
      <PageIntro
        eyebrow="Collections"
        title="Three ways to wear it."
        description="A method for your look, your lifestyle and your routine."
      />
      <div className="grid gap-6 md:grid-cols-3 [&>a]:w-full">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </Container>
  );
}
