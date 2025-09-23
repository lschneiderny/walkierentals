"use client";

import { useCart } from "@/lib/cart-context";
import { calculateNumDaysInclusive } from "@/lib/types";

export default function CheckoutPage() {
    const { state } = useCart();
    const subtotalCents = state.items.reduce((sum, i) => sum + i.quantity * i.dailyRateCents * Math.max(1, calculateNumDaysInclusive(i.startDate, i.endDate)), 0);
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Checkout</h1>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="space-y-4">
                    <h2 className="font-semibold">Shipping</h2>
                    <input className="w-full border rounded-md px-3 py-2 bg-transparent" placeholder="Full name" />
                    <input className="w-full border rounded-md px-3 py-2 bg-transparent" placeholder="Address" />
                    <div className="grid grid-cols-2 gap-3">
                        <input className="border rounded-md px-3 py-2 bg-transparent" placeholder="City" />
                        <input className="border rounded-md px-3 py-2 bg-transparent" placeholder="ZIP" />
                    </div>
                </section>
                <section className="space-y-4">
                    <h2 className="font-semibold">Order summary</h2>
                    <div className="rounded border border-blue-100 p-3 space-y-2 text-sm bg-white">
                        {state.items.map((i) => (
                            <div key={`${i.productSlug}-${i.startDate}-${i.endDate}`} className="flex justify-between">
                                <span>{i.name} × {i.quantity}</span>
                                <span>${((i.dailyRateCents * Math.max(1, calculateNumDaysInclusive(i.startDate, i.endDate)) * i.quantity)/100).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-medium pt-2 border-t">
                            <span>Subtotal</span>
                            <span>${(subtotalCents/100).toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm border border-blue-600 hover:bg-blue-700">Place order</button>
                </section>
            </form>
        </div>
    );
}


