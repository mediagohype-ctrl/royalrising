"use client";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { ImgKey } from "@/lib/data";
import Img from "./ui/Img";

/** `sheet` shows a drawing uncropped on a paper ground instead of cropping it to fill. */
export type Stage = { title: string; text: string; output: string; k: ImgKey; sheet?: boolean };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The project stages as an editorial list beside a sticky image frame.
 * As each stage crosses the middle of the screen it becomes active and the frame changes to its image.
 * On phones the frame is hidden and each stage carries its own image inline.
 */
export default function ProcessTimeline({ stages }: { stages: Stage[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".process__stage", root.current!);
    items.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item, start: "top 55%", end: "bottom 55%",
        onToggle: (self) => { if (self.isActive) setActive(i); },
      });
    });

    const motion = gsap.matchMedia();
    motion.add({ reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.reduced) return;
      gsap.from(".process__head > *", {
        y: 28, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".process__head", start: "top 85%", once: true },
      });
      gsap.fromTo(".process__frame", { clipPath: "inset(12% 12% 12% 12%)" }, {
        clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.inOut", clearProps: "clipPath",
        scrollTrigger: { trigger: ".process__body", start: "top 80%", once: true },
      });
      items.forEach((item) => {
        gsap.from(item.querySelectorAll(".process__inline, .process__meta, .process__title, .process__text, .process__output"), {
          y: 30, opacity: 0, duration: 1, stagger: 0.07, ease: "power3.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });
    });
    return () => motion.revert();
  }, { scope: root });

  const current = stages[active];

  return (
    <section ref={root} className="process" aria-labelledby="process-title">
      <div className="process__head">
        <div>
          <p className="label">How we work</p>
          <h2 id="process-title">The five <em>stages</em>.</h2>
        </div>
        <p>Each stage has a defined output and ends with your approval, so decisions are made once and not reopened on site.</p>
      </div>

      <div className="process__body">
        <ol className="process__list">
          {stages.map((s, i) => (
            <li key={s.title} className={`process__stage${i === active ? " is-active" : ""}`}>
              <div className={`process__inline${s.sheet ? " is-sheet" : ""}`}><Img k={s.k} sizes="100vw" alt="" /></div>
              <p className="process__meta"><span>{pad(i + 1)}</span>Stage {i + 1} of {stages.length}</p>
              <h3 className="process__title">{s.title}</h3>
              <p className="process__text">{s.text}</p>
              <p className="process__output"><span>You receive</span>{s.output}</p>
            </li>
          ))}
        </ol>

        <div className="process__aside" aria-hidden>
          <div className="process__frame">
            {stages.map((s, i) => (
              <div key={s.title} className={`process__slide${s.sheet ? " is-sheet" : ""}${i === active ? " is-active" : ""}`}>
                <Img k={s.k} sizes="(max-width: 900px) 1px, 45vw" alt="" />
              </div>
            ))}
          </div>
          <div className="process__caption">
            <span className="process__count"><b>{pad(active + 1)}</b> / {pad(stages.length)}</span>
            <span>{current.title}</span>
          </div>
          <div className="process__progress"><i style={{ transform: `scaleX(${(active + 1) / stages.length})` }} /></div>
        </div>
      </div>
    </section>
  );
}
