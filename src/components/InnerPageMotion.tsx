"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Shared homepage-style entrances for the studio's editorial pages. */
export default function InnerPageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add({
      desktop: "(min-width: 961px)",
      mobile: "(max-width: 960px)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduced) return;
      const desktop = context.conditions?.desktop;
      const page = root.current!;

      gsap.from(".page-intro__copy > *", {
        y: desktop ? 28 : 18, opacity: 0, duration: 1.1,
        stagger: 0.12, delay: 0.12, ease: "power3.out", clearProps: "transform,opacity",
      });
      gsap.from(".studio-hero__image img", {
        scale: 1.045, duration: 2, ease: "power2.out", clearProps: "transform",
      });

      page.querySelectorAll<HTMLElement>(
        ".page-note > div, .page-editorial__copy, .page-values > div, .page-values > article, .page-process__heading, .page-process li, .page-drawing-note, .page-contact__copy, .detail-facts, .detail-head, .related-grid, .detail-next__list"
      ).forEach((group) => {
        gsap.from(group.children, {
          y: desktop ? 26 : 16, opacity: 0, duration: 0.95,
          stagger: 0.09, ease: "power3.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: group, start: "top 90%", once: true },
        });
      });

      page.querySelectorAll<HTMLElement>(".page-editorial__image, .page-contact__image, .detail-next__image").forEach((frame) => {
        const reverse = frame.closest(".page-editorial--reverse");
        gsap.fromTo(frame,
          { clipPath: reverse ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)", duration: desktop ? 1.35 : 1,
            ease: "power3.inOut", clearProps: "clipPath",
            scrollTrigger: { trigger: frame, start: "top 92%", once: true },
          }
        );
        // Keep architectural plans still and fully legible.
        const photo = frame.querySelector<HTMLImageElement>("img:not([src*='plan'])");
        if (desktop && photo) {
          gsap.fromTo(photo, { scale: 1.07, yPercent: 2 }, {
            scale: 1.07, yPercent: -2, ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.8 },
          });
        }
      });
    });
    return () => motion.revert();
  }, { scope: root });

  return <main ref={root} id="top" className="inner-page studio-page">{children}</main>;
}
