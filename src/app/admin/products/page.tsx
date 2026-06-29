"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Save, X, ArrowRight, Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

const categories = [
  { value: "engine-oil", label: "روغن موتور" },
  { value: "transmission-oil", label: "روغن گیربکس" },
  { value: "filter", label: "فیلتر روغن" },
  { value: "additive", label: "افزودنی" },
  { value: "coolant", label: "ضد یخ" },
  { value: "gear-oil", label: "روغن دیفرانسیل" },
];

const emptyForm = {
  name: "", slug: "", brand: "", category: "engine-oil",
  price: "", original_price: "", short_description: "", description: "",
  viscosity: "", api_standard: "", oil_type: "", volume: "",
  compatible_cars: "", tags: "", stock_count: "",
  in_stock: true, is_best_seller: false, is_new: false, is_featured: false,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>(emptyForm);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch {
      const { products: local } = await import("@/data/products");
      setProducts(local as any[]);
    }
    setLoading(false);
  }

  function openAdd() { setForm(emptyForm); setEditingId(null); setShowForm(true); }

  function openEdit(p: any) {
    setForm({ ...p, compatible_cars: Array.isArray(p.compatible_cars) ? p.compatible_cars.join("، ") : "", tags: Array.isArray(p.tags) ? p.tags.join("، ") : "", price: p.price || "", original_price: p.original_price || "", stock_count: p.stock_count || "" });
    setEditingId(p.id); setShowForm(true);
  }

  async function handleSave() {
    if (!form.name || !form.price) { toast.error("نام و قیمت الزامی است"); return; }
    setSaving(true);
    const slug = form.slug || form.name.replace(/\s+/g, "-").toLowerCase();
    const data = { name: form.name, slug, brand: form.brand, category: form.category, price: Number(form.price), original_price: Number(form.original_price) || null, short_description: form.short_description, description: form.description, viscosity: form.viscosity, api_standard: form.api_standard, oil_type: form.oil_type || null, volume: form.volume, compatible_cars: form.compatible_cars.split(/[،,]/).map((s: string) => s.trim()).filter(Boolean), tags: form.tags.split(/[،,]/).map((s: string) => s.trim()).filter(Boolean), stock_count: Number(form.stock_count) || 0, in_stock: form.in_stock, is_best_seller: form.is_best_seller, is_new: form.is_new, is_featured: form.is_featured };
    try {
      if (editingId) { const { error } = await supabase.from("products").update(data).eq("id", editingId); if (error) throw error; toast.success("محصول ویرایش شد"); }
      else { const { error } = await supabase.from("products").insert(data); if (error) throw error; toast.success("محصول اضافه شد"); }
      setShowForm(false); fetchProducts();
    } catch (e: any) { toast.error(e.message || "خطا"); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("حذف شود؟")) return;
    await supabase.from("products").delete().eq("id", id);
    toast.success("حذف شد"); fetchProducts();
  }

  async function toggleStock(p: any) { await supabase.from("products").update({ in_stock: !p.in_stock }).eq("id", p.id); fetchProducts(); }

  const filtered = products.filter(p => p.name?.includes(search) || p.brand?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-gray-400 hover:text-dark"><ArrowRight size={20} /></Link>
            <div><h1 className="text-xl font-bold text-dark">مدیریت محصولات</h1><p className="text-gray-400 text-sm">{products.length} محصول</p></div>
          </div>
          <button onClick={openAdd} className="btn-primary text-sm"><Plus size={16} /> افزودن محصول</button>
        </div>
        <div className="relative mb-4">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="جستجو..." className="input-field pr-10 bg-white" />
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? <div className="p-12 text-center text-gray-400">در حال بارگذاری...</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">محصول</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500 hidden md:table-cell">برند</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">قیمت</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500 hidden sm:table-cell">موجودی</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">وضعیت</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-500">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4"><div className="font-medium text-dark line-clamp-1 max-w-xs">{p.name}</div><div className="text-xs text-gray-400">{p.viscosity || p.category}</div></td>
                      <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{p.brand}</td>
                      <td className="py-3 px-4 font-medium text-primary">{formatPrice(p.price)}</td>
                      <td className="py-3 px-4 hidden sm:table-cell"><span className={`font-bold ${p.stock_count < 10 ? "text-red-500" : "text-green-600"}`}>{p.stock_count || 0}</span></td>
                      <td className="py-3 px-4"><button onClick={() => toggleStock(p)} className={`px-2 py-1 rounded-full text-xs font-medium ${p.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{p.in_stock ? "موجود" : "ناموجود"}</button></td>
                      <td className="py-3 px-4"><div className="flex gap-2"><button onClick={() => openEdit(p)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil size={15} /></button><button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <div className="p-12 text-center text-gray-400">محصولی یافت نشد</div>}
            </div>
          )}
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-4 shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-bold text-dark text-lg">{editingId ? "ویرایش محصول" : "افزودن محصول جدید"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div><label className="block text-sm font-medium text-dark mb-1.5">نام محصول *</label><input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="روغن موتور کاسترول ادج 5W-30" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-dark mb-1.5">برند *</label><input type="text" value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className="input-field" placeholder="Castrol" /></div>
                <div><label className="block text-sm font-medium text-dark mb-1.5">دسته‌بندی</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">{categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-dark mb-1.5">قیمت (تومان) *</label><input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="input-field" placeholder="1850000" dir="ltr" /></div>
                <div><label className="block text-sm font-medium text-dark mb-1.5">قیمت قبل از تخفیف</label><input type="number" value={form.original_price} onChange={e => setForm({...form, original_price: e.target.value})} className="input-field" placeholder="2200000" dir="ltr" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-dark mb-1.5">ویسکوزیته</label><input type="text" value={form.viscosity} onChange={e => setForm({...form, viscosity: e.target.value})} className="input-field" placeholder="5W-30" dir="ltr" /></div>
                <div><label className="block text-sm font-medium text-dark mb-1.5">نوع روغن</label><select value={form.oil_type} onChange={e => setForm({...form, oil_type: e.target.value})} className="input-field"><option value="">انتخاب کنید</option><option value="synthetic">تمام سنتتیک</option><option value="semi-synthetic">نیمه سنتتیک</option><option value="mineral">معدنی</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-dark mb-1.5">حجم</label><input type="text" value={form.volume} onChange={e => setForm({...form, volume: e.target.value})} className="input-field" placeholder="4 لیتر" /></div>
                <div><label className="block text-sm font-medium text-dark mb-1.5">تعداد موجودی</label><input type="number" value={form.stock_count} onChange={e => setForm({...form, stock_count: e.target.value})} className="input-field" placeholder="50" dir="ltr" /></div>
              </div>
              <div><label className="block text-sm font-medium text-dark mb-1.5">استاندارد API</label><input type="text" value={form.api_standard} onChange={e => setForm({...form, api_standard: e.target.value})} className="input-field" placeholder="API SN/CF" dir="ltr" /></div>
              <div><label className="block text-sm font-medium text-dark mb-1.5">خودروهای مناسب</label><input type="text" value={form.compatible_cars} onChange={e => setForm({...form, compatible_cars: e.target.value})} className="input-field" placeholder="هیوندای، کیا، تویوتا، BMW" /><p className="text-xs text-gray-400 mt-1">با ویرگول جدا کنید</p></div>
              <div><label className="block text-sm font-medium text-dark mb-1.5">توضیح کوتاه</label><input type="text" value={form.short_description} onChange={e => setForm({...form, short_description: e.target.value})} className="input-field" placeholder="روغن موتور تمام سنتتیک..." /></div>
              <div><label className="block text-sm font-medium text-dark mb-1.5">توضیحات کامل</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field resize-none" rows={3} placeholder="توضیحات کامل محصول..." /></div>
              <div><label className="block text-sm font-medium text-dark mb-1.5">تگ‌ها</label><input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="input-field" placeholder="سنتتیک، 5W-30، کاسترول" /></div>
              <div className="flex flex-wrap gap-4 pt-2">
                {[{key:"in_stock",label:"موجود"},{key:"is_best_seller",label:"پرفروش"},{key:"is_new",label:"جدید"},{key:"is_featured",label:"ویژه"}].map(item => (
                  <label key={item.key} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={!!form[item.key]} onChange={e => setForm({...form, [item.key]: e.target.checked})} className="accent-primary w-4 h-4" /><span className="text-sm text-dark">{item.label}</span></label>
                ))}
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex gap-3">
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-50"><Save size={16} /> {saving ? "در حال ذخیره..." : "ذخیره"}</button>
              <button onClick={() => setShowForm(false)} className="btn-outline flex-1 justify-center">انصراف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
