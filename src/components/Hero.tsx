"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import Img from "./ui/Img";
import SplitReveal from "./ui/SplitReveal";

// Deterministic star field so server and client markup match
const stars = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 999 + n * 77) * 10000;
    return x - Math.floor(x);
  };
  // Fixed-precision strings, so server and client serialise identical styles
  const s = `${(1 + r(3) * 1.8).toFixed(2)}px`;
  return {
    left: `${(r(1) * 100).toFixed(2)}%`,
    top: `${(r(2) * 26).toFixed(2)}%`,
    width: s,
    height: s,
    animationDelay: `${(r(4) * 4).toFixed(2)}s`,
  };
});

const START = 17 * 60 + 10; // 5:10 PM
const END = 20 * 60 + 40; // 8:40 PM
const fmtTime = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = Math.floor(m % 60);
  return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, "0")} PM`;
};
const phase = (m: number) => (m < 18 * 60 + 15 ? "Golden hour" : m < 19 * 60 + 20 ? "Dusk" : "Blue hour");

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const time = useRef<HTMLSpanElement>(null);
  const phaseEl = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      // Intro, after the preloader lifts
      gsap.set(q(".hero__fade"), { opacity: 0, y: 30 });
      const off = onReady(() => {
        gsap
          .timeline()
          .fromTo(q(".hero__intro"), { scale: 1.15 }, { scale: 1, duration: 2.6, ease: "expo.out" }, 0)
          .to(q(".hero__fade"), { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", stagger: 0.1 }, 0.7);
      });

      // Golden hour → blue hour, scrubbed
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const m = START + (END - START) * self.progress;
            if (time.current) time.current.textContent = fmtTime(m);
            if (phaseEl.current) phaseEl.current.textContent = phase(m);
          },
        },
      });
      tl.fromTo(q(".hero__scrub"), { scale: 1.12 }, { scale: 1, duration: 1 }, 0)
        .to(q(".hero__night"), { opacity: 1, duration: 0.45 }, 0.22)
        .to(q(".hero__warm"), { opacity: 0, duration: 0.4 }, 0.22)
        .to(q(".hero__stars"), { opacity: 1, duration: 0.3 }, 0.5)
        .to(q(".hero__word--l"), { xPercent: -42, duration: 1 }, 0)
        .to(q(".hero__word--r"), { xPercent: 42, duration: 1 }, 0)
        .to(q(".hero__content"), { opacity: 0, duration: 0.25 }, 0.6)
        .to(q(".hero__bottom"), { opacity: 0, y: -40, duration: 0.25 }, 0.1)
        .fromTo(q(".hero__after"), { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.3 }, 0.64)
        .to(q(".hero__sun"), { yPercent: 160, opacity: 0, duration: 0.6 }, 0)
        // Exit: the scene folds into a floating card on the white page
        .fromTo(
          q(".hero__media"),
          { clipPath: "inset(0% 0% 0% 0% round 0px)" },
          { clipPath: "inset(9% 7% 9% 7% round 40px)", duration: 0.45, ease: "power2.inOut" },
          1.05
        )
        .to(q(".hero__mouse"), { scale: 0.92, duration: 0.45, ease: "power2.inOut" }, 1.05)
        .to(q(".hero__after"), { opacity: 0, y: -60, duration: 0.3 }, 1.15);

      // Cursor parallax: image and title move against each other
      if (window.matchMedia("(pointer: fine)").matches) {
        const mx = gsap.quickTo(q(".hero__mouse"), "x", { duration: 1.2, ease: "power3" });
        const my = gsap.quickTo(q(".hero__mouse"), "y", { duration: 1.2, ease: "power3" });
        const tx = gsap.quickTo(q(".hero__title"), "x", { duration: 1.4, ease: "power3" });
        const ty = gsap.quickTo(q(".hero__title"), "y", { duration: 1.4, ease: "power3" });
        const move = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          mx(nx * -28);
          my(ny * -18);
          tx(nx * 22);
          ty(ny * 12);
        };
        window.addEventListener("pointermove", move);
        return () => {
          off();
          window.removeEventListener("pointermove", move);
        };
      }
      return off;
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="hero" aria-label="Royal Rising">
      <div className="hero__media">
        <div className="hero__mouse">
          <div className="hero__intro">
            <div className="hero__scrub">
              <div className="hero__layer">
                <Img k="fh-day" priority quality={90} sizes="120vw" alt="Futuristic Home and Mandir by Royal Rising at golden hour" />
              </div>
              <div className="hero__layer hero__night">
                <Img k="fh-night" priority quality={90} sizes="120vw" alt="The same home lit up after dark" />
              </div>
            </div>
          </div>
        </div>
        <div className="hero__warm" aria-hidden />
        <div className="hero__sun" aria-hidden />
        <div className="hero__stars" aria-hidden>
          {stars.map((s, i) => (
            <i key={i} style={s} />
          ))}
        </div>
        <div className="hero__shade" aria-hidden />
      </div>

      <div className="hero__content">
        <p className="eyebrow hero__fade">Architecture · Interior · Construction</p>
        <h1 className="hero__title">
          <span className="hero__word hero__word--l">
            <SplitReveal text="Royal" split="chars" trigger="ready" stagger={0.05} delay={0.2} />
          </span>
          <span className="hero__word hero__word--r">
            <SplitReveal text="Rising" split="chars" trigger="ready" stagger={0.05} delay={0.35} />
          </span>
        </h1>

        <div className="hero__bottom">
          <p className="hero__lede hero__fade">
            Sculpted homes, palaces and sacred spaces, designed and built to rise with the light.
          </p>
          <div className="hero__clock hero__fade" aria-hidden>
            <span className="hero__clock-dot" />
            <span ref={phaseEl}>Golden hour</span>
            <span ref={time} className="hero__clock-time">
              5:10 PM
            </span>
          </div>
          <a href="#studio" className="hero__scroll hero__fade" aria-label="Scroll to the studio">
            <span>Scroll to dusk</span>
            <i />
          </a>
        </div>
      </div>

      <div className="hero__after">
        <p className="eyebrow">When the sun sets</p>
        <p className="hero__after-text">
          Every line we draw is designed for <em>both lights.</em>
        </p>
      </div>
    </section>
  );
}
