import { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/data";
import ProductDetailClient from "@/app/product/[slug]/product-client";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
	return {
		title: params.slug.replaceAll("-", " "),
	};
}

export default async function ProductDetail({ params }: Props) {
    const product = await getProductBySlug(params.slug);
    if (!product) return notFound();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
                <div className="aspect-[4/3] w-full rounded-lg bg-blue-50 flex items-center justify-center overflow-hidden">
                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain mix-blend-multiply" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {product.images.map((src) => (
                        <div key={src} className="aspect-square rounded bg-blue-50 overflow-hidden">
                            <img src={src} alt="thumb" className="h-full w-full object-contain" />
                        </div>
                    ))}
                </div>
            </div>
            <Suspense>
                <ProductDetailClient product={product} />
            </Suspense>
        </div>
    );
}


