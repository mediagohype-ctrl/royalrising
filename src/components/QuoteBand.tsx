"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { img, type ImgKey } from "@/lib/data";
import Img from "./ui/Img";

/** A fixed image frame with a gentle scroll-driven zoom behind the quote. */
export default function QuoteBand({ k, text, accentWords = [] }: { k: ImgKey; text: string; accentWords?: string[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        // Settle gently to the original image size while keeping it sharp and opaque.
        gsap.fromTo(".band__img",
          { scale: 1.06, transformOrigin: "center center" },
          {
            scale: 1,
            ease: "sine.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "top top",
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          }
        );
      });
      gsap.fromTo(
        ".band__text",
        { yPercent: 60 },
        { yPercent: -60, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.from(".band__text span", {
        yPercent: 110,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });
      return () => motion.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="band" style={{ aspectRatio: `${img(k).width} / ${img(k).height}` }}>
      <div className="band__img">
        <Img k={k} sizes="100vw" priority />
      </div>
      <div className="band__shade" />
      <p className="band__text" aria-label={text}>
        {text.split(" ").map((w, i) => (
          <span key={i} aria-hidden style={accentWords.includes(w.replace(/[.,!?;:]/g, "")) ? { color: "var(--gold)", fontStyle: "italic" } : undefined}>
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
