"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { img, type ImgKey } from "@/lib/data";
import Img from "./ui/Img";

type Props = {
  id?: string;
  title: string;
  quote: string;
  label: string;
  sub: string;
  text: string;
  image: ImgKey;
  reverse?: boolean;
  cta: { label: string; href: string };
};

/** Image wipes in from the page edge; text column fades up beside it over a faint monogram. */
export default function Split({ id, title, quote, label, sub, text, image, reverse, cta }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".split__media",
        { clipPath: reverse ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", end: "top 15%", scrub: true },
        }
      );
      // parallax moves the whole frame, so the photo itself is never cropped
      gsap.fromTo(
        ".split__media",
        { y: 70 },
        {
          y: -70,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
      gsap.from(".split__text > *", {
        y: 50,
        opacity: 0,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.09,
        scrollTrigger: { trigger: ".split__text", start: "top 78%", once: true },
      });
      gsap.fromTo(
        ".split__mark",
        { rotate: -12, yPercent: 15 },
        { rotate: 12, yPercent: -15, ease: "none", scrollTrigger: { trigger: root.current, scrub: true } }
      );
    },
    { scope: root }
  );

  return (
    <section id={id} ref={root} className={`split${reverse ? " split--rev" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="split__mark" src="/images/logo-mark.png" alt="" aria-hidden />
      <div className="split__media" style={{ aspectRatio: `${img(image).width} / ${img(image).height}` }}>
        <div className="split__img">
          <Img k={image} sizes="(max-width: 900px) 100vw, 55vw" />
        </div>
      </div>
      <div className="split__text">
        <h2 className="title">{title}</h2>
        <p className="quote">&ldquo;{quote}&rdquo;</p>
        <p className="label">{label}</p>
        <p className="sub">{sub}</p>
        <p className="para">{text}</p>
        <a href={cta.href} className="pill">
          {cta.label} <span aria-hidden>↗</span>
        </a>
      </div>
    </section>
  );
}
