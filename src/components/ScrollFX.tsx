"use client";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/ready";

/**
 * Page-wide depth effects. Rendered after every section so all pins exist first.
 * - [data-speed="n"]: drifts against the scroll, so text and images separate into layers
 * - [data-rise]: rises and scales up into place as it enters
 * - images lean slightly with scroll velocity
 */
export default function ScrollFX() {
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    // Text columns that should float on their own layer (selector → speed)
    const layers: [string, number][] = [
      ["[data-speed]", 1],
      [".evo__text, .lens-block__text, .cut__text", 0.9],
      [".ci__aside, .disc__head, .arc__head, .proc__head", 0.5],
      [".trio__quote", 1.6],
      [".views__caption, .daynight__hint", 0.6],
    ];
    layers.forEach(([sel, fallback]) =>
      gsap.utils.toArray<HTMLElement>(sel).forEach((el) => {
      const s = Number(el.dataset.speed) || fallback;
      gsap.fromTo(
        el,
        { y: () => 90 * s },
        {
          y: () => -90 * s,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        }
      );
      })
    );

    const rise = "[data-rise], .evo > .compare, .daynight > .compare, .lens, .cut__stage, .vplan__frame, .evo > .plate";
    gsap.utils.toArray<HTMLElement>(rise).forEach((el) => {
      gsap.fromTo(
        el,
        { y: 140, scale: 0.9, opacity: 0.4 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 100%", end: "top 45%", scrub: true },
        }
      );
    });

    // Velocity lean, written to one CSS variable that skewable elements read
    const root = document.documentElement;
    const lean = { v: 0 };
    const setLean = () => root.style.setProperty("--lean", lean.v.toFixed(3));
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const target = gsap.utils.clamp(-2.4, 2.4, self.getVelocity() / -900);
        gsap.to(lean, { v: target, duration: 0.35, ease: "power3", overwrite: true, onUpdate: setLean });
        gsap.to(lean, { v: 0, duration: 0.9, delay: 0.35, ease: "power3.out", onUpdate: setLean });
      },
    });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });

  return null;
}
