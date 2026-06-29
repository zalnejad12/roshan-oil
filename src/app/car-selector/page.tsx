"use client";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { carBrands } from "@/data/carBrands";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

const allModels: Record<string, string[]> = {
  hyundai: ["سانتافه","توسان","النترا","اکسنت","آزرا","سوناتا","i20","i30"],
  kia: ["اسپورتیج","سورنتو","سراتو","ریو","اپتیما","پیکانتو"],
  toyota: ["کمری","کرولا","RAV4","لندکروزر","هایلوکس","پریوس","یاریس"],
  bmw: ["سری ۳","سری ۵","سری ۷","X3","X5","X6"],
  mercedes: ["C-Class","E-Class","S-Class","GLC","GLE"],
  peugeot: ["پژو ۲۰۶","پژو ۴۰۵","پژو ۲۰۷","پارس","پژو ۳۰۱"],
};

export default function CarSelectorPage() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [results, setResults] = useState<typeof products>([]);
  const [searched, setSearched] = useState(false);

  const search = () => {
    if (!brand) return;
    const b = carBrands.find((x) => x.id === brand);
    if (!b) return;
    setResults(products.filter((p) => p.compatibleCars.includes(b.nameFa)));
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">خانه</Link><span>/</span>
            <span className="text-dark font-medium">انتخاب بر اساس خودرو</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-dark to-dark-800 py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">روغن مناسب خودروی خود را پیدا کنید</h1>
          <p className="text-gray-300 mb-8">برند و مدل خودروی خود را انتخاب کنید تا بهترین روغن را پیشنهاد دهیم</p>
          <div className="bg-white rounded-2xl p-6 max-w-2xl mx-auto shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5 text-right">برند خودرو</label>
                <select value={brand} onChange={(e) => { setBrand(e.target.value); setModel(""); }} className="input-field">
                  <option value="">انتخاب برند</option>
                  {carBrands.map((b) => <option key={b.id} value={b.id}>{b.nameFa} ({b.name})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-1.5 text-right">مدل خودرو</label>
                <select value={model} onChange={(e) => setModel(e.target.value)} className="input-field" disabled={!brand}>
                  <option value="">انتخاب مدل</option>
                  {brand && allModels[brand]?.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <button onClick={search} disabled={!brand} className="btn-primary w-full justify-center disabled:opacity-50">
              <Search size={18} /> جستجوی روغن مناسب
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-10">
        {searched ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-xl font-bold text-dark">
                روغن‌های مناسب برای {carBrands.find((b) => b.id === brand)?.nameFa}{model && ` - ${model}`}
              </h2>
            </div>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-bold text-dark mb-2">محصولی یافت نشد</h3>
                <Link href="/products" className="btn-primary text-sm mt-4">مشاهده همه محصولات</Link>
              </div>
            )}
          </>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {carBrands.map((b) => (
              <button key={b.id} onClick={() => setBrand(b.id)}
                className="bg-white rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all border border-gray-100 hover:border-primary/20 group">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-50 group-hover:bg-red-50 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-2xl font-black text-dark">{b.name.charAt(0)}</span>
                </div>
                <div className="font-bold text-dark text-sm">{b.nameFa}</div>
                <div className="text-xs text-gray-400">{b.name}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
