"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/lib/data";
import FullImg from "./ui/FullImg";

/** A centred card grows to full screen, then the services slide past horizontally. */
export default function Services() {
  const root = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const n = services.length;

  useGSAP(
    () => {
      // Title comes from the left, paragraph comes from the right
      const isMobile = window.innerWidth <= 768;
      const xDist = isMobile ? "12vw" : "18vw";

      gsap.fromTo(
        ".svc-intro .title",
        {
          x: `-${xDist}`,
          opacity: 0,
        },
        {
          x: "0vw",
          opacity: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".svc-intro",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".svc-intro .para",
        {
          x: xDist,
          opacity: 0,
        },
        {
          x: "0vw",
          opacity: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".svc-intro",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".svc",
          start: "top top",
          end: () => `+=${window.innerHeight * (n + 0.6)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * (n + 0.2) - 1;
            setCurrent(Math.max(0, Math.min(n - 1, Math.round(t))));
          },
        },
      });
      // Scale the complete frame instead of cutting away the photograph's edges.
      const cardScale = window.innerWidth <= 560 ? 0.76 : 0.5;
      tl.fromTo(".svc__view", { scale: cardScale }, { scale: 1, duration: 1, ease: "power1.inOut" }, 0)
        .fromTo(".svc__label p, .svc__count", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.7)
        .to(".svc__track", { xPercent: (-100 * (n - 1)) / n, duration: n - 1 }, 1)
        .to({}, { duration: 0.2 });
    },
    { scope: root }
  );

  return (
    <section id="services" ref={root} className="services">
      <div className="svc-intro">
        <h2 className="title">Services</h2>
        <p className="para">
          Working across disciplines of architecture, interiors, furniture, lighting, landscape, and construction, the
          dedicated team at Royal Rising conceives, draws and executes synergistic, forward-thinking, and visually striking
          projects under one roof.
        </p>
      </div>
      <div className="svc">
        <div className="svc__view">
          <div className="svc__track" style={{ width: `${n * 100}%` }}>
            {services.map((s) => (
              <article key={s.title} className="svc__slide">
                <div className="svc__img">
                  <FullImg k={s.k} />
                </div>
                <div className="svc__shade" />
                <div className="svc__label">
                  <span className="svc__arrow" aria-hidden>
                    →
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="svc__count" aria-hidden>
            {String(current + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}
