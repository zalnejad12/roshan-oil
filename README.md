# روشن اویل 🛢️
### فروشگاه تخصصی روغن موتور و لوازم خودرو

فروشگاه آنلاین کامل فارسی (RTL) با Next.js 14 + TailwindCSS

---

## 🚀 تکنولوژی‌ها

| بخش | تکنولوژی |
|-----|----------|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | TailwindCSS |
| State | Zustand (cart + wishlist) |
| Database | PostgreSQL via Supabase |
| Icons | Lucide React |
| Notifications | React Hot Toast |

---

## 📁 ساختار پروژه

```
src/
├── app/
│   ├── page.tsx              ← صفحه اصلی
│   ├── products/             ← لیست + جزئیات محصول
│   ├── car/[slug]/           ← صفحات SEO برند خودرو
│   ├── cart/                 ← سبد خرید
│   ├── checkout/             ← پرداخت ۳ مرحله‌ای
│   ├── blog/                 ← مقالات
│   ├── account/              ← ورود/ثبت‌نام OTP
│   ├── contact/              ← تماس با ما
│   ├── car-selector/         ← انتخاب هوشمند روغن
│   └── admin/                ← پنل مدیریت
├── components/
│   ├── layout/               ← Header, Footer
│   ├── home/                 ← Hero, Categories, Brands, ...
│   ├── products/             ← ProductCard
│   ├── cart/                 ← CartDrawer
│   └── ui/                   ← WhatsApp, Search, Stars, Badge
├── data/                     ← داده‌های نمونه
├── store/                    ← Zustand stores
├── types/                    ← TypeScript types
└── lib/                      ← utils, supabase
database/
└── schema.sql                ← PostgreSQL schema کامل
```

---

## 🛠️ نصب و راه‌اندازی

```bash
# ۱. نصب وابستگی‌ها
npm install

# ۲. کپی فایل محیطی
cp .env.local.example .env.local
# سپس اطلاعات Supabase را وارد کنید

# ۳. اجرای سرور توسعه
npm run dev
```

باز کنید: http://localhost:3000

---

## 📱 صفحات

| صفحه | آدرس |
|------|------|
| خانه | `/` |
| محصولات | `/products` |
| جزئیات محصول | `/products/castrol-edge-5w30-4l` |
| روغن هیوندای | `/car/hyundai` |
| روغن کیا | `/car/kia` |
| روغن تویوتا | `/car/toyota` |
| روغن BMW | `/car/bmw` |
| روغن بنز | `/car/mercedes` |
| انتخاب خودرو | `/car-selector` |
| سبد خرید | `/cart` |
| پرداخت | `/checkout` |
| مقالات | `/blog` |
| تماس | `/contact` |
| حساب کاربری | `/account` |
| پنل مدیریت | `/admin` |

---

## 🎨 رنگ‌بندی

- **قرمز اصلی**: `#E31E24`
- **مشکی**: `#0A0A0A`
- **سفید**: `#FFFFFF`

---

## 📦 فونت وزیر

فایل‌های فونت را از [vazir-font](https://rastikerdar.github.io/vazir-font/) دانلود کرده و در `public/fonts/` قرار دهید:

```
public/fonts/
├── Vazir.woff2
├── Vazir.woff
├── Vazir-Bold.woff2
├── Vazir-Bold.woff
├── Vazir-Medium.woff2
└── Vazir-Medium.woff
```

---

## ✅ ویژگی‌های پیاده‌سازی شده

- [x] RTL کامل + فونت وزیر
- [x] صفحه اصلی با اسلایدر، دسته‌بندی، برندها، پرفروش‌ها
- [x] تایمر شمارش معکوس پیشنهادات ویژه
- [x] فیلتر پیشرفته محصولات (برند خودرو، ویسکوزیته، نوع روغن)
- [x] صفحه کامل محصول با گالری، مشخصات، نظرات
- [x] صفحات SEO برای ۶ برند خودرو با FAQ
- [x] سبد خرید با Zustand + localStorage
- [x] کد تخفیف (ROSHAN10)
- [x] فرآیند پرداخت ۳ مرحله‌ای
- [x] دکمه واتساپ شناور
- [x] جستجوی زنده
- [x] پنل مدیریت
- [x] Schema markup (JSON-LD) برای SEO
- [x] Sitemap خودکار
- [x] طراحی کاملاً ریسپانسیو
- [x] دیتابیس PostgreSQL کامل
