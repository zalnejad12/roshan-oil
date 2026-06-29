"use client";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, toPersianNumber } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const total = getTotalPrice();
  const shipping = total >= 500000 ? 0 : 35000;
  const final = total - discount + shipping;

  const applyCode = () => {
    if (code.toUpperCase() === "ROSHAN10") { setDiscount(Math.round(total * 0.1)); toast.success("کد تخفیف اعمال شد! ۱۰٪ تخفیف"); }
    else toast.error("کد تخفیف نامعتبر است");
  };

  if (items.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h1 className="text-2xl font-bold text-dark mb-3">سبد خرید خالی است</h1>
        <p className="text-gray-500 mb-8">محصولات مورد نظر خود را به سبد خرید اضافه کنید</p>
        <Link href="/products" className="btn-primary"><ShoppingBag size={18} />ادامه خرید</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">خانه</Link><span>/</span>
            <span className="text-dark font-medium">سبد خرید</span>
          </div>
        </div>
      </div>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold text-dark mb-6">سبد خرید ({toPersianNumber(items.length)} محصول)</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">🛢️</div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`} className="text-sm font-medium text-dark hover:text-primary transition-colors line-clamp-2">{item.product.name}</Link>
                    <div className="text-xs text-gray-400 mt-1">{item.product.brand}</div>
                    {item.product.viscosity && <span className="inline-block mt-1 text-xs bg-dark text-white px-2 py-0.5 rounded-full font-mono">{item.product.viscosity}</span>}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 border border-gray-200 rounded-xl overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"><Plus size={14} /></button>
                        <span className="w-8 text-center text-sm font-bold">{toPersianNumber(item.quantity)}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"><Minus size={14} /></button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary">{formatPrice(item.product.price * item.quantity)}</span>
                        <button onClick={() => removeItem(item.product.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => { clearCart(); toast.success("سبد خرید پاک شد"); }}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
              <Trash2 size={14} /> پاک کردن سبد خرید
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-bold text-dark text-sm mb-3 flex items-center gap-2"><Tag size={16} className="text-primary" />کد تخفیف</h3>
              <div className="flex gap-2">
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="کد تخفیف را وارد کنید" className="input-field text-sm flex-1" />
                <button onClick={applyCode} className="bg-dark text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-dark-700 transition-colors">اعمال</button>
              </div>
              <p className="text-xs text-gray-400 mt-2">کد آزمایشی: ROSHAN10</p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-dark mb-4">خلاصه سفارش</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">جمع محصولات</span><span className="font-medium">{formatPrice(total)}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600"><span>تخفیف کد</span><span>- {formatPrice(discount)}</span></div>}
                <div className="flex justify-between">
                  <span className="text-gray-500">هزینه ارسال</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base">
                  <span>مبلغ قابل پرداخت</span>
                  <span className="text-primary">{formatPrice(final)}</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-primary w-full justify-center mt-4">ادامه و پرداخت <ArrowLeft size={16} /></Link>
              <Link href="/products" className="block text-center text-sm text-gray-500 hover:text-dark mt-3 transition-colors">ادامه خرید</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
