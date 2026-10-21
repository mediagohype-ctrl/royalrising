"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Img from "./Img";
import { img, type ImgKey } from "@/lib/data";

/** A circular lens that reveals the coloured drawing beneath the cursor. Wanders by itself when idle or on touch. */
export default function Lens({ base, reveal, label }: { base: ImgKey; reveal: ImgKey; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const meta = img(base);

  useGSAP(
    () => {
      const el = ref.current!;
      const pos = { x: 30, y: 40, r: 0 };
      const apply = () => {
        el.style.setProperty("--x", `${pos.x}%`);
        el.style.setProperty("--y", `${pos.y}%`);
        el.style.setProperty("--r", `${pos.r}px`);
      };
      apply();
      const size = (f: number) => Math.min(el.offsetWidth * f, 200);

      // idle wander path
      const wander = gsap.timeline({ repeat: -1, paused: true, onUpdate: apply });
      wander
        .to(pos, { x: 72, y: 30, duration: 3, ease: "sine.inOut" })
        .to(pos, { x: 62, y: 72, duration: 3, ease: "sine.inOut" })
        .to(pos, { x: 24, y: 66, duration: 3, ease: "sine.inOut" })
        .to(pos, { x: 30, y: 40, duration: 3, ease: "sine.inOut" });

      const grow = (r: number) => gsap.to(pos, { r, duration: 0.9, ease: "expo.out", onUpdate: apply, overwrite: "auto" });

      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", once: true } }).add(() => {
        grow(size(0.17));
        wander.play();
      });

      if (!window.matchMedia("(pointer: fine)").matches) return;

      const qx = gsap.quickTo(pos, "x", { duration: 0.5, ease: "power3", onUpdate: apply });
      const qy = gsap.quickTo(pos, "y", { duration: 0.5, ease: "power3", onUpdate: apply });
      const move = (e: PointerEvent) => {
        const b = el.getBoundingClientRect();
        qx(((e.clientX - b.left) / b.width) * 100);
        qy(((e.clientY - b.top) / b.height) * 100);
      };
      const enter = () => {
        wander.pause();
        grow(size(0.2));
      };
      const leave = () => {
        grow(size(0.17));
        wander.play();
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="lens" style={{ aspectRatio: `${meta.width} / ${meta.height}` }} data-cursor={label}>
      <div className="lens__base">
        <Img k={base} sizes="(max-width: 900px) 100vw, 70vw" />
      </div>
      <div className="lens__reveal">
        <Img k={reveal} sizes="(max-width: 900px) 100vw, 70vw" />
      </div>
      <div className="lens__ring" aria-hidden />
    </div>
  );
}
