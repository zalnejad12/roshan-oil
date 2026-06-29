export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  description: string;
  shortDescription: string;
  viscosity?: string;
  apiStandard?: string;
  oilType?: OilType;
  volume?: string;
  compatibleCars: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  tags: string[];
  createdAt: string;
}

export type ProductCategory =
  | "engine-oil"
  | "transmission-oil"
  | "filter"
  | "additive"
  | "coolant"
  | "gear-oil";

export type OilType = "synthetic" | "semi-synthetic" | "mineral";

export interface CarBrand {
  id: string;
  slug: string;
  name: string;
  nameFa: string;
  logo: string;
  description: string;
  popularModels: string[];
  recommendedOils: string[];
  seoText: string;
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

export interface FilterOptions {
  carBrand?: string;
  viscosity?: string;
  apiStandard?: string;
  oilType?: OilType;
  priceMin?: number;
  priceMax?: number;
  productBrand?: string;
  category?: ProductCategory;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
