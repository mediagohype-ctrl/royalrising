"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { img } from "@/lib/data";
import { openContact } from "@/lib/events";
import Img from "./ui/Img";

const K = "tp-front-night" as const;

export default function Cta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta__text",
        { y: 80 },
        { y: -80, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.from(".cta__text > *", {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 55%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="cta">
      {/* the image keeps its own proportions so nothing is cropped */}
      <div className="cta__img" style={{ aspectRatio: `${img(K).width} / ${img(K).height}` }}>
        <Img k={K} sizes="100vw" />
        <div className="cta__shade" />
      </div>
      <div className="cta__text">
        <p>Five signature worlds, designed, drawn and built by one studio.</p>
        <button className="pill" onClick={openContact}>
          Let&apos;s Connect <span aria-hidden>↗</span>
        </button>
      </div>
    </section>
  );
}
