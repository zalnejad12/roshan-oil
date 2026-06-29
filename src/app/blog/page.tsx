import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { Clock, User } from "lucide-react";
import { toPersianNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "مقالات و راهنماها | روشن اویل",
  description: "آخرین مقالات آموزشی در زمینه روغن موتور، نگهداری خودرو و راهنمای خرید",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container-custom py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">خانه</Link><span>/</span>
            <span className="text-dark font-medium">مقالات</span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-dark to-dark-800 py-12">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-bold text-white mb-3">مقالات و راهنماها</h1>
          <p className="text-gray-300">آموزش، راهنمای خرید و نکات نگهداری خودرو</p>
        </div>
      </div>
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="card h-full">
                <div className="h-52 bg-gradient-to-br from-dark to-dark-700 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-10">📰</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="font-bold text-dark text-base mb-2 group-hover:text-primary transition-colors leading-relaxed line-clamp-2">{post.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1"><User size={12} /><span>{post.author}</span></div>
                    <div className="flex items-center gap-1"><Clock size={12} /><span>{toPersianNumber(post.readTime)} دقیقه مطالعه</span></div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
