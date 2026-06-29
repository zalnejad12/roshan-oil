"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Copy, ExternalLink, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function TorobAdminPage() {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);

  const apiUrl = `${typeof window !== "undefined" ? window.location.origin : "https://roshanoil.ir"}/api/torob/v3/products`;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("کپی شد");
  };

  const testApi = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/torob/v3/products", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Torob-Token": "test", "X-Torob-Token-Version": "1" },
        body: JSON.stringify({ page: 1, sort: "date_added_desc" }),
      });
      const data = await res.json();
      if (data.api_version === "torob_api_v3") {
        setTestResult("success");
        toast.success(`API کار می‌کند — ${data.total} محصول`);
      } else {
        setTestResult("error");
      }
    } catch {
      setTestResult("error");
      toast.error("خطا در اتصال");
    }
    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin" className="text-gray-400 hover:text-dark text-sm">← پنل مدیریت</Link>
        </div>

        <h1 className="text-2xl font-bold text-dark mb-2">اتصال به ترب</h1>
        <p className="text-gray-500 text-sm mb-8">تنظیمات یکپارچه‌سازی فروشگاه با سایت مقایسه قیمت ترب</p>

        {/* Status */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={20} className="text-green-500" />
            <h2 className="font-bold text-dark">وضعیت API</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 font-mono text-sm text-dark break-all">
              {apiUrl}
            </div>
            <button onClick={() => copy(apiUrl)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0">
              <Copy size={16} />
            </button>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={testApi} disabled={testing}
              className="btn-primary text-sm py-2 disabled:opacity-50">
              {testing ? "در حال تست..." : "تست API"}
            </button>
            {testResult === "success" && <span className="flex items-center gap-1 text-green-600 text-sm"><CheckCircle size={14} />موفق</span>}
            {testResult === "error" && <span className="flex items-center gap-1 text-red-500 text-sm"><AlertCircle size={14} />خطا</span>}
          </div>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <h2 className="font-bold text-dark mb-4">مراحل ثبت در ترب</h2>
          <div className="space-y-4">
            {[
              { step: "۱", title: "ثبت‌نام در ترب", desc: "به سایت torob.com بروید و فروشگاه خود را ثبت کنید", link: "https://torob.com" },
              { step: "۲", title: "ارسال آدرس API", desc: "آدرس زیر را به پشتیبانی ترب بدهید:", extra: apiUrl },
              { step: "۳", title: "دریافت توکن", desc: "ترب یک توکن احراز هویت برای شما ارسال می‌کند" },
              { step: "۴", title: "تأیید اتصال", desc: "ترب به صورت خودکار محصولات شما را ایندکس می‌کند" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-dark text-sm">{item.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
                  {item.extra && (
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-dark break-all">{item.extra}</code>
                      <button onClick={() => copy(item.extra!)} className="text-gray-400 hover:text-dark flex-shrink-0"><Copy size={12} /></button>
                    </div>
                  )}
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary text-xs mt-1 hover:underline">
                      {item.link} <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-dark mb-4">اطلاعات فنی API</h2>
          <table className="w-full text-sm">
            <tbody>
              {[
                ["نسخه API", "v3 (torob_api_v3)"],
                ["متد", "POST"],
                ["آدرس", "/api/torob/v3/products"],
                ["احراز هویت", "JWT (EdDSA/Ed25519)"],
                ["تعداد محصول در هر صفحه", "۱۰۰"],
                ["فرمت تاریخ", "ISO 8601"],
              ].map(([k, v]) => (
                <tr key={k} className="border-b border-gray-50">
                  <td className="py-2 text-gray-500 w-1/2">{k}</td>
                  <td className="py-2 font-medium text-dark font-mono text-xs">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
