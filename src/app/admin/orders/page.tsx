"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatPrice, toPersianNumber } from "@/lib/utils";

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "در انتظار", color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "تایید شده", color: "bg-blue-100 text-blue-700" },
  processing: { label: "در حال پردازش", color: "bg-purple-100 text-purple-700" },
  shipped: { label: "ارسال شده", color: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "تحویل داده شده", color: "bg-green-100 text-green-700" },
  cancelled: { label: "لغو شده", color: "bg-red-100 text-red-700" },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => { fetchOrders(); }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("orders").update({ order_status: status }).eq("id", id);
    fetchOrders();
    if (selected?.id === id) setSelected({ ...selected, order_status: status });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin" className="text-gray-400 hover:text-dark"><ArrowRight size={20} /></Link>
          <div><h1 className="text-xl font-bold text-dark">مدیریت سفارشات</h1><p className="text-gray-400 text-sm">{orders.length} سفارش</p></div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? <div className="p-12 text-center text-gray-400">در حال بارگذاری...</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">شماره سفارش</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">مشتری</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">مبلغ</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">وضعیت</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">تاریخ</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan={6} className="py-12 text-center text-gray-400">سفارشی ثبت نشده</td></tr>
                  ) : orders.map((o) => {
                    const s = statusMap[o.order_status] || statusMap.pending;
                    return (
                      <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-dark text-xs">{o.order_number}</td>
                        <td className="py-3 px-4"><div className="font-medium text-dark">{o.full_name}</div><div className="text-xs text-gray-400">{o.phone}</div></td>
                        <td className="py-3 px-4 font-medium text-primary">{formatPrice(o.final_price)}</td>
                        <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span></td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{new Date(o.created_at).toLocaleDateString("fa-IR")}</td>
                        <td className="py-3 px-4"><button onClick={() => setSelected(o)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Eye size={15} /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-dark">جزئیات سفارش {selected.order_number}</h2>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400">✕</button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><span className="text-gray-500">نام:</span> <span className="font-medium">{selected.full_name}</span></div>
                <div><span className="text-gray-500">موبایل:</span> <span className="font-medium">{selected.phone}</span></div>
                <div><span className="text-gray-500">شهر:</span> <span className="font-medium">{selected.city}</span></div>
                <div><span className="text-gray-500">مبلغ:</span> <span className="font-bold text-primary">{formatPrice(selected.final_price)}</span></div>
              </div>
              <div><span className="text-gray-500">آدرس:</span> <span className="font-medium">{selected.address}</span></div>
              <div>
                <span className="text-gray-500 block mb-2">تغییر وضعیت:</span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(statusMap).map(([key, val]) => (
                    <button key={key} onClick={() => updateStatus(selected.id, key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selected.order_status === key ? val.color + " ring-2 ring-offset-1 ring-current" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
