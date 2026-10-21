"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markReady, prefersReducedMotion } from "@/lib/ready";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        markReady();
        setGone(true);
        return;
      }
      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: () => setGone(true) });

      tl.from(".pre__mark", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" })
        .from(".pre__line", { scaleX: 0, duration: 0.8, ease: "power3.out" }, 0.1)
        .to(
          counter,
          {
            v: 100,
            duration: 2.1,
            ease: "power2.inOut",
            onUpdate: () => {
              const v = counter.v;
              if (num.current) num.current.textContent = String(Math.round(v)).padStart(3, "0");
              root.current?.style.setProperty("--fill", `${100 - v}%`);
            },
          },
          0.2
        )
        .to(".pre__word span", { yPercent: -110, duration: 0.6, ease: "power3.in", stagger: 0.04 }, "+=0.1")
        .to(".pre__mark", { scale: 0.85, opacity: 0, duration: 0.6, ease: "power3.in" }, "<")
        .to(".pre__meta", { opacity: 0, duration: 0.3 }, "<")
        .to(".pre__panel--top", { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.1")
        .to(".pre__panel--bottom", { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<")
        .call(markReady, [], "<0.3");
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div className="pre" ref={root} aria-hidden>
      <div className="pre__panel pre__panel--top" />
      <div className="pre__panel pre__panel--bottom" />
      <div className="pre__center">
        <div className="pre__mark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.png" alt="" className="pre__mark-dim" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.png" alt="" className="pre__mark-fill" />
        </div>
        <div className="pre__word">
          {"ROYAL RISING".split("").map((c, i) => (
            <span key={i}>{c === " " ? " " : c}</span>
          ))}
        </div>
        <div className="pre__line" />
      </div>
      <div className="pre__meta">
        <span>Architecture · Interior · Construction</span>
        <span className="pre__num" ref={num}>
          000
        </span>
      </div>
    </div>
  );
}
