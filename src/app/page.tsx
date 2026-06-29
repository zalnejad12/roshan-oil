import type { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import CategorySection from "@/components/home/CategorySection";
import CarBrandsSection from "@/components/home/CarBrandsSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import SpecialOffersSection from "@/components/home/SpecialOffersSection";
import TrustSection from "@/components/home/TrustSection";
import BlogSection from "@/components/home/BlogSection";

export const metadata: Metadata = {
  title: "روشن اویل | فروشگاه تخصصی روغن موتور و لوازم خودرو",
  description: "خرید آنلاین روغن موتور، روغن گیربکس، فیلتر روغن و لوازم جانبی خودرو با بهترین قیمت. مناسب برای هیوندای، کیا، تویوتا، BMW، بنز، پژو و تمام خودروها.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategorySection />
      <CarBrandsSection />
      <BestSellersSection />
      <SpecialOffersSection />
      <TrustSection />
      <BlogSection />
    </>
  );
}
