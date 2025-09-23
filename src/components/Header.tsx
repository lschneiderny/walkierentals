"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";

function NavLink({ href, label }: { href: string; label: string }) {
	const pathname = usePathname();
	const isActive = pathname === href;
	return (
		<Link
			href={href}
			className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
				isActive ? "bg-blue-600 text-white" : "hover:bg-blue-50 text-blue-700"
			}`}
		>
			{label}
		</Link>
	);
}

export default function Header() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState("");
  const { totalQuantity } = useCart();

	useEffect(() => {
		const q = searchParams.get("q") || "";
		setQuery(q);
	}, [searchParams]);

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const params = new URLSearchParams();
		if (query.trim().length > 0) params.set("q", query.trim());
		router.push(`/search?${params.toString()}`);
	}

	return (
		<header className="sticky top-0 z-40 w-full border-b border-blue-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-4">
					<div className="flex items-center gap-6">
						<Link href="/" className="text-lg font-bold tracking-tight text-blue-700">
							Walkie Rentals
						</Link>
						<nav className="hidden md:flex items-center gap-1">
							<NavLink href="/catalog" label="Catalog" />
							<NavLink href="/account" label="Account" />
						<Link href="/cart" className="relative px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-50 text-blue-700">
              Cart
              {totalQuantity > 0 && (
								<span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-[10px] px-1.5 py-0.5 border border-blue-700/20">
                  {totalQuantity}
                </span>
              )}
            </Link>
						</nav>
					</div>
					<form onSubmit={onSubmit} className="flex-1 max-w-xl hidden sm:flex">
						<input
							type="search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search cameras, lenses, brands..."
							className="w-full rounded-l-md border border-r-0 border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
						/>
						<button type="submit" className="rounded-r-md border border-blue-200 bg-blue-600 text-white px-3 py-2 text-sm">
							Search
						</button>
					</form>
				</div>
			</div>
		</header>
	);
}


