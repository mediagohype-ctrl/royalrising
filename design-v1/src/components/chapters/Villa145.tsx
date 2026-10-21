"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";
import ChapterIntro from "./ChapterIntro";
import Img from "../ui/Img";
import CompareSlider from "../ui/CompareSlider";
import SplitReveal from "../ui/SplitReveal";

export default function Villa145() {
  const root = useRef<HTMLElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Cutaway tilts in 3D with the cursor
      const el = tilt.current!;
      let cleanup = () => {};
      gsap.from(el, {
        rotateX: 28,
        y: 120,
        opacity: 0,
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
      if (window.matchMedia("(pointer: fine)").matches) {
        const rx = gsap.quickTo(el, "rotateX", { duration: 0.8, ease: "power3" });
        const ry = gsap.quickTo(el, "rotateY", { duration: 0.8, ease: "power3" });
        const gx = gsap.quickTo(el, "--gx", { duration: 0.8, ease: "power3" });
        const gy = gsap.quickTo(el, "--gy", { duration: 0.8, ease: "power3" });
        const move = (e: PointerEvent) => {
          const b = el.getBoundingClientRect();
          const nx = (e.clientX - b.left) / b.width - 0.5;
          const ny = (e.clientY - b.top) / b.height - 0.5;
          ry(nx * 10);
          rx(ny * -8);
          gx((nx + 0.5) * 100);
          gy((ny + 0.5) * 100);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanup = () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      }

      // Plans: the line drawing is coloured in from top to bottom as you scroll
      gsap.fromTo(
        ".vplan__color",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: ".vplan__frame", start: "top 70%", end: "bottom 60%", scrub: true },
        }
      );
      gsap.fromTo(
        ".vplan__edge",
        { top: "0%" },
        { top: "100%", ease: "none", scrollTrigger: { trigger: ".vplan__frame", start: "top 70%", end: "bottom 60%", scrub: true } }
      );
      return () => cleanup();
    },
    { scope: root }
  );

  return (
    <section id="villa-145" ref={root} className="chapter">
      <ChapterIntro
        project={projects[3]}
        facts={[
          ["First floor", "22.0 × 12.5 m"],
          ["Infinity pool", "15 × 6 m"],
          ["Garage", "2 cars"],
          ["Material", "Curved travertine"],
        ]}
      />

      <div className="daynight">
        <CompareSlider before="v145-day" after="v145-night" beforeLabel="Day" afterLabel="Night" sizes="100vw" />
        <p className="daynight__hint">Drag across the villa to switch on its lights.</p>
      </div>

      <div className="cut">
        <div className="cut__text">
          <p className="eyebrow">3D architectural layout</p>
          <SplitReveal as="h3" className="h2" text="Lift the roof off." />
          <p>
            A cutaway of the master suite, media lounge, living rooms, spiral stair, pool deck and two-car garage, all
            inside the curved travertine shell.
          </p>
        </div>
        <div className="cut__stage">
          <div ref={tilt} className="cut__card" data-cursor="Tilt">
            <Img k="v145-cutaway" sizes="(max-width: 900px) 100vw, 65vw" quality={90} />
            <div className="cut__glare" aria-hidden />
          </div>
        </div>
      </div>

      <div className="vplan">
        <div className="vplan__text">
          <p className="eyebrow">AR-145-FP-02 · Scale 1:100</p>
          <SplitReveal as="h3" className="h2" text="Ground and first floor, coloured in as you scroll." />
        </div>
        <div className="vplan__frame plate">
          <div className="vplan__layer">
            <Img k="v145-plan-line" sizes="(max-width: 900px) 100vw, 70vw" />
          </div>
          <div className="vplan__layer vplan__color">
            <Img k="v145-plan-color" sizes="(max-width: 900px) 100vw, 70vw" />
          </div>
          <div className="vplan__edge" aria-hidden />
        </div>
      </div>
    </section>
  );
}
