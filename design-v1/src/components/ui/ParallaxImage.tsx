"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Img from "./Img";
import type { ImgKey } from "@/lib/data";

type Props = {
  k: ImgKey;
  /** travel as % of the frame height, above and below */
  speed?: number;
  zoom?: boolean;
  /** clip-path unmask on enter; turn off for full-bleed backgrounds */
  reveal?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  cursor?: string;
  onClick?: () => void;
};

/** Image that drifts inside its frame as the frame crosses the viewport. */
export default function ParallaxImage({ k, speed = 12, zoom, reveal = true, className = "", sizes, priority, cursor, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const inner = ref.current!.querySelector(".pimg__inner");
      const h = () => ref.current!.offsetHeight * (speed / 100);
      gsap.fromTo(
        inner,
        { y: () => -h(), scale: zoom ? 1.1 : 1 },
        {
          y: () => h(),
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        }
      );
      // The frame opens from a rounded window as it rises into view
      if (reveal) {
        gsap.fromTo(
          ref.current,
          { clipPath: "inset(14% 10% 14% 10% round 28px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 6px)",
            ease: "power1.out",
            scrollTrigger: { trigger: ref.current, start: "top 98%", end: "top 35%", scrub: true },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`pimg ${className}`} data-cursor={cursor} onClick={onClick}>
      <div className="pimg__inner" style={{ inset: `-${speed}% 0` }}>
        <Img k={k} sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}
