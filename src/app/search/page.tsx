import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/lib/data";

export default async function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
	const q = searchParams?.q || "";

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Search</h1>
			<p className="text-sm opacity-70">Results for: <span className="font-mono">{q || "(empty)"}</span></p>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{(await searchProducts(q)).map((p) => (
					<ProductCard key={p.slug} product={p} />
				))}
			</div>
		</div>
	);
}


