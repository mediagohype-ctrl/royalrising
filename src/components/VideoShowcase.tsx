"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const films = [
  { src: "https://pub-867733225994464abcdc817244b3315e.r2.dev/ROYAL%20RISING.mp4" },
  { src: "https://pub-867733225994464abcdc817244b3315e.r2.dev/ROYAL.mp4" },
  { src: "https://pub-867733225994464abcdc817244b3315e.r2.dev/ROYAL%20(1).mp4" },
];

export default function VideoShowcase() {
  const root = useRef<HTMLElement>(null);
  const [failed, setFailed] = useState<number[]>([]);
  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
      const section = root.current!;
      const cards = gsap.utils.toArray<HTMLElement>(".video-showcase__film", section);
      gsap.from(".video-showcase__title span", {
        yPercent: 115, rotate: 2, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
      // Begin as a compact fan, then unfold into the full-width film strip.
      gsap.set(cards, {
        scale: 0.56,
        xPercent: (index) => (1 - index) * 62,
        yPercent: (index) => index === 1 ? 0 : 9,
        rotation: (index) => (index - 1) * 7,
        transformOrigin: "50% 65%",
      });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (window.innerWidth > 760 ? 1.8 : 1.2)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .to(cards, {
          xPercent: 0, yPercent: 0, rotation: 0, scale: 0.78,
          duration: 0.75, stagger: { each: 0.06, from: "center" }, ease: "power2.inOut",
        })
        .to(cards, { scale: 1, duration: 0.85, ease: "sine.inOut" }, "-=0.12")
        .to({}, { duration: 0.35 });
    });
    return () => motion.revert();
  }, { scope: root });
  useEffect(() => {
    const videos = Array.from(root.current!.querySelectorAll("video"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visible = new Set<HTMLVideoElement>();
    const sync = () => videos.forEach((video) => {
      video.controls = reduced.matches;
      if (!visible.has(video) || document.hidden || reduced.matches) video.pause();
      else void video.play().catch(() => { video.controls = true; });
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          visible.add(video);
          if (!video.hasAttribute("src")) video.src = video.dataset.src!;
        } else visible.delete(video);
      });
      sync();
    });
    videos.forEach((video) => observer.observe(video));
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      videos.forEach((video) => video.pause());
    };
  }, []);

  return <section ref={root} className="video-showcase" aria-labelledby="video-showcase-title">
    <h2 id="video-showcase-title" className="video-showcase__title"><span>Spaces in motion.</span></h2>
    <div className="video-showcase__grid">
      {films.map((film, index) => <div className="video-showcase__film" key={film.src}>
        <video muted loop playsInline preload="none" data-src={film.src}
          onLoadedMetadata={() => ScrollTrigger.refresh()}
          aria-label={`Royal Rising film ${index + 1}`}
          onError={() => setFailed((previous) => previous.includes(index) ? previous : [...previous, index])}>
          <a href={film.src}>Watch Royal Rising film {index + 1}</a>
        </video>
        {failed.includes(index) && <p className="video-showcase__error">Video unavailable. <a href={film.src}>Open the film directly</a>.</p>}
      </div>)}
    </div>
  </section>;
}
