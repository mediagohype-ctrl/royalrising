"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const films = [
  { src: "https://pub-867733225994464abcdc817244b3315e.r2.dev/ROYAL%20RISING.mp4" },
  { src: "https://pub-867733225994464abcdc817244b3315e.r2.dev/ROYAL.mp4" },
  { src: "https://pub-867733225994464abcdc817244b3315e.r2.dev/ROYAL%20(1).mp4" },
  { src: "https://pub-867733225994464abcdc817244b3315e.r2.dev/ROYAL%20RISING%20(1).mp4" },
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
      // Lift each portrait from below, then settle at its full display size.
      gsap.set(cards, {
        scale: 0.88,
        y: () => window.innerHeight * 0.65,
        autoAlpha: 0,
        transformOrigin: "50% 100%",
      });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.5}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .to(cards, {
          y: 0, autoAlpha: 1, scale: 1,
          duration: 1.1, stagger: 0.14, ease: "power2.out",
        })
        .to({}, { duration: 0.4 });
    });
    motion.add("(max-width: 760px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".video-showcase__film", root.current!).forEach((card) => {
        gsap.from(card, {
          y: 48, opacity: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        });
      });
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
    // Start fetching the films a screen before the section arrives, so the cards
    // are not empty while they animate in. The section is observed (not each
    // video) because the cards start off-screen and invisible during the pin.
    const loader = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      videos.forEach((video) => {
        if (!video.hasAttribute("src")) { video.preload = "auto"; video.src = video.dataset.src!; }
      });
      loader.disconnect();
    }, { rootMargin: "100% 0px" });
    loader.observe(root.current!);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) visible.add(video);
        else visible.delete(video);
      });
      sync();
    });
    videos.forEach((video) => observer.observe(video));
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      loader.disconnect();
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
          aria-label={`Royal Rising film ${index + 1}`}
          onError={() => setFailed((previous) => previous.includes(index) ? previous : [...previous, index])}>
          <a href={film.src}>Watch Royal Rising film {index + 1}</a>
        </video>
        {failed.includes(index) && <p className="video-showcase__error">Video unavailable. <a href={film.src}>Open the film directly</a>.</p>}
      </div>)}
    </div>
  </section>;
}
