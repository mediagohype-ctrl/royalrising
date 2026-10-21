"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { disciplines } from "@/lib/data";
import ScrubWords from "./ui/ScrubWords";
import ParallaxImage from "./ui/ParallaxImage";
import SplitReveal from "./ui/SplitReveal";

export default function Studio() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      // floating images drift at their own speeds
      gsap.utils.toArray<HTMLElement>(".float").forEach((el) => {
        const depth = Number(el.dataset.depth || 1);
        gsap.fromTo(
          el,
          { y: 120 * depth, rotate: -3 * depth },
          {
            y: -160 * depth,
            rotate: 2 * depth,
            ease: "none",
            scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      gsap.from(".disc__panel", {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ".disc__row", start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section id="studio" ref={root} className="studio">
      <div className="manifesto">
        <div className="float float--a" data-depth="1.2">
          <ParallaxImage k="tp-sunset" speed={10} sizes="24vw" reveal={false} />
        </div>
        <div className="float float--b" data-depth="0.7">
          <ParallaxImage k="v145-day" speed={10} sizes="20vw" reveal={false} />
        </div>
        <div className="float float--c" data-depth="1.6">
          <ParallaxImage k="or-night" speed={10} sizes="16vw" reveal={false} />
        </div>

        <div className="manifesto__inner">
          <p className="eyebrow">(01) The Studio</p>
          <ScrubWords
            className="manifesto__text"
            text="Royal Rising is an *architecture,* *interior* and *construction* studio. We shape flowing curves, glass and travertine into homes, palaces and sacred spaces that feel as if they grew out of their landscape, and then we build them."
          />
        </div>
      </div>

      <div className="disc">
        <div className="disc__head">
          <SplitReveal as="h2" className="h2" text="One studio. Three crafts." />
          <p className="disc__sub">From the first master-plan sketch to the last light fitting, every stage stays under one roof.</p>
        </div>

        <div className="disc__row">
          {disciplines.map((d, i) => (
            <article
              key={d.title}
              className={`disc__panel${active === i ? " is-active" : ""}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
            >
              <ParallaxImage k={d.image} speed={8} className="disc__img" reveal={false} sizes="(max-width: 900px) 100vw, 60vw" />
              <div className="disc__shade" />
              <div className="disc__content">
                <span className="disc__no">{d.no}</span>
                <h3 className="disc__title">{d.title}</h3>
                <div className="disc__more">
                  <p>{d.text}</p>
                  <ul>
                    {d.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
