"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ServiceComponent } from "@/lib/catalog";
import Img from "../ui/Img";

/** The parts of a service as image-led cards that rise in one after another. */
export default function ServiceComponents({ title, items }: { title: string; items: ServiceComponent[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const motion = gsap.matchMedia();
    motion.add({ desktop: "(min-width: 1101px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      if (context.conditions?.reduced) return;
      const desktop = context.conditions?.desktop;
      gsap.from(".svc-parts__head > *", {
        y: 26, opacity: 0, duration: 0.95, stagger: 0.1, ease: "power3.out", clearProps: "transform,opacity",
        scrollTrigger: { trigger: ".svc-parts__head", start: "top 85%", once: true },
      });
      // On desktop the cards share one trigger so they cascade left to right;
      // on smaller screens (a swipeable rail) each card reveals on its own.
      gsap.utils.toArray<HTMLElement>(".svc-part", root.current!).forEach((card, i) => {
        const delay = desktop ? i * 0.12 : 0;
        const trigger = () => desktop
          ? { trigger: ".svc-parts__rail", start: "top 85%", once: true }
          : { trigger: card, start: "top 92%", once: true };
        gsap.fromTo(card.querySelector(".svc-part__media"), { clipPath: "inset(100% 0% 0% 0%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, delay, ease: "power3.inOut", clearProps: "clipPath", scrollTrigger: trigger(),
        });
        gsap.from(card.querySelector(".svc-part__media img"), {
          scale: 1.18, duration: 1.8, delay, ease: "power2.out", clearProps: "transform", scrollTrigger: trigger(),
        });
        gsap.from(card.querySelectorAll(".svc-part__num, .svc-part__title, .svc-part__text"), {
          y: 22, opacity: 0, duration: 0.9, stagger: 0.08, delay: delay + 0.45, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: trigger(),
        });
      });
    });
    return () => motion.revert();
  }, { scope: root });

  return (
    <section ref={root} id="components" className="svc-parts" aria-labelledby="svc-parts-title">
      <div className="svc-parts__head">
        <div>
          <p className="label">Components</p>
          <h2 id="svc-parts-title">What {title.toLowerCase()} <em>includes</em>.</h2>
        </div>
        <p>Commission any of these on its own or as part of the full service. The scope is agreed in writing before work starts.</p>
      </div>
      <ol className="svc-parts__rail">
        {items.map((c, i) => (
          <li key={c.title} className="svc-part">
            <div className="svc-part__media">
              <Img k={c.k} sizes="(max-width: 760px) 80vw, (max-width: 1100px) 40vw, 20vw" alt={c.title} />
              <span className="svc-part__num" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="svc-part__title">{c.title}</h3>
            </div>
            <p className="svc-part__text">{c.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
