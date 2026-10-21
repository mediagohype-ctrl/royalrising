"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/** Endless ribbon that speeds up, skews and flips direction with scroll velocity. */
export default function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const loop = gsap.to(".marquee__track", { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
      const skew = gsap.quickTo(".marquee__track", "skewX", { duration: 0.4, ease: "power3" });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const boost = Math.min(Math.abs(v) / 220, 6);
          const dir = self.direction;
          gsap.to(loop, {
            timeScale: dir * (1 + boost),
            duration: 0.25,
            overwrite: true,
            onComplete: () => {
              gsap.to(loop, { timeScale: dir, duration: 1.2, ease: "power2.out", overwrite: true });
            },
          });
          skew(gsap.utils.clamp(-12, 12, v / -300));
        },
        onLeave: () => skew(0),
        onLeaveBack: () => skew(0),
      });
    },
    { scope: ref }
  );

  const row = items.map((t, i) => (
    <span key={i} className="marquee__item">
      {t}
    </span>
  ));

  return (
    <div ref={ref} className={`marquee ${className}`} aria-hidden>
      <div className="marquee__track">
        <div className="marquee__half">{row}</div>
        <div className="marquee__half">{row}</div>
      </div>
    </div>
  );
}
