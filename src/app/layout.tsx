import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: { default: "روشن اویل | فروشگاه تخصصی روغن موتور", template: "%s | روشن اویل" },
  description: "خرید آنلاین روغن موتور، روغن گیربکس، فیلتر روغن و لوازم جانبی خودرو با بهترین قیمت.",
  keywords: "روغن موتور، روغن گیربکس، فیلتر روغن، لوازم خودرو",
  openGraph: { type: "website", locale: "fa_IR", siteName: "روشن اویل" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="theme-color" content="#E31E24" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Organization",
          name: "روشن اویل", url: "https://roshanoil.ir",
          contactPoint: { "@type": "ContactPoint", telephone: "+98-21-12345678", contactType: "customer service" },
        })}} />
      </head>
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster position="bottom-right" toastOptions={{ style: { fontFamily: "Vazir, Tahoma, sans-serif", direction: "rtl" } }} />
      </body>
    </html>
  );
}
