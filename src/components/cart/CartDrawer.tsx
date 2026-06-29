"use client";
import { useCartStore } from "@/store/cartStore";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { formatPrice, toPersianNumber } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  const shipping = total >= 500000 ? 0 : 35000;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={closeCart} />}
      <div className={`fixed top-0 left-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-primary" />
            <h2 className="font-bold text-dark">سبد خرید</h2>
            {items.length > 0 && <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{items.length}</span>}
          </div>
          <button onClick={closeCart} className="p-2 rounded-xl hover:bg-gray-100 transition-colors"><X size={18} /></button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="font-bold text-dark mb-2">سبد خرید خالی است</h3>
              <p className="text-gray-400 text-sm mb-6">محصولات مورد نظر خود را اضافه کنید</p>
              <button onClick={closeCart} className="btn-primary text-sm">ادامه خرید</button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl flex-shrink-0">🛢️</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-dark line-clamp-2 mb-1">{item.product.name}</h4>
                    <div className="text-primary font-bold text-sm">{formatPrice(item.product.price)}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 shadow-sm">
                          <Plus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{toPersianNumber(item.quantity)}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 shadow-sm">
                          <Minus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">هزینه ارسال:</span>
              <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">جمع کل:</span>
              <span className="font-bold text-dark text-lg">{formatPrice(total + shipping)}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full justify-center text-sm">
              ادامه و پرداخت <ArrowLeft size={16} />
            </Link>
            <Link href="/cart" onClick={closeCart} className="btn-outline w-full justify-center text-sm">
              مشاهده سبد خرید
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
