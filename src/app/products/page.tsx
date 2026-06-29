import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "همه محصولات | روشن اویل",
  description: "خرید انواع روغن موتور، فیلتر روغن، روغن گیربکس و افزودنی‌های خودرو با بهترین قیمت",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
