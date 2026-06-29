"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, RotateCcw, Home } from "lucide-react";

const reasons: Record<string, string> = {
  cancelled: "پرداخت توسط شما لغو شد",
  verify_failed: "تأیید پرداخت ناموفق بود",
  invalid_gateway: "درگاه پرداخت نامعتبر است",
};

export default function PaymentFailedPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const reason = params.get("reason") || "cancelled";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <XCircle size={40} className="text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-dark mb-2">پرداخت ناموفق</h1>
        <p className="text-gray-500 text-sm mb-6">
          {reasons[reason] || "پرداخت با خطا مواجه شد"}
        </p>

        {orderId && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">شماره سفارش:</span>
              <span className="font-bold text-dark">{orderId}</span>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 mb-6">
          مبلغی از حساب شما کسر نشده است. می‌توانید دوباره تلاش کنید.
        </p>

        <div className="flex gap-3">
          <Link href="/checkout" className="flex-1 btn-primary justify-center text-sm">
            <RotateCcw size={16} /> تلاش مجدد
          </Link>
          <Link href="/" className="flex-1 btn-outline justify-center text-sm">
            <Home size={16} /> خانه
          </Link>
        </div>
      </div>
    </div>
  );
}
