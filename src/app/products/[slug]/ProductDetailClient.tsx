"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Share2, Check, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, toPersianNumber } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import ProductCard from "@/components/products/ProductCard";
import toast from "react-hot-toast";

const mockReviews = [
  { id: "1", userName: "علی محمدی", rating: 5, comment: "روغن عالی بود. موتور خودرو خیلی بهتر کار می‌کند.", date: "۱۴۰۳/۰۲/۱۵", verified: true },
  { id: "2", userName: "رضا احمدی", rating: 4, comment: "کیفیت خوب، قیمت مناسب. ارسال هم سریع بود.", date: "۱۴۰۳/۰۱/۲۸", verified: true },
];

export default function ProductDetailClient({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleCart = () => { addItem(product, qty); openCart(); toast.success(`${product.name} به سبد خرید اضافه شد`, { icon: "🛒" }); };
  const handleShare = () => { navigator.clipboard?.writeText(window.location.href); toast.success("لینک کپی شد"); };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-primary">خانه</Link><span>/</span>
            <Link href="/products" className="hover:text-primary">محصولات</Link><span>/</span>
            <span className="text-dark font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="p-6 border-b lg:border-b-0 lg:border-l border-gray-100">
              <div className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="text-[120px]">{product.category === "filter" ? "🔧" : product.category === "additive" ? "🧪" : "🛢️"}</div>
                {product.discount && <div className="absolute top-4 right-4"><Badge variant="red">%{product.discount} تخفیف</Badge></div>}
              </div>
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-400 font-medium">{product.brand}</span>
                {product.isBestSeller && <Badge variant="yellow">پرفروش</Badge>}
                {product.isNew && <Badge variant="green">جدید</Badge>}
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-dark mb-3 leading-relaxed">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                <span className="text-xs text-gray-300">|</span>
                <span className={`text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                  {product.inStock ? `موجود (${toPersianNumber(product.stockCount)} عدد)` : "ناموجود"}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {product.viscosity && <span className="bg-dark text-white text-sm px-3 py-1 rounded-full font-mono font-bold">{product.viscosity}</span>}
                {product.oilType && <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{product.oilType === "synthetic" ? "تمام سنتتیک" : product.oilType === "semi-synthetic" ? "نیمه سنتتیک" : "معدنی"}</span>}
                {product.apiStandard && <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">{product.apiStandard}</span>}
                {product.volume && <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{product.volume}</span>}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">{product.shortDescription}</p>

              {product.compatibleCars.length > 0 && (
                <div className="mb-5">
                  <div className="text-xs font-bold text-gray-500 mb-2">مناسب برای:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.compatibleCars.slice(0, 6).map((c) => (
                      <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                <div className="flex items-end gap-3">
                  <div className="text-3xl font-bold text-primary">{formatPrice(product.price)}</div>
                  {product.originalPrice && <div className="text-gray-400 text-base line-through mb-1">{formatPrice(product.originalPrice)}</div>}
                </div>
                {product.discount && <div className="text-green-600 text-sm mt-1">شما {formatPrice(product.originalPrice! - product.price)} صرفه‌جویی می‌کنید</div>}
              </div>

              <div className="flex gap-3 mb-4">
                <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 font-bold text-lg">−</button>
                  <span className="w-12 text-center font-bold">{toPersianNumber(qty)}</span>
                  <button onClick={() => setQty(Math.min(product.stockCount, qty + 1))} className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 font-bold text-lg">+</button>
                </div>
                <button onClick={handleCart} disabled={!product.inStock} className="flex-1 btn-primary justify-center disabled:opacity-50">
                  <ShoppingCart size={18} /> افزودن به سبد خرید
                </button>
              </div>

              <div className="flex gap-2">
                <button onClick={() => toggleItem(product)}
                  className={`flex-1 btn-outline justify-center text-sm py-2.5 ${inWishlist ? "bg-red-50 border-primary text-primary" : ""}`}>
                  <Heart size={16} className={inWishlist ? "fill-primary" : ""} />
                  {inWishlist ? "در علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                </button>
                <button onClick={handleShare} className="w-12 h-12 border-2 border-gray-200 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Share2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-gray-100">
                {[{icon:Shield,text:"ضمانت اصالت"},{icon:Truck,text:"ارسال سریع"},{icon:RotateCcw,text:"۷ روز مرجوعی"}].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 text-center">
                    <item.icon size={20} className="text-primary" />
                    <span className="text-xs text-gray-500">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {[{id:"description",l:"توضیحات"},{id:"specs",l:"مشخصات فنی"},{id:"reviews",l:`نظرات (${toPersianNumber(product.reviewCount)})`}].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${tab === t.id ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-dark"}`}>
                {t.l}
              </button>
            ))}
          </div>
          <div className="p-6">
            {tab === "description" && <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>}
            {tab === "specs" && (
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(([k, v], i) => (
                    <tr key={k} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-3 px-4 font-medium text-dark w-1/3 rounded-r-xl">{k}</td>
                      <td className="py-3 px-4 text-gray-600 rounded-l-xl">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "reviews" && (
              <div className="space-y-4">
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-dark">{product.rating}</div>
                    <StarRating rating={product.rating} showCount={false} size="sm" className="justify-center mt-1" />
                    <div className="text-xs text-gray-400 mt-1">{toPersianNumber(product.reviewCount)} نظر</div>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5,4,3,2,1].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-4">{s}</span>
                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${s === 5 ? 70 : s === 4 ? 20 : 5}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {mockReviews.map((r) => (
                  <div key={r.id} className="border border-gray-100 rounded-2xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-dark text-sm">{r.userName}</span>
                          {r.verified && <span className="flex items-center gap-1 text-green-600 text-xs"><Check size={10} />خرید تأیید شده</span>}
                        </div>
                        <StarRating rating={r.rating} showCount={false} size="sm" className="mt-1" />
                      </div>
                      <span className="text-xs text-gray-400">{r.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-dark mb-4">محصولات مرتبط</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
