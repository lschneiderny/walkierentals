import Link from "next/link";
import CategoryNav from "@/components/CategoryNav";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white p-8 shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Rent walkies and accessories with ease</h1>
        <p className="mt-2 text-sm/6 text-white/90">Fast shipping, flexible dates, and pro support. Just like you expect.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/catalog" className="rounded-md bg-white text-blue-700 px-4 py-2 text-sm font-medium border border-white/20">Browse catalog</Link>
          <Link href="/how-it-works" className="rounded-md bg-blue-500/10 text-white px-4 py-2 text-sm font-medium border border-white/30">How it works</Link>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Popular categories</h2>
        <CategoryNav />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Featured</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
