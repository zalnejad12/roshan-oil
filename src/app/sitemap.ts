import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { carBrands } from "@/data/carBrands";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://roshanoil.ir";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/car-selector`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, lastModified: new Date(p.createdAt), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...carBrands.map((b) => ({ url: `${base}/car/${b.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 })),
    ...blogPosts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.publishedAt), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
