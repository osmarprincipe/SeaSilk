import { newArrivals } from "@/lib/data/products";

// The approved ten-piece studio collection. Earlier remote-photo mock products
// remain untouched in products.ts, but are not part of the current storefront.
export const storeProducts = newArrivals;

// Development merchandising selection, not a sales ranking. Replace with the
// commerce provider's best-seller feed once sales data is available.
const selectedIds = ["prod-101", "prod-105", "prod-109", "prod-104"];
export const bestSellerSelection = selectedIds.flatMap((id) => {
  const product = storeProducts.find((product) => product.id === id);
  return product ? [product] : [];
});
