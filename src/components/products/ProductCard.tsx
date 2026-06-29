"use client";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import toast from "react-hot-toast";

interface Props { product: Product; className?: string; variant?: "default" | "horizontal"; }

export default function ProductCard({ product, className, variant = "default" }: Props) {
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addItem(product); openCart();
    toast.success(`${product.name} به سبد خرید اضافه شد`, { icon: "🛒" });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    toggleItem(product);
    toast.success(inWishlist ? "از علاقه‌مندی‌ها حذف شد" : "به علاقه‌مندی‌ها اضافه شد");
  };

  if (variant === "horizontal") {
    return (
      <Link href={`/products/${product.slug}`}>
        <div className={cn("card flex gap-4 p-4 group cursor-pointer", className)}>
          <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 text-4xl">
            {product.category === "filter" ? "🔧" : product.category === "additive" ? "🧪" : "🛢️"}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-dark line-clamp-2 mb-1">{product.name}</h3>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" className="mb-2" />
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold text-sm">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="text-gray-400 text-xs line-through">{formatPrice(product.originalPrice)}</span>}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <div className={cn("card group cursor-pointer product-card relative", className)}>
        {/* Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          {product.discount && <Badge variant="red">%{product.discount} تخفیف</Badge>}
          {product.isBestSeller && <Badge variant="yellow">پرفروش</Badge>}
          {product.isNew && <Badge variant="green">جدید</Badge>}
          {!product.inStock && <Badge variant="gray">ناموجود</Badge>}
        </div>

        {/* Wishlist */}
        <button onClick={handleWishlist}
          className="absolute top-3 left-3 z-10 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-red-50 transition-colors"
          aria-label="افزودن به علاقه‌مندی‌ها">
          <Heart size={15} className={inWishlist ? "fill-primary text-primary" : "text-gray-400"} />
        </button>

        {/* Image */}
        <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
          <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
            {product.category === "filter" ? "🔧" : product.category === "additive" ? "🧪" : "🛢️"}
          </div>
          <div className="product-actions absolute bottom-3 left-0 right-0 flex justify-center">
            <button onClick={handleCart} disabled={!product.inStock}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg transition-colors disabled:opacity-50">
              <ShoppingCart size={13} /> افزودن به سبد
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-gray-400 mb-1">{product.brand}</div>
          <h3 className="text-sm font-medium text-dark line-clamp-2 mb-2 leading-relaxed">{product.name}</h3>
          {product.viscosity && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs bg-dark text-white px-2 py-0.5 rounded-full font-mono">{product.viscosity}</span>
              {product.oilType && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {product.oilType === "synthetic" ? "سنتتیک" : product.oilType === "semi-synthetic" ? "نیمه سنتتیک" : "معدنی"}
                </span>
              )}
            </div>
          )}
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" className="mb-3" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-primary font-bold text-base">{formatPrice(product.price)}</div>
              {product.originalPrice && <div className="text-gray-400 text-xs line-through">{formatPrice(product.originalPrice)}</div>}
            </div>
            <button onClick={handleCart} disabled={!product.inStock}
              className="w-9 h-9 bg-primary hover:bg-primary-dark text-white rounded-xl flex items-center justify-center transition-colors disabled:opacity-50"
              aria-label="افزودن به سبد خرید">
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
