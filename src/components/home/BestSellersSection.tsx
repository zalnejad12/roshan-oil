"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

const tabs = [
  { id: "all", label: "همه" },
  { id: "engine-oil", label: "روغن موتور" },
  { id: "filter", label: "فیلتر" },
  { id: "additive", label: "افزودنی" },
];

export default function BestSellersSection() {
  const [tab, setTab] = useState("all");
  const filtered = tab === "all"
    ? products.filter((p) => p.isBestSeller || p.isFeatured).slice(0, 8)
    : products.filter((p) => p.category === tab).slice(0, 8);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div><h2 className="section-title">پرفروش‌ترین محصولات</h2><p className="section-subtitle">محبوب‌ترین انتخاب‌های مشتریان</p></div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:underline">مشاهده همه <ArrowLeft size={14} /></Link>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${tab === t.id ? "bg-primary text-white shadow-sm" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-8">
          <Link href="/products" className="btn-outline">مشاهده همه محصولات <ArrowLeft size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
