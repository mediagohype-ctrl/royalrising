"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Paragraph whose words light up one by one as you scroll through it. Words wrapped in *asterisks* render in gold italics. */
export default function ScrubWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current!.querySelectorAll(".scrub__w"),
        { opacity: 0.12, filter: "blur(4px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <p ref={ref} className={`scrub ${className}`}>
      {text.split(" ").map((w, i) => {
        const em = w.startsWith("*");
        const clean = w.replace(/\*/g, "");
        return (
          <span key={i} className={`scrub__w${em ? " is-em" : ""}`}>
            {clean}{" "}
          </span>
        );
      })}
    </p>
  );
}
