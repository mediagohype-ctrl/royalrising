"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/lib/data";
import SplitReveal from "../ui/SplitReveal";

export default function ChapterIntro({ project, facts }: { project: Project; facts: [string, string][] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ci__fade", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      gsap.from(".ci__rule", {
        scaleX: 0,
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      // giant index number drifts slower than the page
      gsap.fromTo(".ci__ghost", { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: { trigger: ref.current, scrub: true } });
    },
    { scope: ref }
  );

  return (
    <header ref={ref} className="ci">
      <span className="ci__ghost" aria-hidden>
        {project.index}
      </span>
      <div className="ci__top ci__fade">
        <span className="eyebrow">Project {project.index} / 05</span>
        <span className="eyebrow ci__type">{project.type}</span>
      </div>
      <div className="ci__rule" />
      <div className="ci__grid">
        <h2 className="ci__title">
          <SplitReveal text={project.name} split="chars" />
          <SplitReveal text={project.accent} className="ci__accent" delay={0.25} />
        </h2>
        <div className="ci__aside">
          <p className="ci__blurb ci__fade">{project.blurb}</p>
          <dl className="ci__facts">
            {facts.map(([k, v]) => (
              <div key={k} className="ci__fade">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </header>
  );
}
