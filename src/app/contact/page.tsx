import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "تماس با ما | روشن اویل",
  description: "با تیم پشتیبانی روشن اویل در تماس باشید",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">خانه</Link><span>/</span>
            <span className="text-dark font-medium">تماس با ما</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-dark to-dark-800 py-12">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold text-white mb-3">تماس با ما</h1>
          <p className="text-gray-300">همیشه در کنار شما هستیم</p>
        </div>
      </div>
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            {[
              { icon: Phone, title: "تلفن", lines: ["۰۲۱-۱۲۳۴۵۶۷۸", "۰۹۱۲-۳۴۵-۶۷۸۹"] },
              { icon: Mail, title: "ایمیل", lines: ["info@roshanoil.ir"] },
              { icon: MapPin, title: "آدرس", lines: ["تهران، خیابان ولیعصر، پلاک ۱۲۳"] },
              { icon: Clock, title: "ساعات کاری", lines: ["شنبه تا چهارشنبه: ۹ تا ۱۸", "پنجشنبه: ۹ تا ۱۴"] },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0"><item.icon size={20} className="text-primary" /></div>
                <div><div className="font-bold text-dark text-sm mb-1">{item.title}</div>{item.lines.map((l, j) => <div key={j} className="text-gray-500 text-sm">{l}</div>)}</div>
              </div>
            ))}
            <a href="https://wa.me/989123456789" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 transition-colors">
              <MessageCircle size={24} />
              <div><div className="font-bold">پشتیبانی واتساپ</div><div className="text-green-100 text-sm">پاسخگویی سریع</div></div>
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-dark text-lg mb-5">ارسال پیام</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-dark mb-1.5">نام و نام خانوادگی</label><input type="text" className="input-field" placeholder="علی محمدی" /></div>
                <div><label className="block text-sm font-medium text-dark mb-1.5">شماره موبایل</label><input type="tel" className="input-field" placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" /></div>
                <div className="sm:col-span-2"><label className="block text-sm font-medium text-dark mb-1.5">موضوع</label>
                  <select className="input-field"><option>سوال درباره محصول</option><option>پیگیری سفارش</option><option>مشاوره خرید</option><option>شکایت</option></select>
                </div>
                <div className="sm:col-span-2"><label className="block text-sm font-medium text-dark mb-1.5">پیام</label><textarea className="input-field resize-none" rows={5} placeholder="پیام خود را بنویسید..." /></div>
                <div className="sm:col-span-2"><button className="btn-primary w-full justify-center">ارسال پیام</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
