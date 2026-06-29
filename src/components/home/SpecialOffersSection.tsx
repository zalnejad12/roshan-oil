"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { toPersianNumber } from "@/lib/utils";

function useCountdown(h: number) {
  const [t, setT] = useState({ h, m: 59, s: 59 });
  useEffect(() => {
    const timer = setInterval(() => {
      setT((p) => {
        if (p.s > 0) return { ...p, s: p.s - 1 };
        if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
        if (p.h > 0) return { h: p.h - 1, m: 59, s: 59 };
        return p;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return t;
}

function Box({ v, label }: { v: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-dark text-white font-bold text-xl w-12 h-12 rounded-xl flex items-center justify-center font-mono">
        {toPersianNumber(String(v).padStart(2, "0"))}
      </div>
      <span className="text-xs text-gray-400 mt-1">{label}</span>
    </div>
  );
}

export default function SpecialOffersSection() {
  const t = useCountdown(5);
  const discounted = products.filter((p) => p.discount).slice(0, 4);

  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-primary to-red-700 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><Clock size={24} className="text-white" /></div>
            <div>
              <h2 className="text-white font-bold text-xl">پیشنهادات ویژه</h2>
              <p className="text-red-100 text-sm">فرصت محدود - تا پایان امروز</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Box v={t.h} label="ساعت" />
            <span className="text-white font-bold text-xl mb-4">:</span>
            <Box v={t.m} label="دقیقه" />
            <span className="text-white font-bold text-xl mb-4">:</span>
            <Box v={t.s} label="ثانیه" />
          </div>
          <Link href="/products?discount=true" className="hidden sm:flex items-center gap-1 bg-white text-primary font-bold px-4 py-2 rounded-xl text-sm hover:bg-red-50 transition-colors">
            همه تخفیف‌ها
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {discounted.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
