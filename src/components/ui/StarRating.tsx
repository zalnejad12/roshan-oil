import { Star } from "lucide-react";
import { getStarArray } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  rating: number; reviewCount?: number;
  size?: "sm" | "md" | "lg"; showCount?: boolean; className?: string;
}

export default function StarRating({ rating, reviewCount, size = "md", showCount = true, className }: Props) {
  const stars = getStarArray(rating);
  const sz = size === "sm" ? 12 : size === "md" ? 14 : 18;
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {stars.map((type, i) => (
          <Star key={i} size={sz}
            className={type === "full" ? "fill-yellow-400 text-yellow-400" : type === "half" ? "fill-yellow-200 text-yellow-400" : "fill-gray-200 text-gray-200"} />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className={cn("text-gray-400", size === "sm" ? "text-xs" : "text-sm")}>({reviewCount})</span>
      )}
    </div>
  );
}
