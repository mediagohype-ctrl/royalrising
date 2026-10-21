"use client";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { processSteps } from "@/lib/data";
import Img from "./ui/Img";
import SplitReveal from "./ui/SplitReveal";

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".proc__step").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
      gsap.fromTo(
        ".proc__line i",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".proc__steps", start: "top 55%", end: "bottom 55%", scrub: true } }
      );
    },
    { scope: root }
  );

  return (
    <section id="process" ref={root} className="proc">
      <div className="proc__head">
        <p className="eyebrow">(03) Process</p>
        <SplitReveal as="h2" className="h1" text="From line" />
        <SplitReveal as="p" className="h1 h1--em" text="to living." delay={0.1} />
      </div>
      <div className="proc__grid">
        <div className="proc__steps">
          <div className="proc__line" aria-hidden>
            <i />
          </div>
          {processSteps.map((s, i) => (
            <article key={s.no} className={`proc__step${active === i ? " is-active" : ""}`}>
              <span className="proc__no">{s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="proc__mobile-img">
                <Img k={s.image} sizes="100vw" />
              </div>
            </article>
          ))}
        </div>
        <div className="proc__visual">
          <div className="proc__sticky">
            {processSteps.map((s, i) => (
              <div key={s.no} className={`proc__img${active === i ? " is-active" : ""}${active > i ? " is-past" : ""}`}>
                <Img k={s.image} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
            ))}
            <div className="proc__count" aria-hidden>
              <span>{processSteps[active].no}</span> / 04
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
