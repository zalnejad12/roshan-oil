"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminDiscountsPage() {
  const [codes, setCodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ code: "", type: "percentage", value: "", min_order: "", max_uses: "" });

  useEffect(() => { fetchCodes(); }, []);

  async function fetchCodes() {
    setLoading(true);
    const { data } = await supabase.from("discount_codes").select("*").order("created_at", { ascending: false });
    setCodes(data || []);
    setLoading(false);
  }

  async function handleAdd() {
    if (!form.code || !form.value) { toast.error("کد و مقدار الزامی است"); return; }
    const { error } = await supabase.from("discount_codes").insert({
      code: form.code.toUpperCase(), type: form.type, value: Number(form.value),
      min_order: Number(form.min_order) || 0, max_uses: Number(form.max_uses) || null, is_active: true,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("کد تخفیف اضافه شد");
    setForm({ code: "", type: "percentage", value: "", min_order: "", max_uses: "" });
    fetchCodes();
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("discount_codes").update({ is_active: !current }).eq("id", id);
    fetchCodes();
  }

  async function handleDelete(id: string) {
    if (!confirm("حذف شود؟")) return;
    await supabase.from("discount_codes").delete().eq("id", id);
    toast.success("حذف شد"); fetchCodes();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin" className="text-gray-400 hover:text-dark"><ArrowRight size={20} /></Link>
          <h1 className="text-xl font-bold text-dark">کدهای تخفیف</h1>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <h2 className="font-bold text-dark mb-4">افزودن کد جدید</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div><label className="block text-xs font-medium text-gray-500 mb-1">کد تخفیف *</label><input type="text" value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} className="input-field" placeholder="SUMMER20" dir="ltr" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">نوع</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="input-field"><option value="percentage">درصدی</option><option value="fixed">مبلغ ثابت</option></select></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">مقدار *</label><input type="number" value={form.value} onChange={e => setForm({...form, value: e.target.value})} className="input-field" placeholder={form.type === "percentage" ? "10" : "50000"} dir="ltr" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">حداقل خرید (تومان)</label><input type="number" value={form.min_order} onChange={e => setForm({...form, min_order: e.target.value})} className="input-field" placeholder="500000" dir="ltr" /></div>
            <div><label className="block text-xs font-medium text-gray-500 mb-1">حداکثر استفاده</label><input type="number" value={form.max_uses} onChange={e => setForm({...form, max_uses: e.target.value})} className="input-field" placeholder="100" dir="ltr" /></div>
            <div className="flex items-end"><button onClick={handleAdd} className="btn-primary w-full justify-center text-sm"><Plus size={16} /> افزودن</button></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? <div className="p-12 text-center text-gray-400">در حال بارگذاری...</div> : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">کد</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">نوع</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">مقدار</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">استفاده</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">وضعیت</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {codes.map(c => (
                  <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono font-bold text-dark">{c.code}</td>
                    <td className="py-3 px-4 text-gray-600">{c.type === "percentage" ? "درصدی" : "مبلغ ثابت"}</td>
                    <td className="py-3 px-4 font-medium text-primary">{c.type === "percentage" ? `${c.value}٪` : `${c.value.toLocaleString()} تومان`}</td>
                    <td className="py-3 px-4 text-gray-600">{c.used_count || 0} {c.max_uses ? `/ ${c.max_uses}` : ""}</td>
                    <td className="py-3 px-4"><button onClick={() => toggleActive(c.id, c.is_active)} className={`px-2 py-1 rounded-full text-xs font-medium ${c.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{c.is_active ? "فعال" : "غیرفعال"}</button></td>
                    <td className="py-3 px-4"><button onClick={() => handleDelete(c.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
