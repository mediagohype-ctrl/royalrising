import type { ImgKey } from "@/lib/data";
import Img from "./Img";

/**
 * Shows the extended artwork in a matching frame without blurred duplicates.
 */
export default function FullImg({ k, priority, alt }: { k: ImgKey; priority?: boolean; alt?: string }) {
  return (
      <div className="full__fg">
        <Img k={k} className="contain" sizes="100vw" priority={priority} alt={alt} />
      </div>
  );
}
