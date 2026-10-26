"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { img } from "@/lib/data";
import { openContact } from "@/lib/events";
import Img from "./ui/Img";

const K = "tp-front-night" as const;

export default function Cta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(min-width: 561px) and (prefers-reduced-motion: no-preference)", () => {
        const section = root.current!;
        const footer = document.querySelector("footer");
        if (!footer) return;
        gsap.fromTo(".cta__img", { y: 0 }, {
          y: () => -Math.min(32, section.offsetHeight * 0.03),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            endTrigger: footer,
            end: "top top",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
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
      gsap.from(".cta__text > *", {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.12,
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
        <span className="cta__phone-label">Your next chapter</span>
        <p>Five signature worlds, designed, drawn and built by one studio.</p>
        <span className="cta__phone-copy">Have a place in mind? Tell us about your site, your ideas and the way you want to live.</span>
        <button className="pill" onClick={openContact}>
          Let&apos;s Connect <span aria-hidden>↗</span>
        </button>
      </div>
    </section>
  );
}
