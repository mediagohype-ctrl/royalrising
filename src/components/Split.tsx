"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { type ImgKey } from "@/lib/data";
import Img from "./ui/Img";

type Props = {
  id?: string;
  title: string;
  quote: string;
  label: string;
  sub: string;
  text: string;
  image: ImgKey;
  reverse?: boolean;
  cta: { label: string; href: string };
};

/** Image and text enter from opposite edges over a faint monogram. */
export default function Split({ id, title, quote, label, sub, text, image, reverse, cta }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
      if (id === "story" || id === "approach") {
        // Measure the normal-flow wrapper so sticky positioning cannot shift
        // the reveal's scroll range when ScrollTrigger refreshes.
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: id === "story" ? root.current!.parentElement : root.current,
            start: "top 45%",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        reveal.fromTo(".split__media",
          { xPercent: reverse ? 100 : -100, opacity: 1 },
          { xPercent: 0, opacity: 1, duration: 1.2, ease: "sine.inOut" }, 0);
        reveal.fromTo(".split__text > *",
          { x: reverse ? -40 : 40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, duration: 0.9, ease: "sine.inOut" }, 0.08);
        return;
      }
      // 1. Curtain wipe reveal on the image
      gsap.fromTo(
        ".split__media",
        { clipPath: reverse ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 15%", scrub: true },
        }
      );

      // 2. Parallax vertical motion on the photo
      gsap.fromTo(
        ".split__img",
        { yPercent: 6, scale: 1.05 },
        {
          yPercent: -6,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // 3. Staggered text cascade animation
      gsap.from(".split__text > *", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".split__text", start: "top 78%", once: true },
      });

      // 4. Subtle watermark monogram drift
      gsap.fromTo(
        ".split__mark",
        { rotate: reverse ? 12 : -12, yPercent: 15 },
        {
          rotate: reverse ? -12 : 12,
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: true },
        }
      );
      });
      if (id === "story") {
        motion.add("(min-width: 961px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)", () => {
          ScrollTrigger.create({
            trigger: root.current,
            // On shorter screens, let the bottom/CTA enter before holding.
            start: () => root.current!.offsetHeight > window.innerHeight ? "bottom bottom" : "top top",
            // This sibling is outside useGSAP's section-scoped selectors.
            endTrigger: document.getElementById("approach"),
            end: "top top",
            pin: true,
            // Keep the story behind the next section until it fully covers it.
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });
        });
      }
      return () => motion.revert();
    },
    { scope: root }
  );

  return (
    <section id={id} ref={root} className={`split${reverse ? " split--rev" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="split__mark" src="/images/logo-mark.png" alt="" aria-hidden />
      <div className="split__media">
        <div className="split__img">
          <Img k={image} alt={id === "story" ? "Sunlit stone interior with an abstract bronze sculpture" : "Walnut library with architectural drawings and material samples"} sizes="(max-width: 960px) 100vw, 50vw" priority={id === "story"} />
        </div>
      </div>
      <div className="split__text">
        <h2 className="title">{title}</h2>
        <p className="quote">&ldquo;{quote}&rdquo;</p>
        <p className="label">{label}</p>
        <p className="sub">{sub}</p>
        <p className="para">{text}</p>
        <a href={cta.href} className="pill">
          {cta.label} <span aria-hidden>↗</span>
        </a>
      </div>
    </section>
  );
}
