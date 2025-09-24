import { Metadata } from "next";
import { getProducts, categories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { redirect } from "next/navigation";
import CategoryNav from "@/components/CategoryNav";

export const metadata: Metadata = {
	title: "Catalog",
};

export default async function CatalogPage({ searchParams }: { searchParams?: { category?: string } }) {
    const category = searchParams?.category;
    const products = await getProducts();
    const list = category ? products.filter((p) => p.category === category) : products;
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Catalog</h1>
            <CategoryNav />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {list.map((p) => (
                    <ProductCard key={p.slug} product={p} />
                ))}
            </div>
        </div>
    );
}


