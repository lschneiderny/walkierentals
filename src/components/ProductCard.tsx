import Link from "next/link";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const lowestRate = [...product.pricing].sort((a, b) => a.dailyRateCents - b.dailyRateCents)[0]?.dailyRateCents ?? 0;
  return (
    <Link href={`/product/${product.slug}`} className="block rounded-lg border border-blue-100 p-4 hover:bg-blue-50">
      <div className="h-32 w-full rounded bg-blue-50 mb-3 overflow-hidden">
        {/* Use real images when available */}
        <img src={product.thumbnail} alt={product.name} className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal" />
      </div>
      <div className="text-sm font-medium line-clamp-2">{product.name}</div>
      <div className="text-xs text-blue-700 mt-1">From ${(lowestRate / 100).toFixed(0)}/day</div>
    </Link>
  );
}


