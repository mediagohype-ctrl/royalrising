"use client";
import { Fragment, useRef, type ElementType } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  split?: "words" | "chars";
  /** "scroll": reveal when scrolled into view. "ready": reveal after the preloader. "none": caller animates .split__item. */
  trigger?: "scroll" | "ready" | "none";
  delay?: number;
  stagger?: number;
};

/** Masked line-rise reveal, split by word or by character. */
export default function SplitReveal({
  text,
  as: Tag = "div",
  className = "",
  split = "words",
  trigger = "scroll",
  delay = 0,
  stagger,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (trigger === "none") return;
      const items = ref.current!.querySelectorAll(".split__item");
      const rotate = split === "chars" ? 6 : 3;
      const vars: gsap.TweenVars = {
        duration: 1.25,
        ease: "expo.out",
        stagger: stagger ?? (split === "chars" ? 0.025 : 0.06),
        delay,
      };
      if (trigger === "scroll") {
        gsap.from(items, {
          ...vars,
          yPercent: 115,
          rotate,
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      } else {
        gsap.set(items, { yPercent: 115, rotate });
        return onReady(() => {
          gsap.to(items, { ...vars, yPercent: 0, rotate: 0 });
        });
      }
    },
    { scope: ref }
  );

  const words = text.split(" ");
  return (
    <Tag ref={ref} className={`split ${className}`} aria-label={text}>
      {words.map((w, wi) => (
        <Fragment key={wi}>
          <span aria-hidden className="split__word">
            {split === "chars" ? (
              w.split("").map((c, ci) => (
                <span key={ci} className="split__mask">
                  <span className="split__item">{c}</span>
                </span>
              ))
            ) : (
              <span className="split__mask">
                <span className="split__item">{w}</span>
              </span>
            )}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
