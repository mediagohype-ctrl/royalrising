"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { heroSlides } from "@/lib/data";
import FullImg from "./ui/FullImg";

const DURATION = 6500;

/** Full-screen crossfading slideshow with a scroll-faded caption. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState(12000);
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => onReady(() => setStarted(true)), []);

  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % heroSlides.length), active === 0 ? videoDuration : DURATION);
    return () => clearTimeout(t);
  }, [active, started, videoDuration]);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    if (started && active === 0) {
      player.currentTime = 0;
      void player.play().catch(() => { /* Keep the poster if autoplay is unavailable. */ });
    } else {
      player.pause();
    }
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
    <section id="top" ref={root} className="hero" aria-label="Royal Rising projects">
      <div className="hero__media">
        {heroSlides.map((s, i) => (
          <div key={s.k} className={`hero__slide${i === active ? " is-active" : ""}${started ? " is-started" : ""}`}>
            <FullImg k={s.k} priority={i === 0} alt={`${s.name} by Royal Rising`} />
            {i === 0 && (
              <video
                ref={video}
                className="hero__video"
                src="/gemini_generated_video_658c5dc0_gwr_video_mvp.mp4"
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                onLoadedMetadata={(event) => {
                  const duration = event.currentTarget.duration;
                  if (Number.isFinite(duration) && duration > 0) setVideoDuration(duration * 1000);
                }}
              />
            )}
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
              <i style={{ animationDuration: `${i === 0 ? videoDuration : DURATION}ms` }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
