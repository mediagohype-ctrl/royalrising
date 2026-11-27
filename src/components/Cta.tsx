"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { img } from "@/lib/data";
import { openContact } from "@/lib/events";
import Img from "./ui/Img";

const K = "hd-v145-day" as const;

export default function Cta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(min-width: 561px) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.current!;
        const footer = document.querySelector("footer");
        if (!footer) return;
        ScrollTrigger.create({
          trigger: section,
          start: () => section.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
          endTrigger: footer,
          end: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });
      motion.add("(min-width: 561px)", () => {
      gsap.fromTo(
        ".cta__text",
        { y: 80 },
        { y: -80, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.from(".cta__text", {
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 55%", once: true },
      });
      });
      return () => motion.revert();
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
        <p>Designed with intent. Built to last.</p>
        <span className="cta__phone-copy">Planning a home or an interior? Send us the location, the plot size and what you have in mind.</span>
        <button className="pill" onClick={openContact}>
          Let&apos;s Connect <span aria-hidden>↗</span>
        </button>
      </div>
    </section>
  );
}
