import { Hero } from "@/components/home/Hero";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { ProductSection } from "@/components/home/ProductSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ImmersiveEditorial } from "@/components/home/ImmersiveEditorial";
import { FeaturedElasticGallery } from "@/components/home/FeaturedElasticGallery";
import { ImageTestimonialGrid } from "@/components/home/ImageTestimonialGrid";
import { ShopCtaBanner } from "@/components/home/ShopCtaBanner";
import { TrustRow } from "@/components/home/TrustRow";
import { NewsletterPopup } from "@/components/home/NewsletterPopup";
import { newArrivals } from "@/lib/data/products";

export default function Home() {
  return (
    <>
      <Hero />

      <CollectionsSection />

      <ProductSection
        eyebrow="Just In"
        title="New Arrivals"
        description="The latest additions, in our most-requested shades."
        products={newArrivals}
        viewAllHref="/shop"
        tone="bg-alt"
        headingStyle="centered"
        layout="marquee"
      />

      <ImmersiveEditorial />

      <AboutSection />

      <FeaturedElasticGallery />

      <ImageTestimonialGrid />

      <ShopCtaBanner />

      <TrustRow />

      <NewsletterPopup />
    </>
  );
}
