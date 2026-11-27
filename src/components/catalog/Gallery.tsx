"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { img, type ImgKey } from "@/lib/data";
import { openLightbox } from "@/lib/events";
import Img from "../ui/Img";

/** Masonry image gallery; every image opens in the shared lightbox. */
export default function Gallery({ keys, name, drawings = false }: { keys: ImgKey[]; name: string; drawings?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add({ desktop: "(min-width: 961px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.reduced) return;
      gsap.utils.toArray<HTMLElement>(".gallery__item", root.current!).forEach((item, i) => {
        const trigger = { trigger: item, start: "top 92%", once: true };
        gsap.fromTo(item, { clipPath: "inset(100% 0% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", duration: context.conditions?.desktop ? 1.25 : 0.95,
          delay: (i % 3) * 0.08, ease: "power3.inOut", clearProps: "clipPath", scrollTrigger: trigger,
        });
        const photo = item.querySelector("img");
        if (photo && !drawings) {
          gsap.from(photo, { scale: 1.12, duration: 1.6, delay: (i % 3) * 0.08, ease: "power2.out", clearProps: "transform", scrollTrigger: trigger });
        }
      });
    });
    return () => motion.revert();
  }, { scope: root });

  return (
    <div ref={root} className={`gallery${drawings ? " gallery--drawings" : ""}`}>
      {keys.map((k, i) => {
        const { width, height } = img(k);
        return (
          <button key={k} type="button" className="gallery__item" style={{ aspectRatio: `${width} / ${height}` }}
            onClick={(e) => openLightbox(keys, i, e.currentTarget)}
            aria-label={`Open ${name} image ${i + 1} of ${keys.length}`}>
            <Img k={k} sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" alt={`${name}, image ${i + 1}`} watermark={!drawings} />
            <span className="gallery__zoom" aria-hidden>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14" /></svg>
            </span>
          </button>
        );
      })}
    </div>
  );
}
