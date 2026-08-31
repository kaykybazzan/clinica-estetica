import { Icon } from "./Icon";
import { cn } from "@/utils/cn";

export function Rating({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} role="img" aria-label={`${value} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name="star"
          size={16}
          className={star <= value ? "fill-accent text-accent" : "text-line-strong"}
        />
      ))}
    </div>
  );
}
