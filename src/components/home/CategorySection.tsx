import Link from "next/link";
import { categories } from "@/data/categories";
import { ArrowLeft } from "lucide-react";

export default function CategorySection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div><h2 className="section-title">دسته‌بندی محصولات</h2><p className="section-subtitle">انتخاب آسان بر اساس نوع محصول</p></div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:underline">همه محصولات <ArrowLeft size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`} className="group">
              <div className="bg-white rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-primary/20">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
                <h3 className="text-sm font-bold text-dark mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-400">{cat.productCount} محصول</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
