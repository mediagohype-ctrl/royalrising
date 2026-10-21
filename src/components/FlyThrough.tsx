"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { img, type ImgKey } from "@/lib/data";
import Img from "./ui/Img";

// Images hung in 3D space. x/y in vw/vh from centre, z in px (more negative = further away).
const items: { k: ImgKey; x: number; y: number; z: number; w: number }[] = [
  { k: "tp-front-night", x: -30, y: -14, z: -300, w: 30 },
  { k: "or-day-branded", x: 30, y: 16, z: -800, w: 22 },
  { k: "v145-day", x: -26, y: 22, z: -1300, w: 28 },
  { k: "fh-night", x: 28, y: -20, z: -1800, w: 26 },
  { k: "hm-aerial-dusk", x: -32, y: -6, z: -2300, w: 30 },
  { k: "tp-sunset", x: 24, y: 20, z: -2800, w: 24 },
  { k: "or-night-branded", x: -18, y: -24, z: -3300, w: 20 },
  { k: "v145-night", x: 30, y: -4, z: -3800, w: 28 },
  { k: "hm-garden-dusk", x: -28, y: 18, z: -4300, w: 26 },
  { k: "fh-day", x: 22, y: -22, z: -4800, w: 26 },
];
const TRAVEL = 5600;

/** Scroll flies the camera forward through a corridor of floating renders. */
export default function FlyThrough() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".fly__item");
      const state = { z: 0 };

      const render = () => {
        els.forEach((el, i) => {
          const depth = items[i].z + state.z; // distance in front of (−) or behind (+) the screen plane
          // fade in out of the fog, fade out just before passing the camera
          const fogIn = gsap.utils.clamp(0, 1, (depth + 2500) / 1000);
          const pass = gsap.utils.clamp(0, 1, 1 - (depth - 250) / 450);
          el.style.opacity = String(fogIn * pass);
          el.style.transform = `translate(-50%, -50%) translate3d(${items[i].x}vw, ${items[i].y}vh, ${depth}px)`;
          el.style.visibility = fogIn * pass < 0.01 ? "hidden" : "visible";
        });
      };
      render();

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=360%", pin: true, scrub: 1 },
        })
        .to(state, { z: TRAVEL, duration: 1, onUpdate: render }, 0)
        .fromTo(".fly__intro", { opacity: 1, scale: 1 }, { opacity: 0, scale: 1.6, duration: 0.14 }, 0.02)
        .fromTo(".fly__outro", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.16 }, 0.8)
        .fromTo(".fly__glow", { scale: 0.4, opacity: 0 }, { scale: 1.4, opacity: 1, duration: 1 }, 0);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="fly" aria-label="Step inside the portfolio">
      <div className="fly__glow" aria-hidden />
      <div className="fly__stage" aria-hidden>
        {items.map((it) => (
          <div key={it.k} className="fly__item" style={{ ["--w" as string]: it.w, aspectRatio: `${img(it.k).width} / ${img(it.k).height}` }}>
            <Img k={it.k} sizes={`(max-width: 900px) ${Math.round(it.w * 2.8)}vw, ${Math.round(it.w * 1.8)}vw`} />
          </div>
        ))}
      </div>
      <div className="fly__intro">
        <p className="label fly__label">Keep scrolling</p>
        <p className="fly__big">
          Step <em>inside.</em>
        </p>
      </div>
      <div className="fly__outro">
        <p className="label fly__label">Five projects · One studio</p>
        <p className="fly__big">
          Worlds drawn <em>in light.</em>
        </p>
      </div>
    </section>
  );
}
