"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { services, img, alts } from "@/lib/data";
import ImageWatermark from "./ui/ImageWatermark";
import { getImageProps } from "next/image";

/** A narrow central image opens to full screen before the services slide horizontally. */
export default function Services() {
  const root = useRef<HTMLElement>(null);
  const n = services.length;

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      motion.add({ phone: "(max-width: 560px)", larger: "(min-width: 561px)", reduced: "(prefers-reduced-motion: reduce)" }, (context) => {
      const phone = !!context.conditions?.phone;
      const reduced = !!context.conditions?.reduced;
      const pinStart = () => phone
        ? `top ${getComputedStyle(document.documentElement).getPropertyValue("--nav-height").trim() || "72px"}`
        : "top top";
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

      const view = root.current!.querySelector<HTMLElement>(".svc__view")!;
      const opening = { entrance: 0, expansion: 0 };
      const renderOpening = () => {
        const inset = reduced ? 0 : Math.max(0, (phone ? 38 : 50) - opening.entrance * (phone ? 18 : 30) - opening.expansion * 20);
        view.style.clipPath = `inset(0% ${inset}% 0% ${inset}%)`;
      };
      // Keep both stages on one crop so they join smoothly, including when scrolling back.
      renderOpening();
      if (!reduced) {
        gsap.fromTo(opening, { entrance: 0 }, {
          entrance: 1,
          ease: "none",
          onUpdate: renderOpening,
          scrollTrigger: {
            trigger: ".svc", start: "top 85%", end: pinStart, scrub: phone ? true : 0.6,
            invalidateOnRefresh: true,
          },
        });
      }
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".svc",
          // Keep the phone image directly below the fixed navigation.
          start: pinStart,
          end: () => `+=${window.innerHeight * (n + 0.6)}`,
          pin: true,
          // Touch scrolling must finish the last slide before the pin releases.
          // A delayed scrub can leave two partial slides visible during exit.
          scrub: phone ? true : 1,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(opening, { expansion: 0 }, {
        expansion: 1, duration: 1, ease: "sine.out", onUpdate: renderOpening,
      }, 0)
        .fromTo(".svc__label h3", { autoAlpha: reduced ? 1 : 0 }, { autoAlpha: 1, duration: 0.35 }, 0.3)
        .fromTo(".svc__label p", { opacity: reduced ? 1 : 0 }, { opacity: 1, duration: 0.3 }, 0.7)
        .fromTo(".svc__track", { xPercent: 0 }, { xPercent: (-100 * (n - 1)) / n, duration: n - 1 }, 1)
        .to({}, { duration: 0.2 });
      });
      return () => motion.revert();
    },
    { scope: root }
  );

  return (
    <section id="services" ref={root} className="services">
      <div className="svc-intro">
        <h2 className="title">Services</h2>
        <p className="para">
          Architecture, interiors, furniture, lighting, landscape and construction, handled by one team under one
          roof. The people who draw your home are the people who see it built.
        </p>
      </div>
      <div className="svc">
        <div className="svc__view">
          <div className="svc__track" style={{ ["--track-width" as string]: `${n * 100}%` }}>
            {services.map((s) => (
              <article key={s.title} className="svc__slide">
                <div className="svc__img">
                  <picture className="full__fg">
                    <img className="svc__art" {...getImageProps({ src: img(s.k).src, width: img(s.k).width, height: img(s.k).height, sizes: "100vw", quality: 90, alt: alts[s.k] ?? s.title }).props} loading="eager" decoding="async" />
                  </picture>
                  <ImageWatermark />
                </div>
                <div className="svc__shade" />
                <div className="svc__label">
                  <h3>{s.title}</h3>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
