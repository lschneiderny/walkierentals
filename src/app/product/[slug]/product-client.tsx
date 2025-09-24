"use client";

import Link from "next/link";
import { useState } from "react";
import DateRangePicker from "@/components/DateRangePicker";
import { useCart } from "@/lib/cart-context";
import { calculateNumDaysInclusive, resolveDailyRateCents, Product } from "@/lib/types";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();

  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  
  // Use state to track selected dates
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  
  // Calculate pricing based on current selected dates
  const numDays = calculateNumDaysInclusive(startDate, endDate);
  const rate = resolveDailyRateCents(product.pricing, numDays);

  // Handle date changes from the DateRangePicker
  function handleDateChange({ startDate: newStartDate, endDate: newEndDate }: { startDate: string; endDate: string }) {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  }

  function handleAdd() {
    addItem({
      productSlug: product.slug,
      name: product.name,
      thumbnail: product.thumbnail,
      startDate,
      endDate,
      quantity: 1,
      dailyRateCents: rate,
    });
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <p className="text-sm opacity-80">{product.description}</p>
      <div className="rounded-lg border p-4 space-y-3">
        <div className="text-sm font-medium">Select rental dates</div>
        <DateRangePicker startDate={startDate} endDate={endDate} onChange={handleDateChange} />
        <div className="text-xs opacity-70">From ${(rate / 100).toFixed(0)}/day · {numDays} day(s)</div>
        <button onClick={handleAdd} className="w-full rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 transition-colors">Add to cart</button>
      </div>
      {product.included && product.included.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold">Included</h2>
          <ul className="list-disc ml-5 text-sm opacity-80 space-y-1">
            {product.included.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <Link href="/catalog" className="text-sm underline">Back to catalog</Link>
      </div>
    </div>
  );
}


