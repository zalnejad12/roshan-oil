"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, Phone, ChevronDown, User, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { categories } from "@/data/categories";
import { carBrands } from "@/data/carBrands";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchModal from "@/components/ui/SearchModal";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const { getTotalItems, toggleCart } = useCartStore();
  const totalItems = getTotalItems();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-dark text-white text-xs py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={11} /> ۰۲۱-۱۲۳۴۵۶۷۸</span>
            <span>ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/track-order" className="hover:text-primary transition-colors">پیگیری سفارش</Link>
            <Link href="/about" className="hover:text-primary transition-colors">درباره ما</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">تماس با ما</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-lg">R</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-black text-xl text-dark leading-tight">روشن اویل</div>
                <div className="text-xs text-gray-400">فروشگاه تخصصی روغن موتور</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/" className="px-4 py-2 text-sm font-medium text-dark hover:text-primary transition-colors rounded-xl hover:bg-gray-50">خانه</Link>

              <div className="relative" onMouseEnter={() => setDropdown("products")} onMouseLeave={() => setDropdown(null)}>
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-dark hover:text-primary transition-colors rounded-xl hover:bg-gray-50">
                  محصولات <ChevronDown size={14} />
                </button>
                {dropdown === "products" && (
                  <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-slide-down z-50">
                    {categories.map((cat) => (
                      <Link key={cat.id} href={`/products?category=${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
                        <span className="text-xl">{cat.icon}</span>
                        <div>
                          <div className="text-sm font-medium text-dark">{cat.name}</div>
                          <div className="text-xs text-gray-400">{cat.productCount} محصول</div>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link href="/products" className="flex items-center justify-center py-2 text-sm text-primary font-medium hover:bg-red-50 transition-colors">
                        مشاهده همه محصولات
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" onMouseEnter={() => setDropdown("brands")} onMouseLeave={() => setDropdown(null)}>
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-dark hover:text-primary transition-colors rounded-xl hover:bg-gray-50">
                  برند خودرو <ChevronDown size={14} />
                </button>
                {dropdown === "brands" && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-slide-down z-50">
                    {carBrands.map((brand) => (
                      <Link key={brand.id} href={`/car/${brand.slug}`}
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors">
                        <span className="text-sm font-medium text-dark">{brand.nameFa}</span>
                        <span className="text-xs text-gray-400">{brand.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/blog" className="px-4 py-2 text-sm font-medium text-dark hover:text-primary transition-colors rounded-xl hover:bg-gray-50">مقالات</Link>
              <Link href="/contact" className="px-4 py-2 text-sm font-medium text-dark hover:text-primary transition-colors rounded-xl hover:bg-gray-50">تماس با ما</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button onClick={() => setSearchOpen(true)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors" aria-label="جستجو">
                <Search size={20} />
              </button>
              <Link href="/wishlist" className="p-2 rounded-xl hover:bg-gray-100 transition-colors hidden sm:flex" aria-label="علاقه‌مندی‌ها">
                <Heart size={20} />
              </Link>
              <Link href="/account" className="p-2 rounded-xl hover:bg-gray-100 transition-colors hidden sm:flex" aria-label="حساب کاربری">
                <User size={20} />
              </Link>
              <button onClick={toggleCart} className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors" aria-label="سبد خرید">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -left-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItems > 9 ? "۹+" : totalItems}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors lg:hidden">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slide-down">
            <div className="container-custom py-4 space-y-1">
              <Link href="/" className="block px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-xl" onClick={() => setMobileOpen(false)}>خانه</Link>
              <Link href="/products" className="block px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-xl" onClick={() => setMobileOpen(false)}>همه محصولات</Link>
              <div className="px-4 py-2">
                <div className="text-xs font-bold text-gray-400 mb-2">دسته‌بندی‌ها</div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link key={cat.id} href={`/products?category=${cat.slug}`}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 rounded-xl"
                      onClick={() => setMobileOpen(false)}>
                      <span>{cat.icon}</span><span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="px-4 py-2">
                <div className="text-xs font-bold text-gray-400 mb-2">برند خودرو</div>
                <div className="grid grid-cols-3 gap-2">
                  {carBrands.map((brand) => (
                    <Link key={brand.id} href={`/car/${brand.slug}`}
                      className="px-3 py-2 text-sm text-center hover:bg-gray-50 rounded-xl"
                      onClick={() => setMobileOpen(false)}>{brand.nameFa}</Link>
                  ))}
                </div>
              </div>
              <Link href="/blog" className="block px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-xl" onClick={() => setMobileOpen(false)}>مقالات</Link>
              <Link href="/contact" className="block px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-xl" onClick={() => setMobileOpen(false)}>تماس با ما</Link>
            </div>
          </div>
        )}
      </header>

      <CartDrawer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
