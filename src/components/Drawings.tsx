"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { drawings, drawingsMore } from "@/lib/data";
import { openLightbox } from "@/lib/events";
import Img from "./ui/Img";

const all = [...drawings, ...drawingsMore];
const keys = all.map((d) => d.k);

export default function Drawings() {
  const root = useRef<HTMLElement>(null);
  const [more, setMore] = useState(false);
  const list = more ? all : drawings;

  useGSAP(
    () => {
      gsap.from(".draw__title", {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".draw__title", start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  // cards rise in, staggered, whenever new ones are added
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".card:not(.is-in)").forEach((el, i) => {
        el.classList.add("is-in");
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          delay: (i % 4) * 0.08,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    },
    { scope: root, dependencies: [more] }
  );

  useEffect(() => {
    if (!more) return;
    const t = setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => clearTimeout(t);
  }, [more]);

  return (
    <section id="drawings" ref={root} className="draw">
      <h2 className="title draw__title">From the Drawing Board</h2>
      <div className="draw__grid">
        {list.map((d, i) => (
          <button key={d.k} className="card" onClick={() => openLightbox(keys, i)} data-cursor="View">
            <span className="card__label">{d.label}</span>
            <span className="card__title">
              {d.title} <span aria-hidden>↗</span>
            </span>
            <span className="card__img">
              <Img k={d.k} className="contain" sizes="(max-width: 900px) 50vw, 25vw" />
            </span>
          </button>
        ))}
      </div>
      {!more && (
        <div className="more">
          <button className="more__btn more__btn--accent" onClick={() => setMore(true)} aria-label="View more drawings">
            <span aria-hidden>+</span>
          </button>
          <span className="more__label">View more</span>
        </div>
      )}
    </section>
  );
}
