"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { type ImgKey } from "@/lib/data";
import Img from "./ui/Img";

type Props = {
  id?: string;
  title: string;
  quote: string;
  label?: string;
  sub?: string;
  text: string;
  image: ImgKey;
  reverse?: boolean;
  cta: { label: string; href: string };
};

/** Image and text enter from opposite edges over a faint monogram. */
export default function Split({ id, title, quote, label, sub, text, image, reverse, cta }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();
      // On phones, complete each entrance when its own panel enters view,
      // rather than leaving a wide image mid-reveal until the section reaches the top.
      motion.add("(max-width: 960px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".split__media", { xPercent: reverse ? 100 : -100 }, {
          xPercent: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 95%", once: true },
        });
        gsap.from(".split__text > *", {
          x: reverse ? -24 : 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current!.querySelector(".split__text"), start: "top 92%", once: true },
        });
      });
      motion.add("(min-width: 961px) and (prefers-reduced-motion: no-preference)", () => {
      if (id === "story" || id === "approach") {
        const section = root.current!;
        const text = section.querySelector<HTMLElement>(".split__text")!;
        const halfImage = reverse ? "inset(0% 0% 0% 50%)" : "inset(0% 50% 0% 0%)";
        const overflow = () => Math.max(0, text.scrollHeight - section.clientHeight);
        const revealDistance = () => window.innerHeight * 1.25 + overflow();
        let coverHold: gsap.core.Tween | undefined;

        // Slide the first half in as the section enters, then reveal the rest while pinned.
        gsap.set(".split__media", { clipPath: halfImage });
        gsap.fromTo(".split__media", { xPercent: reverse ? 50 : -50 }, {
          xPercent: 0,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.set(".split__text > *", { y: 24, autoAlpha: 0 });
        const reveal = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + (revealDistance() + (id === "story" ? section.clientHeight : 0)),
            onRefreshInit: () => {
              coverHold?.duration(1.6 * section.clientHeight / revealDistance());
            },
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        reveal
          .to(".split__media", {
            clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "sine.inOut",
          }, 0)
          .to(".split__text > *", {
            y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.4, ease: "power2.out",
          }, 0.15)
          // On short screens, carry the lower text and button into view before releasing.
          .to(text, { y: () => -overflow(), duration: 0.35, ease: "sine.inOut" }, 0.95)
          .to({}, { duration: 0.3 });
        if (id === "story") {
          // Keep the completed story pinned until the incoming panel covers it.
          coverHold = gsap.to({}, { duration: 1.6 * section.clientHeight / revealDistance() });
          reveal.add(coverHold);
        }
        return;
      }
      // 1. Curtain wipe reveal on the image
      gsap.fromTo(
        ".split__media",
        { clipPath: reverse ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 15%", scrub: true },
        }
      );

      // 2. Parallax vertical motion on the photo
      gsap.fromTo(
        ".split__img",
        { yPercent: 6, scale: 1.05 },
        {
          yPercent: -6,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // 3. Staggered text cascade animation
      gsap.from(".split__text > *", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".split__text", start: "top 78%", once: true },
      });

      // 4. Subtle watermark monogram drift
      gsap.fromTo(
        ".split__mark",
        { rotate: reverse ? 12 : -12, yPercent: 15 },
        {
          rotate: reverse ? -12 : 12,
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: root.current, scrub: true },
        }
      );
      });
      return () => motion.revert();
    },
    { scope: root }
  );

  return (
    <section id={id} ref={root} className={`split${reverse ? " split--rev" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className="split__media">
        <div className="split__img">
          <Img k={image} sizes="(max-width: 960px) 100vw, 50vw" priority={id === "story"} />
        </div>
      </div>
      <div className="split__text">
        <h2 className="title">{title}</h2>
        <p className="quote">&ldquo;{quote}&rdquo;</p>
        {label && <p className="label">{label}</p>}
        {sub && <p className="sub">{sub}</p>}
        <p className="para">{text}</p>
        {/* Keep the entrance transform separate from the button's hover transition. */}
        <div className="split__action">
          <a href={cta.href} className="pill">
            {cta.label} <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
