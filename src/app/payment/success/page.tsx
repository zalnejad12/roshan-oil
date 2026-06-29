"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, Home } from "lucide-react";
import { toPersianNumber } from "@/lib/utils";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const refId = params.get("refId");
  const gateway = params.get("gateway");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-dark mb-2">پرداخت موفق!</h1>
        <p className="text-gray-500 text-sm mb-6">سفارش شما با موفقیت ثبت شد</p>
        <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-right space-y-2">
          {orderId && <div className="flex justify-between text-sm"><span className="text-gray-500">شماره سفارش:</span><span className="font-bold text-dark">{toPersianNumber(orderId)}</span></div>}
          {refId && <div className="flex justify-between text-sm"><span className="text-gray-500">کد پیگیری:</span><span className="font-bold text-dark font-mono">{refId}</span></div>}
          {gateway && <div className="flex justify-between text-sm"><span className="text-gray-500">درگاه پرداخت:</span><span className="font-medium text-dark">{gateway === "zarinpal" ? "زرین‌پال" : gateway === "idpay" ? "آیدی‌پی" : "پرداخت در محل"}</span></div>}
        </div>
        <p className="text-xs text-gray-400 mb-6">اطلاعات سفارش از طریق پیامک برای شما ارسال خواهد شد</p>
        <div className="flex gap-3">
          <Link href="/account" className="flex-1 btn-primary justify-center text-sm"><Package size={16} /> پیگیری سفارش</Link>
          <Link href="/" className="flex-1 btn-outline justify-center text-sm"><Home size={16} /> خانه</Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
