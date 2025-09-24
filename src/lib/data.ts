import { Product, PricingTier } from "./types";
import { readProducts } from "./product-store";

export async function getProducts(): Promise<Product[]> {
  return await readProducts();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const products = await getProducts();
  return products.filter((p) =>
    [p.name, p.brand ?? "", p.category, p.description, ...(p.tags ?? [])]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

export const categories: { slug: string; name: string }[] = [
  { slug: "walkies", name: "Walkie-Talkies" },
  { slug: "kits", name: "Kits" },
  { slug: "accessories", name: "Accessories" },
];


