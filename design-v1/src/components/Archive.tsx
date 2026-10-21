"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { archive, img } from "@/lib/data";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import Img from "./ui/Img";
import SplitReveal from "./ui/SplitReveal";

// Interleave projects so neighbouring tiles differ
const rows = [0, 1, 2].map((r) => archive.map((a, i) => ({ ...a, i })).filter((_, i) => i % 3 === r));

export default function Archive() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".arc__row");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: ".arc__rows", start: "top 85%", end: "bottom 15%", scrub: 1, invalidateOnRefresh: true },
      });
      els.forEach((row, i) => {
        const travel = () => Math.max(0, row.scrollWidth - window.innerWidth);
        if (i % 2 === 0) tl.fromTo(row, { x: 0 }, { x: () => -travel() }, 0);
        else tl.fromTo(row, { x: () => -travel() }, { x: 0 }, 0);
      });
    },
    { scope: root }
  );

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + archive.length) % archive.length)), []);

  useEffect(() => {
    if (open === null) return;
    lockScroll();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      unlockScroll();
    };
  }, [open, close, step]);

  const cur = open !== null ? archive[open] : null;

  return (
    <section id="archive" ref={root} className="arc">
      <div className="arc__head">
        <p className="eyebrow">(04) The Archive</p>
        <SplitReveal as="h2" className="h1" text="Every render," />
        <SplitReveal as="p" className="h1 h1--em" text="every plan." delay={0.1} />
        <p className="arc__count">{archive.length} images · 5 projects · click any to open</p>
      </div>

      <div className="arc__rows">
        {rows.map((row, ri) => (
          <div key={ri} className="arc__row">
            {row.map((a) => {
              const m = img(a.key);
              return (
                <button
                  key={a.key}
                  className="arc__tile"
                  style={{ aspectRatio: `${m.width} / ${m.height}` }}
                  onClick={() => setOpen(a.i)}
                  data-cursor="Open"
                  aria-label={`Open ${a.project}: ${a.title}`}
                >
                  <Img k={a.key} sizes="40vw" />
                  <span className="arc__cap">
                    <em>{a.project}</em>
                    {a.title}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {cur && open !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label={`${cur.project}: ${cur.title}`} onClick={close}>
          <div className="lb__img" onClick={(e) => e.stopPropagation()}>
            <Img k={cur.key} sizes="90vw" quality={90} key={cur.key} />
          </div>
          <div className="lb__bar" onClick={(e) => e.stopPropagation()}>
            <span className="lb__count">
              {String(open + 1).padStart(2, "0")} / {archive.length}
            </span>
            <span className="lb__title">
              <em>{cur.project}</em> {cur.title}
            </span>
            <div className="lb__nav">
              <button onClick={() => step(-1)} aria-label="Previous image">
                ←
              </button>
              <button onClick={() => step(1)} aria-label="Next image">
                →
              </button>
              <button onClick={close} aria-label="Close">
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
