import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "همه محصولات | روشن اویل",
  description: "خرید انواع روغن موتور، فیلتر روغن، روغن گیربکس و افزودنی‌های خودرو با بهترین قیمت",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
