import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoryNav() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {categories.map((c) => (
        <Link key={c.slug} href={`/catalog?category=${c.slug}`} className="rounded-lg border border-black/10 dark:border-white/10 p-6 text-center hover:bg-black/5 dark:hover:bg-white/5">
          {c.name}
        </Link>
      ))}
    </div>
  );
}


