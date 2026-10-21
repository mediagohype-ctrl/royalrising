"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";
import Img from "../ui/Img";
import Lens from "../ui/Lens";
import SplitReveal from "../ui/SplitReveal";

// bottom → top
const floors = [
  { name: "Stilt", note: "8 car bays · 2 EV charging · ramp to street" },
  { name: "Level 01", note: "2BHK Unit A + Unit B" },
  { name: "Level 02", note: "2BHK units · 95–98 m² each" },
  { name: "Level 03", note: "2BHK units · balcony garden" },
  { name: "Level 04", note: "2BHK units · terrace balconies" },
  { name: "Roof", note: "Terrace garden · pergola · solar" },
];

export default function OrganicResidence() {
  const root = useRef<HTMLElement>(null);
  const [floor, setFloor] = useState(0);
  const p = projects[2];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".tower",
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => setFloor(Math.min(floors.length - 1, Math.floor(self.progress * floors.length * 0.999))),
        },
      });
      tl.fromTo(".tower__img", { scale: 1.1, yPercent: 3 }, { scale: 1, yPercent: -2, duration: 1 }, 0)
        .fromTo(".tower__scan", { top: "92%" }, { top: "4%", duration: 1 }, 0)
        .to(".tower__night", { opacity: 1, duration: 0.45 }, 0.45)
        .fromTo(".tower__gauge i", { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);
    },
    { scope: root }
  );

  return (
    <section id="organic-residence" ref={root} className="chapter">
      <div className="tower">
        <div className="tower__text">
          <span className="eyebrow">Project {p.index} / 05 · {p.type}</span>
          <h2 className="ci__title ci__title--sm">
            <SplitReveal text="Organic" split="chars" />
            <SplitReveal text="Residence" split="chars" delay={0.15} />
          </h2>
          <p className="tower__blurb">{p.blurb}</p>
          <div className="tower__floors">
            <div className="tower__gauge" aria-hidden>
              <i />
            </div>
            <ol>
              {[...floors].reverse().map((f, ri) => {
                const i = floors.length - 1 - ri;
                return (
                  <li key={f.name} className={floor === i ? "is-active" : floor > i ? "is-done" : ""}>
                    <strong>{f.name}</strong>
                    <span>{f.note}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        <div className="tower__frame">
          <div className="tower__img">
            <Img k="or-day" sizes="(max-width: 900px) 110vw, 55vw" quality={90} />
          </div>
          <div className="tower__img tower__night">
            <Img k="or-night" sizes="(max-width: 900px) 110vw, 55vw" quality={90} />
          </div>
          <div className="tower__scan" aria-hidden>
            <span>{floors[floor].name}</span>
          </div>
        </div>
      </div>

      <div className="lens-block">
        <div className="lens-block__text">
          <p className="eyebrow">Floor plan set · RR-ORG-FP-001</p>
          <SplitReveal as="h3" className="h2" text="Look closer through the blueprint." />
          <p>
            Six plates: stilt parking, four residential levels with two 2BHK units each, and the roof terrace garden. Move
            across the blueprint to see the coloured plan under the lens.
          </p>
          <dl className="ci__facts">
            <div>
              <dt>Floors</dt>
              <dd>Stilt + 4 + Roof</dd>
            </div>
            <div>
              <dt>Units</dt>
              <dd>8 × 2BHK</dd>
            </div>
            <div>
              <dt>Structure</dt>
              <dd>RCC, curved façade</dd>
            </div>
          </dl>
        </div>
        <Lens base="or-plans-blueprint" reveal="or-plans-color" label="Explore" />
      </div>
    </section>
  );
}
