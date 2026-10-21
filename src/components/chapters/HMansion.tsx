"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects, type ImgKey } from "@/lib/data";
import Img from "../ui/Img";
import ParallaxImage from "../ui/ParallaxImage";
import CompareSlider from "../ui/CompareSlider";
import Counter from "../ui/Counter";
import SplitReveal from "../ui/SplitReveal";

const cards: { k: ImgKey; title: string; text: string }[] = [
  { k: "hm-aerial-day", title: "The H, from above", text: "Guest wing, master wing and the living hall between them, around a courtyard of palms." },
  { k: "hm-aerial-dusk", title: "Ribbons of light", text: "Cove lighting traces every curve of the roof as evening falls." },
  { k: "hm-garden-dusk", title: "The garden terrace", text: "A fire lounge, lawns and olive trees step down from the glass courtyard." },
];

export default function HMansion() {
  const root = useRef<HTMLElement>(null);
  const p = projects[4];

  useGSAP(
    () => {
      gsap.from(".hmh__fade", {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".hmh", start: "top 60%", once: true },
      });

      // Cards stack: each one sinks back as the next slides over it
      const els = gsap.utils.toArray<HTMLElement>(".stack__card");
      els.forEach((card, i) => {
        const next = els[i + 1];
        if (!next) return;
        gsap.to(card.querySelector(".stack__inner"), {
          scale: 0.88,
          filter: "brightness(0.45)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 12%", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="h-mansion" ref={root} className="chapter">
      <div className="hmh">
        <ParallaxImage k="hm-night-waterfall" speed={16} className="hmh__bg" sizes="100vw" zoom reveal={false} />
        <div className="hmh__shade" />
        <div className="hmh__content">
          <span className="eyebrow hmh__fade">
            Project {p.index} / 05 · {p.type}
          </span>
          <h2 className="ci__title">
            <SplitReveal text="H-Shaped" split="chars" />
            <SplitReveal text="Mansion" split="chars" delay={0.15} />
            <SplitReveal text={p.accent} className="ci__accent" delay={0.3} />
          </h2>
          <p className="hmh__blurb hmh__fade">{p.blurb}</p>
          <dl className="stats">
            <div className="hmh__fade">
              <dt>Built area</dt>
              <dd>
                ~<Counter value={1850} />
                <small>m²</small>
              </dd>
            </div>
            <div className="hmh__fade">
              <dt>Site area</dt>
              <dd>
                ~<Counter value={9200} />
                <small>m²</small>
              </dd>
            </div>
            <div className="hmh__fade">
              <dt>Infinity pool</dt>
              <dd>
                <Counter value={30} />
                <small>× 8 m</small>
              </dd>
            </div>
            <div className="hmh__fade">
              <dt>Tennis court</dt>
              <dd>
                <Counter value={24} />
                <small>× 12 m</small>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="stack">
        {cards.map((c, i) => (
          <div key={c.k} className="stack__card" style={{ ["--i" as string]: i }}>
            <div className="stack__inner">
              <Img k={c.k} sizes="(max-width: 900px) 100vw, 90vw" quality={90} />
              <div className="stack__label">
                <span>0{i + 1}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="evo">
        <div className="evo__text">
          <p className="eyebrow">Architectural floor plan · 1:200</p>
          <SplitReveal as="h3" className="h2" text="Every wing, measured." />
          <p>
            West guest wing, 14 × 10 m open-plan living, master suite wing, gym, courtyard sun lounge, lap pool and
            infinity edge. Drag to colour the plan.
          </p>
        </div>
        <CompareSlider before="hm-plan-line" after="hm-plan-color" beforeLabel="Line" afterLabel="Colour" />
      </div>
    </section>
  );
}
