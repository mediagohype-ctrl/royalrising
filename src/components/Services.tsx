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
      gsap.from(".svc-intro > *", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".svc-intro", start: "top 80%", once: true },
      });

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
      const card = window.innerWidth <= 560 ? "inset(18% 12% 6% 12%)" : "inset(16% 33% 4% 33%)";
      tl.fromTo(".svc__view", { clipPath: card }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power1.inOut" }, 0)
        .fromTo(".svc__label p, .svc__count", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.7)
        .to(".svc__track", { xPercent: (-100 * (n - 1)) / n, duration: n - 1 }, 1)
        .to({}, { duration: 0.2 });
      gsap.utils.toArray<HTMLElement>(".svc__img .full__bg").forEach((el, i) => {
        tl.fromTo(el, { xPercent: i === 0 ? 0 : 14 }, { xPercent: -14, duration: 2 }, i);
      });
    },
    { scope: root }
  );

  return (
    <section id="services" ref={root} className="services">
      <div className="svc-intro">
        <h2 className="title">Services</h2>
        <p className="para">
          Working across architecture, interiors, master planning and construction, the Royal Rising team conceives, draws and
          builds every project under one roof, from the first site sketch to the last light fitting.
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
