import type { ImgKey } from "@/lib/data";
import Img from "./Img";

/**
 * Shows the whole image, never cropped, inside a frame of any shape:
 * the photo is contained in the centre over a blurred copy of itself that fills the rest.
 */
export default function FullImg({ k, priority, alt }: { k: ImgKey; priority?: boolean; alt?: string }) {
  return (
    <>
      <div className="full__bg" aria-hidden>
        <Img k={k} sizes="40vw" quality={75} alt="" />
      </div>
      <div className="full__fg">
        <Img k={k} className="contain" sizes="100vw" priority={priority} alt={alt} />
      </div>
    </>
  );
}
