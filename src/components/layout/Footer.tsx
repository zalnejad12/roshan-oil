import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Instagram, Send } from "lucide-react";
import { categories } from "@/data/categories";
import { carBrands } from "@/data/carBrands";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Newsletter */}
      <div className="bg-primary py-10">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">عضویت در خبرنامه</h3>
            <p className="text-red-100 text-sm">از آخرین تخفیف‌ها و محصولات جدید باخبر شوید</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input type="tel" placeholder="شماره موبایل خود را وارد کنید"
              className="flex-1 md:w-72 px-4 py-3 rounded-xl text-dark text-sm focus:outline-none" dir="rtl" />
            <button className="bg-dark hover:bg-dark-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap">
              عضویت
            </button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="py-12">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">R</span>
              </div>
              <div>
                <div className="font-black text-lg">روشن اویل</div>
                <div className="text-xs text-gray-400">فروشگاه تخصصی روغن موتور</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              روشن اویل با بیش از ۱۰ سال تجربه در زمینه فروش روغن موتور و لوازم خودرو، بهترین محصولات را با قیمت مناسب ارائه می‌دهد.
            </p>
            <div className="flex gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-dark-700 hover:bg-primary rounded-xl flex items-center justify-center transition-colors" aria-label="اینستاگرام">
                <Instagram size={16} />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-dark-700 hover:bg-primary rounded-xl flex items-center justify-center transition-colors" aria-label="تلگرام">
                <Send size={16} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-base mb-4">دسته‌بندی‌ها</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products?category=${cat.slug}`}
                    className="text-gray-400 hover:text-primary text-sm transition-colors flex items-center gap-2">
                    <span className="text-xs">{cat.icon}</span>{cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Car Brands */}
          <div>
            <h4 className="font-bold text-base mb-4">برند خودرو</h4>
            <ul className="space-y-2">
              {carBrands.map((brand) => (
                <li key={brand.id}>
                  <Link href={`/car/${brand.slug}`}
                    className="text-gray-400 hover:text-primary text-sm transition-colors">
                    روغن موتور {brand.nameFa}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-base mb-4">اطلاعات تماس</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Phone size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <div><div>۰۲۱-۱۲۳۴۵۶۷۸</div><div>۰۹۱۲-۳۴۵-۶۷۸۹</div></div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Mail size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <span>info@roshanoil.ir</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Clock size={15} className="text-primary mt-0.5 flex-shrink-0" />
                <div><div>شنبه تا چهارشنبه: ۹ تا ۱۸</div><div>پنجشنبه: ۹ تا ۱۴</div></div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-dark-700 py-5">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© ۱۴۰۳ روشن اویل. تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-gray-500 hover:text-primary text-sm transition-colors">حریم خصوصی</Link>
            <Link href="/terms" className="text-gray-500 hover:text-primary text-sm transition-colors">قوانین</Link>
            <Link href="/sitemap" className="text-gray-500 hover:text-primary text-sm transition-colors">نقشه سایت</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
