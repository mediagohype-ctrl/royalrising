"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Gold dot + trailing ring. Elements with data-cursor="Label" grow the ring and show the label. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3" });

    const move = (e: PointerEvent) => {
      document.documentElement.classList.add("cursor-moved");
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const target = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a, button, input, select, textarea, label");
      const r = ring.current!;
      if (target) {
        r.classList.add("is-label");
        r.classList.remove("is-link");
        label.current!.textContent = target.dataset.cursor || "";
      } else {
        r.classList.remove("is-label");
        r.classList.toggle("is-link", !!link);
      }
    };

    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
    const down = () => ring.current?.classList.add("is-down");
    const up = () => ring.current?.classList.remove("is-down");

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden />
      <div className="cursor-ring" ref={ring} aria-hidden>
        <span ref={label} />
      </div>
    </>
  );
}
