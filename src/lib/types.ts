export type PricingTier = {
  minDays: number;
  dailyRateCents: number;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  brand?: string;
  description: string;
  thumbnail: string;
  images: string[];
  pricing: PricingTier[];
  tags?: string[];
  included?: string[];
};

export type CartItem = {
  productSlug: string;
  name: string;
  thumbnail: string;
  startDate: string; // ISO date (yyyy-mm-dd)
  endDate: string; // ISO date (yyyy-mm-dd)
  quantity: number;
  dailyRateCents: number; // resolved rate for the rental window
};

export type CartState = {
  items: CartItem[];
};

export function calculateNumDaysInclusive(startDate: string, endDate: string): number {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  const ms = end.getTime() - start.getTime();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
  return Math.max(days, 0);
}

export function resolveDailyRateCents(pricing: PricingTier[], numDays: number): number {
  const sorted = [...pricing].sort((a, b) => a.minDays - b.minDays);
  let rate = sorted[0]?.dailyRateCents ?? 0;
  for (const tier of sorted) {
    if (numDays >= tier.minDays) rate = tier.dailyRateCents;
  }
  return rate;
}


