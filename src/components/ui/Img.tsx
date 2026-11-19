import Image from "next/image";
import { img, alts, type ImgKey } from "@/lib/data";
import ImageWatermark from "./ImageWatermark";

type Props = {
  k: ImgKey;
  sizes?: string;
  priority?: boolean;
  className?: string;
  alt?: string;
  quality?: number;
  watermark?: boolean;
};

/** Fills its (positioned) parent. */
export default function Img({ k, sizes = "100vw", priority, className, alt, quality = 90, watermark = true }: Props) {
  return (
    <><Image
      src={img(k).src}
      alt={alt ?? alts[k] ?? "Royal Rising"}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
      draggable={false}
    />
    {watermark && <ImageWatermark />}</>
  );
}
