"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import PhoneHeroVideo from "./PhoneHeroVideo";
import HeroBannerVideo from "./HeroBannerVideo";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => onReady(() => setStarted(true)), []);

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(".hero__media", {
        y: () => -Math.min(48, (root.current?.offsetHeight ?? 0) * 0.04),
        ease: "none",
        scrollTrigger: {
          trigger: root.current?.parentElement,
          start: "top top",
          end: () => `+=${root.current?.offsetHeight ?? window.innerHeight}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => motion.revert();
  }, { scope: root });

  return <section id="top" ref={root} className="hero" aria-label="Royal Rising architecture and interiors">
    <div className="hero__media">
      <HeroBannerVideo started={started} />
      <PhoneHeroVideo started={started} />
    </div>
    <div className="hero__shade" aria-hidden />
  </section>;
}
