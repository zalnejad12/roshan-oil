import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl font-black text-gray-100 mb-4">۴۰۴</div>
        <h1 className="text-2xl font-bold text-dark mb-3">صفحه یافت نشد</h1>
        <p className="text-gray-500 mb-8">صفحه‌ای که دنبال آن می‌گردید وجود ندارد یا حذف شده است</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary">بازگشت به خانه</Link>
          <Link href="/products" className="btn-outline">مشاهده محصولات</Link>
        </div>
      </div>
    </div>
  );
}
