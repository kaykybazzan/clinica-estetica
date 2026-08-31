import Image from "next/image";
import type { MediaAsset } from "@/types/content";
import { cn } from "@/utils/cn";

const RATIOS = {
  "21/9": "aspect-[21/9]",
  "16/9": "aspect-[16/9]",
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "9/16": "aspect-[9/16]",
  auto: "",
} as const;

export interface SmartImageProps {
  asset: MediaAsset;
  /** The frame's ratio. The image is cropped to fill it — never stretched. */
  ratio?: keyof typeof RATIOS;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Applies to decorative art only; content images must keep their alt. */
  decorative?: boolean;
  /** Enable zoom and vignette effects on hover */
  enableHoverEffects?: boolean;
}

/**
 * The only way images enter the site. It reserves the aspect ratio before the
 * file loads (CLS = 0), forces object-cover so nothing is ever distorted, and
 * requires an explicit `sizes` for anything that is not full width.
 */
export function SmartImage({
  asset,
  ratio = "16/9",
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
  priority = false,
  className,
  imageClassName,
  decorative = false,
  enableHoverEffects = false,
}: SmartImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface group", RATIOS[ratio], className)}>
      <Image
        src={asset.src}
        alt={decorative ? "" : asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={cn(
          "object-cover transition-transform duration-700 ease-out",
          enableHoverEffects && "group-hover:scale-105",
          imageClassName
        )}
        aria-hidden={decorative || undefined}
      />
      {/* Vigneta overlay no hover */}
      {enableHoverEffects && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
    </div>
  );
}
