import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "محصول یافت نشد" };
  return { title: `${product.name} | روشن اویل`, description: product.shortDescription };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Product",
        name: product.name, description: product.description,
        brand: { "@type": "Brand", name: product.brand },
        offers: { "@type": "Offer", price: product.price, priceCurrency: "IRR",
          availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
      })}} />
      <ProductDetailClient product={product} relatedProducts={related} />
    </>
  );
}
