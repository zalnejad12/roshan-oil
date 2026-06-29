import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1", slug: "best-engine-oil-for-iranian-cars",
    title: "بهترین روغن موتور برای خودروهای ایرانی در سال ۱۴۰۳",
    excerpt: "راهنمای جامع انتخاب روغن موتور مناسب برای پراید، پژو، سمند و سایر خودروهای ایرانی.",
    content: "", image: "/images/blog/iranian-cars-oil.jpg",
    author: "تیم روشن اویل", category: "راهنمای خرید",
    tags: ["روغن موتور", "خودروهای ایرانی", "پراید", "پژو"],
    publishedAt: "2024-03-15", readTime: 8,
  },
  {
    id: "2", slug: "synthetic-vs-mineral-oil",
    title: "روغن سنتتیک یا معدنی؟ کدام برای خودرو شما بهتر است؟",
    excerpt: "مقایسه کامل روغن موتور سنتتیک، نیمه سنتتیک و معدنی. مزایا، معایب و موارد استفاده هر کدام.",
    content: "", image: "/images/blog/synthetic-vs-mineral.jpg",
    author: "مهندس احمدی", category: "آموزش",
    tags: ["روغن سنتتیک", "روغن معدنی", "مقایسه"],
    publishedAt: "2024-03-10", readTime: 6,
  },
  {
    id: "3", slug: "oil-change-interval",
    title: "هر چند کیلومتر باید روغن موتور را عوض کرد؟",
    excerpt: "راهنمای کامل فواصل تعویض روغن موتور برای انواع خودروها و انواع روغن.",
    content: "", image: "/images/blog/oil-change.jpg",
    author: "تیم روشن اویل", category: "نگهداری خودرو",
    tags: ["تعویض روغن", "نگهداری"],
    publishedAt: "2024-03-05", readTime: 5,
  },
  {
    id: "4", slug: "oil-viscosity-guide",
    title: "راهنمای کامل ویسکوزیته روغن موتور: 5W-30 یا 10W-40؟",
    excerpt: "درک کامل اعداد روی بطری روغن موتور. ویسکوزیته چیست و چطور روغن مناسب را انتخاب کنیم؟",
    content: "", image: "/images/blog/viscosity-guide.jpg",
    author: "مهندس رضایی", category: "آموزش",
    tags: ["ویسکوزیته", "5W-30", "10W-40"],
    publishedAt: "2024-02-28", readTime: 7,
  },
];
