"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Grid, List } from "lucide-react";
import { products } from "@/data/products";
import { FilterOptions, OilType, ProductCategory } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

const viscosityOpts = ["0W-20","0W-40","5W-30","5W-40","10W-40","15W-40","20W-50"];
const brandOpts = ["Castrol","Mobil","Shell","Total","Liqui Moly","Mann"];
const carBrandOpts = ["هیوندای","کیا","تویوتا","BMW","بنز","پژو","رنو","پراید"];

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>({
    category: (searchParams.get("category") as ProductCategory) || undefined,
  });
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState<"grid"|"list">("grid");
  const [mobileFilter, setMobileFilter] = useState(false);

  const filtered = useMemo(() => {
    let r = [...products];
    if (filters.category) r = r.filter((p) => p.category === filters.category);
    if (filters.viscosity) r = r.filter((p) => p.viscosity === filters.viscosity);
    if (filters.oilType) r = r.filter((p) => p.oilType === filters.oilType);
    if (filters.productBrand) r = r.filter((p) => p.brand === filters.productBrand);
    if (filters.carBrand) r = r.filter((p) => p.compatibleCars.includes(filters.carBrand!));
    switch (sort) {
      case "price-asc": r.sort((a, b) => a.price - b.price); break;
      case "price-desc": r.sort((a, b) => b.price - a.price); break;
      case "rating": r.sort((a, b) => b.rating - a.rating); break;
      default: r.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
    return r;
  }, [filters, sort]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-bold text-dark text-sm mb-3">دسته‌بندی</h3>
        <div className="space-y-2">
          {[{v:"engine-oil",l:"روغن موتور"},{v:"transmission-oil",l:"روغن گیربکس"},{v:"filter",l:"فیلتر روغن"},{v:"additive",l:"افزودنی"},{v:"coolant",l:"ضد یخ"}].map((o) => (
            <label key={o.v} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="cat" value={o.v} checked={filters.category === o.v}
                onChange={() => setFilters((p) => ({ ...p, category: o.v as ProductCategory }))} className="accent-primary" />
              <span className="text-sm text-gray-600">{o.l}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Car Brand */}
      <div>
        <h3 className="font-bold text-dark text-sm mb-3">برند خودرو</h3>
        <div className="space-y-2">
          {carBrandOpts.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="carBrand" value={b} checked={filters.carBrand === b}
                onChange={() => setFilters((p) => ({ ...p, carBrand: b }))} className="accent-primary" />
              <span className="text-sm text-gray-600">{b}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Viscosity */}
      <div>
        <h3 className="font-bold text-dark text-sm mb-3">ویسکوزیته</h3>
        <div className="flex flex-wrap gap-2">
          {viscosityOpts.map((v) => (
            <button key={v} onClick={() => setFilters((p) => ({ ...p, viscosity: p.viscosity === v ? undefined : v }))}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all",
                filters.viscosity === v ? "bg-dark text-white border-dark" : "bg-white text-dark border-gray-200 hover:border-dark")}>
              {v}
            </button>
          ))}
        </div>
      </div>
      {/* Oil Type */}
      <div>
        <h3 className="font-bold text-dark text-sm mb-3">نوع روغن</h3>
        <div className="space-y-2">
          {[{v:"synthetic",l:"تمام سنتتیک"},{v:"semi-synthetic",l:"نیمه سنتتیک"},{v:"mineral",l:"معدنی"}].map((o) => (
            <label key={o.v} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="oilType" value={o.v} checked={filters.oilType === o.v}
                onChange={() => setFilters((p) => ({ ...p, oilType: o.v as OilType }))} className="accent-primary" />
              <span className="text-sm text-gray-600">{o.l}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Brand */}
      <div>
        <h3 className="font-bold text-dark text-sm mb-3">برند محصول</h3>
        <div className="space-y-2">
          {brandOpts.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={filters.productBrand === b}
                onChange={() => setFilters((p) => ({ ...p, productBrand: p.productBrand === b ? undefined : b }))} className="accent-primary" />
              <span className="text-sm text-gray-600">{b}</span>
            </label>
          ))}
        </div>
      </div>
      {activeCount > 0 && (
        <button onClick={() => setFilters({})} className="w-full py-2 border-2 border-primary text-primary text-sm font-bold rounded-xl hover:bg-red-50 transition-colors">
          پاک کردن فیلترها ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-primary">خانه</a><span>/</span>
            <span className="text-dark font-medium">محصولات</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="font-bold text-dark mb-5 flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-primary" /> فیلترها
              </h2>
              <FilterPanel />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-4 mb-4 flex items-center justify-between shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 text-sm font-medium border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50">
                  <SlidersHorizontal size={16} /> فیلتر
                  {activeCount > 0 && <span className="bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{activeCount}</span>}
                </button>
                <span className="text-sm text-gray-500">{filtered.length} محصول</span>
              </div>
              <div className="flex items-center gap-3">
                <select value={sort} onChange={(e) => setSort(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                  <option value="popular">محبوب‌ترین</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                  <option value="rating">بهترین امتیاز</option>
                </select>
                <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-xl p-1">
                  <button onClick={() => setView("grid")} className={cn("p-1.5 rounded-lg", view === "grid" ? "bg-dark text-white" : "text-gray-400 hover:text-dark")}><Grid size={16} /></button>
                  <button onClick={() => setView("list")} className={cn("p-1.5 rounded-lg", view === "list" ? "bg-dark text-white" : "text-gray-400 hover:text-dark")}><List size={16} /></button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-bold text-dark mb-2">محصولی یافت نشد</h3>
                <button onClick={() => setFilters({})} className="btn-primary text-sm mt-4">پاک کردن فیلترها</button>
              </div>
            ) : (
              <div className={cn("grid gap-4", view === "grid" ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1")}>
                {filtered.map((p) => <ProductCard key={p.id} product={p} variant={view === "list" ? "horizontal" : "default"} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilter && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMobileFilter(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-dark">فیلترها</h3>
              <button onClick={() => setMobileFilter(false)}><X size={20} /></button>
            </div>
            <div className="p-4"><FilterPanel /></div>
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100">
              <button onClick={() => setMobileFilter(false)} className="btn-primary w-full justify-center">
                نمایش {filtered.length} محصول
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
