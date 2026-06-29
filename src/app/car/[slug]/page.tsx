import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCarBrandBySlug, carBrands } from "@/data/carBrands";
import { products } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { ChevronDown } from "lucide-react";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return carBrands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getCarBrandBySlug(params.slug);
  if (!brand) return { title: "برند یافت نشد" };
  return {
    title: `روغن موتور ${brand.nameFa} | روشن اویل`,
    description: `خرید بهترین روغن موتور برای ${brand.nameFa}. روغن‌های سنتتیک و نیمه سنتتیک مناسب برای ${brand.popularModels.join("، ")}`,
    keywords: `روغن موتور ${brand.nameFa}, روغن ${brand.name}`,
  };
}

export default function CarBrandPage({ params }: Props) {
  const brand = getCarBrandBySlug(params.slug);
  if (!brand) notFound();

  const compatible = products.filter((p) => p.compatibleCars.includes(brand.nameFa));
  const recommended = brand.recommendedOils.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: brand.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      })}} />

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-dark to-dark-800 py-16">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">خانه</Link><span>/</span>
              <Link href="/products" className="hover:text-white transition-colors">محصولات</Link><span>/</span>
              <span className="text-white">روغن موتور {brand.nameFa}</span>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-4xl font-black text-dark">{brand.name.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">روغن موتور {brand.nameFa}</h1>
                <p className="text-gray-300 text-lg mb-4">{brand.description}</p>
                <div className="flex flex-wrap gap-2">
                  {brand.popularModels.map((m) => (
                    <span key={m} className="bg-white/10 text-white text-sm px-3 py-1 rounded-full">{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-10">
          {recommended.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <h2 className="text-xl font-bold text-dark">روغن‌های پیشنهادی برای {brand.nameFa}</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommended.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}

          {compatible.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-primary rounded-full" />
                <h2 className="text-xl font-bold text-dark">همه محصولات مناسب {brand.nameFa}</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {compatible.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}

          <section className="mb-12">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-dark mb-4">راهنمای انتخاب روغن موتور {brand.nameFa}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{brand.seoText}</p>
              <div className="mt-6">
                <h3 className="font-bold text-dark mb-3">مدل‌های محبوب {brand.nameFa}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {brand.popularModels.map((m) => (
                    <Link key={m} href={`/products?carBrand=${brand.nameFa}`}
                      className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-primary/20 rounded-2xl transition-all text-sm text-dark font-medium">
                      <span className="text-lg">🚗</span>{m}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-xl font-bold text-dark">سوالات متداول درباره روغن موتور {brand.nameFa}</h2>
            </div>
            <div className="space-y-3">
              {brand.faqs.map((faq, i) => (
                <details key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-dark text-sm">{faq.question}</span>
                    <ChevronDown size={18} className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">{faq.answer}</div>
                </details>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
