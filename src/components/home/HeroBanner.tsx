"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight, ChevronLeft, Shield, Truck, Award } from "lucide-react";

const slides = [
  { id: 1, title: "روغن موتور اصل", subtitle: "با بهترین قیمت", desc: "بیش از ۵۰۰ نوع روغن موتور، فیلتر و لوازم خودرو از برندهای معتبر جهانی", cta: "مشاهده محصولات", link: "/products", badge: "تا ۳۰٪ تخفیف" },
  { id: 2, title: "روغن موتور هیوندای", subtitle: "مناسب‌ترین انتخاب", desc: "روغن‌های سنتتیک و نیمه سنتتیک مخصوص خودروهای هیوندای با گارانتی اصالت", cta: "خرید روغن هیوندای", link: "/car/hyundai", badge: "ارسال رایگان" },
  { id: 3, title: "فیلتر روغن اصل", subtitle: "برای تمام خودروها", desc: "فیلترهای روغن اصل از برندهای مان، بوش، ماهله و سایر برندهای معتبر", cta: "مشاهده فیلترها", link: "/products?category=filter", badge: "موجودی محدود" },
];

export default function HeroBanner() {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const s = slides[cur];

  return (
    <section>
      <div className="bg-gradient-to-br from-dark via-dark-800 to-dark min-h-[500px] md:min-h-[580px] flex items-center relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />

        <div className="container-custom relative z-10 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />{s.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-3 animate-fade-in">
              {s.title}<br /><span className="text-primary">{s.subtitle}</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">{s.desc}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={s.link} className="btn-primary text-base px-8 py-4">{s.cta} <ArrowLeft size={18} /></Link>
              <Link href="/car-selector" className="border-2 border-white/30 hover:border-white text-white font-bold py-4 px-8 rounded-xl transition-all inline-flex items-center gap-2 text-base">
                انتخاب بر اساس خودرو
              </Link>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className={`transition-all duration-300 rounded-full ${i === cur ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/40 hover:bg-white/60"}`} />
          ))}
        </div>

        <button onClick={() => setCur((p) => (p - 1 + slides.length) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
          <ChevronRight size={20} />
        </button>
        <button onClick={() => setCur((p) => (p + 1) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Features bar */}
      <div className="bg-primary">
        <div className="container-custom py-4">
          <div className="grid grid-cols-3 gap-4">
            {[{ icon: Shield, text: "ضمانت اصالت کالا" }, { icon: Truck, text: "ارسال سریع سراسری" }, { icon: Award, text: "بیش از ۱۰ سال تجربه" }].map((f, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-white">
                <f.icon size={18} className="flex-shrink-0" />
                <span className="text-sm font-medium hidden sm:block">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
