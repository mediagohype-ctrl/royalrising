"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** A single portrait film that loads near the viewport and plays muted while visible. */
export default function ServiceFilm({ src, title, text }: { src: string; title: string; text: string }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add({ desktop: "(min-width: 961px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.reduced) return;
      const section = root.current!;
      gsap.from(".detail-film__title span", {
        yPercent: 115, rotate: 2, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });
      gsap.from(".detail-film__copy > :not(h2)", {
        y: 24, opacity: 0, duration: 0.95, stagger: 0.1, delay: 0.2, ease: "power3.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });
      // Lift the portrait from below and settle it at full size, as on the homepage.
      gsap.fromTo(".detail-film__frame",
        { y: context.conditions?.desktop ? 120 : 48, scale: 0.88, transformOrigin: "50% 100%" },
        { y: 0, scale: 1, ease: "power2.out", scrollTrigger: { trigger: section, start: "top bottom", end: "center center", scrub: 0.9 } });
    });
    return () => motion.revert();
  }, { scope: root });

  useEffect(() => {
    const el = video.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || document.hidden || reduced.matches || userPaused.current) el.pause();
      else void el.play().catch(() => { el.controls = true; });
    };
    const loader = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      if (!el.hasAttribute("src")) { el.preload = "auto"; el.src = src; }
      loader.disconnect();
    }, { rootMargin: "100% 0px" });
    const watcher = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.25 });
    loader.observe(el);
    watcher.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      loader.disconnect();
      watcher.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.pause();
    };
  }, [src]);

  const toggle = () => {
    const el = video.current!;
    if (!el.hasAttribute("src")) el.src = src;
    if (el.paused) { userPaused.current = false; void el.play(); }
    else { userPaused.current = true; el.pause(); }
  };
  const toggleSound = () => {
    const el = video.current!;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <section ref={root} className="detail-film" aria-labelledby="detail-film-title">
      <div className="detail-film__copy">
        <p className="label">Film</p>
        <h2 id="detail-film-title" className="detail-film__title"><span>{title}</span></h2>
        <p>{text}</p>
        <div className="detail-film__controls">
          <button type="button" className="pill" onClick={toggle} aria-pressed={playing}>
            {playing ? "Pause film" : "Play film"} <span aria-hidden>{playing ? "❚❚" : "▶"}</span>
          </button>
          <button type="button" className="link-button" onClick={toggleSound} aria-pressed={!muted}>
            {muted ? "Sound off" : "Sound on"}
          </button>
        </div>
        {failed && <p className="detail-film__error">Video unavailable. <a href={src}>Open the film directly</a>.</p>}
      </div>
      <div className="detail-film__frame">
        <video ref={video} muted loop playsInline preload="none" aria-label={title}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)}>
          <a href={src}>Watch the film</a>
        </video>
      </div>
    </section>
  );
}
