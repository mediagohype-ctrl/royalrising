"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { heroSlides } from "@/lib/data";
import FullImg from "./ui/FullImg";

const DURATION = 6500;

/** Full-screen crossfading slideshow with slow zoom; drifts away with scroll. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => onReady(() => setStarted(true)), []);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % heroSlides.length), DURATION);
    return () => clearTimeout(t);
  }, [active, started]);

  useGSAP(
    () => {
      gsap.to(".hero__media", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero__ui", {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "45% top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="hero" aria-label="Royal Rising projects">
      <div className="hero__media">
        {heroSlides.map((s, i) => (
          <div key={s.k} className={`hero__slide${i === active ? " is-active" : ""}${started ? " is-started" : ""}`}>
            <FullImg k={s.k} priority={i === 0} alt={`${s.name} by Royal Rising`} />
          </div>
        ))}
      </div>
      <div className="hero__shade" aria-hidden />

      <div className="hero__ui">
        <div className="hero__caption">
          <span className="hero__count">
            {String(active + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </span>
          <span key={active} className="hero__name">
            {heroSlides[active].name}
          </span>
        </div>
        <a href="#story" className="hero__scroll" aria-label="Scroll down">
          <span>Scroll</span>
          <i />
        </a>
        <div className="hero__bars" aria-hidden>
          {heroSlides.map((s, i) => (
            <button key={s.k} className={i === active && started ? "is-active" : ""} onClick={() => setActive(i)} tabIndex={-1}>
              <i style={{ animationDuration: `${DURATION}ms` }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
