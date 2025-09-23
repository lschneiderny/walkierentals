import { Product, PricingTier } from "./types";

const standardPricing: PricingTier[] = [
  { minDays: 1, dailyRateCents: 2500 },
  { minDays: 4, dailyRateCents: 2000 },
  { minDays: 8, dailyRateCents: 1500 },
  { minDays: 15, dailyRateCents: 1200 },
];

export const products: Product[] = [
  {
    slug: "motorola-cp200d",
    name: "Motorola CP200d UHF Radio",
    category: "walkies",
    brand: "Motorola",
    description: "Durable UHF digital/analog two-way radio. Ideal for events and production crews.",
    thumbnail: "/window.svg",
    images: ["/window.svg", "/globe.svg", "/file.svg"],
    pricing: standardPricing,
    tags: ["uhf", "digital", "durable"],
    included: ["Radio body", "Antenna", "Battery", "Rapid charger", "Belt clip"],
  },
  {
    slug: "motorola-cp200d-kit",
    name: "Motorola CP200d 4-Radio Kit",
    category: "kits",
    brand: "Motorola",
    description: "Bundle of 4 radios with earpieces and gang charger for small teams.",
    thumbnail: "/globe.svg",
    images: ["/globe.svg", "/window.svg", "/file.svg"],
    pricing: [
      { minDays: 1, dailyRateCents: 9000 },
      { minDays: 4, dailyRateCents: 7600 },
      { minDays: 8, dailyRateCents: 6000 },
    ],
    tags: ["kit", "bundle"],
    included: ["4x radios", "4x batteries", "4x earpieces", "4x chargers", "Carrying case"],
  },
  {
    slug: "earpiece-d-shell",
    name: "D-Shell Earpiece with PTT Mic",
    category: "accessories",
    brand: "Generic",
    description: "Comfortable D-shell earpiece with inline PTT microphone for clear comms.",
    thumbnail: "/file.svg",
    images: ["/file.svg"],
    pricing: [
      { minDays: 1, dailyRateCents: 600 },
      { minDays: 4, dailyRateCents: 450 },
      { minDays: 8, dailyRateCents: 350 },
    ],
    tags: ["earpiece"],
    included: ["Earpiece", "Inline mic/PTT", "Foam cover"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
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


