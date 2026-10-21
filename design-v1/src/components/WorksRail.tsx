"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";
import Img from "./ui/Img";
import SplitReveal from "./ui/SplitReveal";

export default function WorksRail() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;

      const slide = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            root.current?.style.setProperty("--p", String(self.progress));
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".rail__card").forEach((card) => {
        gsap.fromTo(
          card.querySelector(".rail__img-inner"),
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
          }
        );
        gsap.fromTo(
          card.querySelector(".rail__meta"),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: card, containerAnimation: slide, start: "left 85%", end: "left 45%", scrub: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section id="works" ref={root} className="rail">
      <div ref={track} className="rail__track">
        <div className="rail__intro">
          <p className="eyebrow">(02) Selected Works</p>
          <SplitReveal as="h2" className="h1" text="Five worlds," />
          <SplitReveal as="p" className="h1 h1--em" text="one signature." delay={0.15} />
          <p className="rail__hint">
            Keep scrolling <span aria-hidden>→</span>
          </p>
        </div>
        {projects.map((p) => (
          <a key={p.id} href={`#${p.id}`} className="rail__card" data-cursor="Explore">
            <div className="rail__img">
              <div className="rail__img-inner">
                <Img k={p.cover} sizes="(max-width: 900px) 85vw, 60vw" />
              </div>
              <span className="rail__index">{p.index}</span>
            </div>
            <div className="rail__meta">
              <h3>
                {p.name} <em>{p.accent}</em>
              </h3>
              <p>{p.type}</p>
            </div>
          </a>
        ))}
        <div className="rail__end" aria-hidden />
      </div>
      <div className="rail__progress" aria-hidden>
        <span>01</span>
        <div>
          <i />
        </div>
        <span>05</span>
      </div>
    </section>
  );
}
