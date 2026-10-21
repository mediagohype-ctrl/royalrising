import Image from "next/image";
import { img, archive, type ImgKey } from "@/lib/data";

const altFor = (k: ImgKey) => {
  const a = archive.find((x) => x.key === k);
  return a ? `${a.project}: ${a.title}` : "Royal Rising";
};

type Props = {
  k: ImgKey;
  sizes?: string;
  priority?: boolean;
  className?: string;
  alt?: string;
  quality?: number;
};

/** Fills its (positioned) parent. */
export default function Img({ k, sizes = "100vw", priority, className, alt, quality = 90 }: Props) {
  return (
    <Image
      src={img(k).src}
      alt={alt ?? altFor(k)}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
      draggable={false}
    />
  );
}
