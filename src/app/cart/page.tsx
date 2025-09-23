"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { calculateNumDaysInclusive } from "@/lib/types";

export default function CartPage() {
    const { state, removeItem } = useCart();
    const items = state.items;
    const subtotalCents = items.reduce((sum, i) => sum + i.quantity * i.dailyRateCents * Math.max(1, calculateNumDaysInclusive(i.startDate, i.endDate)), 0);
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            {items.length === 0 ? (
                <p className="text-sm text-black/70 dark:text-white/70">Your rental items will appear here. Add items from the catalog.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-3">
                        {items.map((i) => (
                            <div key={`${i.productSlug}-${i.startDate}-${i.endDate}`} className="flex items-center gap-4 rounded border p-3">
                                <img src={i.thumbnail} alt="thumb" className="h-16 w-16 rounded bg-black/10 dark:bg-white/10 object-contain" />
                                <div className="flex-1">
                                    <div className="text-sm font-medium">{i.name}</div>
                                    <div className="text-xs opacity-70">{i.startDate} → {i.endDate} · {i.quantity}x</div>
                                </div>
                                <div className="text-sm font-medium">${((i.dailyRateCents * Math.max(1, calculateNumDaysInclusive(i.startDate, i.endDate)) * i.quantity) / 100).toFixed(2)}</div>
                                <button onClick={() => removeItem(i.productSlug, i.startDate, i.endDate)} className="text-xs underline">Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-3">
                        <div className="rounded border border-blue-100 p-3 space-y-2 bg-white">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Subtotal</span>
                                <span className="font-medium text-slate-900">${(subtotalCents / 100).toFixed(2)}</span>
                            </div>
                            <Link href="/checkout" className="w-full text-center block rounded-md bg-blue-600 text-white px-4 py-2 text-sm border border-blue-600 hover:bg-blue-700">Proceed to checkout</Link>
                        </div>
                        <Link href="/catalog" className="text-xs text-blue-700 underline">Continue shopping</Link>
                    </div>
                </div>
            )}
        </div>
    );
}


