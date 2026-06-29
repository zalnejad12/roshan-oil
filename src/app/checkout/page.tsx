"use client";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, toPersianNumber } from "@/lib/utils";
import { Check, CreditCard, Smartphone, Building } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const steps = ["اطلاعات ارسال", "روش پرداخت", "تأیید سفارش"];
const provinces = ["تهران","اصفهان","فارس","خراسان رضوی","آذربایجان شرقی","مازندران","گیلان","کرمان","البرز","خوزستان"];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [payment, setPayment] = useState("zarinpal");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName:"", phone:"", province:"", city:"", address:"", postalCode:"" });
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const total = getTotalPrice();
  const shipping = total >= 500000 ? 0 : 35000;

  const handleNext = async () => {
    if (step < 2) { setStep(step + 1); return; }

    // مرحله پرداخت
    setLoading(true);
    const orderId = `ORD-${Date.now()}`;

    try {
      const res = await fetch("/api/payment/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gateway: payment === "cod" ? null : payment,
          amount: total + shipping,
          orderId,
          name: form.fullName,
          phone: form.phone,
          description: `سفارش روشن اویل - ${orderId}`,
        }),
      });

      if (payment === "cod") {
        toast.success("سفارش شما با موفقیت ثبت شد!");
        clearCart();
        router.push(`/payment/success?orderId=${orderId}&refId=COD&gateway=cod`);
        return;
      }

      const data = await res.json();
      if (data.success && data.gatewayUrl) {
        clearCart();
        window.location.href = data.gatewayUrl;
      } else {
        toast.error(data.error || "خطا در اتصال به درگاه پرداخت");
      }
    } catch {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">خانه</Link><span>/</span>
            <Link href="/cart" className="hover:text-primary">سبد خرید</Link><span>/</span>
            <span className="text-dark font-medium">پرداخت</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i < step ? "bg-green-500 text-white" : i === step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i < step ? <Check size={14} /> : toPersianNumber(i + 1)}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${i === step ? "text-primary font-medium" : "text-gray-400"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-16 sm:w-24 h-0.5 mx-2 ${i < step ? "bg-green-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {step === 0 && (
                <div>
                  <h2 className="font-bold text-dark text-lg mb-5">اطلاعات ارسال</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-dark mb-1.5">نام و نام خانوادگی *</label><input type="text" value={form.fullName} onChange={(e) => setForm({...form,fullName:e.target.value})} className="input-field" placeholder="علی محمدی" /></div>
                    <div><label className="block text-sm font-medium text-dark mb-1.5">شماره موبایل *</label><input type="tel" value={form.phone} onChange={(e) => setForm({...form,phone:e.target.value})} className="input-field" placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" /></div>
                    <div><label className="block text-sm font-medium text-dark mb-1.5">استان *</label>
                      <select value={form.province} onChange={(e) => setForm({...form,province:e.target.value})} className="input-field">
                        <option value="">انتخاب استان</option>
                        {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div><label className="block text-sm font-medium text-dark mb-1.5">شهر *</label><input type="text" value={form.city} onChange={(e) => setForm({...form,city:e.target.value})} className="input-field" placeholder="تهران" /></div>
                    <div className="sm:col-span-2"><label className="block text-sm font-medium text-dark mb-1.5">آدرس کامل *</label><textarea value={form.address} onChange={(e) => setForm({...form,address:e.target.value})} className="input-field resize-none" rows={3} placeholder="خیابان، کوچه، پلاک، واحد" /></div>
                    <div><label className="block text-sm font-medium text-dark mb-1.5">کد پستی</label><input type="text" value={form.postalCode} onChange={(e) => setForm({...form,postalCode:e.target.value})} className="input-field" placeholder="۱۲۳۴۵۶۷۸۹۰" dir="ltr" /></div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="font-bold text-dark text-lg mb-5">روش پرداخت</h2>
                  <div className="space-y-3">
                    {[{id:"zarinpal",icon:CreditCard,l:"زرین‌پال",d:"درگاه پرداخت زرین‌پال"},{id:"idpay",icon:Smartphone,l:"آیدی‌پی",d:"درگاه پرداخت آیدی‌پی"},{id:"cod",icon:Building,l:"پرداخت در محل",d:"پرداخت هنگام تحویل"}].map((m) => (
                      <label key={m.id} className={`flex items-center gap-4 p-4 border-2 rounded-2xl cursor-pointer transition-all ${payment === m.id ? "border-primary bg-red-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} className="accent-primary" />
                        <m.icon size={20} className={payment === m.id ? "text-primary" : "text-gray-400"} />
                        <div><div className="font-medium text-dark text-sm">{m.l}</div><div className="text-xs text-gray-400">{m.d}</div></div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-bold text-dark text-lg mb-5">تأیید سفارش</h2>
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl">🛢️</div>
                        <div className="flex-1"><div className="text-sm font-medium text-dark">{item.product.name}</div><div className="text-xs text-gray-400">تعداد: {toPersianNumber(item.quantity)}</div></div>
                        <div className="text-sm font-bold text-primary">{formatPrice(item.product.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {step > 0 && <button onClick={() => setStep(step - 1)} className="btn-outline flex-1 justify-center">مرحله قبل</button>}
                <button onClick={handleNext} disabled={loading} className="btn-primary flex-1 justify-center disabled:opacity-50">
                  {loading ? "در حال انتقال..." : step === 2 ? "پرداخت" : "مرحله بعد"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-dark mb-4">خلاصه سفارش</h3>
              <div className="space-y-2 text-sm mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="text-gray-500 truncate ml-2">{item.product.name} × {toPersianNumber(item.quantity)}</span>
                    <span className="font-medium flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">هزینه ارسال</span><span>{shipping === 0 ? "رایگان" : formatPrice(shipping)}</span></div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                  <span>مجموع</span><span className="text-primary">{formatPrice(total + shipping)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
