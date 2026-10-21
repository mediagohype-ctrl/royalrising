"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const fmt = (n: number, decimals: number) =>
  n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export default function Counter({ value, decimals = 0, className = "" }: { value: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const o = { v: 0 };
    ref.current!.textContent = fmt(0, decimals);
    gsap.to(o, {
      v: value,
      duration: 2.2,
      ease: "power3.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = fmt(o.v, decimals);
      },
      scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
    });
  });
  return (
    <span ref={ref} className={className}>
      {fmt(value, decimals)}
    </span>
  );
}
