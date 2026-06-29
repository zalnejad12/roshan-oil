"use client";
import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, FileText, Settings, TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign, Menu } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice, toPersianNumber } from "@/lib/utils";

const stats = [
  { label: "فروش امروز", value: "۱۲,۵۰۰,۰۰۰", icon: DollarSign, color: "text-green-500", bg: "bg-green-50" },
  { label: "سفارشات جدید", value: "۲۳", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "محصولات", value: "۵۰۰", icon: Package, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "کاربران", value: "۱,۲۳۴", icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
];

const orders = [
  { id: "ORD-001", customer: "علی محمدی", amount: 1850000, status: "delivered", date: "۱۴۰۳/۰۳/۱۵" },
  { id: "ORD-002", customer: "رضا احمدی", amount: 2100000, status: "processing", date: "۱۴۰۳/۰۳/۱۵" },
  { id: "ORD-003", customer: "مریم کریمی", amount: 980000, status: "pending", date: "۱۴۰۳/۰۳/۱۴" },
];

const statusMap: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "در انتظار", color: "text-yellow-600 bg-yellow-50", icon: Clock },
  processing: { label: "در حال پردازش", color: "text-blue-600 bg-blue-50", icon: AlertCircle },
  shipped: { label: "ارسال شده", color: "text-purple-600 bg-purple-50", icon: TrendingUp },
  delivered: { label: "تحویل داده شده", color: "text-green-600 bg-green-50", icon: CheckCircle },
};

const navItems = [
  { id: "dashboard", label: "داشبورد", icon: LayoutDashboard },
  { id: "products", label: "محصولات", icon: Package },
  { id: "orders", label: "سفارشات", icon: ShoppingBag },
  { id: "customers", label: "مشتریان", icon: Users },
  { id: "discounts", label: "کدهای تخفیف", icon: Tag },
  { id: "blog", label: "مقالات", icon: FileText },
  { id: "settings", label: "تنظیمات", icon: Settings },
  { id: "torob", label: "اتصال ترب", icon: TrendingUp },
];

export default function AdminPage() {
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-dark text-white flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b border-dark-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center"><span className="text-white font-black">R</span></div>
            <div><div className="font-bold text-sm">روشن اویل</div><div className="text-xs text-gray-400">پنل مدیریت</div></div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-colors ${section === item.id ? "bg-primary text-white" : "text-gray-400 hover:bg-dark-700 hover:text-white"}`}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-dark-700">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">← بازگشت به سایت</Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100"><Menu size={20} /></button>
          <h1 className="font-bold text-dark text-lg">{navItems.find((n) => n.id === section)?.label}</h1>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">م</div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {section === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className={`w-10 h-10 ${s.bg} rounded-2xl flex items-center justify-center mb-3`}><s.icon size={20} className={s.color} /></div>
                    <div className="text-2xl font-bold text-dark">{s.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100"><h2 className="font-bold text-dark">سفارشات اخیر</h2></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        {["شماره سفارش","مشتری","مبلغ","وضعیت","تاریخ"].map((h) => <th key={h} className="text-right py-3 px-4 font-medium text-gray-500">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => {
                        const s = statusMap[o.status];
                        return (
                          <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50">
                            <td className="py-3 px-4 font-mono text-dark">{o.id}</td>
                            <td className="py-3 px-4 text-dark">{o.customer}</td>
                            <td className="py-3 px-4 font-medium">{formatPrice(o.amount)}</td>
                            <td className="py-3 px-4"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${s.color}`}><s.icon size={10} />{s.label}</span></td>
                            <td className="py-3 px-4 text-gray-500">{o.date}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {section === "products" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-bold text-dark">مدیریت محصولات</h2>
                <button className="btn-primary text-sm py-2">+ افزودن محصول</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>{["محصول","برند","قیمت","موجودی","عملیات"].map((h) => <th key={h} className="text-right py-3 px-4 font-medium text-gray-500">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4"><div className="font-medium text-dark line-clamp-1">{p.name}</div><div className="text-xs text-gray-400">{p.category}</div></td>
                        <td className="py-3 px-4 text-gray-600">{p.brand}</td>
                        <td className="py-3 px-4 font-medium">{formatPrice(p.price)}</td>
                        <td className="py-3 px-4"><span className={`font-bold ${p.stockCount < 20 ? "text-red-500" : p.stockCount < 50 ? "text-orange-500" : "text-green-600"}`}>{toPersianNumber(p.stockCount)}</span></td>
                        <td className="py-3 px-4"><div className="flex gap-2"><button className="text-blue-500 hover:underline text-xs">ویرایش</button><button className="text-red-500 hover:underline text-xs">حذف</button></div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === "torob" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-dark text-lg mb-2">اتصال به ترب</h2>
              <p className="text-gray-500 text-sm mb-4">برای تنظیمات کامل به صفحه اختصاصی بروید</p>
              <a href="/admin/torob" className="btn-primary text-sm">مشاهده تنظیمات ترب</a>
            </div>
          )}

          {section !== "dashboard" && section !== "products" && section !== "torob" && (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
              <div className="text-5xl mb-4">🚧</div>
              <h3 className="font-bold text-dark mb-2">در حال توسعه</h3>
              <p className="text-gray-500 text-sm">این بخش به زودی تکمیل می‌شود</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
