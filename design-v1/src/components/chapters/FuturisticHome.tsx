"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";
import ChapterIntro from "./ChapterIntro";
import Img from "../ui/Img";
import SplitReveal from "../ui/SplitReveal";

const steps = [
  { no: "01", title: "Line", text: "The site layout drawn in ink: domes, mandir, fountain court and parking set out at 1:500." },
  { no: "02", title: "Colour", text: "Zones take colour: water, landscape, structure and parking, each in its place." },
  { no: "03", title: "Life", text: "The rendered estate from above, matching the plan line for line." },
];

export default function FuturisticHome() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  useGSAP(
    () => {
      // Line drawing → colour plan → rendered aerial
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".ltl",
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => setStep(self.progress < 0.36 ? 0 : self.progress < 0.7 ? 1 : 2),
        },
      });
      tl.to({}, { duration: 0.15 })
        .fromTo(".ltl__layer--1", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 })
        .fromTo(".ltl__scan", { left: "0%", opacity: 1 }, { left: "100%", duration: 1 }, "<")
        .set(".ltl__scan", { opacity: 0 })
        .to({}, { duration: 0.2 })
        .fromTo(
          ".ltl__layer--2",
          { clipPath: "circle(0% at 50% 45%)" },
          { clipPath: "circle(75% at 50% 45%)", duration: 1 }
        )
        .fromTo(".ltl__layer--2 img", { scale: 1.15 }, { scale: 1, duration: 1 }, "<")
        .to({}, { duration: 0.25 });

      // Four-view composite opens from a rounded card into full width
      gsap.fromTo(
        ".views__frame",
        { clipPath: "inset(8% 14% 8% 14% round 32px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: ".views", start: "top 80%", end: "center center", scrub: true },
        }
      );
      gsap.fromTo(
        ".views__frame img",
        { scale: 1.12 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: ".views", start: "top bottom", end: "bottom top", scrub: true } }
      );
    },
    { scope: root }
  );

  return (
    <section id="futuristic-home" ref={root} className="chapter">
      <ChapterIntro
        project={projects[1]}
        facts={[
          ["Main house", "Twin glazed dome halls"],
          ["Water", "4 circular fountains + pond"],
          ["Arrival", "Drop-off zone + home & resort parking"],
          ["Scale", "Master plan 1:500"],
        ]}
      />

      <div className="ltl">
        <div className="ltl__text">
          <p className="eyebrow">From line to life</p>
          <SplitReveal as="h3" className="h2" text="Watch the drawing become the place." />
          <ol className="ltl__steps">
            {steps.map((s, i) => (
              <li key={s.no} className={step === i ? "is-active" : step > i ? "is-done" : ""}>
                <span className="ltl__no">{s.no}</span>
                <div>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="ltl__frame">
          <div className="ltl__layer">
            <Img k="fh-plan-line" sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="ltl__layer ltl__layer--1">
            <Img k="fh-plan-color" sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="ltl__layer ltl__layer--2">
            <Img k="fh-aerial" sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="ltl__scan" aria-hidden />
          <span className="ltl__badge">{steps[step].title}</span>
        </div>
      </div>

      <div className="views">
        <div className="views__frame">
          <Img k="fh-views" sizes="112vw" quality={90} />
        </div>
        <p className="views__caption">
          Eye-level front · Side · Aerial oblique · Rear garden: <em>one form, four faces.</em>
        </p>
      </div>
    </section>
  );
}
