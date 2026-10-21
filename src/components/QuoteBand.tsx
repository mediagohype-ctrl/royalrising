"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { img, type ImgKey } from "@/lib/data";
import Img from "./ui/Img";

/** Full-width image at its own proportions (never cropped); the line of text floats over it. */
export default function QuoteBand({ k, text }: { k: ImgKey; text: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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
    },
    { scope: root }
  );

  return (
    <section ref={root} className="band" style={{ aspectRatio: `${img(k).width} / ${img(k).height}` }}>
      <div className="band__img">
        <Img k={k} sizes="100vw" />
      </div>
      <div className="band__shade" />
      <p className="band__text" aria-label={text}>
        {text.split(" ").map((w, i) => (
          <span key={i} aria-hidden>
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
