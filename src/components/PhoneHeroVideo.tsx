"use client";

import { useEffect, useRef, useState } from "react";

const videos = [
  "https://pub-867733225994464abcdc817244b3315e.r2.dev/ROYAL%20(1).mp4",
  "https://pub-867733225994464abcdc817244b3315e.r2.dev/ROYAL.mp4",
];

export default function PhoneHeroVideo({ started }: { started: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 560px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element || !enabled || !started) return;
    let visible = true;
    const sync = () => {
      if (document.hidden || !visible) element.pause();
      else void element.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      element.pause();
    };
  }, [enabled, started, active]);

  if (!enabled) return null;
  return (
    <video
      ref={video}
      className={`hero__phone-video${playing ? " is-playing" : ""}`}
      src={videos[active]}
      muted playsInline preload="metadata" aria-hidden="true"
      onPlaying={() => setPlaying(true)}
      onError={() => setPlaying(false)}
      onEnded={() => { setPlaying(false); setActive((index) => (index + 1) % videos.length); }}
    />
  );
}
