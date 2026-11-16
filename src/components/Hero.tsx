"use client";
// @refresh reset
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { heroSlides, alts } from "@/lib/data";
import FullImg from "./ui/FullImg";

const DURATION = 6500;

/** Full-screen crossfading slideshow with a scroll-faded caption. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => onReady(() => setStarted(true)), []);

  useEffect(() => {
    if (!started || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % heroSlides.length), DURATION);
    return () => clearTimeout(t);
  }, [active, started]);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add("(prefers-reduced-motion: no-preference)", () => {
        // A small upward drift while Brand Story covers the pinned hero.
        // Keep the image at its original scale; the incoming panel covers
        // the lower edge exposed by the movement.
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
        gsap.to(".hero__ui", {
          opacity: 0,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: root.current?.parentElement,
            start: "top top",
            end: "+=45%",
            scrub: true,
          },
        });
      });
      return () => motion.revert();
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="hero" aria-label="Royal Rising architecture and interiors">
      <div className="hero__media">
        {heroSlides.map((s, i) => (
          <div key={s.k} className={`hero__slide${i === active ? " is-active" : ""}${started ? " is-started" : ""}`}>
            <FullImg k={s.k} priority={i === 0} alt={alts[s.k] ?? s.name} />

          </div>
        ))}
      </div>
      <div className="hero__shade" aria-hidden />

      <div className="hero__ui">
        <div className="hero__caption">
          <span key={active} className="hero__name">
            {heroSlides[active].name}
          </span>
        </div>
        <a href="#story" className="hero__scroll" aria-label="Scroll down">
          <span>Scroll</span>
          <i />
        </a>
        <div className="hero__bars" aria-label="Choose a slide">
          {heroSlides.map((s, i) => (
            <button key={s.k} className={i === active && started ? "is-active" : ""} onClick={() => setActive(i)} aria-label={`Show ${s.name}`} aria-pressed={i === active}>
              <i style={{ animationDuration: `${DURATION}ms` }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
