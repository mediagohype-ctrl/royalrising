"use client";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Pulls its child toward the cursor, then springs back. */
export default function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const el = ref.current!;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const qy = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      qx((e.clientX - (b.left + b.width / 2)) * strength);
      qy((e.clientY - (b.top + b.height / 2)) * strength);
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.35)" });
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  });
  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}
