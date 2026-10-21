"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";
import ChapterIntro from "./ChapterIntro";
import Img from "../ui/Img";
import ParallaxImage from "../ui/ParallaxImage";
import CompareSlider from "../ui/CompareSlider";
import SplitReveal from "../ui/SplitReveal";

export default function TwinPalace() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // A small window opens out to full screen, then day turns to night
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".expand",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const night = self.progress > 0.62;
            root.current?.querySelector(".expand__state")?.replaceChildren(night ? "Blue hour" : "Golden hour");
          },
        },
      });
      tl.fromTo(
        ".expand__frame",
        { clipPath: "inset(24% 32% 24% 32% round 220px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }
      )
        .fromTo(".expand__img", { scale: 1.25 }, { scale: 1, duration: 1 }, 0)
        .to(".expand__word--l", { xPercent: -120, opacity: 0, duration: 0.8 }, 0)
        .to(".expand__word--r", { xPercent: 120, opacity: 0, duration: 0.8 }, 0)
        .to(".expand__night", { opacity: 1, duration: 0.6 }, 1.05)
        .fromTo(".expand__caption", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 0.8)
        .to({}, { duration: 0.3 });
    },
    { scope: root }
  );

  return (
    <section id="twin-palace" ref={root} className="chapter">
      <ChapterIntro
        project={projects[0]}
        facts={[
          ["Site", "170 × 140 m"],
          ["Pool", "T-shaped cascade"],
          ["Median", "5 fountain pools"],
          ["Sacred", "Carved stone Mandir"],
        ]}
      />

      <div className="expand">
        <span className="expand__word expand__word--l" aria-hidden>
          Twin
        </span>
        <span className="expand__word expand__word--r" aria-hidden>
          Palace
        </span>
        <div className="expand__frame">
          <div className="expand__img">
            <Img k="tp-front-day" sizes="100vw" quality={90} />
          </div>
          <div className="expand__img expand__night">
            <Img k="tp-front-night" sizes="100vw" quality={90} />
          </div>
          <div className="expand__caption">
            <span className="expand__state">Golden hour</span>
            <span>The fountain avenue, looking toward the cascade</span>
          </div>
        </div>
      </div>

      <div className="trio">
        <figure className="trio__a">
          <ParallaxImage k="tp-aerial-day" speed={14} sizes="(max-width: 900px) 100vw, 55vw" />
          <figcaption>Masterplan aerial · palaces, mandir and fountain garden</figcaption>
        </figure>
        <figure className="trio__b">
          <ParallaxImage k="tp-sunset" speed={18} sizes="(max-width: 900px) 100vw, 35vw" />
          <figcaption>Sunset over the cascade</figcaption>
        </figure>
        <figure className="trio__c">
          <ParallaxImage k="tp-aerial-night" speed={10} sizes="(max-width: 900px) 100vw, 40vw" />
          <figcaption>Night aerial · the T-shaped pool glowing</figcaption>
        </figure>
        <blockquote className="trio__quote">
          <SplitReveal text="Two palaces facing one another, with water running between them." />
        </blockquote>
      </div>

      <div className="evo">
        <div className="evo__text">
          <p className="eyebrow">Evolution</p>
          <SplitReveal as="h3" className="h2" text="From open lawn to sanctum." />
          <p>
            The first concept left the western quarter as an open lawn. The final masterplan places a hand-carved mandir
            there, set in its own walled garden. Drag to compare.
          </p>
        </div>
        <CompareSlider before="tp-concept-aerial" after="tp-aerial-day" beforeLabel="Concept" afterLabel="Final" />
      </div>

      <div className="evo evo--rev">
        <div className="evo__text">
          <p className="eyebrow">Site layout · Scale 1:500</p>
          <SplitReveal as="h3" className="h2" text="Drawn to the metre." />
          <p>
            Boundary walls, a 5-fountain median, a fountain garden of three large and two small pools, parking and the
            infinity pool, all set out on a 170 × 140 m site.
          </p>
        </div>
        <div className="plate">
          <ParallaxImage k="tp-siteplan" speed={4} className="plate__img" sizes="(max-width: 900px) 100vw, 55vw" />
        </div>
      </div>

      <div className="evo">
        <div className="evo__text">
          <p className="eyebrow">Concept front</p>
          <SplitReveal as="h3" className="h2" text="The first sketch of the approach." />
          <p>The early concept front: twin wings, a cascading pool and the fountain avenue were all there from the start.</p>
        </div>
        <ParallaxImage k="tp-concept-front" speed={10} className="evo__img" sizes="(max-width: 900px) 100vw, 55vw" zoom />
      </div>
    </section>
  );
}
