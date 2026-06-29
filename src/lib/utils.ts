import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

export function toPersianNumber(num: number | string): string {
  const d = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
  return String(num).replace(/[0-9]/g, (n) => d[parseInt(n)]);
}

export function getStarArray(rating: number): ("full" | "half" | "empty")[] {
  return Array.from({ length: 5 }, (_, i) => {
    if (rating >= i + 1) return "full";
    if (rating >= i + 0.5) return "half";
    return "empty";
  });
}

export function truncate(text: string, len: number) {
  return text.length <= len ? text : text.slice(0, len) + "...";
}
