"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hasSeenPreloader, markReady, prefersReducedMotion } from "@/lib/ready";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      // Session storage survives reloads; keep the overlay hidden while checking.
      if (hasSeenPreloader() || prefersReducedMotion()) {
        const navLogo = document.querySelector<HTMLElement>(".nav__logo");
        if (navLogo) navLogo.style.opacity = "1";
        markReady();
        setGone(true);
        return;
      }

      if (root.current) root.current.style.visibility = "visible";

      // Hide the navbar logo during preloader so only the preloader logo is visible
      const navLogo = document.querySelector<HTMLElement>(".nav__logo");
      if (navLogo) navLogo.style.opacity = "0";

      const counter = { v: 0 };
      const tl = gsap.timeline();

      // Entrance animation of preloader elements in center
      tl.from(mark.current, { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" })
        .from(word.current, { opacity: 0, y: 15, duration: 0.8, ease: "power3.out" }, 0.1)
        .from(".pre__line", { scaleX: 0, duration: 0.8, ease: "power3.out" }, 0.2)
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
        // Loading is complete: fade out secondary preloader elements
        .to(".pre__line", { scaleX: 0, opacity: 0, duration: 0.35, ease: "power2.in" }, "+=0.15")
        .to(".pre__meta", { opacity: 0, duration: 0.35, ease: "power2.in" }, "<")
        .to(".pre__mark-dim", { opacity: 0, duration: 0.2 }, "<")
        .call(() => {
          root.current?.classList.add("is-flying");

          // Target elements in the navbar
          const navMark = document.querySelector<HTMLElement>(".nav__logo img");
          const navWord =
            document.querySelector<HTMLElement>(".nav__logo-title") ||
            document.querySelector<HTMLElement>(".nav__logo span");

          if (!navMark || !navWord || !mark.current || !word.current) {
            markReady();
            if (navLogo) navLogo.style.opacity = "1";
            setGone(true);
            return;
          }

          // Measure exact positions for FLIP animation
          const markRect = mark.current.getBoundingClientRect();
          const targetMarkRect = navMark.getBoundingClientRect();

          const wordRect = word.current.getBoundingClientRect();
          const targetWordRect = navWord.getBoundingClientRect();

          const dxMark = targetMarkRect.left + targetMarkRect.width / 2 - (markRect.left + markRect.width / 2);
          const dyMark = targetMarkRect.top + targetMarkRect.height / 2 - (markRect.top + markRect.height / 2);
          const scaleMark = targetMarkRect.width / markRect.width;

          const dxWord = targetWordRect.left + targetWordRect.width / 2 - (wordRect.left + wordRect.width / 2);
          const dyWord = targetWordRect.top + targetWordRect.height / 2 - (wordRect.top + wordRect.height / 2);
          const scaleWord = targetWordRect.width / wordRect.width;

          const flightTl = gsap.timeline({
            onComplete: () => {
              if (navLogo) navLogo.style.opacity = "1";
              markReady();
              setGone(true);
            },
          });

          // Panels part open vertically
          flightTl
            .to(".pre__panel--top", { yPercent: -100, duration: 1.15, ease: "expo.inOut" }, 0)
            .to(".pre__panel--bottom", { yPercent: 100, duration: 1.15, ease: "expo.inOut" }, 0)
            // Logo emblem flies to navbar position and scales down
            .to(
              mark.current,
              {
                x: dxMark,
                y: dyMark,
                scale: scaleMark,
                duration: 1.15,
                ease: "expo.inOut",
              },
              0
            )
            // Logo wordmark flies to navbar position, matches size, and transitions to ivory
            .to(
              word.current,
              {
                x: dxWord,
                y: dyWord,
                scale: scaleWord,
                duration: 1.15,
                ease: "expo.inOut",
              },
              0
            )
            .to(
              word.current,
              {
                color: "#fffaf1",
                duration: 0.5,
                ease: "power2.out",
              },
              0.35
            )
            // Trigger navbar side links and hero intro right as logo arrives
            .call(markReady, [], 0.75);
        });
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div className="pre" ref={root} aria-hidden style={{ visibility: "hidden" }}>
      <div className="pre__panel pre__panel--top" />
      <div className="pre__panel pre__panel--bottom" />
      <div className="pre__center">
        <div className="pre__mark" ref={mark}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.png" alt="" className="pre__mark-dim" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.png" alt="" className="pre__mark-fill" />
        </div>
        <div className="pre__word" ref={word}>
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
