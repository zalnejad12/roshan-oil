import Link from "next/link";
import { carBrands } from "@/data/carBrands";
import { ArrowLeft } from "lucide-react";

export default function CarBrandsSection() {
  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div><h2 className="section-title">انتخاب بر اساس برند خودرو</h2><p className="section-subtitle">روغن مناسب خودروی خود را پیدا کنید</p></div>
          <Link href="/car-selector" className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:underline">همه برندها <ArrowLeft size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {carBrands.map((brand) => (
            <Link key={brand.id} href={`/car/${brand.slug}`} className="group">
              <div className="bg-white border-2 border-gray-100 hover:border-primary/30 rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-50 group-hover:bg-red-50 rounded-full flex items-center justify-center shadow-sm transition-colors">
                  <span className="text-2xl font-black text-dark">{brand.name.charAt(0)}</span>
                </div>
                <h3 className="text-sm font-bold text-dark mb-0.5">{brand.nameFa}</h3>
                <p className="text-xs text-gray-400">{brand.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 bg-gradient-to-r from-dark to-dark-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">مطمئن نیستید کدام روغن مناسب است؟</h3>
            <p className="text-gray-400 text-sm">با انتخاب برند و مدل خودروی خود، بهترین روغن را پیدا کنید</p>
          </div>
          <Link href="/car-selector" className="btn-primary whitespace-nowrap">انتخاب هوشمند روغن <ArrowLeft size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
