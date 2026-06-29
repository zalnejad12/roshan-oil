"use client";
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

interface Props { isOpen: boolean; onClose: () => void; }

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length > 1
    ? products.filter((p) => p.name.includes(query) || p.brand.toLowerCase().includes(query.toLowerCase()) || p.tags.some((t) => t.includes(query))).slice(0, 6)
    : [];

  useEffect(() => {
    if (isOpen) { setTimeout(() => inputRef.current?.focus(), 100); document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; setQuery(""); }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-slide-down">
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <Search size={20} className="text-gray-400 flex-shrink-0" />
          <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در محصولات... (مثال: روغن موتور 5W-30)"
            className="flex-1 text-sm outline-none text-dark placeholder-gray-400" dir="rtl" />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"><X size={18} /></button>
        </div>

        {query.length > 1 && (
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <>
                <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-50">{results.length} نتیجه یافت شد</div>
                {results.map((p) => (
                  <Link key={p.id} href={`/products/${p.slug}`} onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl">🛢️</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-dark truncate">{p.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{p.brand} {p.viscosity && `• ${p.viscosity}`}</div>
                    </div>
                    <div className="text-sm font-bold text-primary flex-shrink-0">{formatPrice(p.price)}</div>
                  </Link>
                ))}
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-sm text-gray-500">نتیجه‌ای برای "{query}" یافت نشد</div>
              </div>
            )}
          </div>
        )}

        {query.length <= 1 && (
          <div className="p-4">
            <div className="text-xs text-gray-400 mb-3">جستجوهای پرطرفدار</div>
            <div className="flex flex-wrap gap-2">
              {["روغن موتور 5W-30", "کاسترول ادج", "فیلتر روغن پژو", "موبیل 1", "شل هلیکس"].map((term) => (
                <button key={term} onClick={() => setQuery(term)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-dark text-xs rounded-full transition-colors">
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
