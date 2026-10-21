"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Img from "./Img";
import { img, type ImgKey } from "@/lib/data";

type Props = {
  before: ImgKey;
  after: ImgKey;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
  sizes?: string;
};

/** Drag-to-compare. The handle sweeps in on first view to hint that it moves. */
export default function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  className = "",
  sizes = "(max-width: 900px) 100vw, 80vw",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const meta = img(after);

  const set = (v: number) => {
    ref.current?.style.setProperty("--pos", `${v}%`);
    if (input.current) input.current.value = String(v);
  };

  useGSAP(
    () => {
      const o = { v: 92 };
      set(o.v);
      gsap.to(o, {
        v: 50,
        duration: 1.8,
        ease: "expo.inOut",
        onUpdate: () => set(o.v),
        scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`compare ${className}`}
      style={{ aspectRatio: `${meta.width} / ${meta.height}` }}
      data-cursor="Drag"
    >
      <div className="compare__layer">
        <Img k={after} sizes={sizes} />
      </div>
      <div className="compare__layer compare__layer--top">
        <Img k={before} sizes={sizes} />
      </div>
      <span className="compare__label compare__label--l">{beforeLabel}</span>
      <span className="compare__label compare__label--r">{afterLabel}</span>
      <div className="compare__handle" aria-hidden>
        <span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
      <input
        ref={input}
        type="range"
        min={0}
        max={100}
        step={0.1}
        defaultValue={92}
        aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
        onInput={(e) => set(Number((e.target as HTMLInputElement).value))}
      />
    </div>
  );
}
