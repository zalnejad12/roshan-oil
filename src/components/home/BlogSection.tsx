import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { toPersianNumber } from "@/lib/utils";

export default function BlogSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div><h2 className="section-title">مقالات و راهنماها</h2><p className="section-subtitle">آخرین مطالب آموزشی در زمینه روغن موتور</p></div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:underline">همه مقالات <ArrowLeft size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="card h-full">
                <div className="h-44 bg-gradient-to-br from-dark to-dark-700 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10">📰</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-dark text-sm mb-2 group-hover:text-primary transition-colors leading-relaxed line-clamp-2">{post.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1"><User size={11} /><span>{post.author}</span></div>
                    <div className="flex items-center gap-1"><Clock size={11} /><span>{toPersianNumber(post.readTime)} دقیقه</span></div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
