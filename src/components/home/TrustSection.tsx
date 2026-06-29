import { Shield, Truck, RotateCcw, Headphones, CreditCard, Award } from "lucide-react";

const features = [
  { icon: Shield, title: "ضمانت اصالت کالا", desc: "تمام محصولات دارای گارانتی اصالت", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Truck, title: "ارسال سریع", desc: "ارسال به سراسر ایران در کمترین زمان", color: "text-green-500", bg: "bg-green-50" },
  { icon: RotateCcw, title: "۷ روز ضمانت بازگشت", desc: "در صورت عدم رضایت، کالا را برگردانید", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Headphones, title: "پشتیبانی ۲۴/۷", desc: "کارشناسان ما همیشه در دسترس هستند", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: CreditCard, title: "پرداخت امن", desc: "درگاه پرداخت امن و معتبر", color: "text-primary", bg: "bg-red-50" },
  { icon: Award, title: "بیش از ۱۰ سال تجربه", desc: "سابقه درخشان در فروش روغن موتور", color: "text-yellow-500", bg: "bg-yellow-50" },
];

export default function TrustSection() {
  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title">چرا روشن اویل؟</h2>
          <p className="section-subtitle">اعتماد بیش از ۵۰,۰۰۰ مشتری راضی</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((f, i) => (
            <div key={i} className="text-center p-4 rounded-2xl hover:shadow-md transition-all group">
              <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <f.icon size={24} className={f.color} />
              </div>
              <h3 className="text-sm font-bold text-dark mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-dark rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[{ v: "۵۰,۰۰۰+", l: "مشتری راضی" }, { v: "۵۰۰+", l: "نوع محصول" }, { v: "۱۰+", l: "سال تجربه" }, { v: "۹۸٪", l: "رضایت مشتریان" }].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-primary mb-1">{s.v}</div>
                <div className="text-gray-400 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
